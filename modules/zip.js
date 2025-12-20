import "../vendor/fflate/fflate.min.js";

export async function createZip(files, onProgress) {
  return new Promise((resolve) => {
    const zip = new fflate.ZipAsync(async (err, data) => {
      resolve(new Blob([data]));
    }, { level: 9 });

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => zip.add(file.name, new Uint8Array(reader.result));
      reader.readAsArrayBuffer(file);
    });
  });
}

export async function extractZip(file, onProgress) {
  const buffer = await file.arrayBuffer();
  const results = [];
  fflate.unzip(new Uint8Array(buffer), {
    filter(fileName, fileData) {
      results.push({ name: fileName, blob: new Blob([fileData]) });
      return true;
    }
  });
  return results;
}
