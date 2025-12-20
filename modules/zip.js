// Import fflate from local vendor folder
import "../vendor/fflate/index.min.js";

/**
 * Create a ZIP archive from selected files.
 * @param {File[]} files - Array of File objects
 * @param {function(number):void} onProgress - Callback with progress 0..100
 * @returns {Promise<Blob>} - The resulting ZIP as a Blob
 */
export async function createZip(files, onProgress) {
  return new Promise((resolve, reject) => {
    try {
      // Prepare files as { name: string, data: Uint8Array } objects
      const entries = {};
      let loadedFiles = 0;

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          entries[file.name] = new Uint8Array(reader.result);
          loadedFiles++;
          if (onProgress) onProgress(Math.round((loadedFiles / files.length) * 50)); // 0-50% reading
          if (loadedFiles === files.length) {
            // All files read, compress
            fflate.ZipAsync(entries, { level: 9 }, (err, data) => {
              if (err) return reject(err);
              if (onProgress) onProgress(100); // done
              resolve(new Blob([data]));
            });
          }
        };
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(file);
      });

      if (files.length === 0) {
        resolve(new Blob([]));
      }
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Extract a ZIP archive
 * @param {File} file - The ZIP file
 * @param {function(number):void} onProgress - Callback with progress 0..100
 * @returns {Promise<{name: string, blob: Blob}[]>} - Extracted files
 */
export async function extractZip(file, onProgress) {
  const buffer = await file.arrayBuffer();
  return new Promise((resolve, reject) => {
    const results = [];
    fflate.unzip(new Uint8Array(buffer), {
      filter(name, data) {
        results.push({ name, blob: new Blob([data]) });
        if (onProgress) {
          // Approximate progress
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
