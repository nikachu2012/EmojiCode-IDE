import Blockly, { Block } from 'blockly';
import DarkTheme from '@blockly/theme-dark';

import 'blockly/blocks';
import 'blockly/javascript'; // Or the generator of your choice
import Ja from 'blockly/msg/ja'

import './emojicode/emojicode_def'
import './emojicode/emojicode_stub'

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
        theme: DarkTheme,
        toolbox: document.getElementById("toolbox"),
        collapse: true,
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

    Blockly.setLocale(Ja)
    var workspace = Blockly.inject('code', options);
});

Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;
