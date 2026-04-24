import { useEffect, useState } from "react";
import { getMahasiswa } from "../services/api";

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = () => {
    setLoading(true);
    setError("");
    getMahasiswa()
      .then(setMahasiswa)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredMahasiswa = mahasiswa.filter((mhs) => {
    const keyword = search.toLowerCase();
    return (
      mhs.nama?.toLowerCase().includes(keyword) ||
      mhs.prodi?.toLowerCase().includes(keyword) ||
      mhs.email?.toLowerCase().includes(keyword) ||
      mhs.alamat?.toLowerCase().includes(keyword) ||
      mhs.npm?.toString().toLowerCase().includes(keyword)
    );
  });

  if (loading) return <p className="text-center">Loading...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-8xl mx-auto p-6">
     <div className="mb-4">
        <h2 className="text-xl font-bold">Daftar Mahasiswa</h2>
             <p className="text-sm text-gray-600">
    Total Mahasiswa: 
    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded-md font-semibold">
      {filteredMahasiswa.length}
    </span>
            </p>
    </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari mahasiswa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Refresh
        </button>
      </div>
      
      <div className="overflow-hidden border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-300 border-b text-gray-700 uppercase text-xs">
            <tr>
                <th className="px-4 py-3 border">No</th>
                <th className="px-4 py-3 border">NPM</th>
              <th className="px-4 py-3 border">Nama / Prodi</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Alamat</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredMahasiswa.map((mhs, index) => (
                <tr key={mhs.npm} className="hover:bg-blue-50">
                   <td className="px-4 py-3 border">{index + 1}</td>
                   <td className="px-4 py-3 border">{mhs.npm}</td>
                   <td className="px-4 py-3 border">
                     <div className="font-medium">{mhs.nama}</div>
                     <div className="text-gray-500 text-xs">{mhs.prodi}</div>
                   </td>
      <td className="px-4 py-3 text-gray-600 border">{mhs.email}</td>
      <td className="px-4 py-3 text-gray-500 border">{mhs.alamat}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}