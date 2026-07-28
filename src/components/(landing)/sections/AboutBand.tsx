import { ChevronDown } from "lucide-react";

type MamikosFeature = {
  title: string;
  body: string;
};

const FEATURES: MamikosFeature[] = [
  {
    title: "Fitur Pencarian",
    body: "Di kolom pencarian, kamu bisa cari kos di sekitarmu atau kos di seluruh daerah di Indonesia dengan memasukkan keyword, seperti kos dekat Kampus/Universitas di masing-masing kota, cari kos di Jogja, Depok, Jakarta, Surabaya, Bandung, dan kota besar lainnya atau cari kos di sekitar lokasi saya saat ini.",
  },
  {
    title: "Filter Pencarian",
    body: "Cari kos berdasarkan fasilitas kos yang kamu mau, lebih mudah dengan filter berdasarkan Kos AC, Kos Kamar mandi dalam, Kos Wifi. Bisa juga pilih kos dengan tipe kos, mulai dari Kos Harian, Kos Bulanan hingga Kos Tahunan. Mau cari Kos Bebas, Kos Pasutri, Kos Putra, Kos Putri, Kos Campur juga bisa.",
  },
  {
    title: "Chat dengan Penyewa",
    body: "Terhubung langsung dengan pemilik kos dan bisa bertanya lebih lanjut mengenai info kos melalui fitur chat di Mamikos.",
  },
  {
    title: "Sewa Langsung via Mamikos",
    body: "Bisa langsung mengajukan sewa kos di aplikasi atau website Mamikos. Bahkan, kamu bisa mulai sewa kos dari 3 bulan sebelum masuk kosan. Transaksi lebih aman, tanpa takut kamarnya penuh keduluan orang lain.",
  },
  {
    title: "Virtual Tour",
    body: "Virtual Tour Mamikos adalah media foto lingkungan kos dalam 360° yang diperuntukkan untuk kamu, para pencari kos, agar dapat mengetahui kondisi lingkungan kos secara detail tanpa harus survei langsung. Fitur ini cocok jadi andalanmu yang butuh kosan tapi tidak punya waktu untuk survei langsung, karena fitur ini menampilkan keadaan kos secara lengkap dari berbagai sudut.",
  },
  {
    title: "Pembayaran via Mamikos",
    body: "Bayar kosan anti ribet, cashless, dan jaminan aman, dengan beragam pilihan metode pembayaran. Nikmati promo-promo menarik yang diselenggarakan secara berkala untuk membantu kamu ngekos lebih hemat.",
  },
  {
    title: "MamiPoin",
    body: "Sebagai wujud terima kasih, Mamikos menghadirkan program loyalti melalui MamiPoin. Anak kos bisa mendapatkan poin sebagai cashback setiap melakukan pembayaran kos dan dapat dikumpulkan untuk digunakan sebagai tambahan diskon di pembayaran kos selanjutnya. Pemilik kos juga akan mendapatkan MamiPoin setiap melakukan aktivitas di Mamikos dan dapat dikumpulkan untuk ditukar menjadi beragam hadiah menarik atau tambahan diskon di pembayaran paket Mamikos GoldPlus.",
  },
  {
    title: "Kos Review",
    body: "Lihat review dari para penghuni kos agar kamu semakin yakin untuk sewa kos. Kamu juga bisa tulis pengalaman kamu selama ngekos untuk menambah info kos tersebut.",
  },
  {
    title: "Favorit",
    body: "Ketemu dengan kos idaman, bisa disimpan dulu melalui fitur favorit kos. Kos yang sudah kamu simpan, dapat kamu sewa di kemudian hari.",
  },
];

export function AboutBand() {
  return (
    <section className="mt-10 bg-surface py-12">
      <div className="mami-container">
        <h2 className="text-center text-lg font-bold text-ink">
          Mamikos - Aplikasi Anak Kos No. 1 di Indonesia
        </h2>
        <p className="mt-6 text-[15px] leading-7 text-ink">
          Mamikos memanfaatkan teknologi untuk berkembang dari aplikasi cari kos
          menjadi aplikasi yang memudahkan calon anak kos untuk booking properti
          kos dan juga melakukan pembayaran kos. Saat ini kami memiliki lebih
          dari 2 juta kamar kos yang tersebar di lebih dari 140 kota di seluruh
          Indonesia. Mamikos juga menyediakan layanan manajemen properti,
          bernama Singgahsini dan Apik, untuk menjawab kebutuhan calon penghuni
          yang menginginkan kos eksklusif atau kos murah. Mamikos berusaha untuk
          bisa terus menyajikan daftar rumah kos dengan data ketersediaan kamar
          yang akurat, fasilitas kos terperinci, dilengkapi dengan foto serta
          detail harga kos, dan kemudahan survei via fitur virtual tour agar
          calon penghuni mendapatkan kenyamanan dalam proses pencarian dan
          booking kos.
        </p>

        {/* Native disclosure: keyboard accessible, works without JavaScript,
            and keeps this a Server Component. */}
        <details className="group mt-8">
          <summary className="flex cursor-pointer list-none items-center justify-center gap-2 text-base font-bold text-ink hover:text-mami">
            Fitur yang dapat dimanfaatkan di Mamikos
            <ChevronDown
              aria-hidden
              className="size-5 transition-transform group-open:rotate-180"
            />
          </summary>

          <ol className="mt-6 list-[lower-alpha] space-y-6 pl-10 marker:text-[15px] marker:text-ink">
            {FEATURES.map((feature) => (
              <li key={feature.title}>
                <h3 className="text-[15px] font-bold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-7 text-ink">
                  {feature.body}
                </p>
              </li>
            ))}
          </ol>
        </details>
      </div>
    </section>
  );
}
