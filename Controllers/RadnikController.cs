using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]")]
public class RadnikController : ControllerBase
{
    public PalacinkarnicaContext Context {get; set;}

    public RadnikController(PalacinkarnicaContext context)
    {
        Context = context;
    }

    [HttpGet]
    [Route("VratiSveRadnike")]
    public async Task<JsonResult> VratiSveRadnike()
    {
        var radnici = await Context.Radnici.Include(pom => pom.Narudzbine)
                                .ToListAsync();
        return new JsonResult(radnici);
    }

    [HttpGet]
    [Route("VratiSveRadnike/{lokalID}")]
    public async Task<JsonResult> VratiSveRadnike(int lokalID)
    {
        var radnici = await Context.Radnici.Include(pom1 => pom1.Lokal)
                                            .Where(pom2 => pom2.Lokal.ID == lokalID)
                                            .Include(pom3 => pom3.Narudzbine)
                                            .ToListAsync();
        return new JsonResult(radnici);
    }

    [HttpDelete]
    [Route("ObrisiRadnika/{id}")]
    public async Task ObrisiRadnika(int id)
    {
        var radnikZaBrisanje = await Context.Radnici.Include(pom => pom.Narudzbine)
                                                    .FirstOrDefaultAsync(pom2 => pom2.ID == id);

        radnikZaBrisanje.Narudzbine.ForEach(pom => {
            pom.Spremalac = null;
        });

        Context.Remove(radnikZaBrisanje);
        await Context.SaveChangesAsync();
    }

    [HttpPut]
    [Route("DodajNarudzbinuRadniku/{narudzbinaID}/{radnikID}")]
    public async Task<IActionResult> DodajNarudzbinuRadniku(int narudzbinaID, int radnikID)
    {
        var narudzbinaZaDodelu = Context.Narudzbine.Include(pom1 => pom1.Spremalac)
                                .FirstOrDefault(pom2 => pom2.ID == narudzbinaID);

        if(narudzbinaZaDodelu.Spremalac == null)
        {
            var radnik = Context.Radnici.Find(radnikID);
            narudzbinaZaDodelu.Spremalac = radnik;
            
            Context.Update<Narudzbina>(narudzbinaZaDodelu);
            await Context.SaveChangesAsync();

            return Ok();           
        }
        else
        {
            return BadRequest("Narudzbina je vec preuzeta.");
        }
        
    }
}