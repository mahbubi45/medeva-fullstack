# Sistem Manajemen Karyawan - Klinik Rohima

### Cara Menjalankan

1. **Clone Repository**
2. **Backend**:
   - `cd backend` -> `npm install` -> `npm run dev`
3. **Frontend**:
   - `cd frontend` -> `npm install` -> `npm run dev`

### Environment Variables (.env)

- **Backend**: `PORT`, `MONGO_URI`, `JWT_SECRET`
- **Frontend**: `VITE_API_URL`

### Endpoints Utama

- `GET /api/v1/login`: login
- `GET /api/v1/karyawan`: Mengambil semua data
- `PUT /api/v1/karyawan/:id`: Update data karyawan
