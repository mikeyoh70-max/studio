import { ShieldCheck, Clock, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Aman & Terverifikasi',
    description: 'Semua admin kami terverifikasi untuk memastikan transaksi Anda bebas dari penipuan.',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Proses Cepat',
    description: 'Proses transaksi ditangani dengan cepat dan efisien oleh tim profesional kami.',
  },
  {
    icon: <Scale className="h-8 w-8 text-primary" />,
    title: 'Adil & Netral',
    description: 'Kami bertindak sebagai penengah yang tidak memihak untuk menjamin keadilan bagi kedua belah pihak.',
  },
];

const ojkLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Otoritas_Jasa_Keuangan_logo.svg/2560px-Otoritas_Jasa_Keuangan_logo.svg.png";
const kemendagLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/e/e7/Logo_Kementerian_Perdagangan_RI.svg";


export function WhyUs() {
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Kenapa Memilih Rekber Nusantara?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Kami menawarkan keamanan, kecepatan, dan keadilan dalam setiap transaksi.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-12">
            <Card className="bg-background/50 border-border/70">
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <h3 className="text-sm font-semibold text-muted-foreground tracking-wider">TERDAFTAR & DIAWASI OLEH:</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/90 rounded-md p-3 flex justify-center items-center h-20">
                            <Image
                                src={ojkLogoUrl}
                                alt="OJK Logo"
                                width={120}
                                height={40}
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                         <div className="bg-white/90 rounded-md p-3 flex justify-center items-center h-20">
                            <Image
                                src={kemendagLogoUrl}
                                alt="Kementerian Perdagangan Logo"
                                width={120}
                                height={50}
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground/60 mt-4 text-center">
                        *Layanan kami dalam proses pemenuhan regulasi untuk menjamin keamanan transaksi Anda.
                    </p>
                </CardContent>
            </Card>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-left bg-background p-6 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 border border-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold font-headline">{feature.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
