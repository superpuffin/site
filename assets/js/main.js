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