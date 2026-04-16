/**
 * Simple JSON <-> Markdown converter for localization files
 * Usage: 
 * node converter.js to-md input.json output.md
 * node converter.js to-json input.md output.json
 */

const fs = require('fs');

const args = process.argv.slice(2);
const [mode, inputPath, outputPath] = args;

if (!mode || !inputPath || !outputPath) {
  console.log('Usage: node converter.js <to-md|to-json> <input> <output>');
  process.exit(1);
}

// Helper to flatten/unflatten JSON for easy mapping
const flatten = (obj, prefix = '', res = {}) => {
  for (let key in obj) {
    const prop = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flatten(obj[key], prop, res);
    } else {
      res[prop] = obj[key];
    }
  }
  return res;
};

const unflatten = (data) => {
  const result = {};
  for (let key in data) {
    const keys = key.split('.');
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) acc[k] = data[key];
      else acc[k] = acc[k] || {};
      return acc[k];
    }, result);
  }
  return result;
};

// --- Conversion Logic ---

if (mode === 'to-md') {
  const json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const flat = flatten(json);
  let md = '# Localization Review\n\n';
  md += '> [!IMPORTANT]\n> Do not edit the keys inside the backticks (e.g. `key.name`). Only edit the text below them.\n\n';

  for (let [key, value] of Object.entries(flat)) {
    md += `### \`${key}\`\n${value}\n\n---\n\n`;
  }

  fs.writeFileSync(outputPath, md);
  console.log(`Successfully converted to Markdown: ${outputPath}`);

} else if (mode === 'to-json') {
  const md = fs.readFileSync(inputPath, 'utf8');
  const flat = {};
  
  // Regex to find the key in backticks and the content following it until the divider
  const sectionRegex = /### `([^`]+)`\n([\s\S]*?)(?=\n\n---| \n\n---|$)/g;
  let match;

  while ((match = sectionRegex.exec(md)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    flat[key] = value;
  }

  const json = unflatten(flat);
  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));
  console.log(`Successfully converted back to JSON: ${outputPath}`);
}