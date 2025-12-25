import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Formik
        initialValues={{ username: "", email: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(
              "http://127.0.0.1:4000/api/v1/login",
              {
                username: values.username,
                email: values.email,
              }
            );

            if (response.data.success) {
              // 1. Ambil token
              const token = response.data.token;

              // 2. Simpan ke LocalStorage
              localStorage.setItem("authToken", token);

              // 3. Tampilkan Alert Sukses
              alert("🚀 Login Berhasil! Selamat Datang.");

              // 4. Redirect ke dashboard
              navigate("/dashboard");
            }
          } catch (error) {
            // Tambahkan ini untuk melihat respon asli dari server di Console Browser (F12)
            console.log("Detail Error Backend:", error.response?.data);

            const errorMsg =
              error.response?.data?.message || "Username atau Email salah!";
            alert("❌ Login Gagal: " + errorMsg);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-xl shadow-sm max-w-md w-full space-y-4">
            <h2 className="text-xl font-semibold text-center uppercase tracking-wider">
              Login System
            </h2>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase">
                Username
              </label>
              <Field
                name="username"
                placeholder="Masukkan username"
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="contoh@gmail.com"
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-bold text-sm text-white transition-all shadow-lg shadow-blue-100 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
            >
              {isSubmitting ? "MENYAMBUNGKAN..." : "MASUK KE DASHBOARD"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
