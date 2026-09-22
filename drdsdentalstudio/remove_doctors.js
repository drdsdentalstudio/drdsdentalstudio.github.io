const fs = require('fs');
const path = 'c:\\Users\\barat\\Music\\drdsdentalstudio\\index.html';
let content = fs.readFileSync(path, 'utf8');

const oldDefaultDoctors = `    const defaultDoctors = [
        { id: 'doc-1', name: 'Dr. Deepikaa babu MDS', specialty: 'Orthodontics & Dentofacial Orthopedics', qualification: 'MDS', regNo: '42852', phone: '892-555-6678/79' },
        { id: 'doc-2', name: 'Dr. Ramana', specialty: 'Orthodontics & Dentofacial Orthopedics', qualification: 'MDS', regNo: '1464', phone: '7904844113' },
        { id: 'doc-4623', name: 'Dr. Deepika', specialty: 'Orthodontics', qualification: 'MDS', regNo: '1465', phone: '8344918939' },
        { id: 'doc-2933', name: 'Dr. Rahul', specialty: 'Endodontics', qualification: 'MDS', regNo: '1466', phone: '9786090028' },
        { id: 'doc-9231', name: 'Dr. Nihal Ahamed', specialty: 'Periodontics', qualification: 'MDS', regNo: '1467', phone: '9791771160' },
        { id: 'doc-4133', name: 'Dr. Jeenath begam', specialty: 'Orthodontics', qualification: 'MDS', regNo: '1468', phone: '8072877121' }
      ];`;

const newDefaultDoctors = `    const defaultDoctors = [
        { id: 'doc-1', name: 'Dr. Deepikaa babu MDS', specialty: 'Orthodontics & Dentofacial Orthopedics', qualification: 'MDS', regNo: '42852', phone: '892-555-6678/79' }
      ];`;

const oldDbInit = `        if (localStorage.getItem('DDS_DATABASE')) {
          db = JSON.parse(localStorage.getItem('DDS_DATABASE'));
          if (purgeDummyCrmData(db)) {`;

const newDbInit = `        if (localStorage.getItem('DDS_DATABASE')) {
          db = JSON.parse(localStorage.getItem('DDS_DATABASE'));
          if (db.doctors && Array.isArray(db.doctors)) {
            const dummyIds = ['doc-2', 'doc-4623', 'doc-2933', 'doc-9231', 'doc-4133'];
            db.doctors = db.doctors.filter(d => !dummyIds.includes(d.id));
          }
          if (purgeDummyCrmData(db)) {`;

if (content.includes(oldDefaultDoctors)) {
    content = content.replace(oldDefaultDoctors, newDefaultDoctors);
    console.log('Replaced defaultDoctors array.');
}

if (content.includes(oldDbInit)) {
    content = content.replace(oldDbInit, newDbInit);
    console.log('Injected database migration for doctors.');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done.');
