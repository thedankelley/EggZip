// Uses global `fflate` from index.min.js

export async function createZip(files, onProgress) {
  return new Promise((resolve, reject) => {
    try {
      const entries = {};
      let loadedFiles = 0;

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          entries[file.name] = new Uint8Array(reader.result);
          loadedFiles++;
          if (onProgress) onProgress(Math.round((loadedFiles / files.length) * 50));
          if (loadedFiles === files.length) {
            fflate.ZipAsync(entries, { level: 9 }, (err, data) => {
              if (err) return reject(err);
              if (onProgress) onProgress(100);
              resolve(new Blob([data]));
            });
          }
        };
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(file);
      });

      if (files.length === 0) resolve(new Blob([]));
    } catch (e) {
      reject(e);
    }
  });
}

export async function extractZip(file, onProgress) {
  const buffer = await file.arrayBuffer();
  return new Promise((resolve, reject) => {
    const results = [];
    fflate.unzip(new Uint8Array(buffer), {
      filter(name, data) {
        results.push({ name, blob: new Blob([data]) });
        if (onProgress) {
          const percent = Math.round((results.length / 10) * 100);
          onProgress(percent > 100 ? 100 : percent);
        }
        return true;
      },
    });
    if (onProgress) onProgress(100);
    resolve(results);
  });
}
