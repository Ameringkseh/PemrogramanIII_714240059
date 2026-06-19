import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import { changePassword } from "../services/api";

export default function PasswordPage() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Semua field harus diisi.",
        confirmButtonColor: "#3b82f6",
      });
    }

    if (form.newPassword !== form.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password baru dan konfirmasi tidak cocok.",
        confirmButtonColor: "#3b82f6",
      });
    }

    try {
      setLoading(true);
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Password berhasil diubah.",
        confirmButtonColor: "#3b82f6",
      });

      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || "Gagal mengubah password.",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Ubah Password</h2>
        <p className="text-sm text-slate-500">
          Gunakan password lama untuk membuat password baru.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label
            htmlFor="oldPassword"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Password Lama
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Password Baru
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Konfirmasi Password Baru
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Ubah Password"}
        </Button>
      </form>
    </div>
  );
}
