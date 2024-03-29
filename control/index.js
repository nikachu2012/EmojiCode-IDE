const pushFlag = () => {
    const backup = spriteOption;

    Object.keys(spriteOption).forEach(element => {
        app.stage.removeChild(emojisp.spriteData[element])
    });


    spriteOption = {};
    Object.keys(backup).forEach((e) => {
        emojisp.createSprite(backup[e])
    })

    let code = ""
    if (isBlockly == true) {
        code = Blockly.JavaScript.workspaceToCode(workspace);
    }
    else {
        code = getEditorText();
    }

    document.getElementById('console').innerHTML = `<div class="logArea" id="logArea"></div>`
    document.getElementById('outputJS').innerHTML = `<pre><code>${code}</code></pre>`


    try {
        const AST = acorn.parse(code, { ecmaVersion: 8 });
        document.getElementById('error').innerHTML =
            `<div class="success material-symbols-outlined" style="font-size: 40pt;">done</div>
                <span class="text">エラーは発見されませんでした。</span>`;
        document.getElementById('outputAST').innerHTML = `<pre style="word-break:none;"><code>${JSON.stringify(AST, null, "  ")}</code></pre>`
        hljs.initHighlighting();

        runCode(code);

        toastr.success('コードの実行が完了しました。');


    } catch (error) {
        console.error(error)
        document.getElementById('error').innerHTML =
            `
            <div style="display: flex;">
                <div class="error material-symbols-outlined" style="font-size: 40pt;">close</div>
                <div style="margin-top:10px;">
                    <span class="text">エラーが発見されました。</span><br>
                    <span class="errorSearch_button" id="searchGoogle">[Googleで検索]</span><span class="errorSearch_button" id="translateDeepL">[DeepLで翻訳]</span>
                </div>
            </div>
            <div class="message">
                ${error}
            </div>`;
        document.getElementById('outputAST').innerHTML = `エラーが発見されたため、ASTを出力できませんでした。`

        document.getElementById('searchGoogle').addEventListener('click', () => {
            window.open(`https://google.com/search?q=${error}`, '_blank')
        })

        document.getElementById('translateDeepL').addEventListener('click', () => {
            window.open(`https://www.deepl.com/ja/translator#en/ja/${error}`, '_blank')
        })

        toastr.error('エラーが発見されました。<br>修正してください。');
    }
};


document.getElementById('close').addEventListener('click', () => {
    document.getElementById('run').style.visibility = 'hidden';
    document.getElementById('run').style.width = '0px'

    if (isBlockly == true) {
        document.getElementById('code').style.width = '100vw'

    }
    else {
        document.querySelector('.code-editor').style.width = '100vw'
    }
    document.getElementById('viewButton').style.visibility = `visible`
})

document.getElementById('viewButton').addEventListener('click', () => {
    document.getElementById('run').style.visibility = 'visible';
    document.getElementById('run').style.width = '500px'

    if (isBlockly == true) {
        document.getElementById('code').style.width = 'calc(100vw - 500px)'

    }
    else {
        document.querySelector('.code-editor').style.width = 'calc(100vw - 500px)'
    }

    document.getElementById('viewButton').style.visibility = 'hidden'

})


/*
welcome V2
//*/

localforage.getItem('emoji_viewfirst_2.0').then(function (value) {
    if (value == null) {
        displayModal('modal_welcomeV2')
        localforage.setItem('emoji_viewfirst_2.0', 'true').then(function (value) {
        }).catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }
    else if(value == 'true'){

    }
}).catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
});
