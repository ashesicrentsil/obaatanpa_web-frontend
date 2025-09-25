# Obaatanpa Favicon Setup Instructions

## Quick Setup (Recommended)

1. **Open the favicon generator:**
   - Navigate to `http://localhost:3000/generate-favicons.html` in your browser
   - The page will automatically load the Obaatanpa logo image
   - It will generate all favicon sizes using the actual logo
   - Click each download button to save the files to your `public` folder

2. **Alternative - Use Online Tool:**
   - Go to https://favicon.io/favicon-converter/
   - Upload the logo file: `/images/icons/maternity-logo.png`
   - The tool will generate all required sizes
   - Download the generated package
   - Extract all files to the `public` folder

## Files You Need

Place these files in the `public` folder:
- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

## Design Specifications

- **Colors:** Pink (#F59297) to Blue (#7da8e6) gradient
- **Text:** White "O" letter
- **Style:** Rounded corners, modern look
- **Font:** Bold Arial or similar sans-serif

## Testing

After adding the files:
1. Restart your development server
2. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
3. Check the browser tab for the new Obaatanpa icon
4. Test on mobile by bookmarking the site

## Troubleshooting

- If icon doesn't appear, clear browser cache
- Ensure all files are in the `public` folder (not subfolders)
- Check browser developer tools for any 404 errors on favicon files
- Some browsers may take time to update the favicon
