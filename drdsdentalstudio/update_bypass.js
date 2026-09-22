const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Use regex to replace the exact lines without worrying about special characters
content = content.replace(
  /if \(email === 'ishwariyafortune@gmail\.com' && \(password === 'Ishubarani@5' \|\| password === 'Ishubarani@42852'\)\) \{[\s\S]*?email: 'ishwariyafortune@gmail\.com',/g,
  `if (email === 'drdsdentalstudiocbe@gmail.com' && (password === 'Deeps@98')) {
            console.log(' Owner direct authentication verified for', email);
            await handleSuccessfulAuthSession({
              user: {
                id: '95d98dab-7783-45bf-ada5-f7ef0bcda891',
                email: 'drdsdentalstudiocbe@gmail.com',`
);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Replaced hardcoded owner bypass successfully.');
