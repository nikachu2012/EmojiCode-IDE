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
    /* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
    var toolbox = document.getElementById("toolbox");

    var options = {
        theme: {
            'base': Blockly.Themes.Classic,
            'componentStyles': {
                'workspaceBackgroundColour': '#1e1e1e',
                'toolboxBackgroundColour': 'blackBackground',
                'toolboxForegroundColour': '#fff',
                'flyoutBackgroundColour': '#252526',
                'flyoutForegroundColour': '#ccc',
                'flyoutOpacity': 1,
                'scrollbarColour': '#797979',
                'insertionMarkerColour': '#fff',
                'insertionMarkerOpacity': 0.3,
                'scrollbarOpacity': 0.4,
                'cursorColour': '#d0d0d0',
                'blackBackground': '#333',
            },
        },
        toolbox: toolbox,
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
        renderer: 'thrasos'
    };
    /* Inject your workspace */
    var workspace = Blockly.inject('code', options);

    /* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

    /* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
    var workspaceBlocks = document.getElementById("workspaceBlocks");

    /* Load blocks to workspace. */
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
});

Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;

fetch('./emojicode/1-logic/logic_def.js')
    .then(response => response.json())
    .then(data => {
        Blockly.defineBlocksWithJsonArray(data);
    });

fetch('./emojicode/2-loops/loops_def.js')
    .then(response => response.json())
    .then(data => {
        Blockly.defineBlocksWithJsonArray(data);
    });

fetch('./emojicode/3-math/math_def.js')
    .then(response => response.json())
    .then(data => {
        Blockly.defineBlocksWithJsonArray(data);
    });

fetch('./emojicode/4-string/string_def.js')
    .then(response => response.json())
    .then(data => {
        Blockly.defineBlocksWithJsonArray(data);
    });

fetch('./emojicode/5-list/list_def.js')
    .then(response => response.json())
    .then(data => {
        Blockly.defineBlocksWithJsonArray(data);
    });

fetch('./emojicode/6-color/color_def.js')
    .then(response => response.json())
    .then(data => {
        Blockly.defineBlocksWithJsonArray(data);
    });

fetch('./emojicode/7-sprite/sprite_def.js')
    .then(response => response.json())
    .then(data => {
        Blockly.defineBlocksWithJsonArray(data);
    });

fetch('./emojicode/8-sound/sound_def.js')
    .then(response => response.json())
    .then(data => {
        Blockly.defineBlocksWithJsonArray(data);
    });