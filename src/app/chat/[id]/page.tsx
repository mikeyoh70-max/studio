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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ShieldCheck, Info, Loader2, Copy, MessageCircle, User, Share2 } from 'lucide-react';
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
  buyerName?: string;
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
          setTransaction({ id: docSnap.id, ...docSnap.data() } as Transaction);
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
        senderName: user.displayName || user.email?.split('@')[0] || 'User',
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const copyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Berhasil Salin!',
        description: 'Link Room Chat sudah siap kamu bagikan.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Gagal Salin',
        description: 'Silakan salin link secara manual dari address bar.',
      });
    }
  };

  const shareToWhatsApp = () => {
    if (!transaction) return;
    const url = window.location.href;
    const text = `Halo, saya sudah membuat Room Rekber Nusantara Resmi.\n\nBarang: ${transaction.description}\nNominal: Rp ${transaction.amount.toLocaleString('id-ID')}\n\nSilakan klik link di bawah untuk masuk ke Room Chat:\n${url}`;
    
    // Tanpa nomor hp di URL agar bisa memilih kontak sendiri di WhatsApp
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Room Rekber Nusantara',
          text: `Ayo masuk ke Room Chat Rekber untuk transaksi: ${transaction?.description}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('User cancelled share');
      }
    } else {
      copyLink();
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background justify-center items-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center space-y-4">
        <h2 className="text-xl font-bold">Room tidak ditemukan.</h2>
        <Button onClick={() => router.push('/')}>Kembali ke Beranda</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Info */}
        <div className="lg:w-80 space-y-4">
          <Card className="border-border shadow-md">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="text-sm font-headline flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Detail Link Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Barang/Jasa</p>
                <p className="text-sm font-medium">{transaction.description}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Nominal</p>
                <p className="text-lg font-bold">Rp {transaction.amount.toLocaleString('id-ID')}</p>
              </div>
              
              <div className="pt-4 border-t space-y-2">
                <Button size="sm" variant="outline" className="w-full gap-2 text-xs" onClick={copyLink}>
                  <Copy className="h-3 w-3" /> Salin Link Room
                </Button>
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 text-xs" onClick={shareToWhatsApp}>
                  <MessageCircle className="h-3 w-3" /> Undang Lewat WA
                </Button>
                <Button size="sm" variant="secondary" className="w-full gap-2 text-xs md:hidden" onClick={nativeShare}>
                  <Share2 className="h-3 w-3" /> Bagikan Link
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-lg bg-blue-950/30 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <Info className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Penting!</span>
            </div>
            <p className="text-[11px] text-blue-200/70 leading-relaxed">
              Bagikan link di atas kepada lawan transaksi Anda. Pastikan mereka juga masuk ke room ini untuk diskusi yang aman.
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col h-[70vh] lg:h-[80vh] border-border shadow-2xl overflow-hidden">
          <CardHeader className="border-b bg-card py-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-headline">Room Chat Aman</CardTitle>
                <p className="text-[10px] text-green-500 font-medium">Aktif & Terenkripsi</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 bg-muted/5 relative overflow-hidden">
            <ScrollArea className="h-full px-4 py-4">
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isMe = msg.senderId === user?.uid;
                  const isSystem = msg.senderId === 'system';

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="flex justify-center">
                        <div className="bg-muted/50 border px-3 py-1 rounded-full text-[10px] text-muted-foreground font-medium text-center max-w-[80%]">
                          {msg.text}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex flex-col max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-muted-foreground mb-1 px-1 flex items-center gap-1">
                          {!isMe && <User className="h-2 w-2" />} {msg.senderName}
                        </span>
                        <div className={`px-4 py-2 rounded-2xl text-sm ${
                          isMe ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-card border border-border rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[8px] text-muted-foreground mt-1 px-1">
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

          <CardFooter className="p-4 bg-background border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Tulis pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-muted/30"
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
