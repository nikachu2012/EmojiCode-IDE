document.querySelector('#loadtoFileConfirm').addEventListener('click', () => {
    try {
        const fileinput = document.querySelector('#saveFileLoad');
        const file = fileinput.files[0]

        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target.result;
            console.log(text);

            const data = JSON.parse(text)

            const convertSpriteOption = JSON.parse(decodeURI(data.spriteOption));
            const convertSoundDetail = JSON.parse(decodeURI(data.soundDetail));
            const editorText = decodeURI(data.editorText);

            console.log(convertSpriteOption)
            var xml = Blockly.Xml.textToDom(decodeURI(data.blocklyXML));
            workspace.clear();
            Blockly.Xml.domToWorkspace(xml, workspace);

            editorReplace(editorText)

            emojiau.soundDetail = {}
            spriteOption = {}


            Object.keys(convertSpriteOption).forEach((e) => {
                emojisp.createSprite(convertSpriteOption[e])
            })
            emojiau.detailAdd(convertSoundDetail)


            spriteListWrite();
            soundListWrite();
        }

        if (file) {
            reader.readAsText(file)
            closeModal();
            fileinput.value = '';
            document.getElementById('saveFileArea').className = document.getElementById('saveFileArea').className.replace(' selected', '')

        }
        else {
            toastr.error('ファイルをアップロードしてください')
        }

    } catch (error) {
        alert('EmojiCode IDE Error detect!\nPlease see DevTools.')
        console.log(error);
    }

})


document.querySelector('#quickLoad').addEventListener('click', () => {
    localforage.keys().then(function (keys) {
        // An array of all the key names.
        const selectModal = document.querySelector("#listBody")
        selectModal.innerHTML = null
        keys.forEach((e, i) => {
            if (e == '' || e == null || /^emoji\_/.test(e)) {

            }
            else {
                let fileList = document.createElement('button')
                fileList.className = "fileList";
                fileList.id = `ide_${e}_fileList`
                fileList.innerHTML = `${e}`
                selectModal.appendChild(fileList)
                document.querySelector(`#ide_${e}_fileList`).addEventListener('click', () => {
                    loadFile(`${e}`)
                })
            }
        })


        console.log(keys);
    }).catch(function (err) {
        alert('EmojiCode IDE Error detect!\nPlease see DevTools.')
        console.log(err);
    });

    displayModal('modal_quickLoad')
})


const loadFile = (id) => {
    closeModal();

    Object.keys(spriteOption).forEach(element => {
        app.stage.removeChild(emojisp.spriteData[element])
    });

    localforage.getItem(id).then(function (value) {
        const data = JSON.parse(value)

        const convertSpriteOption = JSON.parse(decodeURI(data.spriteOption));
        const convertSoundDetail = JSON.parse(decodeURI(data.soundDetail));
        const editorText = decodeURI(data.editorText)

        console.log(convertSpriteOption)
        var xml = Blockly.Xml.textToDom(decodeURI(data.blocklyXML));
        workspace.clear();
        Blockly.Xml.domToWorkspace(xml, workspace);

        editorReplace(editorText)
        emojiau.soundDetail = {}
        spriteOption = {}


        Object.keys(convertSpriteOption).forEach((e) => {
            emojisp.createSprite(convertSpriteOption[e])
        })
        emojiau.detailAdd(convertSoundDetail)


        spriteListWrite();
        soundListWrite();
    }).catch(function (err) {
        alert('EmojiCode IDE Error detect!\nPlease see DevTools.')
        console.log(err);
    });

}
