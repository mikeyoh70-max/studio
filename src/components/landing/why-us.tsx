import { ShieldCheck, Clock, Scale } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';

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

export function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl font-headline">
            Kenapa Memilih Rekber Go?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Kami menawarkan keamanan, kecepatan, dan keadilan dalam setiap transaksi.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-left bg-white p-8 shadow-xl border-none hover:shadow-2xl transition-all duration-300 group">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="flex-shrink-0 p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold font-headline text-slate-900">{feature.title}</CardTitle>
                  <p className="mt-3 text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
