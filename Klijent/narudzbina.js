import { Radnik } from "./radnik.js";
import { Lokal } from "./lokal.js";

export class Narudzbina {
    constructor(vrstaPalacinke, brStola, napomena) {
        this.vrstaPalacinke = vrstaPalacinke;
        this.brStola = brStola;
        this.napomena = napomena;

        this.listaNarudzbina = [];

        this.cont = null;
    }

    crtajNarudzbinu(host, nazivLokala) {
        if(!host)
            throw new Error("Host ne postoji.");

        fetch("https://localhost:5001/Narudzbina/VratiSveNarudzbine/").then(p => {
            p.json().then(data => {
                this.listaNarudzbina = [];
                data.forEach(narudzbina => {
                    //this.listaNarudzbina.push(narudzbina.lokalZaNarudzbinu.naziv);
                    this.listaNarudzbina.push(narudzbina);
                });
            });
        });

        setTimeout(() => {
            host.innerHTML = "";

            let pom, tmp;
            this.listaNarudzbina.forEach(p => {
                if(p.spremalac === null) {
                    if(p.lokalZaNarudzbinu.naziv === nazivLokala) {
                        pom = document.createElement("div");
                        pom.className = "divZaNarudzbine"
                        host.appendChild(pom);

                        tmp = document.createElement("div");
                        pom.appendChild(tmp);
                        if(p.vrstaPalacinke === 0) {
                            pom.innerHTML = "Vrsta palacinke - Slatka";
                        }
                        else {
                            pom.innerHTML = "Vrsta palacinke - Slana";
                        }

                        tmp = document.createElement("div");
                        pom.appendChild(tmp);
                        tmp.innerHTML = "Broj stola - " + p.brojStola;

                        tmp = document.createElement("div");
                        pom.appendChild(tmp);
                        tmp.innerHTML = "Napomena - " + p.napomena;

                        tmp = document.createElement("div");
                        pom.appendChild(tmp);
                        tmp.innerHTML = "Spremalac - Nedodeljena jos uvek.";

                        let r = new Radnik();
                        r.dodajRadnikeUOdabir(p.lokalZaNarudzbinu.id, p.id, pom, host, nazivLokala);

                        tmp = document.createElement("button");
                        pom.appendChild(tmp);
                        tmp.className = "obrisiNarudzbinu";
                        tmp.innerHTML = "Obrisi narudzbinu";
                        tmp.onclick = (ev) => {
                            this.obrisiNarudzbinu(host, nazivLokala, p.id);
                        }
                    }
                }
                else {
                    if(p.lokalZaNarudzbinu.naziv === nazivLokala) {
                        pom = document.createElement("div");
                        pom.className = "divZaNarudzbine"
                        host.appendChild(pom);

                        tmp = document.createElement("div");
                        pom.appendChild(tmp);
                        if(p.vrstaPalacinke === 0) {
                            pom.innerHTML = "Vrsta palacinke - Slatka";
                        }
                        else {
                            pom.innerHTML = "Vrsta palacinke - Slana";
                        }

                        tmp = document.createElement("div");
                        pom.appendChild(tmp);
                        tmp.innerHTML = "Broj stola - " + p.brojStola;

                        tmp = document.createElement("div");
                        pom.appendChild(tmp);
                        tmp.innerHTML = "Napomena - " + p.napomena;

                        tmp = document.createElement("div");
                        pom.appendChild(tmp);
                        tmp.innerHTML = "Spremalac - " + p.spremalac.ime + " " + p.spremalac.prezime;

                        tmp = document.createElement("button");
                        pom.appendChild(tmp);
                        tmp.className = "obrisiNarudzbinu";
                        tmp.innerHTML = "Obrisi narudzbinu";
                        tmp.onclick = (ev) => {
                            this.obrisiNarudzbinu(host, nazivLokala, p.id);
                        }
                    }
                }
            });
        }, 1000);
    }

    dodajNarudzbinu(gdeDaCrta, lokalID, staDaOsvezi, parentHosta) {
        if(!gdeDaCrta)
            throw new Error("Host ne postoji.");

        let pom = document.createElement("h3");
        gdeDaCrta.appendChild(pom);
        pom.className = "headerDodavanjaNarudzbine";
        pom.innerHTML = "Dodavanje nove narudzbine";
         
        let tmp = document.createElement("div");
        gdeDaCrta.appendChild(tmp);
        tmp.className = "divZaInputILabelu";

        pom = document.createElement("label");
        tmp.appendChild(pom);
        pom.innerHTML = "Vrsta palacinke";

        pom = document.createElement("select");
        pom.className = "selectZaVrstuPalacinke";
        tmp.appendChild(pom);

        let op = document.createElement("option");
        op.innerHTML = "Slatka";
        op.value = 0;
        pom.appendChild(op);

        op = document.createElement("option");
        op.innerHTML = "Slana";
        op.value = 1;
        pom.appendChild(op);

        tmp = document.createElement("div");
        gdeDaCrta.appendChild(tmp);
        tmp.className = "divZaInputILabelu";

        pom = document.createElement("label");
        tmp.appendChild(pom);
        pom.innerHTML = "Vas broj stola";

        pom = document.createElement("input");
        pom.type = "number";
        pom.className = "inputBrojaStola";
        tmp.appendChild(pom);

        tmp = document.createElement("div");
        gdeDaCrta.appendChild(tmp);
        tmp.className = "divZaInputILabelu";

        pom = document.createElement("label");
        tmp.appendChild(pom);
        pom.innerHTML = "Napomena";

        pom = document.createElement("input");
        tmp.appendChild(pom);
        pom.className = "inputNapomene";

        pom = document.createElement("button");
        gdeDaCrta.appendChild(pom);
        pom.className = "dodajNarudzbinu";
        pom.innerHTML = "Dodaj narudzbinu";
        pom.onclick = (ev) => {
            this.dodajNarudzbinuULokal(gdeDaCrta, lokalID, staDaOsvezi, parentHosta);
        }
    }

    dodajNarudzbinuULokal(gdeDaCrta, lokalID, staDaOsvezi, parentHosta) {
        let optionEl = gdeDaCrta.querySelector(".selectZaVrstuPalacinke");
        var odabranaPalacinka = optionEl.options[optionEl.selectedIndex].value;

        let brStola = gdeDaCrta.querySelector(".inputBrojaStola").value;
        let napomena = gdeDaCrta.querySelector(".inputNapomene").value;

        //console.log(odabranaPalacinka + " " + brStola + " " + napomena);

        let novaNarudzbina = new Narudzbina(odabranaPalacinka, brStola, napomena);

        console.log(parseInt(novaNarudzbina.vrstaPalacinke) + " " + parseInt(novaNarudzbina.brStola) + " " + novaNarudzbina.napomena);

        fetch("https://localhost:5001/Narudzbina/DodajNarudzbinuLokalu/" + lokalID , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "vrstaPalacinke": novaNarudzbina.vrstaPalacinke.value, "brojStola": novaNarudzbina.brStola,
            "napomena": novaNarudzbina.napomena })
        }).then(p => {
            if (p.ok) {
                //console.log("Proslo");
                this.listaNarudzbina.push(novaNarudzbina);
                let l = new Lokal();
                l.crtajFormuZaOdabirLokala(parentHosta);
            }
        });
    }

    obrisiNarudzbinu(host, nazivLokala, narudzbinaID) {
        //console.log(narudzbinaID);

        fetch("https://localhost:5001/Narudzbina/ObrisiNarudzbinu/" + narudzbinaID + "/" , {
            method: "DELETE"
        }).then(p => {
            if (p.ok) { 
                host.innerHTML = "";
                this.crtajNarudzbinu(host, nazivLokala);
            }
        });
    }
}