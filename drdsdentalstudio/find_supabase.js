const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const rx = /<script[^>]*src=["'](.*?)["'][^>]*>/gi;
let match;
let foundSupabase = false;
while ((match = rx.exec(content)) !== null) {
    console.log('Script loaded:', match[1]);
    if (match[1].toLowerCase().includes('supabase')) {
        foundSupabase = true;
    }
}
if (!foundSupabase) {
    console.log('MISSING SUPABASE SCRIPT!');
}

