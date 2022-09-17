const openMenu = (id) => {
    document.querySelector(id).style.visibility = 'visible'
}

const closeMenu = () => {
    document.querySelectorAll('.menu').forEach(element => {
        element.style.visibility = 'hidden';
    });
}


document.querySelector('#file').addEventListener('click', () => {
    buttonFile()
})

document.querySelector('#help').addEventListener('click', () => {
    buttonHelp()
})

document.querySelector('#tool').addEventListener('click', () => {
    buttonTool()
})

let menuFileBool = false;
const buttonFile = () => {
    closeMenu()
    document.querySelector('#file').style.backgroundColor = '';
    document.querySelector('#help').style.backgroundColor = '';
    document.querySelector('#tool').style.backgroundColor = '';
    menuHelpBool = false;
    menuToolBool = false

    if (menuFileBool == false) {
        openMenu('.menu_file');
        document.querySelector('#file').style.backgroundColor = '#616161';

        menuFileBool = true;
    }
    else if (menuFileBool == true) {
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
    document.querySelector('#tool').style.backgroundColor = '';
    menuFileBool = true;
    menuToolBool = false

    if (menuHelpBool == false) {
        openMenu('.menu_help');
        document.querySelector('#help').style.backgroundColor = '#616161';

        menuHelpBool = true;
    }
    else if (menuHelpBool == true) {
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
    document.querySelector('#tool').style.backgroundColor = '';
    menuFileBool = true;
    menuToolBool = false

    if (menuDebugBool == false) {
        openMenu('.menu_help');
        document.querySelector('#help').style.backgroundColor = '#616161';

        menuHelpBool = true;
    }
    else if (menuDebugBool == true) {
        closeMenu();
        document.querySelector('#help').style.backgroundColor = '';

        menuHelpBool = false;
    }
}

let menuToolBool = false;
const buttonTool = () => {
    closeMenu()
    document.querySelector('#file').style.backgroundColor = '';
    document.querySelector('#help').style.backgroundColor = '';
    document.querySelector('#tool').style.backgroundColor = '';
    menuFileBool = true;
    menuHelpBool = false

    if (menuHelpBool == false) {
        openMenu('.menu_tool');
        document.querySelector('#tool').style.backgroundColor = '#616161';

        menuHelpBool = true;
    }
    else if (menuHelpBool == true) {
        closeMenu();
        document.querySelector('#tool').style.backgroundColor = '';

        menuHelpBool = false;
    }
}

const deleteSave = (id) => {
    let check = window.confirm(`${id}を削除してもよろしいですか?`);

    if(check){
        localforage.keys().then(function (keys) {
            if (keys.includes(id)) {
                localforage.removeItem(id).then(function () {
                    // Run this code once the key has been removed.
                    document.getElementById(`quickSave_control_${id}`).remove();
                    console.log(id + ' is cleared!');
                }).catch(function (err) {
                    // This code runs if there were any errors
                    console.log(err);
                });
            }
            else {
                toastr.error('指定されたIDが存在しません。')
            }
    
        }).catch(function (err) {
            console.log(err)
        })
    }
    else{

    }

}
function htmlspecialchars(unsafeText) {
    var text = document.createTextNode(unsafeText);
    var p = document.createElement('p');
    p.appendChild(text);
    return p.innerHTML;
}
const watchSave = (id) => {
    localforage.keys().then(function (keys) {
        if (keys.includes(id)) {
            localforage.getItem(id).then(function (value) {
                // This code runs once the value has been loaded
                // from the offline store.
                window.open(`javascript:document.body.innerHTML = \`<title>${id} のファイル内容</title>${htmlspecialchars(decodeURI(value))}\``, 'newwindow', 'width=600,height=400')
                console.log(htmlspecialchars(value));
            }).catch(function (err) {
                // This code runs if there were any errors
                console.log(err);
            });

        }
        else {
            toastr.error('指定されたIDが存在しません。')
        }

    }).catch(function (err) {
        console.log(err)
    })
}

const saveFile = (id) => {
    localforage.keys().then(function (keys) {
        if (keys.includes(id)) {
            localforage.getItem(id).then(function (value) {
                var blob = new Blob([value], { type: "text/plain;charset=utf-8" });
                saveAs(blob, `${id}.eci`);

                console.log(htmlspecialchars(value));
            }).catch(function (err) {
                console.log(err);
            });

        }
        else {
            toastr.error('指定されたIDが存在しません。')
        }

    }).catch(function (err) {
        console.log(err)
    })
}

const updateQuickSaveControl = () => {
    localforage.keys().then(function (keys) {
        // An array of all the key names.
        const selectModal = document.querySelector("#quickSaveField")
        selectModal.innerHTML = null
        keys.forEach((e, i) => {
            if (e == '' || e == null) {

            }
            else {
                let quickSave_content = document.createElement('div')

                localforage.getItem(e).then(function (value) {
                    quickSave_content.className = 'quickSave_content'
                    quickSave_content.id = `quickSave_control_${e}`
                    quickSave_content.innerHTML = `
                    <div class="title">${e}</div>
                    <div class="quickSave_menu">
                        <div class="time">${clockDate(parseInt(JSON.parse(value).saveDate, 10))}</div>
                        <div class="control">
                        <div id="delete_${e}">[削除]</div>
                        <div id="watch_${e}">[中身を見る]</div>
                        <div id="save_${e}">[ファイルに保存]</div>
                        </div>
                    </div>
                    `

                    document.querySelector(`#delete_${e}`).addEventListener('click', () => {
                        deleteSave(e)
                    })
                    document.querySelector(`#watch_${e}`).addEventListener('click', () => {
                        watchSave(e)
                    })
                    document.querySelector(`#save_${e}`).addEventListener('click', () => {
                        saveFile(e)
                    })
                }).catch(function (err) {
                    // This code runs if there were any errors
                    console.log(err);
                });



                selectModal.appendChild(quickSave_content)
            }
        })



        console.log(keys);
    }).catch(function (err) {
        alert('EmojiCode IDE Error detect!\nPlease see DevTools.')
        console.log(err);
    });

    displayModal('modal8')
}

const clockDate = (UNIXdate) => {
    const date = new Date(UNIXdate)

    return `${date.getFullYear()}/${date.getMonth().toString().padStart(2, "0")}/${date.getDay().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
}


