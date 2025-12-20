
---

## Usage

1. Open `index.html` in a browser.
2. **Add files** to the staging area or drag-and-drop them.
3. To create an archive:
   - Click **Create ZIP** or **Create 7z**.
   - Watch the **progress bar** for completion.
   - Download the generated archive via the link.
4. To extract:
   - Add an archive file.
   - Click **Extract Archive**.
   - Download extracted files from the list.
5. **Install as PWA**:
   - On supported browsers, click “Add to Home Screen” from the browser menu.
   - This allows offline use.
6. **Offline caching**:
   - Service worker automatically caches core files and vendors.
   - First visit should be online for caching to complete.


## Supported Browsers

- Chrome, Edge, Firefox, Safari (desktop and mobile)
- PWA installation supported on modern browsers
- Offline caching requires service worker support

---

## License

EggZip © 2025

Released under the MIT License. Ensure that all dependencies’ licenses are respected:

- [fflate](https://github.com/101arrowz/fflate) (MIT)
- [7z-wasm](https://github.com/use-strict/7z-wasm) (MIT)
- [libarchive-wasm](https://github.com/KodeWeave/libarchive-wasm) (MIT)
