let isBlockly = true;
const changeInput= ()=>{
    const code = document.getElementById('code');
    const code_editor = document.getElementById('code-editor')
    const button = document.getElementById('changeCodeInput')
    if(isBlockly == true){
        // monaco editorに変更
        code.style.width = '0';
        code.style.visibility = 'hidden';
        
        code_editor.style.width = 'calc(100vw - 500px)';
        code_editor.style.visibility = 'visible';

        button.innerHTML = 'ブロックモードに変更'

        isBlockly = false;
    }
    else{
        // Blocklyに変更
        code.style.width = 'calc(100vw - 500px)';
        code.style.visibility = 'visible';
        
        code_editor.style.width = '0';
        code_editor.style.visibility = 'hidden';

        button.innerHTML = 'テキストモードに変更'

        isBlockly = true;
    }
}
