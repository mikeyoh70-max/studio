
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/auth-context';
import { 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowLeft, ShieldCheck, Info, Loader2, Copy, Share2, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Timestamp;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  status: string;
  buyerId: string;
  sellerPhone: string;
  buyerPhone: string;
}

export default function ChatPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchTx = async () => {
      if (!id || !db) return;
      try {
        const docRef = doc(db, 'transactions', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTransaction({ id: docSnap.id, ...data } as Transaction);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTx();
  }, [id]);

  useEffect(() => {
    if (!id || !db) return;

    const q = query(
      collection(db, 'transactions', id as string, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
      
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });

    return () => unsubscribe();
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !id || !db) return;

    const text = newMessage;
    setNewMessage('');

    try {
      await addDoc(collection(db, 'transactions', id as string, 'messages'), {
        text: text,
        senderId: user.uid,
        senderName: user.displayName || 'User',
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Disalin!',
      description: 'Bagikan link ini kepada Penjual/Pembeli.',
    });
  };

  const shareToWhatsApp = () => {
    if (!transaction) return;
    const url = window.location.href;
    const text = `Halo, saya sudah membuat Room Rekber di Rekber Nusantara.\n\nDeskripsi: ${transaction.description}\nNominal: Rp ${transaction.amount.toLocaleString('id-ID')}\n\nSilakan bergabung ke room chat resmi di sini untuk melanjutkan transaksi:\n${url}`;
    const waUrl = `https://wa.me/${transaction.sellerPhone.replace(/\+/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 container mx-auto p-4 flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 container mx-auto p-4 flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-bold">Room Chat Tidak Ditemukan</h2>
          <Button onClick={() => router.push('/transactions')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Riwayat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-6">
          <Button variant="ghost" onClick={() => router.push('/transactions')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
          </Button>
          
          <Card className="border-border shadow-md">
            <CardHeader className="bg-secondary/20 border-b">
              <CardTitle className="text-xl font-headline flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Detail Transaksi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">ID Transaksi</p>
                <p className="font-mono text-sm break-all">{transaction.id}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Deskripsi</p>
                <p className="text-sm">{transaction.description}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Nominal</p>
                <p className="text-lg font-bold">Rp {transaction.amount.toLocaleString('id-ID')}</p>
              </div>
              <div className="pt-4 space-y-3">
                <Badge variant={transaction.status === 'completed' ? 'success' : 'secondary'} className="w-full justify-center py-1">
                  Status: {transaction.status === 'pending' ? 'Dalam Proses' : transaction.status}
                </Badge>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={copyLink} className="text-xs gap-1">
                    <Copy className="h-3 w-3" /> Salin Link
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareToWhatsApp} className="text-xs gap-1 text-green-500 hover:text-green-600">
                    <MessageCircle className="h-3 w-3" /> Undang Penjual
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-500/20 text-xs text-blue-200">
            <p className="flex items-center gap-2 mb-2 font-bold uppercase tracking-widest">
              <ShieldCheck className="h-3 w-3" /> Info Keamanan
            </p>
            Jangan pernah memberikan data sensitif di luar room chat ini. Pastikan Anda mengundang Penjual menggunakan tombol di atas.
          </div>
        </div>

        <Card className="flex-1 flex flex-col h-[70vh] border-border shadow-xl">
          <CardHeader className="border-b bg-card py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-headline">Room Chat Rekber</CardTitle>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span> Terkoneksi Aman
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden p-0 relative">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                   <div className="flex justify-center my-8">
                    <div className="text-center max-w-xs">
                      <p className="text-sm text-muted-foreground italic">Belum ada pesan. Mulai percakapan atau undang pihak lain untuk bergabung.</p>
                    </div>
                  </div>
                )}
                {messages.map((msg) => {
                  const isMe = msg.senderId === user?.uid;
                  const isSystem = msg.senderId === 'system';

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="flex justify-center my-4">
                        <div className="bg-muted px-4 py-2 rounded-full text-[10px] text-muted-foreground font-semibold uppercase tracking-widest border border-border max-w-[90%] text-center">
                          {msg.text}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-1 mb-1 px-1">
                          <span className="text-[10px] text-muted-foreground font-bold">{msg.senderName}</span>
                        </div>
                        <div
                          className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                            isMe
                              ? 'bg-primary text-primary-foreground rounded-tr-none'
                              : 'bg-secondary text-secondary-foreground rounded-tl-none border border-border'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-muted-foreground mt-1 px-1">
                          {msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="border-t p-4 bg-muted/30">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Ketik pesan di sini..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-background border-border"
              />
              <Button type="submit" size="icon" className="btn-rgb" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
