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