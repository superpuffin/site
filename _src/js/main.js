import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/brands'

(() => {
    "use strict"
    var  menu_visible = false;
document.addEventListener("DOMContentLoaded", ()=>{
    const menu = document.querySelector('.hamburger_menu');
    const nav = document.querySelector('#navb');

    menu.addEventListener('click', ()=>{
        "use strict"
        if(!menu_visible) {
            menu.classList.add('close');
            nav.classList.add('show');
            nav.classList.add('d-flex');
            menu_visible = true;
        } else {
            menu.classList.remove('close');
            nav.classList.remove('show');
            nav.classList.remove('d-flex');
            menu_visible = false;
        }
    });

    // // Set navbar position
    // /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    // let prevScrollpos = window.pageYOffset;
    // window.onscroll = () => {
    // let currentScrollPos = window.pageYOffset;
    // if (prevScrollpos > currentScrollPos) {
    //     document.querySelector(".sidebar_bg").style.top = "0";
    // } else if (menu_visible == false) {
    //     document.querySelector(".sidebar_bg").style.top = "-100px";
    // }
    // prevScrollpos = currentScrollPos;
    // }

});  /* End of document.DOMloaded function */
})() /* End of anonymous wrapper function  */