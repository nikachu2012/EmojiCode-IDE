// モーダルウインドウ表示
function displayModal(className) {
    $(`.${className}`).css('display', 'block');
}
// モーダルウインドウ非表示
function closeModal() {
    $('.modal').css('display', 'none');
}

const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
};

const filebase64 = () => {
    try {
        const uploadImage = document.querySelector('#fileUpload')
        const InputID = document.getElementById('inputId')
        const file = uploadImage.files[0]

        const reader = new FileReader()

        if (InputID.value == '') {
            alert('IDが入力されていません。')
        }
        else {
            reader.onload = (event) => {
                const base64Text = reader.result;
                const img = new Image();
                img.src = base64Text;


                img.onload = () => {
                    var option = {
                        url: base64Text,
                        id: InputID.value,
                        x: app.screen.width / 2,
                        y: app.screen.height / 2,
                        deg: 0,
                        rotateType: "free",
                        hanten: false,
                        visibility: true,

                    }

                    console.log(option)

                    // スプライトの作成
                    emojisp.createSprite(option)
                    
                    spriteListWrite();
                    closeModal();
                    uploadImage.value = '';
                    document.getElementById('uploadArea').className = document.getElementById('uploadArea').className.replace(' selected', '')
                    InputID.value = '';
                }
            }
            if (file) {
                reader.readAsDataURL(file)
            }
            else {
                alert('ファイルをアップロードしてください')
            }

        }


    } catch (error) {
        alert('EmojiCode IDE Error detect!\nPlease see DevTools.')
        console.log(error)
    }

}


const fileUpdate = () => {
    const upload = document.getElementById('fileUpload').files[0]

    if (upload !== undefined) {
        document.getElementById('uploadArea').className += ' selected'
    }
    else {
        document.getElementById('uploadArea').className = document.getElementById('uploadArea').className.replace(' selected', '')
    }

}

const saveLoadUpdate = () => {
    const upload = document.getElementById('saveFileLoad').files[0]

    if (upload !== undefined) {
        document.getElementById('saveFileArea').className += ' selected'
    }
    else {
        document.getElementById('saveFileArea').className = document.getElementById('saveFileArea').className.replace(' selected', '')
    }
}

const dt_tags = document.querySelectorAll('.accordion dt');
dt_tags.forEach(dt => {
    dt.addEventListener('click', () => {
        dt.classList.toggle('open');
        dt.nextElementSibling.classList.toggle('open');
    })
});


function connecttext(textid, textid2, button, ischecked) {
    if (ischecked == true) {
        // チェックが入っていたら有効化
        document.getElementById(textid).disabled = false;
        document.getElementById(textid2).disabled = false;
        document.getElementById(button).disabled = false;
    }
    else {
        // チェックが入っていなかったら無効化
        document.getElementById(textid).disabled = true;
        document.getElementById(textid2).disabled = true;
        document.getElementById(button).disabled = true;
    }
}

function sizeCanvas(width, height, textid, textid2) {
    const widthArea = document.getElementById(textid)
    const heightArea = document.getElementById(textid2)

    if (height > width) {
        widthArea.value = 0
        heightArea.value = HEIGHT;
    }
    else if (width > height) {
        widthArea.value = WIDTH;
        heightArea.value = 0;
    }
}

const audioFileUpdate = () => {
    const audioFileUpload = document.querySelector('#audioFileUpload').files[0];

    if(audioFileUpload !== undefined){
        document.getElementById('audioUploadArea').className += ' selected'
    }
    else{
        document.getElementById('audioUploadArea').className = document.getElementById('audioUploadArea').className.replace(' selected', '')
    }
}

const audioFileLoad = () => {
    const audioFileUpload = document.querySelector('#audioFileUpload');
    const inputID = document.querySelector('#audioInputId')
    
    const file = audioFileUpload.files[0];

    const reader = new FileReader();

    if(inputID.value == '') {
        alert('IDが入力されていません。')
    }
    else{
        reader.onload = (event) => {
            const base64Text = event.target.result;

            emojiau.createSound(inputID.value, base64Text)

            closeModal();
            soundListWrite();
            audioFileUpload.value = "";
            inputID.value = "";

        }

        if(file) {
            reader.readAsDataURL(file)
        }
        else{
            alert('ファイルをアップロードしてください。')
        }
    }
}
