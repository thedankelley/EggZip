import "../vendor/libarchive/libarchive-wasm.js";

LibArchive.setWasmPath("vendor/libarchive/libarchive-wasm.wasm");

export async function extractArchive(file, onProgress) {
  const arrayBuffer = await file.arrayBuffer();
  const archive = await LibArchive.open(new Uint8Array(arrayBuffer));
  const files = [];
  for await (const entry of archive) {
    if (entry.fileData) {
      files.push({ name: entry.name, blob: new Blob([entry.fileData]) });
    }
  }
  return files;
}
