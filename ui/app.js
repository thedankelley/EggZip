import { createZip, extractZip } from "../modules/zip.js";
import { create7z } from "../modules/7z.js";
import { extractArchive } from "../modules/libarchive.js";

const fileInput = document.getElementById("fileInput");
const zipBtn = document.getElementById("zipBtn");
const sevenzBtn = document.getElementById("sevenzBtn");
const extractBtn = document.getElementById("extractBtn");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const output = document.getElementById("output");

let selectedFiles = [];

fileInput.addEventListener("change", (e) => {
  selectedFiles = Array.from(e.target.files);
});

function updateProgress(percent) {
  progressBar.value = percent;
  progressText.textContent = percent + "%";
}

zipBtn.addEventListener("click", async () => {
  if (!selectedFiles.length) return alert("Select files first");
  updateProgress(0);
  try {
    const blob = await createZip(selectedFiles, (p) => updateProgress(p));
    const url = URL.createObjectURL(blob);
    output.innerHTML = `<a href="${url}" download="archive.zip">Download ZIP</a>`;
    updateProgress(100);
  } catch (e) {
    alert("ZIP creation failed: " + e.message);
  }
});

sevenzBtn.addEventListener("click", async () => {
  if (!selectedFiles.length) return alert("Select files first");
  updateProgress(0);
  try {
    const blob = await create7z(selectedFiles, (p) => updateProgress(p));
    const url = URL.createObjectURL(blob);
    output.innerHTML = `<a href="${url}" download="archive.7z">Download 7z</a>`;
    updateProgress(100);
  } catch (e) {
    alert("7z creation failed: " + e.message);
  }
});

extractBtn.addEventListener("click", async () => {
  if (!selectedFiles.length) return alert("Select an archive");
  updateProgress(0);
  try {
    const file = selectedFiles[0];
    let results;
    if (file.name.endsWith(".zip")) {
      results = await extractZip(file, (p) => updateProgress(p));
    } else {
      results = await extractArchive(file, (p) => updateProgress(p));
    }

    output.innerHTML = "";
    results.forEach((f) => {
      const url = URL.createObjectURL(f.blob);
      output.innerHTML += `<div><a href="${url}" download="${f.name}">${f.name}</a></div>`;
    });
    updateProgress(100);
  } catch (e) {
    alert("Extraction failed: " + e.message);
  }
});

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then(() => {
    console.log("Service worker registered");
  });
}
