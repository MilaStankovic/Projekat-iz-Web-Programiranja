import { Radnik } from "./radnik.js";

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

        host.innerHTML = "";

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

                        let se = document.createElement("select");
                        pom.appendChild(se);

                        let r = new Radnik();
                        r.dodajRadnikeUOdabir(se, p.lokalZaNarudzbinu.id, p.id, pom, host, nazivLokala);
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
                    }
                }
            });
        }, 1000);
    }
}