// Uses global `_7z` from 7zz.umd.js

_7z.setWasmPath("vendor/7z/7zz.wasm");
let _seven;

async function init7z() {
  if (!_seven) _seven = await _7z();
  return _seven;
}

export async function create7z(files, onProgress) {
  const archive = await init7z();

  for (let i = 0; i < files.length; i++) {
    const arrayBuffer = await files[i].arrayBuffer();
    archive.addFile(files[i].name, new Uint8Array(arrayBuffer));
    if (onProgress) onProgress(Math.round(((i + 1) / files.length) * 50));
  }

  const blob = await archive.compress({
    progress: (p) => {
      if (onProgress) onProgress(50 + Math.round(p * 50));
    },
  });

  if (onProgress) onProgress(100);
  return blob;
}
