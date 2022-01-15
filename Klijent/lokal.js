import { Narudzbina } from "./narudzbina.js";
import { Radnik } from "./radnik.js";

export class Lokal {
    constructor(naziv, grad, adresa, brojZaposlenih) {
        this.naziv = naziv;
        this.grad = grad;
        this.adresa = adresa;
        this.brojZaposlenih = brojZaposlenih;
        //this.listaRadnika = [];

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
                op.value = p.naziv;
                tmp.appendChild(op);
            });

            pom = document.createElement("button");
            host.appendChild(pom);
            pom.className = "dodajRadnika";
            pom.innerHTML = "Dodaj";
            pom.onclick = (ev) => {
                this.dodajRadnika();
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

        let nizInputa = ["Naziv", "Grad", "Adresa", "Zaposleni"];
        let tipoviInputa = ["text", "text", "text", "number"];

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

        pom = document.createElement("button");
        host.appendChild(pom);
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
        //console.log(odabranLokal);

        //console.log(ime + " " + prezime + " " + mejl + " " + datumRodjenja + " " + plata + " " + datumZaposlenja + " " + brSlobodnihDana);
        //console.log();

        // Napravi proveru za duzinu

        // let r = new Radnik();
        // fetch("https://localhost:5001/Radnik/DodajRadnika/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ "Naziv": noviLokal.naziv, "Grad": noviLokal.grad,
        //             "Adresa": noviLokal.adresa, "BrojZaposlenih": noviLokal.brojZaposlenih})
        // }).then(p => {
        //     if (p.ok) {
        //         this.dodavanjeLokala(noviLokal);
        //         let ponovoIscrtaj = this.container.querySelector(".formaZaOdabirLokala");
        //         ponovoIscrtaj.innerHTML="";
        //         this.crtajFormuZaOdabirLokala(ponovoIscrtaj);
        //     }
        // });
    }

    dodajLokal() {
        this.naziv = this.container.querySelector(".inputPolje0").value;
        this.grad = this.container.querySelector(".inputPolje1").value;
        this.adresa = this.container.querySelector(".inputPolje2").value;
        this.brojZaposlenih = this.container.querySelector(".inputPolje3").value;

        if(this.naziv.length == null) {
            alert("Naziv je obavezno polje.");
        } else if (this.grad.length == null) {
            alert("Grad je obavezno polje.");
        }
        else if (this.adresa.length == null) {
            alert("Adresa je obavezno polje.");
        }

        let noviLokal = new Lokal(this.naziv, this.grad, this.adresa, this.brojZaposlenih);

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
                ponovoIscrtaj.innerHTML="";
                this.crtajFormuZaOdabirLokala(ponovoIscrtaj);
            }
        });
    }

    dodavanjeLokala(noviLokal) {
        this.listaLokala.push(noviLokal);
    }

    crtajFormuZaOdabirLokala(host) {
        if(!host)
            throw new Error("Host ne postoji.");

        fetch("https://localhost:5001/Lokal/VratiSveLokale/").then(p => {
            p.json().then(data => {
                this.listaLokala = [];
                this.listaRadnika = [];
                data.forEach(lokal => {
                    this.listaLokala.push(new Lokal(lokal.naziv, lokal.grad, lokal.adresa, lokal.brojZaposlenih));
                    //lokal.radnici.forEach(radnik => {
                    //    this.listaRadnika.push(radnik);    
                    //});
                });
            });
        });

        setTimeout(() => {
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
                tmp.value = element.naziv;
                div.appendChild(tmp);
            });

            tmp = document.createElement("div");
            m.appendChild(tmp);
            tmp.className = "desniDiv";

            div = document.createElement("button");
            pom.appendChild(div);
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
            return;
        }

        let pom, tmp1, tmp2;
        lokali.forEach(lokal => {
            this.listaLokala.forEach(trLokal => {
                if(trLokal.naziv == lokal.value) {
                    pom = document.createElement("div");
                    host.appendChild(pom);
                    pom.className = "divZaPrikazPodatakaOLokalu";
                    
                    tmp1 = document.createElement("div");
                    tmp1.className = "tmp1";
                    pom.appendChild(tmp1);

                    tmp2 = document.createElement("div");
                    tmp1.appendChild(tmp2);
                    tmp2.innerHTML = "Naziv - " + trLokal.naziv;

                    tmp2 = document.createElement("div");
                    tmp1.appendChild(tmp2);
                    tmp2.innerHTML = "Grad - " + trLokal.grad;

                    tmp2 = document.createElement("div");
                    tmp1.appendChild(tmp2);
                    tmp2.innerHTML = "Adresa - " + trLokal.adresa;

                    tmp2 = document.createElement("div");
                    tmp1.appendChild(tmp2);
                    tmp2.innerHTML = "Broj zaposlenih - " + trLokal.brojZaposlenih;

                    tmp1 = document.createElement("div");
                    tmp1.className = "tmp2";
                    pom.appendChild(tmp1);

                    // console.log(trLokal.naziv);
                    // console.log(this.listaRadnika);

                    // this.listaRadnika.forEach(radnik => {
                    //     if(radnik.lokal === trLokal) {
                    //         console.log(radnik.lokal.naziv);
                    //         tmp2 = document.createElement("div");
                    //         tmp1.appendChild(tmp2);
                    //         tmp2.innerHTML = "Radnik - " + radnik.ime + " " + radnik.prezime;
                    //     }
                    // });

                    console.log(trLokal.naziv);

                    //let radnik = new Radnik();
                    let narudzbina = new Narudzbina();
                    narudzbina.crtajNarudzbinu(tmp1, trLokal.naziv);
                }
            });
        });
    }
}