import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "./InputField";

const EmployeeEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    position: "",
    department: "IT",
    role: "user",
    avatarUrl: "https://example.com/avatar.jpg",
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/v1/karyawan/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data.data;
        setFormData({
          fullName: data.fullName || "",
          username: data.username || "",
          email: data.email || "",
          password: "",
          phone: data.phone || "",
          position: data.position || "",
          department: data.department || "IT",
          role: data.role || "user",
          avatarUrl: data.avatarUrl || "https://example.com/avatar.jpg",
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    if (id) fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `http://127.0.0.1:4000/api/v1/karyawan/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(`UPDATE SUKSES: ${response.data.message}`);
      navigate("/karyawan");
    } catch (error) {
      alert(`UPDATE GAGAL: ${error.response?.data?.message || "Error"}`);
    } finally {
      setLoading(false);
    }
  };

  const rolesColumn1 = [
    "Resepsionis",
    "Manager",
    "Purchasing",
    "Keuangan",
    "Kasir",
    "Farmasi",
    "Laboran",
  ];
  const rolesColumn2 = ["Perawat", "Bidan", "Dokter", "Lainnya"];

  return (
    // 1. Container utama menggunakan h-screen dan overflow-y-auto agar bisa discroll saat data banyak
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-y-auto">
      <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-sm md:text-base font-bold text-gray-800 uppercase tracking-wider">
              Form Edit Karyawan{" "}
              <span className="text-blue-500 font-normal ml-2">ID: {id}</span>
            </h2>
          </div>

          <form onSubmit={handleUpdate} className="p-6 md:p-10">
            {/* 2. Grid sistem: 1 kolom di mobile, 2 kolom di desktop (lg) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-16">
              {/* KOLOM KIRI: Identitas Pribadi */}
              <div className="space-y-6">
                <h3 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4">
                  01. Identitas Pribadi
                </h3>
                <InputField
                  label="Nama Lengkap"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="No. Telepon"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* KOLOM KANAN: Akun & Jabatan */}
              <div className="space-y-6 lg:border-l lg:pl-16 border-gray-100">
                <h3 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4">
                  02. Akun & Jabatan
                </h3>
                <InputField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Password (Kosongkan jika tidak ganti)
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                      placeholder="******"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3 text-gray-400 hover:text-blue-500"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                  <label className="text-xs font-bold text-blue-800">
                    Jabatan saat ini: {formData.position}
                  </label>
                  {/* 3. Grid checkbox: 1 kolom di HP kecil, 2 kolom di tablet/desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      {rolesColumn1.map((r) => (
                        <label
                          key={r}
                          className="flex items-center text-[11px] text-gray-600 cursor-pointer hover:text-blue-600 group"
                        >
                          <input
                            type="radio"
                            name="position"
                            value={r}
                            checked={formData.position === r}
                            onChange={handleChange}
                            className="mr-3 w-4 h-4 accent-blue-600"
                          />
                          {r}
                        </label>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {rolesColumn2.map((r) => (
                        <label
                          key={r}
                          className="flex items-center text-[11px] text-gray-600 cursor-pointer hover:text-blue-600 group"
                        >
                          <input
                            type="radio"
                            name="position"
                            value={r}
                            checked={formData.position === r}
                            onChange={handleChange}
                            className="mr-3 w-4 h-4 accent-blue-600"
                          />
                          {r}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Footer Buttons: Responsive flex-col di mobile, row di desktop */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-10 py-3 border-2 border-red-100 text-red-500 text-xs font-bold rounded-xl hover:bg-red-50 transition-colors"
              >
                BATAL
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-16 py-3 text-white text-xs font-bold rounded-xl shadow-lg transition-all ${
                  loading
                    ? "bg-gray-300"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                }`}
              >
                {loading ? "MEMPROSES..." : "UPDATE DATA"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEditForm;
