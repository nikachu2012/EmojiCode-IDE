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
        const pictureSetting = document.getElementById('pictureSetting')

        const reader = new FileReader()

        if (InputID.value == '') {
            alert('idが入力されていません。')
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
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        x: 0,
                        y: 0,
                        deg: 0,
                        rotateType: "free",
                    }

                    console.log(option)
                    emojisp.createSprite(option)
                    spriteListWrite();
                    closeModal();
                    pictureSetting.innerHTML = `画像を選択すると表示されます。`
                    uploadImage.value = '';
                    document.getElementById('uploadArea').className = document.getElementById('uploadArea').className.replace(' selected', '')
                    InputID.value = '';
                    pictureSetting.className = pictureSetting.className.replace(' open', '')
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
    const pictureSetting = document.getElementById('pictureSetting')
    
    
    const uploadImage = document.querySelector('#fileUpload')
    const file = uploadImage.files[0]
    if (upload !== undefined) {
        document.getElementById('uploadArea').className += ' selected'

        const reader = new FileReader()

        reader.onload = (event) => {
            const base64Text = reader.result;
            const img = new Image();
            img.src = base64Text;

            img.onload = () => {
                pictureSetting.innerHTML = `
                <input type="checkbox" name="size" id="size" onchange="connecttext('pictureWidth', 'pictureHeight', this.checked)">
                <label for="size">サイズを変更する</label>
                <input type="number" class="imgSize" id="pictureWidth" placeholder="横幅" value="${img.naturalWidth}" disabled="disabled">px<br>
                <input type="number" class="imgSize" id="pictureHeight" placeholder="縦幅" value="${img.naturalHeight}" disabled="disabled">px<br>
                <div>0を入力すると自動計算します。</div>
                `
            }
           
        }
        if (file) {
            reader.readAsDataURL(file)
        }
    }
    else {
        document.getElementById('uploadArea').className = document.getElementById('uploadArea').className.replace(' selected', '')
        pictureSetting.innerHTML = `画像を選択すると表示されます。`
    }

}

const dt_tags = document.querySelectorAll('.accordion dt');
dt_tags.forEach(dt => {
    dt.addEventListener('click', () => {
        dt.classList.toggle('open');
        dt.nextElementSibling.classList.toggle('open');
    })
});


function connecttext(textid, textid2, ischecked) {
    if (ischecked == true) {
        // チェックが入っていたら有効化
        document.getElementById(textid).disabled = false;
        document.getElementById(textid2).disabled = false;
    }
    else {
        // チェックが入っていなかったら無効化
        document.getElementById(textid).disabled = true;
        document.getElementById(textid2).disabled = true;
    }
}