document.addEventListener("DOMContentLoaded", ()=>{
    const menu = document.querySelector('.hamburger_menu');

    let menu_visible = false;

    menu.addEventListener('click', ()=> {
        "use strict"
        if(!menu_visible) {
            menu.classList.add('close');
            menu_visible = true;
        } else {
            menu.classList.remove('close');
            menu_visible = false;
        }
    });

});

// Set navbar position
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
console.log('js loaded');
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".sidebar_bg").style.top = "0";
    console.log("0");
  } else {
    document.querySelector(".sidebar_bg").style.top = "-100px";
    console.log("-50");
  }
  prevScrollpos = currentScrollPos;
}