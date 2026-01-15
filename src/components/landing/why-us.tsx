import { ShieldCheck, Clock, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Aman & Terverifikasi',
    description: 'Semua admin kami telah melewati verifikasi identitas yang ketat. Transaksi Anda dijamin aman dari pihak ketiga yang tidak bertanggung jawab.',
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: 'Cepat & Responsif',
    description: 'Proses transaksi ditangani dengan cepat, biasanya selesai dalam hitungan menit. Kami menghargai waktu Anda sama seperti kami menghargai keamanan.',
  },
  {
    icon: <Scale className="h-10 w-10 text-primary" />,
    title: 'Netral & Adil',
    description: 'Dikelola oleh mahasiswa hukum yang memahami pentingnya netralitas dan keadilan. Kami bertindak sebagai penengah yang tidak memihak.',
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Kenapa Memilih Kami?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Kami bukan sekadar perantara. Kami adalah benteng keamanan untuk setiap transaksi game online Anda.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="mt-6 text-xl font-semibold font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
