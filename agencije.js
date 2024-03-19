var firebaseUrl = 'https://web-dizajn-7f8d7-default-rtdb.europe-west1.firebasedatabase.app';

var agencije = {};
var agencijeIDs = [];
var destinacije = {};
var agencija = {};

document.addEventListener('DOMContentLoaded', function() {
    var agencijareq = new XMLHttpRequest();
    const link = window.location.search;
    console.log(link);
    const id = new URLSearchParams(link);
    var idAgencije = id.get("agencijaID");

    agencijareq.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                agencija = JSON.parse(agencijareq.responseText);
                console.log(agencija);
                srediStranicu(agencija, idAgencije);
            }
        }
    }

    agencijareq.open('GET', firebaseUrl + '/agencije/' + idAgencije + '.json');
    agencijareq.send();
  });

  function srediStranicu(agencija, idAgencije){
    var destinacijereq = new XMLHttpRequest();
    document.getElementById("naziv").innerHTML = agencija["naziv"];
    document.getElementById("godina").innerHTML = "Godina osnivanja: " + agencija["godina"];
    document.getElementById("broj").innerHTML = "Kontakt telefon: " + agencija["brojTelefona"];
    document.getElementById("adresa").innerHTML = "Adresa: " +  agencija["adresa"];
    document.getElementById("email").innerHTML = "Email: " + agencija["email"];



    destinacijereq.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                destinacije = JSON.parse(destinacijereq.responseText);
                console.log(destinacije);

                for(var id in destinacije){
                    destinacija = destinacije[id];
                    dodajKartu("sveDestinacije", destinacija,id, idAgencije);
                }
                dodajSearch();
            }
        }
    }

    destinacijereq.open('GET', firebaseUrl + '/destinacije/' + agencija["destinacije"] + '.json');
    destinacijereq.send();
  }

  function dodajKartu(pozicija, destinacija, id, idAgencije){
    var karta = document.createElement("div");
    karta.className = "karta";
    karta.setAttribute("id", id);
    var srkarta = document.createElement("div");
    srkarta.className = "small card hoverable";
    var kartaSlika = document.createElement("div");
    kartaSlika.className = "card-image";
    var slika = document.createElement("img");
    slika.setAttribute("src", destinacija["slike"][0]);
    var naslov = document.createElement("span");
    naslov.className = "card-title";
    naslov.innerHTML = destinacija["naziv"];
    var sardzaj = document.createElement("div");
    sardzaj.className="card-content";
    var cena = document.createElement("p");
    cena.className = "cena";
    cena.innerHTML = "VEĆ OD " + destinacija["cena"] + " RSD";
    var akcija = document.createElement("div");
    akcija.className = "card-action";
    var link = document.createElement("a");
    link.innerHTML = "pogledaj destinaciju";
    link.setAttribute("id", "a" +id);
    link.setAttribute("href", "./destinacije.html?destinacijaID=" + id + "&agencijaID=" + idAgencije);
    
    akcija.appendChild(link);
    sardzaj.appendChild(cena);
    kartaSlika.appendChild(slika);
    kartaSlika.appendChild(naslov);
    srkarta.appendChild(kartaSlika);
    srkarta.appendChild(sardzaj);
    srkarta.appendChild(akcija);
    karta.appendChild(srkarta); 
    document.getElementById(pozicija).appendChild(karta);
  }

function dodajSearch(){
    var searchNaz = document.getElementById("pretragaDestinacijaNaziv");
    var searchTip = document.getElementById("pretragaDestinacijaTip");
    var searchPrevoz = document.getElementById("pretragaDestinacijaPrevoz");

    searchNaz.addEventListener("input", function(event){
        var unosNaz = searchNaz.value.toLowerCase();
        var unosTip = searchTip.value.toLowerCase();
        var unosPrevoz = searchPrevoz.value.toLowerCase();

        var karte = document.querySelectorAll(".karta");
        for(var i = 0; i<karte.length;i++){
            idDest = karte[i].id;
            console.log(idDest);
            if(destinacije[idDest]["naziv"].toLowerCase().includes(unosNaz) && destinacije[idDest]["tip"].toLowerCase().includes(unosTip) && destinacije[idDest]["prevoz"].toLowerCase().includes(unosPrevoz)){
                karte[i].style.display="block";
                if(unosTip!="" || unosPrevoz!=""){
                    document.getElementById("a" + idDest).className = "highlighted";
                }
                else{
                    document.getElementById("a" + idDest).className = "";
                }
                if(unosNaz!=""){
                    title = karte[i].querySelector(".small.card.hoverable .card-image .card-title");
                    tekst  = title.textContent;
                    var regex = new RegExp('(' + unosNaz + ')', 'gi');
    
                    var highlightedText = tekst.replace(regex, '<span class="highlighted-belo">$1</span>');
                        
                    title.innerHTML = highlightedText;
                }
                else{
                    title = karte[i].querySelector(".small.card.hoverable .card-image .card-title");
                    title.innerHTML = title.innerHTML.replaceAll('<span class="highlighted-belo">',"").replaceAll('</span>',"");
                }
                
            }
            else{
                karte[i].style.display="none";
            }
        }
    });
    searchTip.addEventListener("input", function(event){
        var unosNaz = searchNaz.value.toLowerCase();
        var unosTip = searchTip.value.toLowerCase();
        var unosPrevoz = searchPrevoz.value.toLowerCase();

        var karte = document.querySelectorAll(".karta");
        for(var i = 0; i<karte.length;i++){
            idDest = karte[i].id;
            console.log(idDest);
            if(destinacije[idDest]["naziv"].toLowerCase().includes(unosNaz) && destinacije[idDest]["tip"].toLowerCase().includes(unosTip) && destinacije[idDest]["prevoz"].toLowerCase().includes(unosPrevoz)){
                karte[i].style.display="block";
                if(unosTip!="" || unosPrevoz!=""){
                    document.getElementById("a" + idDest).className = "highlighted";
                }
                else{
                    document.getElementById("a" + idDest).className = "";
                }
                if(unosNaz!=""){
                    title = karte[i].querySelector(".small.card.hoverable .card-image .card-title");
                    tekst  = title.textContent;
                    var regex = new RegExp('(' + unosNaz + ')', 'gi');
    
                    var highlightedText = tekst.replace(regex, '<span class="highlighted-belo">$1</span>');
                        
                    title.innerHTML = highlightedText;
                }
                else{
                    title = karte[i].querySelector(".small.card.hoverable .card-image .card-title");
                    title.innerHTML = title.innerHTML.replaceAll('<span class="highlighted-belo">',"").replaceAll('</span>',"");
                }
                
            }
            else{
                karte[i].style.display="none";
            }
        }
    });
    searchPrevoz.addEventListener("input", function(event){
        var unosNaz = searchNaz.value.toLowerCase();
        var unosTip = searchTip.value.toLowerCase();
        var unosPrevoz = searchPrevoz.value.toLowerCase();

        var karte = document.querySelectorAll(".karta");
        for(var i = 0; i<karte.length;i++){
            idDest = karte[i].id;
            console.log(idDest);
            if(destinacije[idDest]["naziv"].toLowerCase().includes(unosNaz) && destinacije[idDest]["tip"].toLowerCase().includes(unosTip) && destinacije[idDest]["prevoz"].toLowerCase().includes(unosPrevoz)){
                karte[i].style.display="block";
                if(unosTip!="" || unosPrevoz!=""){
                    document.getElementById("a" + idDest).className = "highlighted";
                }
                else{
                    document.getElementById("a" + idDest).className = "";
                }
                if(unosNaz!=""){
                    title = karte[i].querySelector(".small.card.hoverable .card-image .card-title");
                    tekst  = title.textContent;
                    var regex = new RegExp('(' + unosNaz + ')', 'gi');
    
                    var highlightedText = tekst.replace(regex, '<span class="highlighted-belo">$1</span>');
                        
                    title.innerHTML = highlightedText;
                }
                else{
                    title = karte[i].querySelector(".small.card.hoverable .card-image .card-title");
                    title.innerHTML = title.innerHTML.replaceAll('<span class="highlighted-belo">',"").replaceAll('</span>',"");
                }
                
            }
            else{
                karte[i].style.display="none";
            }
        }
    });
}