
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { io, type Socket } from 'socket.io-client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: string;
}

interface TransactionDetails {
    description: string;
    amount: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};


export default function ChatPage() {
  const params = useParams();
  const transactionId = params.id as string;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({ id: '', name: '' });
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const socketRef = useRef<Socket | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize user
    let userId = localStorage.getItem('userId');
    let userName = localStorage.getItem('userName');

    if (!userId) {
      userId = `user_${Math.random().toString(36).substring(2, 9)}`;
      userName = `Pengguna-${userId.substring(5, 9)}`;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
    }
    setCurrentUser({ id: userId, name: userName });
    
    // Fetch transaction details
    const fetchTransactionDetails = async () => {
        try {
            const res = await fetch(`/api/transaction/${transactionId}`);
            if(res.ok) {
                const data = await res.json();
                setTransactionDetails(data);
            }
        } catch (error) {
            console.error("Failed to fetch transaction details", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchTransactionDetails();

    // Initialize Socket.io
    socketRef.current = io();
    socketRef.current.emit('join-room', transactionId);

    socketRef.current.on('receive-message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [transactionId]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && socketRef.current) {
      socketRef.current.emit('send-message', {
        transactionId,
        message: newMessage,
        senderId: currentUser.id,
        senderName: currentUser.name,
      });
      setNewMessage('');
    }
  };
  
  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-card">
         <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                    <ArrowLeft />
                </Link>
            </Button>
            <Avatar>
                <AvatarFallback>{transactionDetails?.description[0] || 'T'}</AvatarFallback>
            </Avatar>
            <div>
                 <CardTitle className="text-base font-bold md:text-lg">{transactionDetails?.description || `Transaksi ${transactionId}`}</CardTitle>
                 <p className="text-sm text-muted-foreground">{formatCurrency(transactionDetails?.amount || 0)}</p>
            </div>
         </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 md:p-6 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={cn('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}>
                  {!isMe && (
                     <Avatar className="h-8 w-8">
                       <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                     </Avatar>
                  )}
                  <div className={cn('max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2', isMe ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    {!isMe && <p className="text-xs font-bold mb-1">{msg.senderName}</p>}
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">{format(new Date(msg.timestamp), 'HH:mm')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t bg-card">
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ketik pesan..."
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </div>
  );
}
