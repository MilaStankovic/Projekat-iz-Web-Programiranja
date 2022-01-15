import { Narudzbina } from "./narudzbina.js";

export class Radnik {
    constructor(ime, prezime, mejl, datumRodjenja, plata, datumZaposlenja, brojSlobodnihDana) {
        this.ime = ime;
        this.prezime = prezime;
        this.mejl = mejl;
        this.datumRodjenja = datumRodjenja;
        this.plata = plata;
        this.datumZaposlenja = datumZaposlenja;
        this.brojSlobodnihDana = brojSlobodnihDana;

        this.listaRadnika = [];

        this.miniContainer = null;
    }

    dodajRadnikeUOdabir(host, idLokala, idNarudzbine, host2, host3, nazivLokala) {
        if(!host)
            throw new Error("Host ne postoji.");

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
        let optionEl = this.miniContainer.querySelector("select");
        var odabranRadnik = optionEl.options[optionEl.selectedIndex].value;
        //console.log(odabranRadnik);
        //console.log(idNarudzbine);

        fetch("https://localhost:5001/Radnik/DodajNarudzbinuRadniku/" + idNarudzbine + "/" + odabranRadnik).then(p => {
            p.json().then(data => {
                this.listaRadnika = [];
                data.forEach(radnik => {
                    this.listaRadnika.push(radnik);
                });
            });
        });

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