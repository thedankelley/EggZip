// Import 7z-WASM UMD build from vendor
import "../vendor/7z/7zz.umd.js";

// Set path to the WASM file
_7z.setWasmPath("vendor/7z/7zz.wasm");

/**
 * Create a 7z archive
 * @param {File[]} files - Array of File objects
 * @param {function(number):void} onProgress - Callback with progress 0..100
 * @returns {Promise<Blob>} - The resulting 7z archive
 */
export async function create7z(files, onProgress) {
  try {
    // Initialize archive
    const archive = await _7z();

    for (let i = 0; i < files.length; i++) {
      const arrayBuffer = await files[i].arrayBuffer();
      archive.addFile(files[i].name, new Uint8Array(arrayBuffer));
      if (onProgress) onProgress(Math.round(((i + 1) / files.length) * 50)); // 0-50% adding
    }

    const blob = await archive.compress({
      progress: (p) => {
        if (onProgress) onProgress(50 + Math.round(p * 50)); // 50-100%
      },
    });

    if (onProgress) onProgress(100);
    return blob;
  } catch (e) {
    console.error("7z creation error:", e);
    throw e;
  }
}
