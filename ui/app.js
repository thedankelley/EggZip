zipBtn.addEventListener("click", async () => {
  if (!selectedFiles.length) return alert("Select files first");
  updateProgress(0);
  try {
    const blob = await createZip(selectedFiles, (p) => updateProgress(p));
    const url = URL.createObjectURL(blob);
    output.innerHTML = `<a href="${url}" download="archive.zip">Download ZIP</a>`;
    updateProgress(100);
  } catch (e) {
    console.error(e);
    alert("ZIP creation failed");
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
    console.error(e);
    alert("7z creation failed");
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
    console.error(e);
    alert("Extraction failed");
  }
});
