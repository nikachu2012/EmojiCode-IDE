const pushFlag = () => {
    const code = Blockly.JavaScript.workspaceToCode();
    console.log(code)

    try {
        const AST = acorn.parse('banbah();', { ecmaVersion: 8 });
        console.log(AST)
    } catch (error) {
        alert(error)
    }

    const runBoolean = window.confirm('実行してもよろしいですか？')

    if (runBoolean) {
        
    } else {
        
    }
};
