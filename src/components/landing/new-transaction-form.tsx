
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Save, Phone } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=hallo%20admin%20%2C%20saya%20mau%20Buat%20Rekber%20Sekarang%20Dong';

export function NewTransactionForm() {
  const [sellerNum, setSellerNum] = useState('');
  const [buyerNum, setBuyerNum] = useState('');
  const [desc, setDesc] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCreateTransaction = () => {
    if (!isAgreed) {
      alert('Silakan setujui aturan & ketentuan terlebih dahulu.');
      return;
    }
    
    const message = `Halo Admin, saya ingin buat transaksi:\n\nNomor Penjual: ${sellerNum}\nNomor Pembeli: ${buyerNum}\nDeskripsi: ${desc}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/62895323091263?text=${encodedMessage}`, '_blank');
  };

  return (
    <Card className="border-none shadow-2xl overflow-hidden rounded-[20px] bg-white">
      {/* Header Form */}
      <div className="bg-[#0047cc] p-6 flex justify-between items-center text-white">
        <h2 className="text-xl font-bold font-headline tracking-tight">Transaksi</h2>
        <div className="bg-white rounded-full p-2.5 shadow-lg">
          <MessageSquare className="h-6 w-6 text-[#0047cc] fill-[#0047cc]" />
        </div>
      </div>

      <CardContent className="p-8 space-y-8">
        {/* Nomor Penjual */}
        <div className="space-y-3">
          <label className="text-slate-700 font-bold text-sm ml-1">Nomor Penjual</label>
          <Input 
            placeholder="Masukkan nomor penjual" 
            className="h-14 rounded-xl border-slate-200 bg-white text-lg focus:ring-primary/20"
            value={sellerNum}
            onChange={(e) => setSellerNum(e.target.value)}
          />
        </div>

        {/* Nomor Pembeli */}
        <div className="space-y-3">
          <label className="text-slate-700 font-bold text-sm ml-1">Nomor Pembeli</label>
          <Input 
            placeholder="Masukkan nomor pembeli" 
            className="h-14 rounded-xl border-slate-200 bg-white text-lg focus:ring-primary/20"
            value={buyerNum}
            onChange={(e) => setBuyerNum(e.target.value)}
          />
        </div>

        {/* Deskripsi */}
        <div className="space-y-3">
          <label className="text-slate-700 font-bold text-sm ml-1">Deskripsi</label>
          <Textarea 
            className="min-h-[160px] rounded-2xl border-slate-200 bg-white text-lg p-4 focus:ring-primary/20"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-start space-x-3 pt-2">
          <Checkbox 
            id="terms" 
            className="mt-1 border-slate-300 rounded-md h-5 w-5 data-[state=checked]:bg-primary"
            checked={isAgreed}
            onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
          />
          <label htmlFor="terms" className="text-sm font-medium leading-relaxed text-slate-600 cursor-pointer select-none">
            Saya akan mematuhi <span className="text-primary font-bold">Aturan & Ketentuan</span> yang berlaku.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-6">
          <Button 
            className="w-full h-14 bg-[#5c7ce5] hover:bg-[#4a69d1] text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
            onClick={handleCreateTransaction}
          >
            <Save className="h-5 w-5" />
            Buat Transaksi
          </Button>

          <div className="h-px bg-slate-100 w-full" />

          <Button 
            variant="outline"
            className="w-full h-14 bg-[#00c853] hover:bg-[#00b24a] text-white border-none font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-500/20"
            asChild
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Phone className="h-5 w-5 fill-white" />
              Hubungi Admin
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
