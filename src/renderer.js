const { ipcRenderer } = require("electron");

const statusEl = document.getElementById("status");
const onStartEl = document.getElementById("onStart");
const onStopEl = document.getElementById("onStop");
const fileEl = document.getElementById("file");

onStartEl.onclick = () => {
  statusEl.innerHTML = "online";
  onStartEl.style.display = "none";
  onStopEl.style.display = "block";
  ipcRenderer.send("update-status", true,fileEl.files[0].path);
};

onStopEl.onclick = () => {
  statusEl.innerHTML = "stoped";
  onStartEl.style.display = "block";
  onStopEl.style.display = "none";
  ipcRenderer.send("update-status", false,fileEl.files[0].path);
};

ipcRenderer.on("on-status", (event, list) => {
  if (list.length === 0) {
    statusEl.innerHTML = "stoped";
    onStartEl.style.display = "block";
    onStopEl.style.display = "none";
  } else {
    if (list[0].pm2_env.status === "online") {
      statusEl.innerHTML = list[0].pm2_env.status;
      onStartEl.style.display = "none";
      onStopEl.style.display = "block";
    } else {
      statusEl.innerHTML = list[0].pm2_env.status;
      onStartEl.style.display = "block";
      onStopEl.style.display = "none";
    }
  }
});
