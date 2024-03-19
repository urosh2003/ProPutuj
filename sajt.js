
function otvoriFormu() {
  document.getElementById("login").style.display = "block";
}

function zatvoriFormu() {
  document.getElementById("login").style.display = "none";
}


function otvoriRegFormu() {
  document.getElementById("register").style.display = "block";
}

function zatvoriRegFormu() {
document.getElementById("register").style.display = "none";
}

function myFunction() {
  var a = document.getElementById("meni");
  if (a.innerText === "Meni"){
      a.innerText = "Zatvori meni";
  } else {
      a.innerText = "Meni";
  }

  var x = document.getElementById("linkovi");
  if (x.className === "linkovi") {
    x.className = "linkovimeni";
  } else {
    x.className = "linkovi";
  }
}


options={}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function() {

  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, options);
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, options);
});

function registracija(){
  var email = document.getElementById("regemail").value;
  var korisnickoIme = document.getElementById("reguser").value;
  var lozinka = document.getElementById("regpass").value;
  var ime = document.getElementById("regime").value;
  var prezime = document.getElementById("regprezime").value;
  var adresa = document.getElementById("regadresa").value;
  var datum = document.getElementById("regdatum").value;
  var telefon = document.getElementById("regbroj").value;

  var korisnik = {
    "adresa": adresa, 
    "datumRodjenja": datum,
    "email": email,
    "ime": ime,
    "korisnickoIme": korisnickoIme,
    "lozinka": lozinka,
    "prezime":prezime,
    "telefon": telefon
  }
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


  request.open('POST', firebaseUrl + '/korisnici.json');
  request.send(JSON.stringify(korisnik));


}

var forma = document.getElementById("regforma");

forma.addEventListener("submit", function(event) {
  event.preventDefault();

  registracija();
  

});

var formalog = document.getElementById("login");

forma.addEventListener("submit", function(event) {
  event.preventDefault();

  fakegotovo();
  

});


function refresh(){
location.reload();
}
function fakegotovo(){
var elem = document.getElementById("uspeh");
var modal = M.Modal.getInstance(elem);
modal.open();
}