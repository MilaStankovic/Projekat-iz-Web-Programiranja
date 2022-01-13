export class Lokal {
    constructor(naziv, grad, adresa, brojZaposlenih) {
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

        let tmp = document.createElement("div");
        tmp.className = "formaZaDodavanjeLokala";
        this.container.appendChild(tmp);

        this.crtajFormuZaDodavanje(tmp);

        tmp = document.createElement("div");
        tmp.className = "formaZaOdabirLokala";
        this.container.appendChild(tmp);

        this.crtajFormuZaOdabirLokala(tmp);
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
            tmp.className = "labelaZaInput";
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

    dodajLokal() {
        this.naziv = this.container.querySelector(".inputPolje0").value;
        this.grad = this.container.querySelector(".inputPolje1").value;
        this.adresa = this.container.querySelector(".inputPolje2").value;
        this.brojZaposlenih = this.container.querySelector(".inputPolje3").value;

        if(this.naziv.length == null) {
            alert("Naziv je obavezno polje.");
        } else if (this.grad == null) {
            alert("Grad je obavezno polje.");
        }
        else if (this.adresa == null) {
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
                data.forEach(lokal => {
                    this.listaLokala.push(new Lokal(lokal.naziv, lokal.grad, lokal.adresa, lokal.brojZaposlenih));
                });
            });
        });

        setTimeout(() => {
            let pom = document.createElement("h2");
            host.appendChild(pom);
            pom.className = "headerZaOdabirLokala";
            pom.innerHTML = "Odaberite lokale koji zelite da prikazete";

            pom = document.createElement("div");
            host.appendChild(pom);
            pom.className = "divZaCBOdabiraLokala";

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
                tmp.value = element;
                div.appendChild(tmp);
            });
        }, 1000);
    }
}