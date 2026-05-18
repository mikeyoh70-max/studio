import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { blogPosts } from '@/lib/blog-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ShieldCheck, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const postContents: Record<string, string> = {
  "tips-korban-penipuan-rekber": `
    <p>Menjadi korban penipuan adalah pengalaman yang tidak menyenangkan. Namun, ada langkah hukum yang bisa Anda ambil untuk menindak pelaku.</p>
    <h3>1. Jerat Hukum Penipuan</h3>
    <p>Pasal mengenai penipuan secara umum diatur pada Pasal 378 KUHP yang berbunyi: "Barang siapa dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, dengan memakai nama palsu atau martabat palsu, dengan tipu muslihat, ataupun rangkaian kebohongan, menggerakkan orang lain untuk menyerahkan barang sesuatu kepadanya, atau supaya memberi hutang maupun menghapuskan piutang, diancam karena penipuan dengan pidana penjara paling lama empat tahun."</p>
    <h3>2. Langkah yang Harus Diambil</h3>
    <ul>
      <li>Kumpulkan semua bukti percakapan (screenshot).</li>
      <li>Simpan bukti transfer dan nomor rekening pelaku.</li>
      <li>Laporkan ke pihak kepolisian terdekat atau melalui portal patrolisiber.id.</li>
      <li>Hubungi bank terkait untuk melakukan pemblokiran rekening pelaku.</li>
    </ul>
    <p>Selalu gunakan jasa Rekber Nusantara untuk memastikan dana Anda aman hingga transaksi selesai sepenuhnya.</p>
  `,
  "jenis-penipuan-marketplace": `
    <p>Pasar online atau marketplace sangat memudahkan hidup kita, namun juga menjadi ladang bagi para penipu. Berikut adalah beberapa modus yang sering ditemukan:</p>
    <h3>1. Transaksi di Luar Platform</h3>
    <p>Penipu biasanya akan membujuk pembeli untuk bertransaksi langsung melalui WhatsApp atau transfer pribadi dengan iming-iming harga lebih murah. Ingat, tanpa sistem rekber, uang Anda tidak terlindungi.</p>
    <h3>2. Barang Tidak Sesuai / Palsu</h3>
    <p>Modus ini mengirimkan barang yang sangat berbeda dari deskripsi atau bahkan mengirimkan paket kosong. Dengan Rekber Nusantara, dana baru akan cair ke penjual jika pembeli sudah melakukan pengecekan barang.</p>
    <h3>3. Link Phishing</h3>
    <p>Hati-hati dengan link yang dikirimkan oleh penjual atau pihak yang mengaku admin. Pastikan Anda hanya memverifikasi nomor admin di website resmi Rekber Nusantara.</p>
  `,
  "cara-aman-transaksi-digital": `
    <p>Produk digital seperti akun game, item, atau jasa desain memiliki risiko tinggi karena tidak adanya fisik barang. Berikut cara mengamankannya:</p>
    <h3>1. Ganti Seluruh Data Keamanan</h3>
    <p>Jika membeli akun, pastikan Anda mengganti email, nomor HP, dan verifikasi dua langkah segera setelah menerima akses.</p>
    <h3>2. Gunakan Rekber Nusantara</h3>
    <p>Admin Rekber Nusantara akan bertindak sebagai mediator yang memastikan data akun sudah dipindahkan sepenuhnya ke pembeli sebelum dana diteruskan ke penjual.</p>
    <h3>3. Dokumentasikan Proses</h3>
    <p>Selalu rekam video saat melakukan login pertama kali atau pengecekan data akun sebagai bukti jika terjadi masalah di kemudian hari.</p>
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
