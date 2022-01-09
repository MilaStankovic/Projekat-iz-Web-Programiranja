using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Radnik {
        [Key]
        [Column("ID")]
        public int ID { get; set; }  

        [Column("Ime")]
        [MaxLength(60)]
        [Required(ErrorMessage = "Ime je obavezno polje.")]
        public string Ime { get; set; }

        [Column("Prezime")]
        [MaxLength(60)]
        [Required(ErrorMessage = "Prezime je obavezno polje.")]
        public string Prezime { get; set; }  

        [Column("Mejl")]
        [MaxLength(60)]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        [Required(ErrorMessage = "Mejl je obavezno polje.")]
        public string Mejl { get; set; }  

        [Column("DatumRodjenja")]
        [Required(ErrorMessage = "Datum rodjenja je obavezno polje.")]
        public DateTime DatumRodjenja { get; set; }

        [Column("Plata")]
        [Required(ErrorMessage = "Plata je obavezno polje.")]
        [Range(30000, 100000)]
        public int Plata { get; set; }

        [Column("DatumZaposljenja")]
        [Required(ErrorMessage = "Datum zaposljenja je obavezno polje.")]
        public DateTime DatumZaposljenja { get; set; }

        [Column("BrojSlobodnihDana")]
        public int BrojSlobodnihDana { get; set; }

        [JsonIgnore]
        public Lokal Lokal { get; set; }

        public virtual List<Narudzbina> Narudzbine { get; set; }  
}