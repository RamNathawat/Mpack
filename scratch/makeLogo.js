const opentype = require('opentype.js');
const axios = require('axios');
const fs = require('fs');

async function run() {
    const fontUrl = 'https://raw.githubusercontent.com/google/fonts/main/ofl/leckerlione/LeckerliOne-Regular.ttf';

    try {
        const response = await axios.get(fontUrl, { responseType: 'arraybuffer' });
        const font = opentype.parse(response.data);
        
        // We want the text "mpack"
        // Parameters: text, x, y, fontSize, options
        // We'll use a large font size to match width=150. In Leckerli One, length of 'mpack' at 40px might be around 120.
        const fontSize = 48;
        const baselineY = 40;
        const path = font.getPath('mpack', 5, baselineY, fontSize);
        
        let d = path.toPathData(2);
        
        // Also get bounding box to see how much the 'p' descender goes down
        const bbox = path.getBoundingBox();
        console.log("BBox:", bbox);

        fs.writeFileSync('logo-path.txt', d);
        console.log("Path generated successfully.");
    } catch (e) {
        console.error(e);
    }
}
run();
