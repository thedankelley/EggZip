import "../vendor/libarchive/libarchive-wasm.js";

LibArchive.setWasmPath("vendor/libarchive/libarchive-wasm.wasm");

let _lib; // store initialized instance

async function initLibArchive() {
  if (!_lib) _lib = await LibArchive();
  return _lib;
}

export async function extractArchive(file, onProgress) {
  const lib = await initLibArchive(); // ensure WASM is ready
  const buffer = await file.arrayBuffer();
  const archive = await lib.open(new Uint8Array(buffer));
  const results = [];
  let count = 0;

  for await (const entry of archive) {
    if (entry.fileData) {
      results.push({ name: entry.name, blob: new Blob([entry.fileData]) });
      count++;
      if (onProgress) onProgress(Math.round((count / 10) * 100)); // approximate
    }
  }

  if (onProgress) onProgress(100);
  return results;
}
