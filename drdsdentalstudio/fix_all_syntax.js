const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// We know the python script replaced "Lakshmi Dental Care" with "Dr. D's Dental Studio"
// and "Lakshmi" with "Dr. D's"
// This broke strings delimited by single quotes in JS.

// Let's find all occurrences of 'Dr. D's' and replace them with 'Dr. D\'s'
// We use a regex that matches a single quote, then any characters except single quotes, then Dr. D's, then any characters except single quotes, then a single quote.
// Wait, that's too complex. A simpler way is to replace 'Dr. D's' with 'Dr. D\'s' everywhere EXCEPT where it's already escaped.
// Actually, let's just replace all occurrences of `Dr. D's` with `Dr. D\\'s` where they are inside a JS single quote.

// A simpler global fix for JS syntax errors caused by this specific string:
// If it finds "Dr. D's" inside single quotes, we can escape it.
// Let's replace `'Dr. D's Dental Studio'` with `'Dr. D\\'s Dental Studio'`
content = content.replace(/'Dr\. D's Dental Studio'/g, "'Dr. D\\'s Dental Studio'");
content = content.replace(/'Dr\. D's'/g, "'Dr. D\\'s'");

// Also let's fix the specific ones we saw in the partial grep:
content = content.replace(/alert\('Invalid backup file format\. Expected a valid Dr\. D's Dental Studio JSON backup\.'\);/g, "alert('Invalid backup file format. Expected a valid Dr. D\\'s Dental Studio JSON backup.');");

// Also check for onclick attributes that might have been broken if they used single quotes for the attribute value.
// e.g. onclick='... Dr. D's ...'
// It's safer to use double quotes for HTML attributes.

fs.writeFileSync('index.html', content, 'utf8');
console.log('Fixed syntax errors.');
