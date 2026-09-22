const fs = require('fs');
const file = 'c:\\Users\\barat\\Music\\drdsdentalstudio\\index (4).html';
let html = fs.readFileSync(file, 'utf8');
const dummyDocs = ['Dr. Ramana', 'Dr. Deepika', 'Dr. Rahul', 'Dr. Nihal Ahamed', 'Dr. Jeenath begam'];
for (const doc of dummyDocs) {
    const regex = new RegExp('^.*<option value="' + doc + '".*>.*</option>.*\\n', 'gm');
    html = html.replace(regex, '');
}
fs.writeFileSync(file, html);
console.log('Removed hardcoded dummy doctor options.');
