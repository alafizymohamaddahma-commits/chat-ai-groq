
async function sendMsg(){
  const chat = document.getElementById("chat");
  const msg = document.getElementById("msg").value;
  if(!msg) return;

  chat.innerHTML += `<div class='msg'><b>You:</b> ${msg}</div>`;
  document.getElementById("msg").value = "";

  const res = await fetch('/api/chat', {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();
  chat.innerHTML += `<div class='msg'><b>AI:</b> ${data.reply}</div>`;
  chat.scrollTop = chat.scrollHeight;
}
