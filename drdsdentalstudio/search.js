const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const rx = /catch \([a-z]\) \{[\s\S]*?console\.warn\(['"]Supabase i[\s\S]*?\}/gi;
const match = rx.exec(content);
if (match) {
    console.log(match[0]);
} else {
    console.log("not found");
}
