var firebaseUrl = 'https://web-dizajn-7f8d7-default-rtdb.europe-west1.firebasedatabase.app';
const template = `<div class="collapsible-header">{{korisnickoIme}}</div>
<div class="collapsible-body">    
    <form class="korisnikforma" id={{id}}>
        <p>Korisnicko ime:<input type="text" id="korisnickoIme" value="{{korisnickoIme}}" pattern = "^[a-zA-Z0-9]{3,12}$" title="Korisničko ime mora sadržati od 3 do 12 slova i/ili brojeva (specijalni karakteri nisu dozvoljeni)" required></p>
        <p>Lozinka:<input type="text" id="lozinka" value="{{lozinka}}" pattern = "^[a-zA-Z0-9]{3,12}$" title="Šifra mora sadržati od 3 do 12 slova i/ili brojeva (specijalni karakteri nisu dozvoljeni)" required></p>
        <p>Ime:<input type="text" id="ime" value="{{ime}}" pattern="^[a-zA-Za-åa-ö-w-я /',\-]+$" title="Unesite ime"></p>
        <p>Prezime:<input type="text" id="prezime" value="{{prezime}}" pattern="^[a-zA-Za-åa-ö-w-я /'\-,]+$" title="Unesite prezime" required></p>
        <p>email:<input type="email" id = "email" value="{{mail}}" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Unesite pravilnu email adresu (npr. pera.peric@mail.com)" required></p>
        <p>Datum rodjenja:<input type="date" id="datum" value="{{datum}}" max="2023-01-06" title="Unesite validan datum" required></p>
        <p>Adresa:<input type="text" id="adresa" value="{{adresa}}" pattern="^[a-zA-Za-åa-ö-w-я 0-9/'\-,]+$" title="Unesite adresu (ukoliko adresa nema broj dodajte bb na kraju)" required></p>
        <p>BrojTelefona:<input type="text" id = "tel" value="{{broj}}" pattern="^\\+?[0-9\s/\-]{6,20}$" title="Unesite validan broj telefona" required></p>
        <br>
        <br>
        <button type="button" onclick="fakeobrisi('{{id}}')" >Obrisi korisnika</button>
        <button type="submit">Potvrdi izmene</button>
    </form>
</div>
`;

var agencije = {}
var agencijeIDs = []

document.addEventListener('DOMContentLoaded', function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                korisnici = JSON.parse(request.responseText);

                for(var id in korisnici){
                    var korisnik = korisnici[id];
                    console.log(korisnik);
                    dodajCollaps("korisniciCollaps", korisnik, id);

                    agencijeIDs.push(id);
                }
                var elems = document.querySelectorAll('.collapsible');
                var instances = M.Collapsible.init(elems, options);

                var forme = document.getElementsByClassName("korisnikforma");

                
            
            }
        }
    }

    request.open('GET', firebaseUrl + '/korisnici.json');
    request.send();
  });

function dodajCollaps(collapsid, korisnik, id){
    var elem = document.createElement("li");
    const colaps = template
    .replace("{{adresa}}", korisnik["adresa"])
    .replace("{{broj}}", korisnik["telefon"])
    .replace("{{mail}}", korisnik["email"])
    .replace("{{korisnickoIme}}", korisnik["korisnickoIme"])
    .replace("{{korisnickoIme}}", korisnik["korisnickoIme"])
    .replace("{{lozinka}}", korisnik["lozinka"])
    .replace("{{ime}}", korisnik["ime"])
    .replace("{{prezime}}", korisnik["prezime"])
    .replace("{{datum}}", korisnik["datumRodjenja"])
    .replace("{{id}}",id)
    .replace("{{id}}",id);

    elem.innerHTML=colaps;

    document.getElementById(collapsid).appendChild(elem);

    forma = document.getElementById(id);
    forma.addEventListener("submit", function(event) {
        event.preventDefault();
        izmenikorisnika(id);
        });

}
function fakeobrisi(id){
    sigurni = document.getElementById("sigurni");
    var modal = M.Modal.getInstance(sigurni);
    modal.open();
    brisi = document.getElementById("obrisiconfirm");
    brisi.setAttribute("onclick", "obrisi('" + id + "')");
}

function obrisi(id){
        var request = new XMLHttpRequest();
        console.log(id);

        request.onreadystatechange = function(){
            if (this.readyState == 4){
                if (this.status==200){
                    var elem = document.getElementById("uspeh");
                    var modal = M.Modal.getInstance(elem);
                    modal.open();
                }
            }
        }

        request.open('DELETE', firebaseUrl + '/korisnici/' + id + '.json', true);
        request.send();
}

function izmenikorisnika(id){
    var forma = document.getElementById(id);

    var email = forma.querySelector("#email").value;
    var korisnickoIme = forma.querySelector("#korisnickoIme").value;
    var lozinka = forma.querySelector("#lozinka").value;
    var ime = forma.querySelector("#ime").value;
    var prezime = forma.querySelector("#prezime").value;
    var adresa = forma.querySelector("#adresa").value;
    var datum = forma.querySelector("#datum").value;
    var telefon = forma.querySelector("#tel").value;


    var korisnik = {
      "adresa": adresa, 
      "datumRodjenja": datum,
      "email": email,
      "ime": ime,
      "korisnickoIme": korisnickoIme,
      "lozinka": lozinka,
      "prezime":prezime,
      "telefon": telefon
    };
    console.log(korisnik);

    var firebaseUrl = 'https://web-dizajn-7f8d7-default-rtdb.europe-west1.firebasedatabase.app';
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                var elem = document.getElementById("uspeh");
                var modal = M.Modal.getInstance(elem);
                modal.open();
            }
        }
    }

    request.open('PUT', firebaseUrl + '/korisnici/' + id + '.json');
    request.send(JSON.stringify(korisnik));
};




