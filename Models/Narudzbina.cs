using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public enum VrstaPalacinke
{
    Slatka,
    Slana
}

public class Narudzbina {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("VrstaPalacinke")] 
        public VrstaPalacinke VrstaPalacinke { get; set; }

        [Column("BrojStola")]
        public int BrojStola { get; set; }

        [Column("Napomena")]
        [MaxLength(255)]
        public string Napomena { get; set; } 

        [JsonIgnore]
        public Radnik Spremalac { get; set; }
}