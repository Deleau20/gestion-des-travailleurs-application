document.addEventListener("DOMContentLoaded", function() {
    var hamburger = document.querySelector(".hamburger .hamburger__inner");
    var wrapper = document.querySelector(".wrapper");
    var profile = document.querySelector(".top_navbar .fas");
    var profileDropdown = document.querySelector(".profile_dd");
  
    hamburger.addEventListener("click", function() {
      wrapper.classList.toggle("active");
    });
  
    profile.addEventListener("click", function() {
      profileDropdown.classList.toggle("active");
    });
  });


  // Tableau ajout et gestion des travailleurs

  formulaire = document.querySelector('.formu')
  bouton = document.querySelector('.btnconnexion')
  formulaire.addEventListener('submit',(e)=>{
      e.preventDefault()
  })
  
  bouton.addEventListener('click', (e)=>{
  
      let nom = document.getElementById('nom').value
      let datenaissance = document.getElementById('date').value
      let contact = document.getElementById('contact').value
      let email = document.getElementById('email').value
  
      let ajoutemployer = {
          nom : nom,
          datenaissanc : datenaissance,
          tel : contact,
          adresseemail : email
        }
      
      let recuperation = localStorage.getItem("ajoutEmploye");
      recuperation = JSON.parse(recuperation) ;
      console.log(recuperation); 
  
      if (recuperation != null) {
          recuperation.push(ajoutemployer)
          localStorage.setItem('ajoutEmploye',JSON.stringify(recuperation));
      
      }else{
          console.log("ok")
          recuperation = []
          recuperation.push(ajoutemployer)
          localStorage.setItem('ajoutEmploye',JSON.stringify(recuperation));
      
      }    
  
  })

  //Fonction d'ajout et de suppression

  function supprimerTravailleur(index) {
    let travailleurs = JSON.parse(localStorage.getItem("ajoutEmploye"));
  
    travailleurs.splice(index, 1);
  
    localStorage.setItem("ajoutEmploye", JSON.stringify(travailleurs));
  }
  
  function modifierTravailleur(index, nom, datenaissance, contact, email) {
    let travailleurs = JSON.parse(localStorage.getItem("ajoutEmploye"));
  
    travailleurs[index].nom = nom;
    travailleurs[index].datenaissance = datenaissance;
    travailleurs[index].tel = contact;
    travailleurs[index].adresseemail = email;
  
    localStorage.setItem("ajoutEmploye", JSON.stringify(travailleurs));
  }

  // Fonctions de gestion des travailleurs
  function supprimerTravailleur(index) {
    let travailleurs = JSON.parse(localStorage.getItem("ajoutEmploye"));

    travailleurs.splice(index, 1);

    localStorage.setItem("ajoutEmploye", JSON.stringify(travailleurs));

    // Actualise la liste des travailleurs affichée sur la page
    afficherTravailleurs();
  }

  function modifierTravailleur(index, nom, datenaissance, contact, email) {
    let travailleurs = JSON.parse(localStorage.getItem("ajoutEmploye"));

    travailleurs[index].nom = nom;
    travailleurs[index].datenaissance = datenaissance;
    travailleurs[index].tel = contact;
    travailleurs[index].adresseemail = email;

    localStorage.setItem("ajoutEmploye", JSON.stringify(travailleurs));

    // Actualise la liste des travailleurs affichée sur la page
    afficherTravailleurs();
  }

  // Fonction pour afficher la liste des travailleurs
  function afficherTravailleurs() {
    let travailleurs = JSON.parse(localStorage.getItem("ajoutEmploye"));

    let listeTravailleurs = document.getElementById("liste-travailleurs");

    // Supprime tous les éléments de la liste des travailleurs
    while (listeTravailleurs.firstChild) {
      listeTravailleurs.removeChild(listeTravailleurs.firstChild);
    }

    // Ajoute chaque travailleur à la liste des travailleurs
    travailleurs.forEach((travailleur, index) => {
      let li = document.createElement("li");

      // Ajoute les informations du travailleur à la balise li
      li.textContent = `Nom: ${travailleur.nom}, Date de naissance: ${travailleur.datenaissance}, Contact: ${travailleur.tel}, Email: ${travailleur.adresseemail}`;

      // Ajoute des boutons pour modifier et supprimer le travailleur
      let btnModifier = document.createElement("button");
      btnModifier.textContent = "Modifier";
      btnModifier.addEventListener("click", () => {
        // Ouvre un formulaire pour modifier les informations du travailleur
        let nouveauNom = prompt("Entrez le nouveau nom:");
        let nouvelleDate = prompt("Entrez la nouvelle date de naissance:");
        let nouveauContact = prompt("Entrez le nouveau contact:");
        let nouvelleAdresse = prompt("Entrez la nouvelle adresse email:");

        modifierTravailleur(index, nouveauNom, nouvelleDate, nouveauContact, nouvelleAdresse);
      });

      let btnSupprimer = document.createElement("button");
      btnSupprimer.textContent = "Supprimer";
      btnSupprimer.addEventListener("click", () => {
        // Supprime le travailleur correspondant
        supprimerTravailleur(index);
      });

      // Ajoute les boutons à la balise li
      li.appendChild(btnModifier);
      li.appendChild(btnSupprimer);

      // Ajoute la balise li à la liste des travailleurs
      listeTravailleurs.appendChild(li);
    });
  }

  


