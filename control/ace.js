ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.10.1/');

var editor = ace.edit("code-editor");
editor.$blockScrolling = Infinity;
editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.setFontSize(16)
editor.setShowPrintMargin(false);
editor.insert([
  'function start() {',
  '\tlog("Hello world!");',
  '}'
].join('\n'))

const editorReplace = (value) => {
  editor.selectAll();
  editor.remove();
  editor.insert(value)
}

getEditorText = () => editor.getValue();
