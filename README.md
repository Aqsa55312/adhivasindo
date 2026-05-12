# Adhivasindo Task Management Board

Sebuah aplikasi manajemen tugas berbasis Kanban Board (seperti Trello atau ClickUp) yang dibangun menggunakan React, TypeScript, dan Tailwind CSS. Aplikasi ini dibuat berdasarkan spesifikasi desain frontend dari Adhivasindo.

## Fitur Utama

1. **Kanban Board Interaktif**
   - Tampilan board horizontal yang dapat digeser (scrollable).
   - Kolom yang tersedia secara default: *To Do, Doing, Review, Done, Rework*.
   - Fitur **Drag and Drop**: Pindahkan tugas antar kolom atau urutkan tugas dalam kolom yang sama dengan mulus.

2. **Manajemen Tugas (CRUD)**
   - **Buat Tugas Baru**: Tambahkan tugas ke dalam kolom yang dipilih.
   - **Detail & Edit**: Klik kartu tugas untuk membuka modal detail berukuran penuh. Di sini Anda bisa mengedit judul, deskripsi, batas waktu (due date), label, prioritas, dan penerima tugas (assignees).
   - **Hapus Tugas**: Hapus tugas yang sudah tidak diperlukan.

3. **Subtugas (Checklist)**
   - Tambahkan checklist pada setiap tugas untuk melacak progres secara mendetail.
   - Dilengkapi dengan *progress bar* visual yang otomatis terupdate ketika subtugas dicentang.

4. **Pencarian & Penyaringan (Filter) Real-time**
   - Cari tugas berdasarkan judul menggunakan kotak pencarian.
   - Filter tugas berdasarkan **Penerima (Assignee)**, **Label** (Feature, Bug, Issue, Undefined), dan **Tenggat Waktu (Due Date)** (Hari ini, Minggu ini, Terlambat).

5. **Penyimpanan Lokal (LocalStorage)**
   - Tidak memerlukan database backend! Semua data tugas dan state kolom disimpan secara otomatis ke dalam `localStorage` browser.
   - Data Anda tidak akan hilang meskipun browser di-refresh.

6. **Desain UI/UX Modern**
   - Dibangun dengan Tailwind CSS v4, mengusung desain yang bersih, minimalis, dan responsif.
   - Dilengkapi dengan animasi transisi yang halus (saat kartu muncul, saat modal dibuka, dll).
   - Notifikasi interaktif (Toast) muncul di kanan atas setiap kali Anda melakukan aksi seperti membuat, mengedit, atau menghapus tugas.

## Teknologi yang Digunakan

- **Framework**: React (menggunakan Vite)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS v4
- **Drag & Drop**: `@hello-pangea/dnd`
- **Ikon**: `lucide-react`
- **Format Tanggal**: `date-fns`
- **Notifikasi**: `react-hot-toast`
- **ID Generator**: `nanoid`

## Cara Menjalankan Secara Lokal

1. Pastikan Anda sudah menginstal Node.js di komputer Anda.
2. Buka terminal dan masuk ke direktori proyek ini.
3. Jalankan perintah instalasi dependensi (jika belum):
   ```bash
   npm install
   ```
4. Jalankan *development server*:
   ```bash
   npm run dev
   ```
5. Buka tautan yang muncul di terminal (biasanya `http://localhost:5173`) di browser Anda.

## Struktur Direktori

- `src/components/` - Berisi semua komponen React (TopBar, Board, Column, TaskCard, TaskModal, dll).
- `src/hooks/` - Berisi *custom hooks* seperti `useBoard` (untuk logika CRUD & sinkronisasi local storage) dan `useFilter`.
- `src/utils/` - Fungsi-fungsi utilitas untuk tanggal, pembuatan ID, dan *local storage*.
- `src/assets/` - Berisi data awal (seed data) yang dimuat ketika aplikasi pertama kali dibuka.
- `src/types/` - Definisi antarmuka (interface) TypeScript untuk menjaga keamanan tipe data.

---
*Dibuat untuk memenuhi spesifikasi Adhivasindo Frontend Task.*
