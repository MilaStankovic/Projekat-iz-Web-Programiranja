using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Lokal {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(60)]
        [Required(ErrorMessage = "Naziv je obavezno polje.")]
        public string Naziv { get; set; }

        [Column("Grad")]
        [MaxLength(60)]
        [Required(ErrorMessage = "Grad je obavezno polje.")]
        public string Grad { get; set; }

        [Column("Adresa")]
        [MaxLength(255)]
        [Required(ErrorMessage = "Adresa je obavezno polje.")]
        public string Adresa { get; set; }

        [Column("BrojZaposlenih")]
        public int BrojZaposlenih { get; set; }

        public virtual List<Radnik> Radnici { get; set; }      
}