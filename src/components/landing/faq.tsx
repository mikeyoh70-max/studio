import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Apa itu Rekber (Rekening Bersama)?",
    answer: "Rekening Bersama (Rekber) adalah layanan pihak ketiga yang menengahi transaksi antara penjual dan pembeli. Dana dari pembeli akan ditahan oleh Rekber dan baru akan diteruskan ke penjual setelah pembeli mengkonfirmasi bahwa barang atau jasa telah diterima sesuai kesepakatan."
  },
  {
    question: "Bagaimana cara kerja Rekber Nusantara?",
    answer: "1. Penjual dan pembeli sepakat menggunakan jasa kami. 2. Pembeli mentransfer dana ke rekening kami. 3. Kami mengkonfirmasi dana telah diterima kepada kedua belah pihak. 4. Penjual mengirimkan barang/jasa kepada pembeli. 5. Pembeli mengkonfirmasi penerimaan. 6. Kami mentransfer dana ke penjual setelah dipotong biaya jasa."
  },
  {
    question: "Berapa biaya jasa Rekber Nusantara?",
    answer: "Biaya jasa kami sangat kompetitif dan transparan, dihitung berdasarkan persentase dari nilai transaksi. Anda dapat menggunakan fitur kalkulator biaya di halaman ini untuk mendapatkan estimasi."
  },
  {
    question: "Transaksi apa saja yang bisa difasilitasi?",
    answer: "Kami dapat memfasilitasi berbagai jenis transaksi digital, termasuk jual beli akun game, item digital, jasa freelance, top-up, dan banyak lagi. Selama tidak melanggar hukum yang berlaku di Indonesia."
  },
  {
    question: "Apakah aman bertransaksi di sini?",
    answer: "Keamanan adalah prioritas utama kami. Dengan sistem Rekber, dana Anda aman bersama kami hingga transaksi selesai. Kami juga memiliki fitur verifikasi admin untuk melindungi Anda dari penipuan."
  }
];

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Pertanyaan Umum
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Punya pertanyaan? Kami punya jawaban. Berikut adalah beberapa pertanyaan yang paling sering diajukan.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
