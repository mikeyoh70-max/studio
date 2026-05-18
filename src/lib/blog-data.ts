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
  }
];
