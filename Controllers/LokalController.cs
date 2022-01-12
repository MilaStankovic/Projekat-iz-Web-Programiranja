using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]")]
public class LokalController : ControllerBase
{
    public PalacinkarnicaContext Context {get; set;}

    public LokalController(PalacinkarnicaContext context)
    {
        Context = context;
    }

    [HttpGet]
    [Route("VratiSveLokale")]
    public async Task<JsonResult> VratiSveLokale()
    {
        var lokali = await Context.Lokali.Include(radnik => radnik.Radnici)
                                .ToListAsync();
        return new JsonResult(lokali);
    }

    [HttpPost]
    [Route("DodajLokal")]
    public async Task DodajLokal([FromBody] Lokal lokal)
    {
        Context.Lokali.Add(lokal);
        await Context.SaveChangesAsync();    
    } 
}