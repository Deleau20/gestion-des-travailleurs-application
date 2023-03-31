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


