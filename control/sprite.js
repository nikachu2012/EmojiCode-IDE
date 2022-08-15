const option = {
    firstBackground: '#FFFFFF'
}
emojisp.create('run-canvas', option)

spriteListWrite = () => {
    const key = Object.keys(spriteOption)
    if (key.length == 0) {
        document.getElementById('spriteList').innerHTML = '<div class="no-run">スプライトが作成されていません。</div>';
    }
    else {
        const spriteList = document.getElementById('spriteList');
        spriteList.innerHTML = '';
        key.forEach(element => {

            let spriteElement = document.createElement('div');
            spriteElement.innerHTML = `<div class="sprite-list-icon" id="spriteList_${element}">
              <div class="image-base"><img src="${spriteOption[element].url}" class="icon"></div>
              <div class="id" title="${spriteOption[element].id}"><span class="text">${spriteOption[element].id}</span></div>
              <button class="material-symbols-outlined close-button" onclick="spriteDelList(\`${element}\`)">close</button>
              <button class="material-symbols-outlined edit-button" onclick="openSpriteEdit(\`${element}\`)">edit</button>
            </div>`

            spriteList.appendChild(spriteElement)
        });
    }
}


spriteDelList = (id) => {
    try {


        const result = confirm('本当に削除しますか？')

        if (result) {
            if (Object.keys(spriteOption).includes(id)) {
                emojisp.deleteSprite(id)
                document.getElementById(`spriteList_${id}`).remove();

                if (Object.keys(spriteOption).length == 0) {
                    document.getElementById('spriteList').innerHTML = '<div class="no-run">スプライトが作成されていません。</div>';
                }
            }
            else {
                alert('指定されたスプライトが存在していません。')
                console.error('EmojiCode IDE: 指定されたスプライトが存在していません。')
                return null
            }
        }
        else{}


    } catch (error) {
        alert('EmojiCode IDE Error detect!\nPlease see DevTools.')
        console.log(error)
    }


}

openSpriteEdit = (id) => {
    document.getElementById('sizeChange_confirm').addEventListener('click', () => {
        closeSpriteChange(`${id}`)
    });
    document.getElementById('sizeChange_button').addEventListener('click', () => {
        sizeCanvas(emojisp.accessSpriteData(id).width, emojisp.accessSpriteData(id).height,'sizeChange_width', 'sizeChange_height')
    });
    document.getElementById('sizeChange_width').value = emojisp.accessSpriteData(id).width;
    document.getElementById('sizeChange_height').value = emojisp.accessSpriteData(id).height;

    displayModal('modal2')

}

closeSpriteChange = (id) => {
    closeModal();

    const option = {
        width: parseInt(document.getElementById('sizeChange_width').value),
        height: parseInt(document.getElementById('sizeChange_height').value),
        url: emojisp.accessSpriteData(id).url,
    }

    emojisp.editSprite(id, option)
}
