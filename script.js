let aiMode = true;

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("chatInput");
const toggle = document.getElementById("toggleAI");

toggle.onclick = function(){
  aiMode = !aiMode;
  toggle.innerText = aiMode ? 
    "🟢 AI Mode Active" : 
    "🔴 Manual Mode";
};

document.getElementById("sendBtn").onclick = sendMessage;
input.addEventListener("keypress",e=>{
  if(e.key==="Enter") sendMessage();
});

function addMessage(text,type){
  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){

  const text = input.value;
  if(!text) return;

  addMessage(text,"user");
  input.value="";

  if(aiMode){

    addMessage("Typing...","ai");

    const res = await fetch("/api/ai",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({message:text})
    });

    const data = await res.json();

    chatBox.lastChild.remove(); // hapus typing
    addMessage(data.reply,"ai");
  }
}
