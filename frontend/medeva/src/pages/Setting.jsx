import React from "react";
import { Settings } from "lucide-react";

const Setting = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center max-w-sm text-center">
        {/* Ikon Dashboard */}
        <div className="bg-blue-50 p-5 rounded-2xl mb-6">
          <Settings className="w-12 h-12 text-blue-500" />
        </div>

        {/* Teks Status */}
        <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-2">
          Dashboard Belum Tersedia
        </h2>

        <p className="text-[11px] text-gray-400 leading-relaxed">
          Mohon maaf, halaman dashboard Setting sedang dalam tahap pengembangan
          dan belum dapat diakses saat ini.
        </p>

        {/* Tombol Kembali (Opsional) */}
        <button
          onClick={() => navigate("/dashboard")} // Mengarahkan ke /dashboard
          className="mt-8 w-full py-3 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all uppercase tracking-tighter"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default Setting;
