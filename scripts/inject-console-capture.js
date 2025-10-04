const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScriptIntoHTML(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`✓ Script already present in ${filePath}`);
    return;
  }
  
  const updatedContent = content.replace('</head>', `  ${scriptTag}\n  </head>`);
  
  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✓ Injected console capture script into ${filePath}`);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScriptIntoHTML(filePath);
    }
  });
}

const outDir = path.join(process.cwd(), 'out');

if (fs.existsSync(outDir)) {
  console.log('Injecting console capture script into HTML files...');
  processDirectory(outDir);
  console.log('Done!');
} else {
  console.log('No out directory found. Skipping script injection.');
}