const option = {
    firstBackground: '#FFFFFF'
}
emojisp.create('run-canvas', option)

emojisp.spriteListWrite = () => {
    const key = Object.keys(spriteOption)
    if (key.length == 0) {
        document.getElementById('spriteList').innerHTML = '<div class="no-run">スプライトが作成されていません。</div>';
    }
    else {
        key.forEach(element => {
            const spriteList = document.getElementById('spriteList');
            spriteList.innerHTML = '';

            let spriteElement = document.createElement('div');
            spriteElement.innerHTML = `<div class="sprite-list-icon">
              <div class="image-base"><img src="${spriteOption[element].url}" class="icon"></div>
              <div class="id" title="${spriteOption[element].id}"><span class="text">${spriteOption[element].id}</span></div>
              <button class="material-symbols-outlined close-button">close</button>
            </div>`

            spriteList.appendChild(spriteElement)
        });
    }
}

