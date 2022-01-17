import { Narudzbina } from "./narudzbina.js";

export class Radnik {
    constructor(ime, prezime, mejl, datumRodjenja, plata, datumZaposlenja, brojSlobodnihDana, lokal) {
        this.ime = ime;
        this.prezime = prezime;
        this.mejl = mejl;
        this.datumRodjenja = datumRodjenja;
        this.plata = plata;
        this.datumZaposlenja = datumZaposlenja;
        this.brojSlobodnihDana = brojSlobodnihDana;

        this.lokal = lokal

        this.listaRadnika = [];

        this.miniContainer = null;
    }

    brisanjeRadnika(host) {
        if(!host)
            throw new Error("Host ne postoji.");

        fetch("https://localhost:5001/Radnik/VratiSveRadnike/").then(p => {
            p.json().then(data => {
                this.listaRadnika = [];
                data.forEach(radnik => {
                    this.listaRadnika.push(radnik);
                });
            });
        });

        setTimeout(() => {
            let pom = document.createElement("h2");
            host.appendChild(pom);
            pom.className = "headerBrisanjaRadnika";
            pom.innerHTML = "Izaberite radnika kog zelite da obrisete";

            let tmp = document.createElement("select");
            tmp.className = "selectZaBrisanjeRadnika";
            host.appendChild(tmp);

            let op;
            this.listaRadnika.forEach(r => {
                op = document.createElement("option");
                op.innerHTML = r.ime + " " + r.prezime;
                op.value = r.id;
                tmp.appendChild(op);
            });

            pom = document.createElement("button");
            host.appendChild(pom);
            pom.className = "obrisiRadnika";
            pom.innerHTML = "Obrisi";
            pom.onclick = (ev) => {
                let optionEl = host.querySelector(".selectZaBrisanjeRadnika");
                let odabranRadnik = optionEl.options[optionEl.selectedIndex].value;
                //console.log(odabranRadnik);

                fetch("https://localhost:5001/Radnik/ObrisiRadnika/" + odabranRadnik + "/" , {
                    method: "DELETE"
                }).then(p => {
                    if (p.ok) { 
                        host.innerHTML = "";
                        this.brisanjeRadnika(host);
                    }
                }); 
            }
        }, 1000);
    }

    dodajNovogRadnika(radnik) {
        fetch("https://localhost:5001/Radnik/DodajRadnika/" + radnik.lokal , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "Ime": radnik.ime, "Prezime": radnik.prezime,
                    "Mejl": radnik.mejl, "DatumRodjenja": radnik.datumRodjenja, "plata": radnik.plata, "DatumZaposlenja": radnik.datumZaposlenja,
                "BrojSlobodnihDana": radnik.brojSlobodnihDana })
        }).then(p => {
            if (p.ok) {
                this.listaRadnika.push(radnik);
            }
        });
    }

    dodajRadnikeUOdabir(idLokala, idNarudzbine, host2, host3, nazivLokala) {
        this.miniContainer = host2;

        fetch("https://localhost:5001/Radnik/VratiSveRadnike/" + idLokala).then(p => {
            p.json().then(data => {
                this.listaRadnika = [];
                data.forEach(radnik => {
                    this.listaRadnika.push(radnik);
                });
            });
        });

        setTimeout(() => {
            let host = document.createElement("select");
            host.className = "selectZaDodeluNarudzbineRadniku";
            host2.appendChild(host);

            let op;
            this.listaRadnika.forEach(p => {
                op = document.createElement("option");
                op.innerHTML = p.ime + " " + p.prezime;
                op.value = p.id;
                host.appendChild(op);
            });

            op = document.createElement("button");
            host2.appendChild(op);
            op.className = "dodeliNarudzbinu";
            op.innerHTML = "Dodeli";
            op.onclick = (ev) => {
                this.dodeliNarudzbinu(idNarudzbine, host3, nazivLokala);
            }
        }, 1000);
    }

    dodeliNarudzbinu(idNarudzbine, host3, nazivLokala) {
        let optionEl = this.miniContainer.querySelector(".selectZaDodeluNarudzbineRadniku");
        var odabranRadnik = optionEl.options[optionEl.selectedIndex].value;
        //console.log(odabranRadnik);
        //console.log(idNarudzbine);

        fetch("https://localhost:5001/Radnik/DodajNarudzbinuRadniku/"+ idNarudzbine + "/" + odabranRadnik, {
            method: "PUT"                             
        }).then(p => {
            if (p.ok) {
                let n = new Narudzbina();
                n.crtajNarudzbinu(host3, nazivLokala);
            }
        })
    }
}