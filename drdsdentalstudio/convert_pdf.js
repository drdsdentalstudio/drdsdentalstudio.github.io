const fs = require('fs');
const pdf2img = require('pdf-img-convert');

async function convert() {
    console.log('Starting conversion...');
    try {
        const outputImages = await pdf2img.convert('C:\\Users\\barat\\.gemini\\antigravity-ide\\brain\\00d96f75-a6b1-41ee-a19e-af27a2736277\\.user_uploaded\\media_1789610632444.pdf');
        fs.writeFileSync('logo.jpg', outputImages[0]);
        console.log('Conversion successful. Saved to logo.jpg');
    } catch (err) {
        console.error('Error during conversion:', err);
    }
}
convert();
