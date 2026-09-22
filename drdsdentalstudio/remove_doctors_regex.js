const fs = require('fs');
const path = 'c:\\Users\\barat\\Music\\drdsdentalstudio\\index.html';
let content = fs.readFileSync(path, 'utf8');

const oldDefaultDoctorsRegex = /const defaultDoctors = \[\s*\{ id: 'doc-1', name: 'Dr. Deepikaa babu MDS'[\s\S]*?\}[\s\S]*?\];/;
const newDefaultDoctors = `const defaultDoctors = [
        { id: 'doc-1', name: 'Dr. Deepikaa babu MDS', specialty: 'Orthodontics & Dentofacial Orthopedics', qualification: 'MDS', regNo: '42852', phone: '892-555-6678/79' }
      ];`;

const oldDbInitRegex = /if \(localStorage\.getItem\('DDS_DATABASE'\)\) \{\s*db = JSON\.parse\(localStorage\.getItem\('DDS_DATABASE'\)\);\s*if \(purgeDummyCrmData\(db\)\) \{/;
const newDbInit = `if (localStorage.getItem('DDS_DATABASE')) {
          db = JSON.parse(localStorage.getItem('DDS_DATABASE'));
          if (db.doctors && Array.isArray(db.doctors)) {
            const dummyIds = ['doc-2', 'doc-4623', 'doc-2933', 'doc-9231', 'doc-4133'];
            db.doctors = db.doctors.filter(d => !dummyIds.includes(d.id));
          }
          if (purgeDummyCrmData(db)) {`;

let updated = false;

if (oldDefaultDoctorsRegex.test(content)) {
    content = content.replace(oldDefaultDoctorsRegex, newDefaultDoctors);
    console.log('Replaced defaultDoctors array.');
    updated = true;
} else {
    console.log('Could not find defaultDoctors array.');
}

if (oldDbInitRegex.test(content)) {
    content = content.replace(oldDbInitRegex, newDbInit);
    console.log('Injected database migration for doctors.');
    updated = true;
} else {
    console.log('Could not find DbInit block.');
}

if (updated) {
    fs.writeFileSync(path, content, 'utf8');
    console.log('File written.');
}
