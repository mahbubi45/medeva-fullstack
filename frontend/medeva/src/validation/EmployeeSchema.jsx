// src/validation/employeeSchema.js
import * as Yup from "yup";

export const employeeSchema = Yup.object({
  username: Yup.string()
    .min(4, "Minimal 4 karakter")
    .required("Username wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
});
