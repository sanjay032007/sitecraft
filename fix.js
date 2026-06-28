const fs = require('fs');
let c = fs.readFileSync('src/app/template/[id]/prompt/page.tsx', 'utf8');
c = c.replace('            )}', '            )}\\n          </div>');
fs.writeFileSync('src/app/template/[id]/prompt/page.tsx', c);
