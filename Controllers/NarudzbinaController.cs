using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]")]
public class NarudzbinaController : ControllerBase
{
    public PalacinkarnicaContext Context {get; set;}

    public NarudzbinaController(PalacinkarnicaContext context)
    {
        Context = context;
    }

    [HttpGet]
    [Route("VratiSveNarudzbine")]
    public async Task<ActionResult> VratiSveNarudzbine()
    {
        try
        {
            return Ok(await Context.Narudzbine.Select(p => new { p.LokalZaNarudzbinu, p.VrstaPalacinke, p.BrojStola, p.Napomena, p.Spremalac, p.ID }).ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("VratiSveNarudzbine/{lokalID}")]
    public async Task<JsonResult> VratiSveNarudzbine(int lokalID)
    {
        var vratiNarudzbine = await Context.Lokali
                                         .Where(pom => pom.ID == lokalID)
                                         .Include(pom2 => pom2.Radnici)
                                         .ThenInclude(pom3 => pom3.Narudzbine)
                                         .ToListAsync();

        return new JsonResult(vratiNarudzbine);
    }

    [HttpGet]
    [Route("VratiNarudzbinu/{narudzbinaID}")]
    public async Task<JsonResult> VratiNarudzbinu(int narudzbinaID)
    {
        var narudzbina = await Context.Narudzbine.FirstOrDefaultAsync(pom => pom.ID == narudzbinaID);
                                        
        return new JsonResult(narudzbina);
    }  

    [HttpDelete]
    [Route("ObrisiNarudzbinu/{narudzbinaID}")]
    public async Task ObrisiNarudzbinu(int narudzbinaID)
    {
        var narudzbina = await Context.Narudzbine.FirstOrDefaultAsync(pom => pom.ID == narudzbinaID);
        
        var radnici = await Context.Radnici.Include(pom => pom.Narudzbine)
                                .ToListAsync();
        radnici.ForEach(pom => {
            if(pom.Narudzbine.Contains(narudzbina))
            {
                pom.Narudzbine.Remove(narudzbina);
            }
        });

        Context.Remove(narudzbina);
        await Context.SaveChangesAsync();
    }

    [HttpPost]
    [Route("DodajNarudzbinuLokalu/{lokalID}")]
    public async Task DodajNarudzbinuLokalu(int lokalID, [FromBody] Narudzbina narudzbina)
    {
        narudzbina.LokalZaNarudzbinu = Context.Lokali.Find(lokalID);
        Context.Narudzbine.Add(narudzbina);
        await Context.SaveChangesAsync();   
    }
}