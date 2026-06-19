package model

type Response struct {
	Message string      `json:"message" example:"detail pesan"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty" example:"detail error"`
}

// Struct khusus untuk contoh Swagger (Tugas 1 & 2)
type SwaggerResponse200 struct {
	Message string `json:"message" example:"berhasil memproses permintaan"`
}

type SwaggerResponse201 struct {
	Message string `json:"message" example:"data berhasil dibuat"`
}

type SwaggerResponse401 struct {
	Message string `json:"message" example:"token tidak valid atau sudah expired"`
}

type SwaggerResponse403 struct {
	Message string `json:"message" example:"user tidak memiliki akses untuk fitur ini"`
}
