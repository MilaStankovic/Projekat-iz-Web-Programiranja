using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Palacinkarnica.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lokali",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    BrojZaposlenih = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lokali", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Radnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Mejl = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Plata = table.Column<int>(type: "int", nullable: false),
                    DatumZaposljenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BrojSlobodnihDana = table.Column<int>(type: "int", nullable: false),
                    LokalID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Radnici", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Radnici_Lokali_LokalID",
                        column: x => x.LokalID,
                        principalTable: "Lokali",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Narudzbine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VrstaPalacinke = table.Column<int>(type: "int", nullable: false),
                    BrojStola = table.Column<int>(type: "int", nullable: false),
                    Napomena = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    SpremalacID = table.Column<int>(type: "int", nullable: true),
                    LokalZaNarudzbinuID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Narudzbine", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Narudzbine_Lokali_LokalZaNarudzbinuID",
                        column: x => x.LokalZaNarudzbinuID,
                        principalTable: "Lokali",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Narudzbine_Radnici_SpremalacID",
                        column: x => x.SpremalacID,
                        principalTable: "Radnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_LokalZaNarudzbinuID",
                table: "Narudzbine",
                column: "LokalZaNarudzbinuID");

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_SpremalacID",
                table: "Narudzbine",
                column: "SpremalacID");

            migrationBuilder.CreateIndex(
                name: "IX_Radnici_LokalID",
                table: "Radnici",
                column: "LokalID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Narudzbine");

            migrationBuilder.DropTable(
                name: "Radnici");

            migrationBuilder.DropTable(
                name: "Lokali");
        }
    }
}
