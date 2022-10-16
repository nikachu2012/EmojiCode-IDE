document.querySelector('#fileSaveButton').addEventListener('click', () => {
    const id = window.prompt('ファイル名を入力してください。')

    if (id === '' || id == null) {

    }
    else {
        const xmlDom = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

        const editorText = getEditorText();

        let savefile = {}

        savefile.blocklyXML = encodeURI(xmlText)
        savefile.editorText = encodeURI(editorText)
        savefile.soundDetail = encodeURI(JSON.stringify(emojiau.soundDetail));
        savefile.spriteOption = encodeURI(JSON.stringify(spriteOption));
        savefile.buildBlockly = encodeURI(Blockly.JavaScript.workspaceToCode(workspace))
        savefile.saveDate = Date.now().toString();
        savefile.isBlockly = isBlockly;


        console.log(savefile)

        var blob = new Blob([JSON.stringify(savefile)], { type: "text/plain;charset=utf-8" });

        if (debug == false) {
            saveAs(blob, `${id}.eci`);
        }
        else if (debug == true) {
            saveAs(blob, `[debug]${id}.json`);
        }
    }
})

document.querySelector('#quickSave').addEventListener('click', () => {

    const id = window.prompt('保存名を入力してください')

    if (id == '' || id == null) {

    }
    else {
        const xmlDom = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

        const editorText = getEditorText();

        let savefile = {}

        savefile.blocklyXML = encodeURI(xmlText)
        savefile.editorText = encodeURI(editorText)
        savefile.soundDetail = encodeURI(JSON.stringify(emojiau.soundDetail));
        savefile.spriteOption = encodeURI(JSON.stringify(spriteOption));
        savefile.buildBlockly = encodeURI(Blockly.JavaScript.workspaceToCode(workspace));
        savefile.isBlockly = isBlockly;

        savefile.saveDate = Date.now().toString();


        console.log(savefile)
        localforage.setItem(id, JSON.stringify(savefile)).then();
    }
})
