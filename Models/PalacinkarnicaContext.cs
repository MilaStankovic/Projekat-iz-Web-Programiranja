using Microsoft.EntityFrameworkCore;

public class PalacinkarnicaContext : DbContext {
    public DbSet<Lokal> Lokali { get; set; }
    public DbSet<Radnik> Radnici { get; set; }
    public DbSet<Narudzbina> Narudzbine { get; set; } 
    public PalacinkarnicaContext(DbContextOptions options) : base(options)
    {
        
    }  
}