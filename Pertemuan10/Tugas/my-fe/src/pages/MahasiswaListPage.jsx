import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/atoms/button";
import TextInput from "../components/atoms/TextInput";
import PageTitle from "../components/molecules/PageTitle";
import MahasiswaTable from "../components/organisms/MahasiswaTable";
import { deleteMahasiswa, getMahasiswa } from "../services/api";

export default function MahasiswaListPage() {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filterProdi, setFilterProdi] = useState("");

    const prodiList = useMemo(() => {
        const list = mahasiswa.map((mhs) => mhs.prodi).filter(Boolean);
        return [...new Set(list)];
    }, [mahasiswa]);

    const filteredMahasiswa = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return mahasiswa.filter((mhs) => {
            const matchKeyword = !keyword || Object.values(mhs).some((value) =>
                String(value ?? "")
                    .toLowerCase()
                    .includes(keyword)
            );
            const matchProdi = !filterProdi || mhs.prodi === filterProdi;
            return matchKeyword && matchProdi;
        });
    }, [mahasiswa, search, filterProdi]);

    useEffect(() => {
        let isMounted = true;

        const loadInitialData = async () => {
            try {
                const data = await getMahasiswa();

                if (isMounted) {
                    setMahasiswa(data);
                    setError("");
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadInitialData();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            setError("");
            const data = await getMahasiswa();
            setMahasiswa(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setRefreshing(false);
        }
    };

    const handleReset = () => {
        setSearch("");
        setFilterProdi("");
    };

    const handleDelete = async (npm) => {
        const result = await Swal.fire({
            title: "Hapus data mahasiswa?",
            text: "Data yang dihapus tidak dapat dikembalikan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
        });

        if (!result.isConfirmed) return;

        try {
            setError("");
            await deleteMahasiswa(npm);
            setMahasiswa((prev) => prev.filter((item) => item.npm !== npm));
            await Swal.fire({
                title: "Berhasil",
                text: "Data mahasiswa berhasil dihapus.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (err) {
            setError(err.message);
            await Swal.fire({
                title: "Gagal",
                text: err.message || "Gagal menghapus data.",
                icon: "error",
                confirmButtonText: "Tutup",
            });
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className="space-y-4">
            <PageTitle
                title="Daftar Mahasiswa"
                description="Kelola data mahasiswa, tambahkan, edit, dan lihat detail."
                actions={
                    <div className="flex gap-2">
                        <Link to="/dashboard">
                            <Button type="button" variant="secondary">Kembali ke Dashboard</Button>
                        </Link>
                        <Link to="/mahasiswa/add">
                            <Button type="button">Tambah Mahasiswa</Button>
                        </Link>
                    </div>
                }
            />

            <p className="text-sm text-gray-600">
                Total Mahasiswa:{" "}
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-semibold">
                    {mahasiswa.length}
                </span>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <TextInput
                        type="text"
                        placeholder="Cari semua data mahasiswa..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="sm:max-w-sm"
                    />
                    <select
                        value={filterProdi}
                        onChange={(e) => setFilterProdi(e.target.value)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                    >
                        <option value="">Semua Prodi</option>
                        {prodiList.map((prodi) => (
                            <option key={prodi} value={prodi}>
                                {prodi}
                            </option>
                        ))}
                    </select>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        disabled={!search && !filterProdi}
                    >
                        Reset
                    </Button>
                </div>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleRefresh}
                    disabled={refreshing}
                >
                    {refreshing ? "Refreshing..." : "Refresh Data"}
                </Button>
            </div>

            {error && <p className="text-sm text-red-500">Error: {error}</p>}

            <MahasiswaTable data={filteredMahasiswa} onDelete={handleDelete} />
        </div>
    );
}