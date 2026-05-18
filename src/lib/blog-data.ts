export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageId: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "tips-korban-penipuan-rekber",
    category: "Tips Keamanan",
    title: "Tips Jika Menjadi Korban Penipuan Rekber",
    excerpt: "Jerat Hukum Penipuan Lewat Rekber. Pasal mengenai penipuan secara umum diatur pada Pasal 378 KUHP...",
    date: "22 Apr 2026",
    imageId: "blog-1"
  },
  {
    id: 2,
    slug: "jenis-penipuan-marketplace",
    category: "Marketplace",
    title: "Jenis2 Penipuan di Marketplace Online",
    excerpt: "Hati-hati dengan permintaan transaksi di luar marketplace tanpa rekening bersama (rekber). Marketplace bertindak sebagai penengah...",
    date: "22 Apr 2026",
    imageId: "blog-2"
  },
  {
    id: 3,
    slug: "cara-aman-transaksi-digital",
    category: "Edukasi",
    title: "Cara Aman Bertransaksi Produk Digital Online",
    excerpt: "Tips Aman Bertransaksi Online: Jaga kerahasiaan data pribadi Anda dan gunakan jasa rekber terpercaya...",
    date: "22 Apr 2026",
    imageId: "blog-3"
  },
  {
    id: 4,
    slug: "apa-itu-rekber-dan-fungsinya",
    category: "Edukasi",
    title: "Apa Itu Rekber dan Fungsinya dalam Bisnis Online?",
    excerpt: "Sistem Rekber itu Bagaimana? Sistem kerja rekber cukup sederhana namun sangat efektif melindungi kedua belah pihak...",
    date: "23 Apr 2026",
    imageId: "blog-4"
  },
  {
    id: 5,
    slug: "mengenal-lebih-dekat-rekening-bersama",
    category: "Pengetahuan",
    title: "Mengenal Lebih Dekat Rekening Bersama: Kelebihan & Manfaat",
    excerpt: "Apa itu Rekening Bersama? Rekening bersama adalah rekening bank yang dimiliki atau diawasi oleh pihak ketiga yang netral...",
    date: "23 Apr 2026",
    imageId: "blog-5"
  }
];