// src/utils/swal.ts
import Swal from "sweetalert2";

export const showAlert = (
  title: string,
  text: string,
  icon: "success" | "error" | "warning" | "info" | "question"
) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "Aceptar",
  });
};
