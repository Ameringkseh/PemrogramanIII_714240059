export default function DataDiriPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Data Diri</h2>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-3xl font-bold text-white shadow-lg">
            👤
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-800">Nama Lengkap Mahasiswa</h3>
            <p className="text-sm text-slate-500">D4 Teknik Informatika</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">NPM</p>
          <p className="mt-1 text-sm font-medium text-slate-800">714240059</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Kelas</p>
          <p className="mt-1 text-sm font-medium text-slate-800">D4 TI 2C</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
          <p className="mt-1 text-sm font-medium text-slate-800">mahasiswa@example.com</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Alamat</p>
          <p className="mt-1 text-sm font-medium text-slate-800">Bandung, Jawa Barat</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">
          Tentang Saya
        </h3>
        <p className="text-sm leading-relaxed text-slate-600">
          Mahasiswa aktif Program Studi D4 Teknik Informatika. 
          Saat ini sedang mengikuti mata kuliah Pemrograman III - Web Service 
          dan mempelajari pengembangan aplikasi web menggunakan React dan Go.
        </p>
      </div>
    </div>
  );
}
