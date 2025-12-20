// Import libarchive-wasm from vendor
import "../vendor/libarchive/libarchive-wasm.js";

// Set WASM path
LibArchive.setWasmPath("vendor/libarchive/libarchive-wasm.wasm");

/**
 * Extract any archive supported by libarchive
 * @param {File} file - Archive file
 * @param {function(number):void} onProgress - Callback 0..100
 * @returns {Promise<{name:string, blob:Blob}[]>} - Extracted files
 */
export async function extractArchive(file, onProgress) {
  try {
    const buffer = await file.arrayBuffer();
    const archive = await LibArchive.open(new Uint8Array(buffer));
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
  } catch (e) {
    console.error("LibArchive extraction error:", e);
    throw e;
  }
}
