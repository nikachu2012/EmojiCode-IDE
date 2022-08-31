const soundListWrite = () => {
    const key = Object.keys(emojiau.soundData)
    if (key.length == 0) {
        document.getElementById('soundList').innerHTML = '<div class="no-run">音声がありません</div>';
    }
    else {
        const soundList = document.getElementById('soundList');
        soundList.innerHTML = '';
        key.forEach(element => {

            let spriteElement = document.createElement('div');
            spriteElement.innerHTML = `<div class="sprite-list-icon" id="soundList_${element}">
              <div class="image-base"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAB2JJREFUeF7tnYFy3CgMht0na/tkbZ6sd092HW1DwzlG+mWELEA7k8lMFoOQPn4J7M1+OfK1tQe+bD37nPyRAGwOQQKQAGzugc2nnwqQAGzugc2nnwqQAGzugc2nnwqQAGzugc2nnwqQAGzugc2nnwqQAGzugc2nnwqQAGzugc2nnwqQAGzugc2nnwqQAGzugc2nnwqQAGzugc/T//b+p/L7n+M46GfJVyrAR1gp4D+O4yiBPwf87TiOn6tRkAD8CTgX+KVB2BkAbeBrEL6vkhZ2BYCknFZ9z2sJCHYDgFb9r56oV9dSYUgQTP3aBYAeuecCPL3/pp+AsPxGBb4MO30aWBkAizwvyXuErSHNs5xTqM8rVgTAatWTM1tnAgWMJwG4qmfU9qwEgGXgyZH0kgpGtcMlSVG8T7ZdAaqyaRUALOSeVjw5r8gosmNQOVsRXKTpf0wjOK5wQ8SiB9ogQULMugok0ndUAGC7ZgXASu45R0UHQFI9CILZALAK/Fnur1QiOgBkczcEMwEgTRaReiTwpZ8ZACBbuVqA3mdjPAMAVqseksSKolkAkOxk5x0ZAKvAa1Z9rSKSY6mtFipEpe60kdSxaacVANKBiXZSJfja6+r2dwM/Wwoo9nIQmAJQB8c68D0Br6+1OKN/QgFoTPr5+j6Z+lwC8Q1XD1xCoFEASWYQA0e3sZRkbwBa41nF6DYAMwS+V+4jbANbR7va5w5UKiDR1TJq9EpG+x8R+KdqAM7XGmVT1QItAKwqcDSQd9ppnHKnf+8UICmtZr6wClwBgEz8jkOtrtFK4t1xET9ogoLY0XWoUw0Aq8AVAFFlf6TcR6gByAYJOg1w0N3CMwCSDCEUj2hjsa3T2iUFY9RBkBQDqW5TnQvUnUkDcw5UP4p00Vn3ww3aCAvtnwKAzIIlXJhDSwX+KkkNgJR/zmOVQwqL4FPfV+M/sfKf2gWc/QtJuAAAB9Ir9gUAzeoflYtXBqCom2axWKgA18drcRUA0MJPU4RoFXlFAM4B0PqvVwW4NPaypQCAyP/o7ddqALScr4HAQgXYOoAAQOV/dD5eDQCL4LVqI80OhK0DUAA01Gqlv7TfCYC6/pL8JRZyHYXgdwIAyf8JwLWXJb/AR7JMEMVCTiKIeWzsBQCS/0fL/6rbQCm9ooc64n7+7nkACgBqKABjs8lqKYBLbeU9SUGkPtDCvAlQAtBG1uok0KIYbPWBAtD8GFkCMB4AGoGrsxB1HQXA6yAIqQEQI3vkf9UaoPhkZCWPxKYJUALgowC9lfwwgBIAHwC4egLZYXHX9yjA62ZQpoBrCKyKQOp9JAAIQE0FSQD2VoAsApnK1VIBhuVw6cOf7/NrPnKeCuCjALkNBPaIq54EckrSe5DTfX0qwHgF4FY/UsBxB0koAOxRMHI3EDUUWOhb3QuwuBnUu4NoHbLR39/Q28EJgP52sFREojeCRgIAPw+ASk0qwIcHLFa/hfyzAJECSKSWKY1WgdWKwN7jX6tbwewORAPAaBVYDYBW7kWln663gIj92Hk+Fj52FxD5sfD/fS4ATQOvynHQlyetqAAFL/Kv5kMh0upH1VgsIOs7Sch2sF4v+dGwcYuB27rRe2g9Jv7XkRoAjQqchVNL95Xw5odDP7zCLUZ09XMQ/e3jfC9ZqwI92z7NtaPSDmcDsiBG2CVtH9HVL8o/Tf7qYYLIEJTcqIHnbtsnAJDG1Kx+6AbUFQCSEXcdanXdiFXXSkneXxghLT7k6R+aC3wDqtUhdaD5Nk2r4Gr6GQ0CshAsbbCSfu708FMBKRElGaUJ2Ki2lkGobfQGwOrfxMGrv1UDnAO1KwTeAPQ++1/iprr9LClADcNuIHgD0BoPrfpVub8EVgNAuYZAoFfvd++OSgnUr0Va8AagBLD49d8bJ67cE96XIN0BoFUxWwa0FKE9fdKW6Y4Ty5hPANAz31uHR1YA9BjeupYCYAHCXTWYCQApPTfTSGQA6pRjkW60IMwCgGQne3g0AwBPgSA51qrW6FXPrsOjmQCwBAG5kzkDAFLwxR3EjAAQCJTz6GtVru4galYUlxaiAyDZB6W8WQGwVIOWlEsOfjoF3Kr6z6tjdgAsQThvG6MD0PtfRF++WwUASxCKdEYHoLX1E/N+rQKrAVDqA4ttIymCVGNAeVZTlCjbntOA2p4VAbBUAykeaodLHd54vxyYEbDqR/NWBsADhAgA3GDm45IdALDcNi5XRO8CwAg1mH71r7gLQOVQunmC9LPE4lliEki0Gm3ugrDE6t9ZAWoetBCo9tkdcLpcursCaEDQPJPvEjyLQRKAz14s+2p6p+yr1ftri+B49JEAeHg58BgJQODgeJiWAHh4OfAYCUDg4HiYlgB4eDnwGAlA4OB4mJYAeHg58BgJQODgeJiWAHh4OfAYCUDg4HiYlgB4eDnwGAlA4OB4mJYAeHg58BgJQODgeJiWAHh4OfAYCUDg4HiYlgB4eDnwGAlA4OB4mJYAeHg58BgJQODgeJiWAHh4OfAYCUDg4HiY9hv641GW1T1adgAAAABJRU5ErkJggg==" class="icon"></div>
              <div class="id" title="${element}"><span class="text">${element}</span></div>
              <button class="material-symbols-outlined close-button" onclick="soundDelList(\`${element}\`)">close</button>
            </div>`

            soundList.appendChild(spriteElement)
        });
    }
}

const soundDelList = (id) => {
    const key = Object.keys(emojiau.soundData)
    if (key.includes(id)) {
        delete emojiau.soundData[id];
    }
    else{
        alert(`指定されたID(${id})が追加されていません`)
    }
    soundListWrite();
}

document.getElementById('addSound_confirm').addEventListener('click', () => {
    if (document.getElementById('addSound_inputID').value !== "" || document.getElementById('addSound_input').value !== "") {
        if (!Object.keys(emojiau.soundData).includes(document.getElementById('addSound_inputID').value)) {
            emojiau.createSound(document.getElementById('addSound_inputID').value, document.getElementById('addSound_input').value)
            soundListWrite();
        }
        else {
            alert('すでに登録されています\n再登録したい場合は一度削除してください。')
        }
    }
    else {
        alert('IDまたはURLが入力されていません。')
    }


    closeModal();
    document.getElementById('addSound_input').value = "";
    document.getElementById('addSound_inputID').value = "";

})
