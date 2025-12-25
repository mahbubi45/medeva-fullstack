import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

const EmployeeForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    position: "",
    department: "Klinik",
    role: "user",
    avatarUrl: "https://ui-avatars.com/api/?name=User",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/karyawan",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(`SUKSES: ${response.data.message || "Data berhasil disimpan!"}`);
      console.log("Response Success:", response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menghubungi server";
      alert(`GAGAL: ${errorMsg}`);
      console.error("Error API:", error);
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
    <div className="w-full bg-white p-4 md:p-6 lg:p-8">
      <h2 className="text-sm font-bold text-gray-800 mb-8 uppercase tracking-tight border-b pb-4">
        Form Tambah Karyawan
      </h2>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6"
      >
        {/* KOLOM KIRI */}
        <div className="space-y-5">
          <InputField
            label="Nama Lengkap"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            placeholder="Nama Lengkap"
          />
          <InputField
            label="No. Kartu Identitas (NIK)"
            required
            placeholder="No. Kartu Identitas"
          />

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700">
              Jenis Kelamin
            </label>
            <div className="flex gap-10">
              <label className="flex items-center text-xs text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="jk"
                  className="mr-2 accent-blue-500"
                />{" "}
                Laki-laki
              </label>
              <label className="flex items-center text-xs text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="jk"
                  className="mr-2 accent-blue-500"
                />{" "}
                Perempuan
              </label>
            </div>
          </div>

          <InputField
            label="Tempat Lahir"
            required
            placeholder="Tempat Lahir"
          />

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Tanggal Lahir *
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-500 outline-none"
            />
          </div>

          <InputField
            label="No. Telepon"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="08123456789"
          />

          {/* Lokasi (Dropdowns) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Provinsi
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-500 bg-white outline-none">
                <option>Pilih Provinsi</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Kota
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2.5 text-xs text-gray-500 bg-white outline-none">
                <option>Pilih Kota</option>
              </select>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="space-y-5 lg:border-l lg:pl-12 border-gray-100">
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            placeholder="username"
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Email"
          />

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-blue-400 outline-none"
                placeholder="******"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 text-xs cursor-pointer select-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* TIPE / POSITION (Mapping ke 'position' di API) */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="text-xs font-semibold text-gray-700">
              Tipe / Jabatan *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2.5">
                {rolesColumn1.map((r) => (
                  <label
                    key={r}
                    className="flex items-center text-[11px] text-gray-600 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="position"
                      value={r}
                      onChange={handleInputChange}
                      className="mr-2 accent-blue-500"
                    />{" "}
                    {r}
                  </label>
                ))}
              </div>
              <div className="space-y-2.5">
                {rolesColumn2.map((r) => (
                  <label
                    key={r}
                    className="flex items-center text-[11px] text-gray-600 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="position"
                      value={r}
                      onChange={handleInputChange}
                      className="mr-2 accent-blue-500"
                    />{" "}
                    {r}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <InputField label="Status Menikah" placeholder="Pilih Status..." />
        </div>

        {/* TOMBOL AKSI */}
        <div className="col-span-full mt-12 pt-8 border-t border-gray-100 flex flex-row justify-between items-center pb-12">
          <button
            type="button"
            className="px-8 py-2.5 border border-red-500 text-red-500 text-xs font-bold rounded-lg"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-12 py-2.5 text-white text-xs font-bold rounded-lg shadow-lg transition-all ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
