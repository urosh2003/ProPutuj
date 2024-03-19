var firebaseUrl = 'https://web-dizajn-7f8d7-default-rtdb.europe-west1.firebasedatabase.app';

var agencije = {};
var agencijeIDs = [];
const link = window.location.search;
const ids = new URLSearchParams(link);
console.log(link);



document.addEventListener('DOMContentLoaded', function() {
    var agencijareq = new XMLHttpRequest();
    var idAgencije = ids.get("agencijaID");

    agencijareq.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                var agencija = JSON.parse(agencijareq.responseText);
                console.log(agencija);
                ucitajDestinaciju(agencija, idAgencije);
            }
        }
    }

    agencijareq.open('GET', firebaseUrl + '/agencije/' + idAgencije + '.json');
    agencijareq.send();
  });

  function ucitajDestinaciju(agencija, idAgencije){
    var destinacijareq = new XMLHttpRequest();

    var idDestinacije = ids.get("destinacijaID");
    console.log(idDestinacije);


    destinacijareq.onreadystatechange = function(){
        if (this.readyState == 4){
            if (this.status==200){
                var destinacija = JSON.parse(destinacijareq.responseText);
                console.log(destinacija);
                srediStranicu(destinacija, agencija);
                
            }
        }
    }

    destinacijareq.open('GET', firebaseUrl + '/destinacije/' + agencija["destinacije"] + "/" + idDestinacije + '.json');
    destinacijareq.send();
  }


  function srediStranicu(destinacija, agencija){
    document.getElementById("naziv").innerHTML = destinacija["naziv"];
    document.getElementById("prevoznik").innerHTML = "Prevoznik: " + agencija["naziv"];
    document.getElementById("tip").innerHTML = "Tip: " + destinacija["tip"];
    document.getElementById("cena").innerHTML = "Cena: " +  destinacija["cena"];
    document.getElementById("tekst").innerHTML = destinacija["opis"];
    document.getElementById("prevoz").innerHTML = "Prevoz: " + destinacija["prevoz"];
    document.getElementById("max").innerHTML = "Maksimalan broj osoba: " + destinacija["maxOsoba"];

    duzina = destinacija["slike"].length;
    for(let i=0; i < duzina; i++){
        var slajd = document.createElement("div");
        slajd.className = "mySlides fade";
        var broj = document.createElement("div");
        broj.className = "numbertext"; 
        broj.innerHTML = (i+1) + "/" + duzina;
        var slika = document.createElement("img");
        slika.setAttribute("src", destinacija["slike"][i]);

        slajd.appendChild(broj);
        slajd.appendChild(slika);
        document.getElementById("slike").appendChild(slajd);

        var tacka = document.createElement("span");
        tacka.className = "dot";
        var j = i+1;
        tacka.setAttribute("onclick", "currentSlide(" + j + ")"); 

        document.getElementById("tacke").appendChild(tacka);
    }
    var prethodna = document.createElement("a");
    prethodna.className = "prev";
    prethodna.setAttribute("onclick","plusSlides(-1)");
    prethodna.innerHTML = "&#10094;"
    document.getElementById("slike").append(prethodna);

    var sledeca = document.createElement("a");
    sledeca.className = "next";
    sledeca.setAttribute("onclick","plusSlides(1)");
    sledeca.innerHTML = "&#10095;"
    document.getElementById("slike").append(sledeca);


    showSlides(slideIndex);

    //<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    //<a class="next" onclick="plusSlides(1)">&#10095;</a>


    
  }

let slideIndex = 1;
  

function plusSlides(n) {
    showSlides(slideIndex += n);
}
  
function currentSlide(n) {
    showSlides(slideIndex = n);
}
  
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }