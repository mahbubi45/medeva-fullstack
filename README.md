# Medeva Fullstack - Sistem Manajemen Karyawan

Aplikasi manajemen data karyawan dan tenaga kesehatan untuk Klinik.

## 🚀 Cara Menjalankan

### 1. Backend (Express)

- Masuk ke folder backend: `cd backend`
- Install dependensi: `npm install`
- Salin `.env.example` menjadi `.env` dan isi variabelnya.
- Jalankan server: `npm run dev`

### 2. Frontend (React)

- Masuk ke folder frontend: `cd frontend`
- Install dependensi: `npm install`
- Jalankan aplikasi: `npm run dev`

## 🛠️ Environment Variables (.env)

- **Backend**: `PORT`, `MONGO_URI`, `JWT_SECRET`
- **Frontend**: `VITE_API_URL` (Arahkan ke http://localhost:4000/api/v1)

## 📑 Endpoints Utama

- `GET /karyawan` - Mengambil semua data
- `GET /karyawan/:id` - Detail karyawan
- `PUT /karyawan/:id` - Update data karyawan
- `POST /karyawan` - Tambah karyawan baru
- `GET /profile` - Tambah karyawan baru
