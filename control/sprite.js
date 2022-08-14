const option = {
    firstBackground: '#FFFFFF'
}
emojisp.create('run-canvas', option)

emojisp.spriteListWrite = () =>{
    const key = Object.keys(spriteOption)
    if(key.length == 0){
        document.getElementById('spriteList').innerHTML = '<div class="no-run">スプライトが作成されていません。</div>';
    }
}

