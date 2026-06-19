import Swal from "sweetalert2";
import { getToken, getUser } from "../services/auth";
import Button from "../components/atoms/Button";

export default function ProfilPage() {
  const user = getUser();

  const handleLihatToken = () => {
    const token = getToken();
    Swal.fire({
      icon: "info",
      title: "Token JWT",
      text: token || "Token tidak ditemukan",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#3b82f6",
      width: 600,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Profil</h2>
        <p className="text-sm text-slate-500">
          Informasi akun yang sedang login.
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleLihatToken}>
          Lihat Token
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Username
          </label>
          <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {user?.username ?? "-"}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Role
          </label>
          <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {user?.role ?? "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
