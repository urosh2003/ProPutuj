var firebaseUrl = 'https://web-dizajn-7f8d7-default-rtdb.europe-west1.firebasedatabase.app';

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
                    naslov = document.createElement("div");
                    naslov.innerHTML = templateNaslov.replace("{{naziv}}", agencija["naziv"])
                    .replace("{{idDestinacija}}", agencija["destinacije"])
                    .replace("{{idAgencije}}", id);

                    document.getElementById("sve").appendChild(naslov);

                    dodajDestinacije(agencija["destinacije"]);

                }
                var elems = document.querySelectorAll('.collapsible');
                var instances = M.Collapsible.init(elems, options);
            }
        }
    }

    request.open('GET', firebaseUrl + '/agencije.json');
    request.send();
  });


function dodajDestinacije(id){
    var datalist = document.getElementById(id);
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                destinacije = JSON.parse(request.responseText);
                for(var idDestinacije in destinacije){
                    var destinacija = destinacije[idDestinacije];
                    console.log(destinacija);
                    elem = document.createElement("li");
                    elem.innerHTML = template.replace("{{naziv}}", destinacija["naziv"])
                    .replace("{{naziv}}", destinacija["naziv"])
                    .replace("{{opis}}", destinacija["opis"])
                    .replace("{{max}}", destinacija["maxOsoba"])
                    .replace("{{cena}}", destinacija["cena"])
                    .replace("{{prevoz}}", destinacija["prevoz"])
                    .replace("{{tip}}", destinacija["tip"])
                    .replace("{{id}}", idDestinacije)
                    .replace("{{id}}", idDestinacije);
                    console.log(elem);

                    datalist.appendChild(elem);
                    elem.querySelector(".collapsible-body form").addEventListener("submit",function(event){
                        event.preventDefault();
                        fakegotovo();
                    })

                    duzina = destinacija["slike"].length;
                    for(let i=0; i < duzina; i++){
                        stavka = document.createElement("option");
                        stavka.setAttribute("value", destinacija["slike"][i]);
                        document.getElementById(idDestinacije).appendChild(stavka);
                    }
                }
            }
        }
    }
    
    request.open('GET', firebaseUrl + '/destinacije/' + id +'.json');
    request.send();
}
function fakeobrisi(){
    sigurni = document.getElementById("sigurni");
    var modal = M.Modal.getInstance(sigurni);
    modal.open();
    brisi = document.getElementById("obrisiconfirm");
    brisi.setAttribute("onclick", "fakegotovo()");

}
function fakegotovo(){
    var elem = document.getElementById("uspeh");
    var modal = M.Modal.getInstance(elem);
    modal.open();
}

const template = `
        <div class="collapsible-header">{{naziv}}</div>
        <div class="collapsible-body">    
            <form>
                <p>Naziv:<input type="text" id="Naziv" value="{{naziv}}" pattern="^[a-zA-Za-åa-ö-w-я /'\-,]+$" title="Unesite naziv destinacije" required></p>
                <p>Opis:<textarea id="Opis">{{opis}}</textarea required></p>
                <p>max osoba:<input type="number" id="maxOsoba" value="{{max}}" pattern="^?[0-9\s]+$" title="Unesite maksimalan broj ljudi" required></p>
                <p>cena:<input type="number" id="cena" value="{{cena}}" pattern="^?[0-9\s]+$" title="Unesite cenu" required></p>
                <p>slike:<input list="{{id}}"   pattern="https?://.+" title="Unesite pravilan link slike">
                    <datalist id="{{id}}">
                      
                    </datalist>
                    <div><button type="button" id="Obrisis" onclick=fakeobrisi()>Obrisi sliku</button>
                    <button type="button" id="Izmenis" onclick="fakegotovo()">Dodaj sliku</button></div>
                </p>
                <p>prevoz:<input list="prevoz" value="{{prevoz}}" pattern="pattern="^[a-zA-Za-åa-ö-w-я /'\-,]+$"" title="Unesite vrstu prevoza" required>
                    <datalist id="prevoz">
                    <option value="avion">
                    <option value="autobus">
                    <option value="sopstveni">
                </datalist></p>
                <p>tip:<input list="tip" pattern="pattern="^[a-zA-Za-åa-ö-w-я /'\-,]+$"" title="Unesite tip putovanja" value="{{tip}}" required>
                    <datalist id="tip">
                      <option value="Letovanje">
                      <option value="Zimovanje">
                      <option value="Gradovi Evrope">
                    </datalist></p>
                <br>
                <button type="button" id="Obrisi" onclick="fakeobrisi()">Obrisi destinaciju</button>
                <button type="submit" id="Izmeni">Potvrdi izmene</button>
            </form>
        </div>`;

const templateNaslov = `<h1 class="naziv" id="{{idAgencije}}">{{naziv}}</h1>
                        <ul class="collapsible" id="{{idDestinacija}}">`;