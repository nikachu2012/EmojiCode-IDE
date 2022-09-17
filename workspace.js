
Promise.all(
    ["./emojicode/build/workspace.xml", "./emojicode/build/toolbox.xml"].map(async file => {
        return fetch(file).then(
            (res) => {
                return res.text();
            }
        );
    })
).then((xmls) => {
    xmls.forEach((xml) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xml, "application/xml");
        document.body.appendChild(doc.documentElement);
    });

}).then(() => {
    var options = {
        theme: 'darkmode',
        toolbox: document.getElementById("toolbox"),
        collapse: true,
        renderer: 'thrasos',
        comments: true,
        disable: true,
        maxBlocks: Infinity,
        trashcan: true,
        horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        media: 'https://blockly-demo.appspot.com/static/media/',
        rtl: false,
        scrollbars: true,
        sounds: true,
        oneBasedIndex: true,
        grid: {
            spacing: 20,
            length: 1,
            colour: '#888',
            snap: false
        },
        zoom: {
            controls: true,
            wheel: false,
            startScale: 1,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        },
    };

    var workspace = Blockly.inject('code', options);

    const code = document.getElementById('code')

    const observer = new MutationObserver(records => {
        // 変化が発生したときの処理を記述
        Blockly.svgResize(workspace);
    })

    observer.observe(code, {
        attributes: true,
        attributeFilter: ['style']
    })


    document.querySelector('#quickSave').addEventListener('click', () => {

        const id = window.prompt('保存名を入力してください')

        if (id == '' || id == null) {

        }
        else {
            const xmlDom = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

            let savefile = {}

            savefile.blocklyXML = encodeURI(xmlText)
            savefile.soundDetail = encodeURI(JSON.stringify(emojiau.soundDetail));
            savefile.spriteOption = encodeURI(JSON.stringify(spriteOption));
            savefile.saveDate = Date.now().toString();


            console.log(savefile)
            localforage.setItem(id, JSON.stringify(savefile)).then();
        }
    })

    const loadFile = (id) => {
        closeModal();

        localforage.getItem(id).then(function (value) {
            const data = JSON.parse(value)

            const convertSpriteOption = JSON.parse(decodeURI(data.spriteOption));
            const convertSoundDetail = JSON.parse(decodeURI(data.soundDetail));

            console.log(convertSpriteOption)
            var xml = Blockly.Xml.textToDom(decodeURI(data.blocklyXML));
            workspace.clear();
            Blockly.Xml.domToWorkspace(xml, workspace);

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

    document.querySelector('#fileSaveButton').addEventListener('click', () => {
        const id = window.prompt('ファイル名を入力してください。')

        if (id === '') {

        }
        else {
            const xmlDom = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

            let savefile = {}

            savefile.blocklyXML = encodeURI(xmlText)
            savefile.soundDetail = encodeURI(JSON.stringify(emojiau.soundDetail));
            savefile.spriteOption = encodeURI(JSON.stringify(spriteOption));
            savefile.saveDate = Date.now().toString();


            console.log(savefile)

            var blob = new Blob([JSON.stringify(savefile)], { type: "text/plain;charset=utf-8" });
            saveAs(blob, `${id}.eci`);
        }
    })


    document.querySelector('#allDeleteIDB').addEventListener('click', () => {
        localforage.clear().then(function () {
            // Run this code once the database has been entirely deleted.
            console.log('Database is now empty.');
        }).catch(function (err) {
            alert('EmojiCode IDE Error detect!\nPlease see DevTools.')
            console.log(err);
        });
    })

    document.querySelector('#quickLoad').addEventListener('click', () => {
        localforage.keys().then(function (keys) {
            // An array of all the key names.
            const selectModal = document.querySelector("#listBody")
            selectModal.innerHTML = null
            keys.forEach((e, i) => {
                if (e == '' || e == null) {

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

        displayModal('modal5')
    })

    document.querySelector('#saveFileConfirm').addEventListener('click', () => {
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

                console.log(convertSpriteOption)
                var xml = Blockly.Xml.textToDom(decodeURI(data.blocklyXML));
                workspace.clear();
                Blockly.Xml.domToWorkspace(xml, workspace);

                emojiau.soundDetail = {}
                spriteOption = {}


                Object.keys(convertSpriteOption).forEach((e) => {
                    emojisp.createSprite(convertSpriteOption[e])
                })
                emojiau.detailAdd(convertSoundDetail)


                spriteListWrite();
                soundListWrite();
            }

            reader.readAsText(file)
            closeModal();
            fileinput.value = '';
            document.getElementById('saveFileArea').className = document.getElementById('saveFileArea').className.replace(' selected', '')
        } catch (error) {
            alert('EmojiCode IDE Error detect!\nPlease see DevTools.')
            console.log(error);
        }

    })


});

Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;

