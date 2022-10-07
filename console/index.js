const log = (text) => {
  const logArea = document.getElementById("logArea");

  // 新しいHTML要素を作成
  let new_element = document.createElement("div");
  new_element.className = "console_log";
  new_element.innerHTML = `<div class="text">${text}</div>`;

  // 指定した要素の中の末尾に挿入
  logArea.appendChild(new_element);

  const console = document.getElementById("console");
  console.scrollTop = console.scrollHeight;
};

const runCode = (code) => eval(`${code}\nstart();`);
