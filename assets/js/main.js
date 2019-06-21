(() => {
document.addEventListener("DOMContentLoaded", ()=>{
    const menu = document.querySelector('.hamburger_menu');
    const menuNav = document.querySelector('nav');
    const navItems = document.querySelectorAll(".nav-item");

    let menu_visible = false;

    menu.addEventListener('click', ()=>{
        "use strict"
        if(!menu_visible) {
            menu.classList.add('close');
            menuNav.classList.add('show');
            navItems.forEach(item => item.classList.add('show'));
            menu_visible = true;
        } else {
            menu.classList.remove('close');
            menuNav.classList.remove('show');
            navItems.forEach(item => item.classList.remove('show'));
            menu_visible = false;
        }
    });

    // Set navbar position
    /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector(".sidebar_bg").style.top = "0";
    } else {
        document.querySelector(".sidebar_bg").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
    }

});  /* End of document.DOMloaded function */
})() /* End of anonymous wrapper function  */