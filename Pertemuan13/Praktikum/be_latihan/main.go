package main

import (
	"be_latihan/config"
	_ "be_latihan/docs"
	"be_latihan/model"
	"be_latihan/router"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"

)

// @title API Praktikum 13 - be_latihan
// @version 1.0
// @description Dokumentasi API backend be_latihan menggunakan Golang Fiber, GORM, PostgreSQL, dan JWT.
// @contact.name Praktikum Pemrograman III
// @contact.email praktikum@example.com
// @host 127.0.0.1:3000
// @BasePath /
// @schemes http https
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(logger.New())

	//inisialisasi database
	config.InitDB()

	config.GetDB().AutoMigrate(&model.Mahasiswa{}, &model.User{})
	app.Use(cors.New(cors.Config{
		AllowOrigins: strings.Join(config.GetAllowedOrigins(), ","),
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin,Content-Type,Accept,Authorization",
	}))
	router.SetupRoutes(app)

	app.Listen(":3000")
}
