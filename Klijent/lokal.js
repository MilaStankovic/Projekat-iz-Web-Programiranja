import { Narudzbina } from "./narudzbina.js";
import { Radnik } from "./radnik.js";

export class Lokal {
    constructor(id, naziv, grad, adresa, brojZaposlenih) {
        this.id = id;
        this.naziv = naziv;
        this.grad = grad;
        this.adresa = adresa;
        this.brojZaposlenih = brojZaposlenih;

        this.listaLokala = [];

        this.container = null;
    }

    crtaj(host) {
        if(!host)
            throw new Error("Host ne postoji.");

        this.container = document.createElement("div");
        this.container.className = "container";
        host.appendChild(this.container);

        let pom = document.createElement("div");
        this.container.appendChild(pom);
        pom.className = "formaZaDodavanje";

        let tmp = document.createElement("div");
        tmp.className = "formaZaDodavanjeLokala";
        pom.appendChild(tmp);

        this.crtajFormuZaDodavanje(tmp);

        tmp = document.createElement("div");
        tmp.className = "formaZaOdabirLokala";
        this.container.appendChild(tmp);

        this.crtajFormuZaOdabirLokala(tmp);

        tmp = document.createElement("div");
        tmp.className = "formaZaDodavanjeRadnika";
        pom.appendChild(tmp);
        this.crtajFormuZaDodavanjeRadnika(tmp);

        tmp = document.createElement("div");
        tmp.className = "formaZaBrisanjeRadnika";
        pom.appendChild(tmp);
        this.crtajFormuZaBrisanjeRadnika(tmp);
    }

    crtajFormuZaBrisanjeRadnika(host) {
        host.innerHTML = "";

        let r = new Radnik();
        r.brisanjeRadnika(host);

        let ponovoIscrtaj = this.container.querySelector(".formaZaOdabirLokala");
        this.crtajFormuZaOdabirLokala(ponovoIscrtaj);
    }

    crtajFormuZaDodavanjeRadnika(host) {
        if(!host)
            throw new Error("Host ne postoji.");

        setTimeout(() => {
            let pom = document.createElement("h2");
            host.appendChild(pom);
            pom.className = "headerDodavanjaRadnika";
            pom.innerHTML = "Dodavanje novog radnika";

            let nizInputa = ["Ime", "Prezime", "Mejl", "Datum rodjenja", "Plata", "Datum zaposljenja", "Broj slobodnih dana"];
            let tipoviInputa = ["text", "text", "text", "date", "number", "date", "number"];

            let tmp;
            nizInputa.forEach((naziv, index) => {
                pom = document.createElement("div");
                host.appendChild(pom);
                pom.className = "divZaInput";

                tmp = document.createElement("label");
                pom.appendChild(tmp);
                tmp.className = "labelaZaInput1";
                tmp.innerHTML = naziv;

                tmp = document.createElement("input");
                tmp.type = tipoviInputa[index];
                pom.appendChild(tmp);
                tmp.className = "inputPoljeRadnika" + index;
            });

            pom = document.createElement("div");
            host.appendChild(pom);
            pom.className = "divZaInput";

            tmp = document.createElement("label");
            pom.appendChild(tmp);
            tmp.className = "labelaZaInput1";
            tmp.innerHTML = "Lokal";

            tmp = document.createElement("select");
            pom.appendChild(tmp);

            let op;
            this.listaLokala.forEach(p => {
                op = document.createElement("option");
                op.innerHTML = p.naziv;
                op.value = p.id;
                tmp.appendChild(op);
            });

            op = document.createElement("div");
            op.className = "divZaDugmice";
            host.appendChild(op);

            pom = document.createElement("button");
            op.appendChild(pom);
            pom.className = "dodajRadnika";
            pom.innerHTML = "Dodaj";
            pom.onclick = (ev) => {
                this.dodajRadnika();

                //let ponovoIscrtaj = this.container.querySelector(".formaZaOdabirLokala");
                //this.crtajFormuZaOdabirLokala(ponovoIscrtaj);

                //ponovoIscrtaj = this.container.querySelector(".formaZaBrisanjeRadnika");
                //this.crtajFormuZaBrisanjeRadnika(ponovoIscrtaj);
            }
        }, 1000);
    }

    crtajFormuZaDodavanje(host){
        if(!host)
            throw new Error("Host ne postoji.");

        let pom = document.createElement("h2");
        host.appendChild(pom);
        pom.className = "headerDodavanjaLokala";
        pom.innerHTML = "Dodavanje novog lokala";

        let nizInputa = ["Naziv", "Grad", "Adresa"];
        let tipoviInputa = ["text", "text", "text"];

        let tmp;
        nizInputa.forEach((naziv, index) => {
            pom = document.createElement("div");
            host.appendChild(pom);
            pom.className = "divZaInput";

            tmp = document.createElement("label");
            pom.appendChild(tmp);
            tmp.className = "labelaZaInput2";
            tmp.innerHTML = naziv;

            tmp = document.createElement("input");
            tmp.type = tipoviInputa[index];
            pom.appendChild(tmp);
            tmp.className = "inputPolje" + index;
        });

        tmp = document.createElement("div");
        tmp.className = "divZaDugmice";
        host.appendChild(tmp);

        pom = document.createElement("button");
        tmp.appendChild(pom);
        pom.className = "dodajLokal";
        pom.innerHTML = "Dodaj";
        pom.onclick = (ev) => {
            this.dodajLokal();
        }
    }

    dodajRadnika() {
        let ime = this.container.querySelector(".inputPoljeRadnika0").value;
        let prezime = this.container.querySelector(".inputPoljeRadnika1").value;
        let mejl = this.container.querySelector(".inputPoljeRadnika2").value;
        let datumRodjenja = this.container.querySelector(".inputPoljeRadnika3").value;
        let plata = this.container.querySelector(".inputPoljeRadnika4").value;
        let datumZaposlenja = this.container.querySelector(".inputPoljeRadnika5").value;
        let brSlobodnihDana = this.container.querySelector(".inputPoljeRadnika6").value;

        let optionEl = this.container.querySelector("select");
        var odabranLokal = optionEl.options[optionEl.selectedIndex].value;

        let r = new Radnik(ime, prezime, mejl, datumRodjenja, plata, datumZaposlenja, brSlobodnihDana, odabranLokal);
        r.dodajNovogRadnika(r);

        let ponovoIscrtaj = this.container.querySelector(".formaZaOdabirLokala");
        ponovoIscrtaj.innerHTML = "";
        this.crtajFormuZaOdabirLokala(ponovoIscrtaj);

        ponovoIscrtaj = this.container.querySelector(".formaZaDodavanjeRadnika");
        ponovoIscrtaj.innerHTML = "";
        this.crtajFormuZaDodavanjeRadnika(ponovoIscrtaj);
    }

    dodajLokal() {
        this.naziv = this.container.querySelector(".inputPolje0").value;
        this.grad = this.container.querySelector(".inputPolje1").value;
        this.adresa = this.container.querySelector(".inputPolje2").value;

        if(this.naziv.length === 0) 
        {
            alert("Naziv je obavezno polje.");
        } 
        else if (this.naziv.length > 60) 
        {
            alert("Naziv moze imati maksimalno 60 karaktera.");
        } 
        else if (this.grad.length === 0) 
        {
            alert("Grad je obavezno polje.");
        }
        else if (this.grad.length > 60) 
        {
            alert("Grad moze imati maksimalno 60 karaktera.");
        } 
        else if (this.adresa.length === 0) 
        {
            alert("Adresa je obavezno polje.");
        }
        else if (this.adresa.length > 255) 
        {
            alert("Adresa moze imati maksimalno 255 karaktera.");
        }

        let noviLokal = new Lokal(null, this.naziv, this.grad, this.adresa, 0);

        fetch("https://localhost:5001/Lokal/DodajLokal/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "Naziv": noviLokal.naziv, "Grad": noviLokal.grad,
                    "Adresa": noviLokal.adresa, "BrojZaposlenih": noviLokal.brojZaposlenih})
        }).then(p => {
            if (p.ok) {
                this.dodavanjeLokala(noviLokal);
                let ponovoIscrtaj = this.container.querySelector(".formaZaOdabirLokala");
                ponovoIscrtaj.innerHTML = "";
                this.crtajFormuZaOdabirLokala(ponovoIscrtaj);
                alert("Uspesno ste dodali lokal.");
            }
        });
    }

    dodavanjeLokala(noviLokal) {
        this.listaLokala.push(noviLokal);
    }

    crtajFormuZaOdabirLokala(host) { //da osvezi dole opcije za prikaz lokala
        if(!host)
            throw new Error("Host ne postoji.");

        fetch("https://localhost:5001/Lokal/VratiSveLokale/").then(p => {
            p.json().then(data => {
                this.listaLokala = [];
                this.listaRadnika = [];
                data.forEach(lokal => {
                    this.listaLokala.push(new Lokal(lokal.id, lokal.naziv, lokal.grad, lokal.adresa, lokal.brojZaposlenih));
                });
            });
        });

        setTimeout(() => {
            host.innerHTML = "";

            let pom = document.createElement("h2");
            host.appendChild(pom);
            pom.className = "headerZaOdabirLokala";
            pom.innerHTML = "Odaberite lokale koji zelite da prikazete";

            let m = document.createElement("div");
            host.appendChild(m);
            m.className = "velikiDiv";

            pom = document.createElement("div");
            m.appendChild(pom);
            pom.className = "leviDiv";

            let tmp, labela, div;
            this.listaLokala.forEach(element => {
                div = document.createElement("div");
                pom.appendChild(div);
                div.className = "divZaOdabirLokala";

                labela = document.createElement("label");
                labela.innerHTML = element.naziv;
                div.appendChild(labela);

                tmp = document.createElement("input");
                tmp.type = "checkbox";
                tmp.className = "cbZaLokale";
                tmp.value = element.naziv;
                div.appendChild(tmp);
            });

            tmp = document.createElement("div");
            m.appendChild(tmp);
            tmp.className = "desniDiv";

            labela = document.createElement("div");
            labela.className = "divZaDugmice";
            pom.appendChild(labela);

            div = document.createElement("button");
            labela.appendChild(div);
            div.className = "prikaziLokale";
            div.innerHTML = "Prikazi";
            div.onclick = (ev) => {
                this.prikaziLokale(tmp);
            }
        }, 1000);
    }

    prikaziLokale(host) {
        if(!host)
            throw new Error("Host ne postoji.");

        host.innerHTML = "";

        let lokali = this.container.querySelectorAll("input[type='checkbox']:checked");

        if(lokali.length == 0){
            alert("Izaberite lokal!");
        }

        let pom, tmp1, tmp2;
        lokali.forEach(lokal => {
            this.listaLokala.forEach(trLokal => {
                if(trLokal.naziv == lokal.value) {     
                    pom = document.createElement("div");
                    host.appendChild(pom);
                    pom.className = "divZaTmpove";
                    
                    tmp1 = document.createElement("div");
                    tmp1.className = "tmp1";
                    pom.appendChild(tmp1);

                    tmp2 = document.createElement("div");
                    tmp1.appendChild(tmp2);
                    tmp2.innerHTML = "Naziv - " + trLokal.naziv;
                    tmp2.className = "infoLokala";

                    tmp2 = document.createElement("div");
                    tmp1.appendChild(tmp2);
                    tmp2.innerHTML = "Grad - " + trLokal.grad;
                    tmp2.className = "infoLokala";

                    tmp2 = document.createElement("div");
                    tmp1.appendChild(tmp2);
                    tmp2.innerHTML = "Adresa - " + trLokal.adresa;
                    tmp2.className = "infoLokala";

                    tmp1 = document.createElement("div");
                    tmp1.className = "tmp2";
                    pom.appendChild(tmp1);

                    let narudzbina = new Narudzbina();
                    narudzbina.crtajNarudzbinu(tmp1, trLokal.naziv);

                    tmp1 = document.createElement("div");
                    pom.appendChild(tmp1);
                    tmp1.className = "tmp3";

                    narudzbina.dodajNarudzbinu(tmp1, trLokal.id);
                }
            });
        });
    }
}