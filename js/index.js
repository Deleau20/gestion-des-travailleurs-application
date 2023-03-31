const texte = "Bienvenu sur l’appli web qui\nVous aide à garder votre calme\nEt gérer vos travailleur.";


const vitesseTyping = 20; // La vitesse à laquelle le texte est écrit (en ms)

let i = 0;
function typing() {
  if (i < texte.length) {
    document.getElementById("texte-typing").innerHTML += texte.charAt(i);
    i++;
    setTimeout(typing, vitesseTyping);
  }
}

typing();