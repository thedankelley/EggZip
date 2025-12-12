# EggZip
Experimental Archive Utility

**Tagline:** Get to the yolk inside!  

EggZip is a fully client-side archive utility that runs entirely in the browser. It supports creating and extracting archives like ZIP and 7z, with password protection, progress bars, and offline caching. It works on desktop and mobile browsers.

---

## Features

- Create ZIP archives using **fflate** (Web Worker for non-blocking compression)
- Create 7z archives using **7z-wasm**
- Extract ZIP, 7z, and other archive formats using **libarchive-wasm**
- Optional password protection and decryption for supported formats
- Real-time **progress bars** for compression and decompression
- Modern UI with **Windows 98 theme toggle**
- Staging area for files and extraction inspection
- History log of actions
- Offline support via service worker and cached vendor files
- SNES-style retro-comedy mascot logo

---

## Usage

1. Open `index.html` in a browser.
2. **Add files** to the staging area or drag-and-drop them.
3. To create an archive:
   - Click **Create ZIP** or **Create 7z**.
   - Optional: open the **Advanced menu** to set password or compression level.
4. To extract:
   - Add an archive to the staging area.
   - Optional: enter a password in the Advanced menu.
   - Click **Extract selected**.
   - Extracted files appear as downloadable links.
5. Use the **Cache vendor files** button for offline usage.
6. Toggle **Windows 98** theme or switch back to modern UI.

---

## Deployment on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `README.md`, and `LICENSE.txt`.
3. Go to **Settings → Pages**.
4. Select the branch and root folder for GitHub Pages.
5. Click **Save**.
6. Open the generated GitHub Pages URL to use EggZip.

For best offline experience, open the page once and press **Cache vendor files**.

---

## Supported Browsers

- Chrome, Edge, Firefox, Safari (desktop and mobile)
- Mobile Safari/iOS tested, but large archives may be slow
- Service worker support required for full offline caching

---

## Notes

- 7z progress inside WASM is approximated; ZIP progress is precise.
- Some advanced password encryption formats may not interoperate perfectly with desktop apps.
- RAR creation is not supported due to licensing restrictions.

---

## Contributing

Pull requests and suggestions are welcome. Please follow standard HTML5/JS practices.

---

## Acknowledgments

- [fflate](https://github.com/101arrowz/fflate)
- [7z-wasm](https://github.com/use-strict/7z-wasm)
- [libarchive-wasm](https://github.com/KodeWeave/libarchive-wasm)

---

## License

EggZip is released under the MIT License. See `LICENSE.txt`.
