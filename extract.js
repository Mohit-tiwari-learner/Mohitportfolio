const https = require('https');
const fs = require('fs');

https.get('https://sunny-lollipop-2be50b.netlify.app/assets/index-BmgvqCT4.js', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const matches = data.match(/https:\/\/(?:prod\.spline\.design|spline\.design)\/[^"'\\]+\.(?:splinecode|gltf|glb)/g);
        if (matches) fs.writeFileSync('url_utf8.txt', matches[0], 'utf8');
    });
});
