import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { blogPosts } from '@/lib/blog-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ShieldCheck, Share2, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const postContents: Record<string, string> = {
  "tips-korban-penipuan-rekber": `
    <div class="space-y-6">
      <p class="text-lg leading-relaxed">Menjadi korban penipuan digital adalah pengalaman yang sangat membuat stres. Namun, panik berlebihan justru akan menghambat langkah penyelamatan dana Anda. Di Indonesia, hukum sudah mengatur sanksi berat bagi pelaku penipuan online.</p>
      
      <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
        <div class="mt-1"><Info className="text-blue-500 h-6 w-6" /></div>
        <div>
          <h4 class="font-bold text-blue-900 mb-1">Dasar Hukum Penipuan</h4>
          <p class="text-blue-800 text-sm italic">Pasal 378 KUHP menyatakan: "Barang siapa dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum... diancam karena penipuan dengan pidana penjara paling lama empat tahun."</p>
        </div>
      </div>

      <h3 class="text-2xl font-black mt-8">Langkah Darurat yang Harus Diambil:</h3>
      <ol class="list-decimal list-inside space-y-4 font-medium">
        <li>
          <span class="text-slate-900 font-bold">Dokumentasi Bukti (Screenshot):</span> Jangan hapus chat! Ambil tangkapan layar seluruh percakapan, nomor telepon pelaku, ID akun media sosialnya, dan bukti transfer.
        </li>
        <li>
          <span class="text-slate-900 font-bold">Lapor ke Bank Terkait:</span> Hubungi call center bank Anda dan bank tujuan transfer pelaku. Mintalah pemblokiran rekening tujuan dengan alasan penipuan. Biasanya bank memerlukan surat laporan polisi untuk memproses permanen.
        </li>
        <li>
          <span class="text-slate-900 font-bold">Buat Laporan Polisi:</span> Datangi kantor polisi terdekat (Polres/Polda) ke bagian SPKT. Bawa bukti print-out chat dan bukti transfer. Laporan ini resmi dan gratis.
        </li>
        <li>
          <span class="text-slate-900 font-bold">Lapor ke Portal Siber:</span> Masukkan data penipuan ke portal <a href="https://patrolisiber.id" class="text-primary underline">patrolisiber.id</a> dan <a href="https://cekrekening.id" class="text-primary underline">cekrekening.id</a> agar rekening pelaku ditandai secara nasional.
        </li>
      </ol>

      <div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 mt-8">
        <h4 class="font-bold text-amber-900 flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5" /> Ingat!
        </h4>
        <p class="text-amber-800 text-sm">Rekber Nusantara tidak pernah meminta biaya tambahan untuk membantu proses mediasi korban jika transaksi dilakukan melalui admin resmi kami. Selalu waspada terhadap pihak yang mengaku bisa mengembalikan dana dengan membayar sejumlah uang.</p>
      </div>
    </div>
  `,
  "jenis-penipuan-marketplace": `
    <div class="space-y-6">
      <p class="text-lg leading-relaxed">Dunia jual beli online terus berkembang, namun modus penipuan juga semakin canggih. Para pelaku sering memanfaatkan kelengahan dan keinginan pembeli untuk mendapatkan harga murah. Berikut adalah 3 modus paling umum saat ini:</p>

      <h3 class="text-2xl font-black mt-8">1. Modus "Giring" Keluar Platform</h3>
      <p>Penipu biasanya memasang produk dengan harga sangat murah di marketplace besar. Saat Anda chat, mereka akan beralasan sistem marketplace sedang error atau menawarkan diskon tambahan jika bertransaksi langsung via WhatsApp atau transfer pribadi. Begitu dana dikirim, akun mereka hilang.</p>

      <h3 class="text-2xl font-black mt-8">2. Modus Bukti Transfer Palsu (Struk Editan)</h3>
      <p>Ini sering menimpa para penjual. Penipu mengirimkan foto struk transfer ATM atau m-banking yang sangat mirip aslinya, namun saldo Anda tidak bertambah. Mereka akan mendesak penjual untuk segera mengirim barang dengan alasan darurat.</p>

      <h3 class="text-2xl font-black mt-8">3. Modus Admin Palsu dalam Grup</h3>
      <p>Pelaku masuk ke grup jual beli dan membuat akun yang profilnya (foto & nama) mirip dengan Admin Rekber terpercaya. Mereka akan menawarkan jasa rekber "instan" kepada pihak yang sedang bertransaksi. Inilah pentingnya melakukan <strong>Verifikasi Nomor Admin</strong> di website resmi sebelum mengirim dana.</p>

      <div class="bg-green-50 p-8 rounded-[32px] border border-green-100 mt-10">
        <h4 class="text-xl font-black text-green-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6" /> Solusi Rekber Nusantara
        </h4>
        <p class="text-green-800 leading-relaxed">Dengan menggunakan Rekber Nusantara, dana Anda berada di 'safe zone'. Penjual tidak akan menerima uang sebelum Anda mengonfirmasi barang telah sampai dan sesuai. Kami adalah benteng terakhir Anda melawan modus-modus di atas.</p>
      </div>
    </div>
  `,
  "cara-aman-transaksi-digital": `
    <div class="space-y-6">
      <p class="text-lg leading-relaxed">Transaksi produk digital (seperti akun game, item, atau lisensi software) memiliki risiko lebih tinggi karena barangnya tidak berbentuk fisik. Sekali data berpindah tangan, sangat sulit untuk ditarik kembali jika terjadi masalah. Berikut panduan wajibnya:</p>

      <h3 class="text-2xl font-black mt-8">Langkah 1: Cek Reputasi dan Data</h3>
      <p>Sebelum memulai, mintalah testimoni atau cek histori transaksi lawan transaksi Anda. Namun ingat, testimoni bisa dipalsukan. Cara paling ampuh adalah dengan meminta Admin Rekber untuk mengecek status akun yang akan dijual apakah sedang dalam sengketa atau tidak.</p>

      <h3 class="text-2xl font-black mt-8">Langkah 2: Amankan Data Keamanan (2FA)</h3>
      <ul class="list-disc list-inside space-y-2 text-slate-700">
        <li>Ganti Email Utama (First Email) sesegera mungkin.</li>
        <li>Hapus semua perangkat yang tertaut (Logout All Devices).</li>
        <li>Ganti Password dan aktifkan Verifikasi Dua Langkah (2FA).</li>
        <li>Simpan kode pemulihan (Recovery Codes) di tempat yang aman.</li>
      </ul>

      <h3 class="text-2xl font-black mt-8">Langkah 3: Rekam Proses Serah Terima</h3>
      <p>Selalu lakukan rekaman layar (Screen Recording) saat Anda pertama kali menerima data login hingga berhasil masuk ke dalam akun. Video ini adalah bukti mutlak jika di kemudian hari terjadi 'back-tab' atau penarikan akun sepihak oleh penjual.</p>

      <div class="mt-12 p-1 bg-slate-900 rounded-[34px]">
        <div class="bg-white rounded-[32px] p-8 border border-slate-200">
          <h4 class="text-xl font-black text-slate-900 mb-2">Pentingnya Pihak Ketiga</h4>
          <p class="text-slate-600 leading-relaxed">Admin Rekber Nusantara bertindak sebagai mediator yang paham alur teknis pergantian data akun. Kami memastikan penjual sudah benar-benar melepaskan aksesnya sebelum dana diteruskan. Jangan ambil risiko bertransaksi sendirian!</p>
        </div>
      </div>
    </div>
  `
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find(img => img.id === post.imageId);
  const fullContent = postContents[slug] || "<p>Konten sedang dalam proses pembaruan...</p>";

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Navbar />
      <main className="flex-1">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-10 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </Link>

            {/* Header */}
            <div className="mb-12">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold mb-6">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-headline leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Verified by Admin</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl mb-16 border border-slate-100">
              <Image
                src={placeholder?.imageUrl || "https://picsum.photos/seed/blog/1200/800"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-headline prose-headings:font-black prose-p:leading-relaxed prose-li:leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: fullContent }} />
            </div>

            {/* Footer Article */}
            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white font-black">
                  RN
                </div>
                <div>
                  <p className="font-bold text-slate-900">Tim Rekber Nusantara</p>
                  <p className="text-sm text-slate-500">Edukasi Keamanan Transaksi Digital</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2 rounded-full font-bold">
                <Share2 className="h-4 w-4" />
                Bagikan Artikel
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
