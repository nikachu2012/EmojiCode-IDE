const pushFlag = () => {
    const code = Blockly.JavaScript.workspaceToCode();
    document.getElementById('console').innerHTML = `<div class="logArea" id="logArea"></div>`
    document.getElementById('outputJS').innerHTML = `<pre><code>${code}</code></pre>`


    try {
        const AST = acorn.parse(code, { ecmaVersion: 8 });
        document.getElementById('error').innerHTML =
            `<div class="success material-symbols-outlined" style="font-size: 40pt;">done</div>
            <span class="text">エラーは発見されませんでした。</span>`;
        document.getElementById('outputAST').innerHTML = `<pre style="word-break:none;"><code>${JSON.stringify(AST)}</code></pre>`
        hljs.initHighlighting();

        runCode(code);

        toastr.success('コードの実行が完了しました。');
    } catch (error) {
        document.getElementById('error').innerHTML =
            `<div class="error material-symbols-outlined" style="font-size: 40pt;">close</div>
            <span class="text">エラーが発見されました。</span>
            <div class="message">
              ${error}
            </div>`;
        document.getElementById('outputAST').innerHTML = `エラーが発見されたため、ASTを出力できませんでした。`

        toastr.error('エラーが発見されました。<br>修正してください。');
    }
};


document.getElementById('close').addEventListener('click', () => {
    document.getElementById('run').style.visibility = 'hidden';
    document.getElementById('run').style.width = '0px'

    document.getElementById('code').style.width = '100vw'
    document.getElementById('viewButton').style.visibility = `visible`
})

document.getElementById('viewButton').addEventListener('click', () => {
    document.getElementById('run').style.visibility = 'visible';
    document.getElementById('run').style.width = '500px'

    document.getElementById('code').style.width = 'calc(100vw - 500px)'
    document.getElementById('viewButton').style.visibility = 'hidden'
})
