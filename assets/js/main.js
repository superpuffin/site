(() => {
    "use strict"
    var  menu_visible = false;
document.addEventListener("DOMContentLoaded", ()=>{
    const menu = document.querySelector('.hamburger_menu');
    // const menu_div = document.querySelector('.sidebar_bg');
    // const menuNav = document.querySelector('nav');
    // const navItems = document.querySelectorAll(".nav-item");
    const social = document.querySelector('.social-icons');

    menu.addEventListener('click', ()=>{
        "use strict"
        if(!menu_visible) {
            menu.classList.add('close');
            // menu_div.classList.remove('closed');
            // menuNav.classList.add('show');
            // menu_div.classList.add('show');
            // social.classList.add('show');
            // navItems.forEach(item => item.classList.add('show'));
            menu_visible = true;
        } else {
            menu.classList.remove('close');
            // menu_div.classList.add('closed');
            // menuNav.classList.remove('show');
            // menu_div.classList.remove('show');
            // social.classList.remove('show');
            // navItems.forEach(item => item.classList.remove('show'));
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