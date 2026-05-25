package repository_test

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/repository"
	"fmt"
	"testing"
	"time"
)

func setupTest(t *testing.T) {
	config.InitDB()

	err := config.GetDB().AutoMigrate(&model.Mahasiswa{})
	if err != nil {
		t.Fatalf("Migration Failed: %v", err)
	}
}

func TestInsertMahasiswa(t *testing.T) {
	setupTest(t)

	npm := time.Now().UnixNano()

	mhs := model.Mahasiswa{
		NPM:    npm,
		Nama:   "Romdon",
		Prodi:  "D4 Teknik Informatika",
		Alamat: "Cimahi",
		Email:  "tesuser@gmail.com",
		NoHP:   "081234567890",
		Hobi:   []string{"Coding", "Futsal"},
	}

	_, err := repository.InsertMahasiswa(&mhs)
	if err != nil {
		t.Errorf("Insert Failed: %v", err)
	}
	fmt.Printf("Berhasil, NPM yang ditambahkan: %d\n", npm)
}

func TestGetAllMahasiswa(t *testing.T) {
	setupTest(t)

	data, err := repository.GetAllMahasiswa()
	if err != nil {
		t.Errorf("Get All Failed: %v", err)
	}

	if len(data) == 0 {
		t.Errorf("Data kosong/ tidak ada")
	}
	fmt.Printf("Data di tabel: %v\n", data)
}

func TestGetMahasiswaByNPM(t *testing.T) {
	setupTest(t)

	npm := int64(1775481576589394100) // Gunakan NPM yang ada di DB untuk test (disesuaikan)

	mhs, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		t.Errorf("GetByNPM failed: %v", err)
	}

	if mhs.NPM != npm {
		t.Errorf("Expected %d, got %d", npm, mhs.NPM)
	}
	fmt.Printf("DATA DITEMUKAN: %+v\n", mhs)
}

func TestDeleteMahasiswa(t *testing.T) {
	setupTest(t)

	npm := int64(1775481576589394100) // Gunakan NPM yang ada di DB untuk test (disesuaikan)

	err := repository.DeleteMahasiswa(npm)
	if err != nil {
		t.Errorf("Delete failed: %v", err)
	}
}
