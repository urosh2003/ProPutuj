var firebaseUrl = 'https://web-dizajn-7f8d7-default-rtdb.europe-west1.firebasedatabase.app';

var agencije = {};
var agencijeIDs = [];
var destinacije = [];

document.addEventListener('DOMContentLoaded', function() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                agencije = JSON.parse(request.responseText);

                for(var id in agencije){
                    var agencija = agencije[id];
                    console.log(agencija);
                    dodajKartu("sveAgencije", agencija, id)

                    agencijeIDs.push(id);
                }

                ucitaj_destinacije();
            }
        }
    }

    request.open('GET', firebaseUrl + '/agencije.json');
    request.send();

  });

  function ucitaj_destinacije(){   
    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                destinacije = JSON.parse(request.responseText);
                dodajSearch();

            }
        }
    }

    request.open('GET', firebaseUrl + '/destinacije.json');
    request.send();
}

  function dodajKartu(pozicija, agencija, id){
    var karta = document.createElement("div");
    karta.className = "karta";
    karta.setAttribute("id", id);
    var srkarta = document.createElement("div");
    srkarta.className = "medium card hoverable";
    var kartaSlika = document.createElement("div");
    kartaSlika.className = "card-image";
    var slika = document.createElement("img");
    slika.setAttribute("src", agencija["logo"]);
    var naslov = document.createElement("span");
    naslov.className = "card-title";
    naslov.innerHTML = agencija["naziv"];
    var sardzaj = document.createElement("div");
    sardzaj.className="card-content";
    var adresa = document.createElement("p");
    adresa.innerHTML = agencija["adresa"];
    var broj = document.createElement("p");
    broj.innerHTML = agencija["brojTelefona"];
    var akcija = document.createElement("div");
    akcija.className = "card-action";
    var link = document.createElement("a");
    link.setAttribute("id", agencija["destinacije"]);
    //link.setAttribute("href", `javascript:generisiAgenciju(${JSON.stringify(agencija)})`);
    link.innerHTML = "pogledaj destinacije";
    link.setAttribute("href", "./agencije.html?agencijaID=" + id);
    
    akcija.appendChild(link);
    sardzaj.appendChild(adresa);
    sardzaj.appendChild(broj);
    kartaSlika.appendChild(slika);
    kartaSlika.appendChild(naslov);
    srkarta.appendChild(kartaSlika);
    srkarta.appendChild(sardzaj);
    srkarta.appendChild(akcija);
    karta.appendChild(srkarta);
    document.getElementById(pozicija).appendChild(karta);
  }

function dodajSearch(){
    var search = document.getElementById("pretragaAgencija");
    var searchd = document.getElementById("pretragaAgencijaD");

    search.addEventListener("input", function(event){
        var unos = search.value.toLowerCase();
        var unosd = searchd.value.toLowerCase();


        var karte = document.querySelectorAll(".karta");
        for(var i = 0; i<karte.length;i++){
            idAgencije = karte[i].id;
            destAgencije = agencije[idAgencije]["destinacije"];
            console.log(destAgencije);

            for(var idDest in destinacije[destAgencije]){
                console.log(destinacije[destAgencije][idDest]["naziv"]);
                if(destinacije[destAgencije][idDest]["naziv"].toLowerCase().includes(unosd) && agencije[idAgencije]["naziv"].toLowerCase().includes(unos)){
                    karte[i].style.display="block";
                    if(unosd!=""){
                        document.getElementById(destAgencije).className = "highlighted";
                    }
                    else{
                        document.getElementById(destAgencije).className = "";
                    }
                    if(unos!=""){
                        title = karte[i].querySelector(".medium.card.hoverable .card-image .card-title");
                        tekst  = title.textContent;
                        var regex = new RegExp('(' + unos + ')', 'gi');
      
                        var highlightedText = tekst.replace(regex, '<span class="highlighted-belo">$1</span>');
                        
                        title.innerHTML = highlightedText;
                    }
                    else{
                        title = karte[i].querySelector(".medium.card.hoverable .card-image .card-title");
                        title.innerHTML = title.innerHTML.replaceAll('<span class="highlighted-belo">',"").replaceAll('</span>',"");
                    }

                    break;
                }
                else{
                    karte[i].style.display="none";
                }
            }
        }
    });
    searchd.addEventListener("input", function(event){
        var unos = search.value.toLowerCase();
        var unosd = searchd.value.toLowerCase();


        var karte = document.querySelectorAll(".karta");
        for(var i = 0; i<karte.length;i++){
            idAgencije = karte[i].id;
            destAgencije = agencije[idAgencije]["destinacije"];
            console.log(destAgencije);

            for(var idDest in destinacije[destAgencije]){
                console.log(destinacije[destAgencije][idDest]["naziv"]);
                if(destinacije[destAgencije][idDest]["naziv"].toLowerCase().includes(unosd) && agencije[idAgencije]["naziv"].toLowerCase().includes(unos)){
                    karte[i].style.display="block";
                    if(unosd!=""){
                        document.getElementById(destAgencije).className = "highlighted";
                    }
                    else{
                        document.getElementById(destAgencije).className = "";
                    }
                    if(unos!=""){
                        title = karte[i].querySelector(".medium.card.hoverable .card-image .card-title");
                        tekst  = title.textContent;
                        var regex = new RegExp('(' + unos + ')', 'gi');
      
                        var highlightedText = tekst.replace(regex, '<span class="highlighted-belo">$1</span>');
                        
                        title.innerHTML = highlightedText;
                    }
                    else{
                        title = karte[i].querySelector(".medium.card.hoverable .card-image .card-title");
                        title.innerHTML = title.innerHTML.replaceAll('<span class="highlighted-belo">',"").replaceAll('</span>',"");
                    }

                    break;
                }
                else{
                    karte[i].style.display="none";
                }
            }
        }
    });
}
