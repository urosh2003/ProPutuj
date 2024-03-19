var firebaseUrl = 'https://web-dizajn-7f8d7-default-rtdb.europe-west1.firebasedatabase.app';
const template = `<div class="collapsible-header">{{naziv}}</div>
<div class="collapsible-body">    
    <form id={{id}}>
        <p>Naziv:<input type="text" id="naziv" value="{{naziv}}" pattern="^[a-zA-Za-åa-ö-w-я 0-9/'\-,]+$" title="Unesite naziv agerncije" required></p>
        <p>adresa:<input type="text" id="adresa" value="{{adresa}}" pattern="^[a-zA-Za-åa-ö-w-я 0-9/',\-]+$" title="Unesite adresu (ukoliko adresa nema broj dodajte bb na kraju)" required></p>
        <p>godina:<input type="number" id="godina" value="{{godina}}" pattern="^?[0-9]+$" title="Unesite godinu osnivanja" required></p>
        <p>logo:<input type="text" id = "logo" value="{{logo}}"  pattern="https?://.+" title="Unesite pravilan link slike"></p>
        <p>brojTelefona:<input type="text" id = "tel" value="{{broj}}" pattern="^\\+?[0-9\s/\-]{6,20}$" title="Unesite validan broj telefona" required></p>
        <p>email:<input type="email" id = "email" value="{{mail}}" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Unesite pravilnu email adresu (npr. pera.peric@mail.com)" required></p>
        brisanje destinacije:<select id="{{destinacije}}" pattern="^[A-Za-z0-9,' -žćčšđŽĆČŠĐ]*$" title="Unesite naziv destinacije">
            <option value="">Izaberi destinaciju za obrisati</option>
            </select>
            
            <div><button type="button" id="obrisid" onclick="fakeobrisidestinaciju('{{destinacije}}')">Obrisi destinaciju</button></div>
            <div><button type="button" onclick="otvorimodal('{{destinacije}}')">Dodaj novu destinaciju</button></div>
        <br>
        <br>
        <button type="button" id="Obrisi" onclick="fakeobrisi('{{id}}')">Obrisi agenciju</button>
        <button type="submit" id="Izmeni">Potvrdi izmene</button>
    </form>
</div>`;


var agencije = {}
var agencijeIDs = []

document.addEventListener('DOMContentLoaded', function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                agencije = JSON.parse(request.responseText);

                for(var id in agencije){
                    var agencija = agencije[id];
                    console.log(agencija);
                    dodajCollaps("agencijeCollaps", agencija, id);

                    agencijeIDs.push(id);
                }
                var elems = document.querySelectorAll('.collapsible');
                var instances = M.Collapsible.init(elems, options);
            }
        }
    }

    request.open('GET', firebaseUrl + '/agencije.json');
    request.send();
  });

function dodajCollaps(collapsid, agencija, id){
    var elem = document.createElement("li");

    const colaps = template
    .replace("{{naziv}}", agencija["naziv"])
    .replace("{{adresa}}", agencija["adresa"])
    .replace("{{broj}}", agencija["brojTelefona"])
    .replace("{{godina}}", agencija["godina"])
    .replace("{{mail}}", agencija["email"])
    .replace("{{naziv}}", agencija["naziv"])
    .replace("{{destinacije}}", agencija["destinacije"])
    .replace("{{destinacije}}", agencija["destinacije"])
    .replace("{{destinacije}}", agencija["destinacije"])
    .replace("{{logo}}", agencija["logo"])
    .replace("{{id}}", id)
    .replace("{{id}}", id);

    elem.innerHTML=colaps;

    document.getElementById(collapsid).appendChild(elem);

    forma = document.getElementById(id);
    forma.addEventListener("submit", function(event) {
        event.preventDefault();
        izmeniagenciju(id);
        });

    dodajDestinacije(collapsid, agencija["destinacije"]);
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

        request.open('DELETE', firebaseUrl + '/agencije/' + id + '.json', true);
        request.send();
};

function dodajDestinacije(collapsid, id){
    var select = document.getElementById(id);
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                destinacije = JSON.parse(request.responseText);

                for(var idDestinacije in destinacije){
                    var destinacija = destinacije[idDestinacije];
                    console.log(destinacija);
                    stavka = document.createElement("option");
                    stavka.setAttribute("value", idDestinacije);
                    stavka.innerHTML = destinacija["naziv"]
                    select.appendChild(stavka);
                }
            }
        }
    }
    
    request.open('GET', firebaseUrl + '/destinacije/' + id +'.json');
    request.send();
}


function izmeniagenciju(id){
    var forma = document.getElementById(id);

    var email = forma.querySelector("#email").value;
    var naziv = forma.querySelector("#naziv").value;
    var adresa = forma.querySelector("#adresa").value;
    var godina = forma.querySelector("#godina").value;
    var telefon = forma.querySelector("#tel").value;
    var logo = forma.querySelector("#logo").value;
    var destinacije = forma.querySelector("select").id;


    var agencija = {
      "adresa": adresa, 
      "godina": godina,
      "email": email,
      "naziv": naziv,
      "brojTelefona": telefon,
      "logo": logo,
      "destinacije": destinacije
    };
    console.log(agencija);
    
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

    request.open('PUT', firebaseUrl + '/agencije/' + id + '.json');
    request.send(JSON.stringify(agencija));
    
};
function fakeobrisidestinaciju(destinacije){
    var destinacija = document.getElementById(destinacije).value;
    if(destinacija==""){
        return
    }
    sigurni = document.getElementById("sigurni");
    var modal = M.Modal.getInstance(sigurni);
    modal.open();
    brisi = document.getElementById("obrisiconfirm");
    brisi.setAttribute("onclick", "obrisidestinaciju('" + destinacije + "')");
}

function obrisidestinaciju(destinacije){
    var destinacija = document.getElementById(destinacije).value;

        var request = new XMLHttpRequest();
        console.log(destinacija);

        request.onreadystatechange = function(){
            if (this.readyState == 4){
                if (this.status==200){
                    var elem = document.getElementById("uspeh");
                    var modal = M.Modal.getInstance(elem);
                    modal.open();
                }
            }
        }

        request.open('DELETE', firebaseUrl + '/destinacije/' + destinacije + '/' + destinacija + '.json', true);
        request.send();
}

var a="a";
var b = "b"
var handler = function(event){
    event.preventDefault();
    kreirajdestinaciju(a);
};

function otvorimodal(idDestinacija){
    a=idDestinacija;
    var forma = document.getElementById("dodajDest");
    var elem = document.getElementById("dodajdest");
    document.getElementById("odustani").setAttribute("onclick", "skloniListener('" + idDestinacija + "')");
    var modal = M.Modal.getInstance(elem);
    modal.open();
    b=modal.options;
    modal.options= {dismissable: false};
    

    forma.addEventListener("submit", handler);
}

function kreirajdestinaciju(idDestinacija){
    var forma = document.getElementById("dodajDest");

    var naziv = forma.querySelector("#nazivDest").value;
    var slika = forma.querySelector("#slikaDest").value;

    var destinacija = {
        "naziv": naziv,
        "cena": "/",
        "maxOsoba": "/",
        "opis": "Stize uskoro...",
        "tip": "",
        "prevoz": "",
        "slike": [slika]
    };
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


    request.open('POST', firebaseUrl + '/destinacije/' + idDestinacija + '.json');
    request.send(JSON.stringify(destinacija));
}

function skloniListener(idDestinacija){
    a=idDestinacija;
    var elem = document.getElementById("dodajdest");
    var modal = M.Modal.getInstance(elem);
    modal.options=b;
    modal.close();

    var forma = document.getElementById("dodajDest");
    console.log(idDestinacija);

    forma.removeEventListener("submit", handler);
}

