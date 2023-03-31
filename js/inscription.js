function getAdmin(){
    return JSON.parse(localStorage.getItem('admin'))
  }
  function setAdmin(item){
    return localStorage.setItem('admin', JSON.stringify(item))
  }
  
  let listAdmin = [
    {
      email: "fred1234@gmail.com",
      password: "1234",
    },
    {
      email: "koko1234@gmail.com",
      password: "0",
    }
  ]
  
  setAdmin(listAdmin)
  
  let btnLogin = document.querySelector("form") 
  btnLogin.addEventListener('submit', (e)=>{
    e.preventDefault()
    admins = getAdmin()
    let email = document.querySelector("#emailInput").value
    let pass = document.querySelector("#passInput").value
    admins.forEach((element) =>  {
      if(email === element.email && pass === element.password){
        alert("les info sont correct")
        window.location.href = 'tableau.html'
      } else {
        alert("les info sont incorrect")
      }
      
    });
    
  })