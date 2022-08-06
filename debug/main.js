import Blockly from 'blockly';

import 'blockly/blocks';
import 'blockly/javascript'; // Or the generator of your choice
import Ja from 'blockly/msg/ja'


import '../emojicode/emojicode_def'
import '../emojicode/emojicode_stub'


Blockly.setLocale(Ja)
var workspace = Blockly.inject('app', { toolbox: document.getElementById('toolbox') });