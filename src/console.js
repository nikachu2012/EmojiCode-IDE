/*
<div class="console_log">
  <div class="text">jikjko</div>
  <div class="message">message</div>
</div>
*/
const log = (text, message) => {
  const logArea = document.getElementById("logArea");

  // 新しいHTML要素を作成
  var new_element = document.createElement("div");
  new_element.className = "console_log";
  new_element.innerHTML = `<div class="text">${text}</div><div class="message">${message}</div>`;

  // 指定した要素の中の末尾に挿入
  logArea.appendChild(new_element);
};

log("aaa", "b");
