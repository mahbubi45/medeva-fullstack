import React from "react";
import { ChevronRight, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Impor useNavigate

const EmployeeItem = ({ id, index, name, position }) => {
  const navigate = useNavigate();

  // Fungsi untuk pindah ke halaman edit
  const handleEditClick = () => {
    // Arahkan ke route edit, sesuaikan path-nya dengan App.js Anda
    navigate(`/karyawan/edit/${id}`);
  };

  return (
    <div
      onClick={handleEditClick} // Klik di mana saja pada item untuk edit
      className="p-4 bg-white border lg:border-0 lg:border-b hover:bg-blue-50 cursor-pointer flex items-center justify-between group transition-all duration-200 rounded-xl lg:rounded-none shadow-sm lg:shadow-none"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <span className="hidden sm:inline-block text-[10px] font-bold text-gray-400 w-5">
          {index + 1}
        </span>

        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <h3 className="text-[11px] font-extrabold text-gray-800 tracking-tight capitalize truncate group-hover:text-blue-700">
            {name}
          </h3>
          <p className="text-[10px] text-gray-400 font-medium truncate">
            {position}
          </p>

          <div className="flex mt-1">
            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-green-100 text-green-600 shadow-sm uppercase tracking-tighter">
              AKTIF
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </button>

        <button
          className="hidden lg:flex w-8 h-8 rounded-full bg-blue-50 items-center justify-center group-hover:bg-blue-600 transition-all shadow-sm"
          onClick={(e) => {
            e.stopPropagation(); // Mencegah double click jika parent sudah punya onClick
            handleEditClick();
          }}
        >
          <ChevronRight className="w-4 h-4 text-blue-600 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default EmployeeItem;
