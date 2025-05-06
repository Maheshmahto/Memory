import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const memoryFolderPath = path.join(__dirname, '../src/Memory');
const mediaFilePath = path.join(__dirname, '../src/data/media.ts');

// Generate media entries
const generateMediaEntries = () => {
  const files = fs.readdirSync(memoryFolderPath);
  const mediaEntries = [];
  let id = 13;

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      mediaEntries.push({
        id: id.toString(),
        type: 'image',
        url: `src/Memory/${file}`,
        title: path.basename(file, ext).replace(/-/g, ' '),
        width: 1200,
        height: 800,
        creator: 'Unknown',
        tags: ['memory'],
      });
      id++;
    }
  });

  return mediaEntries;
};

// Append to media.ts
const appendToMediaFile = (entries) => {
  const mediaData = entries
    .map(
      (entry) => `  {
    id: '${entry.id}',
    type: '${entry.type}',
    url: '${entry.url}',
    title: '${entry.title}',
    width: ${entry.width},
    height: ${entry.height},
    creator: '${entry.creator}',
    tags: ${JSON.stringify(entry.tags)},
  },`
    )
    .join('\n');

  const content = `// Auto-generated entries\n${mediaData}\n`;

  fs.appendFileSync(mediaFilePath, content, 'utf8');
  console.log('Media entries added successfully!');
};

const mediaEntries = generateMediaEntries();
appendToMediaFile(mediaEntries);
