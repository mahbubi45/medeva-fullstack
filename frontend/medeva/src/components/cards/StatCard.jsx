import React from "react";
import { Users, ChevronDown } from "lucide-react";

export default function StatCard({ title, value, subtitle, description }) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col gap-4 transition-all hover:shadow-md h-full">
      {/* Bagian Atas: Icon, Judul, dan Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg shrink-0">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-bold text-gray-700 text-xs md:text-sm tracking-tight truncate">
            {title}
          </span>
        </div>

        {/* Dropdown Filter: Sembunyi di Mobile Sangat Kecil atau Sesuaikan Ukuran */}
        <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 md:px-3 py-1 text-[10px] md:text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-all whitespace-nowrap">
          {subtitle} <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>

      {/* Bagian Tengah & Bawah: Nilai & Deskripsi */}
      <div className="space-y-1 mt-auto">
        <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 tracking-tight">
          {value}
        </div>
        <p className="text-[10px] md:text-[11px] leading-snug text-gray-400 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
