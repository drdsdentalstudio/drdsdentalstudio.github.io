const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Fix Qualifications & Specialties
content = content.replace(/Dr\. Deepikaa Babu \(General Dentist\)/g, "Dr. Deepikaa babu MDS (Orthodontics & Dentofacial Orthopedics)");
content = content.replace(/Dr\. Deepikaa Babu \(General Dentistry\)/g, "Dr. Deepikaa babu MDS (Orthodontics & Dentofacial Orthopedics)");
content = content.replace(/\(General Dentist,/g, "(MDS Orthodontics & Dentofacial Orthopedics,");
content = content.replace(/General Dentistry/g, "Orthodontics & Dentofacial Orthopedics");
content = content.replace(/General Dentist/g, "MDS (Orthodontics & Dentofacial Orthopedics)");
content = content.replace(/BDS/g, "MDS");

// Fix Name Case globally
content = content.replace(/Dr\. Deepikaa Babu/g, "Dr. Deepikaa babu MDS");

// Clean up any double MDS occurrences
content = content.replace(/MDS MDS/g, "MDS");
content = content.replace(/MDS \(Orthodontics & Dentofacial Orthopedics\) \(Orthodontics & Dentofacial Orthopedics\)/g, "MDS (Orthodontics & Dentofacial Orthopedics)");
content = content.replace(/Dr\. Deepikaa babu MDS MDS/g, "Dr. Deepikaa babu MDS");

fs.writeFileSync('index.html', content, 'utf8');

console.log("Updated qualifications and owner name successfully.");
