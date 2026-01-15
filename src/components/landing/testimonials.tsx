import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmad "The Invincible" Riyadi',
    avatar: 'https://picsum.photos/seed/101/40/40',
    title: 'Top Up Diamond Tercepat',
    rating: 5,
    quote:
      'Prosesnya cepet banget, gak sampe 5 menit diamond udah masuk. Adminnya juga ramah dan fast response. Puas banget sama layanan Rekber Nusantara!',
  },
  {
    name: 'Siti "The Shadow" Nurhaliza',
    avatar: 'https://picsum.photos/seed/102/40/40',
    title: 'Transaksi Akun Aman',
    rating: 5,
    quote:
      'Awalnya ragu transaksi akun gede, tapi Rekber Nusantara bikin semuanya aman terkendali. Fitur verifikasi adminnya bikin tenang. Recommended!',
  },
  {
    name: 'Budi "The Legend" Santoso',
    avatar: 'https://picsum.photos/seed/103/40/40',
    title: 'Jasa Joki Terpercaya',
    rating: 5,
    quote:
      'Pakai jasa joki di sini hasilnya memuaskan, rank naik drastis. Yang paling penting, akun 100% aman. Gak nyesel pilih Rekber Nusantara.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Lihat bagaimana kami membantu para gamer bertransaksi dengan aman dan tanpa khawatir.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-background shadow-lg flex flex-col">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-foreground italic flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
