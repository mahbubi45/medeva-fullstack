import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeItem from "../components/cards/EmployeeItem";
import EmployeeForm from "../forms/EmployeeForm";

const KaryawanDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "http://127.0.0.1:4000/api/v1/karyawan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data?.success) setEmployees(response.data.data);
    } catch (err) {
      console.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    /* UBAH: flex-col untuk mobile (tumpuk atas-bawah), 
       lg:flex-row untuk desktop (samping-sampingan)
    */
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#f1f5f9] text-gray-700 overflow-hidden font-sans">
      {/* --- SIDEBAR LIST KARYAWAN --- */}
      <section className="w-full lg:w-80 h-[40vh] lg:h-full bg-white border-r border-b lg:border-b-0 flex flex-col shadow-sm flex-shrink-0">
        <div className="p-4 space-y-4 bg-white sticky top-0 z-10">
          <h2 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
            Data Karyawan
          </h2>

          <div className="flex bg-gray-100 rounded-lg p-1 text-[10px] font-bold border border-gray-200">
            <button className="flex-1 py-2 text-gray-500">SEMUA</button>
            <button className="flex-1 py-2 bg-white shadow-sm rounded-md text-blue-600 border border-gray-100">
              AKTIF
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 text-[11px] border border-gray-200 rounded-lg outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Header kolom list */}
        <div className="px-4 py-2 bg-[#f8fafc] border-y border-gray-200 flex text-[9px] font-bold text-gray-400 uppercase">
          <span className="w-8">#</span>
          <span>Karyawan / Tenaga Kesehatan</span>
        </div>

        {/* Container Scroll List */}
        <div className="flex-1 overflow-y-auto bg-white">
          {loading ? (
            <div className="p-10 text-center text-xs animate-pulse">
              Memuat...
            </div>
          ) : filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, idx) => (
              <EmployeeItem
                key={emp._id}
                id={emp._id}
                index={idx}
                name={emp.fullName}
                position={emp.position}
              />
            ))
          ) : (
            <div className="p-10 text-center text-xs text-gray-400">
              Tidak ada data.
            </div>
          )}
        </div>
      </section>

      {/* --- KONTEN UTAMA (FORM) --- */}
      <section className="flex-1 bg-white overflow-y-auto h-full pb-20 lg:pb-0">
        <EmployeeForm onRefresh={fetchEmployees} />
      </section>
    </div>
  );
};

export default KaryawanDashboard;
