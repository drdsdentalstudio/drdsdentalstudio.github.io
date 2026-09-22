const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Fix the specific alert string that caused the syntax error
content = content.replace(
  "alert('Invalid backup file format. Expected a valid Dr. D's Dental Studio JSON backup.');",
  "alert('Invalid backup file format. Expected a valid Dr. D\\'s Dental Studio JSON backup.');"
);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Fixed the specific alert syntax error.');
