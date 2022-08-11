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
        const InputID = document.getElementById('inputId').value
        const file = uploadImage.files[0]

        const reader = new FileReader()

        if (InputID == '') {
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
                        id: InputID,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        x: 0,
                        y: 0,
                        deg: 0,
                        rotateType: "free",
                    }

                    alert(option)
                    emojisp.createSprite(option)
                }



            }
            if(file){
                reader.readAsDataURL(file)
            }
            else{
                alert('ファイルをアップロードしてください')
            }
            
        }


    } catch (error) {
        alert('EmojiCode Sprite Controller Error detect!\nPlease see DevTools.')
        console.log(error)
    }

}


const fileNameUpdate = () => {
    const upload = document.getElementById('fileUpload').files[0]
    
    if(upload !== undefined){
        document.getElementById('uploadArea').className += ' selected'
    }
    else{
        document.getElementById('uploadArea').className = document.getElementById('uploadArea').className.replace(' selected', '')
    }
    
}