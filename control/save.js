const openMenu = (id) => {
    document.querySelector(id).style.visibility = 'visible'
}

const closeMenu = () => {
    document.querySelectorAll('.menu').forEach(element => {
        element.style.visibility = 'hidden';
    });
}


document.querySelector('#file').addEventListener('click', ()=>{
    buttonFile()
})

document.querySelector('#help').addEventListener('click', ()=>{
    buttonHelp()
})

let menuFileBool = false;
const buttonFile = () => {
    closeMenu()
    document.querySelector('#file').style.backgroundColor = '';
    document.querySelector('#help').style.backgroundColor = '';
    menuHelpBool = false;

    if(menuFileBool == false){
        openMenu('.menu_file');
        document.querySelector('#file').style.backgroundColor = '#616161';

        menuFileBool = true;
    }
    else if(menuFileBool == true){
        closeMenu();
        document.querySelector('#file').style.backgroundColor = '';

        menuFileBool = false;
    }
}

let menuHelpBool = false;
const buttonHelp = () => {
    closeMenu()
    document.querySelector('#file').style.backgroundColor = '';
    document.querySelector('#help').style.backgroundColor = '';
    menuFileBool = true;

    if(menuHelpBool == false){
        openMenu('.menu_help');
        document.querySelector('#help').style.backgroundColor = '#616161';

        menuHelpBool = true;
    }
    else if(menuHelpBool == true){
        closeMenu();
        document.querySelector('#help').style.backgroundColor = '';

        menuHelpBool = false;
    }
}

let menuDebugBool = false;
const buttonDebug = () => {
    closeMenu()
    document.querySelector('#file').style.backgroundColor = '';
    document.querySelector('#help').style.backgroundColor = '';
    menuFileBool = true;

    if(menuHelpBool == false){
        openMenu('.menu_help');
        document.querySelector('#help').style.backgroundColor = '#616161';

        menuHelpBool = true;
    }
    else if(menuHelpBool == true){
        closeMenu();
        document.querySelector('#help').style.backgroundColor = '';

        menuHelpBool = false;
    }
}
