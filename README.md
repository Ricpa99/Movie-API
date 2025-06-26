# 🎬  Movie Explorer App
Selamat datang di Movie Explorer App! Ini adalah aplikasi web interaktif sederhana yang memungkinkan Anda menjelajahi daftar film populer, mencari film favorit Anda, memfilter berdasarkan genre, dan bahkan menyimpan film ke daftar favorit pribadi Anda.

Aplikasi ini dibangun menggunakan React.js dan mengonsumsi data dari The Movie Database (TMDb) API.

# ✨  Fitur Utama
- Daftar Film Populer: Menampilkan daftar film yang sedang populer dari TMDb API.

- Pencarian Film: Cari film dengan mudah berdasarkan judul.

- Filter Genre: Saring film berdasarkan kategori genre yang berbeda.

- Detail Film: Lihat informasi lebih lanjut tentang film tertentu (Rating, Poster).

- Manajemen Favorit: Tambahkan dan hapus film ke daftar favorit Anda. Daftar favorit akan tetap tersimpan di browser Anda (menggunakan Local Storage).

- Pagination: Navigasi antar halaman daftar film dengan mudah.

- Desain Responsif: Tampilan yang adaptif untuk berbagai ukuran layar.

# 🚀 Teknologi yang Digunakan
- React.js: Library JavaScript untuk membangun antarmuka pengguna.

- Axios: Klien HTTP berbasis Promise untuk membuat permintaan API.

- React Router DOM: Untuk navigasi dalam aplikasi SPA (Single Page Application).

- Tailwind CSS: (Diasumsikan dari penulisan kelas CSS seperti bg-gray-800, text-white, dll.) Kerangka kerja CSS untuk styling yang cepat dan responsif.

- The Movie Database (TMDb) API: Sumber data untuk informasi film.

# ⚙️ Instalasi dan Pengaturan
Ikuti langkah-langkah di bawah ini untuk mendapatkan salinan lokal proyek dan menjalankannya di mesin Anda.

Prasyarat
- Node.js (versi terbaru direkomendasikan)

- npm (Node Package Manager) atau Yarn

Langkah-langkah Instalasi
# 1. Clone Repositori:
Buka **terminal atau Command Prompt Anda**, lalu clone repositori ini:
``
git clone https://github.com/Ricpa99/Movie-API.git
``

# 2.Navigasi ke Direktori Proyek:
Masuk ke folder API Movie yang berisi kode aplikasi React Anda:
``
cd Movie-API/API\ Movie
``

# 3. Instal Dependencies:
Instal semua paket Node.js yang diperlukan:
```
npm install
# atau
yarn install
```

# 4. Konfigurasi API Key (PENTING!):
Aplikasi ini membutuhkan API Key dari TMDb untuk mengambil data film.

- Buka situs web TMDb dan daftar untuk mendapatkan API Key gratis Anda.

- Di direktori utama API Movie (sejajar dengan package.json dan folder src), buat file baru bernama .env.

- Tambahkan baris berikut ke file .env Anda, ganti YOUR_TMDB_API_KEY_HERE dengan kunci API Anda yang sebenarnya:
```
REACT_APP_API_KEY=YOUR_TMDB_API_KEY_HERE
```
(_Catatan_: **REACT_APP_ adalah awalan yang diperlukan oleh Create React App untuk variabel lingkungan agar dapat diakses di sisi klien.**)

# 5. Jalankan Aplikasi:
Setelah semua dependensi terinstal dan API Key Anda diatur, Anda bisa menjalankan aplikasi:
```bash
npm start
# atau
yarn start
```

**Ini akan membuka aplikasi di browser Anda (biasanya di http://localhost:3000).**

#  🖥️ Penggunaan
- Telusuri Film: Setelah aplikasi berjalan, Anda akan melihat daftar film populer di halaman utama.

- Cari Film: Gunakan input pencarian di bagian atas untuk menemukan film berdasarkan judul.

- Filter Berdasarkan Genre: Gunakan dropdown genre untuk menyaring film berdasarkan kategori.

- Tambahkan ke Favorit: Klik ikon hati di pojok kanan atas setiap poster film untuk menambahkannya ke daftar favorit Anda. Klik lagi untuk menghapusnya. Daftar favorit akan tetap ada meskipun Anda menutup browser.

# 📂 Struktur Proyek
Berikut adalah gambaran umum singkat tentang struktur file utama proyek:
```bash
.
├── node_modules/            # Dependensi proyek (dihasilkan saat instalasi)
├── public/                  # File statis (contoh: index.html, favicon.ico)
├── src/
│   ├── component/           # Komponen React yang dapat digunakan kembali (misal: Footer.jsx, Navbar.jsx)
│   ├── css/                 # File-file styling CSS
│   │   └── index.css
│   ├── pages/               # Halaman utama aplikasi
│   │   ├── Favorites.jsx    # Halaman untuk menampilkan film favorit
│   │   ├── Home.jsx         # Komponen utama halaman beranda
│   │   └── MovieDetail.jsx  # Komponen halaman detail film
│   ├── App.jsx              # Komponen root aplikasi dan konfigurasi router utama (DIPINDAHKAN KE SINI)
│   └── main.jsx             # Titik masuk utama aplikasi React (merender App.jsx)
├── .env                     # File untuk variabel lingkungan (API Key TMDb)
├── .gitignore               # File dan folder yang diabaikan oleh Git
├── eslint.config.js         # Konfigurasi ESLint (alat linter kode)
├── index.html               # Halaman HTML utama aplikasi
├── package-lock.json        # Catatan versi dependensi yang tepat (untuk npm)
├── package.json             # Detail proyek, skrip, dan daftar dependensi
├── postcss.config.js        # Konfigurasi PostCSS (digunakan oleh Tailwind CSS)
├── README.md                # File dokumentasi ini
├── tailwind.config.js       # Konfigurasi Tailwind CSS
└── vite.config.js           # Konfigurasi Vite (bundler JavaScript)

```
# 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi MIT. Lihat file LICENSE untuk detail lebih lanjut.

# 🙏 Ucapan Terima Kasih
Kepada The Movie Database (TMDb) atas API film yang luar biasa yang memungkinkan aplikasi ini dibuat.

Kepada komunitas React dan pengembang open source lainnya.
