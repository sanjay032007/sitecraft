const fs = require('fs');
let c = fs.readFileSync('src/app/template/[id]/prompt/page.tsx', 'utf8');

c = c.replace('import { TEMPLATES } from "@/lib/data"', 'import { TEMPLATES } from "@/lib/data"\nimport { createClient } from "@/utils/supabase/client"\nimport type { User } from "@supabase/supabase-js"\nimport { Loader2, Lock } from "lucide-react"');

c = c.replace('const [config, setConfig] = useState({', 'const [user, setUser] = useState<User | null>(null)\n  const [loadingUser, setLoadingUser] = useState(true)\n\n  useEffect(() => {\n    const supabase = createClient()\n    supabase.auth.getUser().then(({ data: { user } }) => {\n      setUser(user)\n      setLoadingUser(false)\n    })\n  }, [])\n\n  const isLocked = template.is3DReady && !user && !loadingUser;\n\n  const [config, setConfig] = useState({');

c = c.replace('import { useState, use } from "react"', 'import { useState, use, useEffect } from "react"');

c = c.replace('<Button size="sm" variant="outline" onClick={copyToClipboard} className="bg-background">', '<Button size="sm" variant="outline" onClick={copyToClipboard} className="bg-background" disabled={isLocked || (loadingUser && template.is3DReady)}>');

const replacer = '{isLocked ? (\n' +
'              <div className="flex-1 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm p-6 rounded-md border border-border">\n' +
'                <Lock className="h-12 w-12 text-primary mb-4" />\n' +
'                <h4 className="text-lg font-bold mb-2 text-foreground">Premium 3D Template</h4>\n' +
'                <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">\n' +
'                  You need to be logged in to access the prompt for our advanced 3D interactive templates.\n' +
'                </p>\n' +
'                <Link href="/login">\n' +
'                  <Button>Sign In to Unlock</Button>\n' +
'                </Link>\n' +
'              </div>\n' +
'            ) : loadingUser && template.is3DReady ? (\n' +
'              <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 rounded-md border border-border">\n' +
'                <Loader2 className="h-8 w-8 animate-spin text-primary" />\n' +
'              </div>\n' +
'            ) : (\n' +
'              <>\n' +
'                <pre className="flex-1 overflow-auto whitespace-pre-wrap text-sm text-foreground/80 bg-background p-6 rounded-md border border-border font-mono leading-relaxed shadow-inner">\n' +
'                  {generatedPrompt}\n' +
'                </pre>\n' +
'                <div className="mt-6 flex flex-col sm:flex-row gap-4">\n' +
'                  <Button className="flex-1 h-12">Launch in Antigravity</Button>\n' +
'                  <Button variant="secondary" className="flex-1 h-12 border-border/50">Send to Codex</Button>\n' +
'                </div>\n' +
'              </>\n' +
'            )}';

const startToken = '<pre className="flex-1 overflow-auto';
const endToken = '</div>';
const idxStart = c.indexOf(startToken);
let searchEnd = c.indexOf(endToken, idxStart);
searchEnd = c.indexOf(endToken, searchEnd + 6); // second </div>

const toReplace = c.substring(idxStart, searchEnd + 6);
c = c.replace(toReplace, replacer);

fs.writeFileSync('src/app/template/[id]/prompt/page.tsx', c);
console.log('patched');
