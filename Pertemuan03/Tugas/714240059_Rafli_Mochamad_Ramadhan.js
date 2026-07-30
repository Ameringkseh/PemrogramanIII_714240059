const fs = require("fs");

// ===== 1. LOAD DATA: Membaca file JSON eksternal menggunakan modul fs =====
const jsonFromFile = fs.readFileSync("714240059_Rafli_Mochamad_Ramadhan.json", "utf-8");
console.log("=== DATA MENTAH DARI FILE (String) ===");
console.log("Tipe data:", typeof jsonFromFile);
console.log(jsonFromFile);
console.log("");

// ===== 2. DESERIALIZATION: Menggunakan JSON.parse() untuk mengubah teks menjadi Objek =====
const motorsportData = JSON.parse(jsonFromFile);
console.log("=== DATA SETELAH DI-PARSE (Object) ===");
console.log("Tipe data:", typeof motorsportData);
console.log("Jumlah data motor sport:", motorsportData.length);
console.log("");

// Menampilkan data awal sebelum manipulasi
console.log("=== DATA AWAL SEBELUM MANIPULASI ===");
motorsportData.forEach((motor, index) => {
  console.log(`Motor ke-${index + 1}: ${motor.merek} ${motor.model}`);
  console.log(`  Harga       : Rp ${motor.harga.toLocaleString("id-ID")}`);
  console.log(`  CC          : ${motor.cc}`);
  console.log(`  Tahun       : ${motor.tahunProduksi}`);
  console.log(`  Tersedia    : ${motor.tersedia}`);
  console.log(`  Dealer      : ${motor.dealer}`);
  console.log(`  Warna       : ${motor.warnaVariant.join(", ")}`);
  console.log("");
});

// ===== 3. MANIPULATION: Melakukan perubahan data pada objek yang telah di-parse =====
console.log("=== PROSES MANIPULASI DATA ===");
console.log("");

motorsportData.forEach((motor, index) => {
  console.log(`--- Manipulasi Motor ke-${index + 1}: ${motor.merek} ${motor.model} ---`);

  // Manipulasi 1: Mengubah nilai harga (menambahkan pajak PPN 11%)
  const hargaLama = motor.harga;
  motor.harga = Math.round(motor.harga * 1.11);
  console.log(`  [1] Harga + PPN 11%     : Rp ${hargaLama.toLocaleString("id-ID")} -> Rp ${motor.harga.toLocaleString("id-ID")}`);

  // Manipulasi 2: Mengubah status ketersediaan (toggle boolean)
  const statusLama = motor.tersedia;
  motor.tersedia = !motor.tersedia;
  console.log(`  [2] Status tersedia     : ${statusLama} -> ${motor.tersedia}`);

  // Manipulasi 3: Menambahkan properti baru 'kategoriCC' berdasarkan kapasitas mesin
  if (motor.cc <= 155) {
    motor.kategoriCC = "Sport Entry-Level";
  } else if (motor.cc <= 250) {
    motor.kategoriCC = "Sport 250cc";
  } else if (motor.cc <= 600) {
    motor.kategoriCC = "Sport Middle-Weight";
  } else {
    motor.kategoriCC = "Superbike";
  }
  console.log(`  [3] Kategori CC (baru)  : ${motor.kategoriCC}`);

  // Manipulasi 4: Menambahkan properti baru 'diskonPersen' berdasarkan tahun produksi
  if (motor.tahunProduksi < 2025) {
    motor.diskonPersen = 15;
  } else {
    motor.diskonPersen = 5;
  }
  console.log(`  [4] Diskon % (baru)     : ${motor.diskonPersen}%`);

  // Manipulasi 5: Menambahkan properti baru 'hargaSetelahDiskon'
  motor.hargaSetelahDiskon = Math.round(motor.harga * (1 - motor.diskonPersen / 100));
  console.log(`  [5] Harga stlh diskon   : Rp ${motor.hargaSetelahDiskon.toLocaleString("id-ID")}`);

  // Manipulasi 6: Menambahkan warna baru ke array warnaVariant
  const warnaBaru = "Special Edition Gold";
  motor.warnaVariant.push(warnaBaru);
  console.log(`  [6] Warna baru ditambah : ${warnaBaru} (total: ${motor.warnaVariant.length} warna)`);

  console.log("");
});

// ===== Menampilkan data setelah manipulasi =====
console.log("=== DATA SETELAH MANIPULASI ===");
motorsportData.forEach((motor, index) => {
  console.log(`Motor ke-${index + 1}: ${motor.merek} ${motor.model}`);
  console.log(`  Harga (+ PPN)       : Rp ${motor.harga.toLocaleString("id-ID")}`);
  console.log(`  CC                  : ${motor.cc}`);
  console.log(`  Tahun               : ${motor.tahunProduksi}`);
  console.log(`  Tersedia            : ${motor.tersedia}`);
  console.log(`  Dealer              : ${motor.dealer}`);
  console.log(`  Warna               : ${motor.warnaVariant.join(", ")}`);
  console.log(`  Kategori CC         : ${motor.kategoriCC}`);
  console.log(`  Diskon              : ${motor.diskonPersen}%`);
  console.log(`  Harga Setelah Diskon: Rp ${motor.hargaSetelahDiskon.toLocaleString("id-ID")}`);
  console.log("");
});

// ===== 4. SERIALIZATION: Menggunakan JSON.stringify untuk mengemas kembali data =====
const dataUpdate = JSON.stringify(motorsportData, null, 2);
console.log("=== DATA SETELAH DI-STRINGIFY KEMBALI (JSON String) ===");
console.log("Tipe data:", typeof dataUpdate);
console.log(dataUpdate);
