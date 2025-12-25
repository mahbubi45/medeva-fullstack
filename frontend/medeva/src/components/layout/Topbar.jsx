import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bell } from "lucide-react";

export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://127.0.0.1:4000/api/v1/karyawan/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setUser(response.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil profil:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      {/* Sisi Kiri: Nama Klinik */}
      <div className="flex items-center">
        <h1 className="text-sm font-bold text-gray-700 uppercase tracking-tight">
          Klinik Rohima
        </h1>
      </div>

      {/* Tengah: Logo Medeva Mint */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="text-blue-400">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
          <p className="text-sm font-semibold text-gray-500">
            Medeva <span className="text-blue-400 font-bold">Mint</span>
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Notifikasi & Profile Dinamis */}
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-all">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
            113
          </span>
        </div>

        {/* Info User Dinamis */}
        <div className="flex items-center gap-3 border-l pl-6">
          <div className="text-right">
            {/* Menampilkan fullName dari API */}
            <p className="text-[11px] font-bold text-gray-700 leading-none capitalize">
              {user ? user.fullName : "Memuat..."}
            </p>
            {/* Menampilkan position & department dari API */}
            <p className="text-[9px] text-gray-400 font-medium mt-1">
              ({user ? `${user.position}, ${user.department}` : "..."})
            </p>
          </div>

          {/* Avatar Dinamis
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden border-2 border-gray-100 shadow-sm">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold uppercase">
                {user ? user.fullName.substring(0, 2) : "..."}
              </span>
            )}
          </div> */}

          {/* Avatar Dinamis */}
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden border-2 border-gray-100 shadow-sm">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold uppercase">
                {user
                  ? (() => {
                      const names = user.fullName.split(" ");
                      const firstInit = names[0].charAt(0);
                      const lastInit =
                        names.length > 1
                          ? names[names.length - 1].charAt(0)
                          : "";
                      return `${firstInit}${lastInit}`;
                    })()
                  : "..."}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
