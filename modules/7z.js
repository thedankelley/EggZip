import "../vendor/7z/7z-wasm.js";

_7z.setWasmPath("vendor/7z/7z-wasm.wasm");

export async function create7z(files, onProgress) {
  const archive = new _7z.Archive();
  for (let i = 0; i < files.length; i++) {
    const arrayBuffer = await files[i].arrayBuffer();
    archive.addFile(files[i].name, new Uint8Array(arrayBuffer));
  }
  const blob = await archive.compress({ progress: onProgress });
  return blob;
}
