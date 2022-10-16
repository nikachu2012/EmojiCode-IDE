let workspace = {};

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

    workspace = Blockly.inject('code', options);

    const code = document.getElementById('code')

    const observer = new MutationObserver(records => {
        // 変化が発生したときの処理を記述
        Blockly.svgResize(workspace);
    })

    observer.observe(code, {
        attributes: true,
        attributeFilter: ['style']
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

});

Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;

