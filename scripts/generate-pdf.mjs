import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const cssStyles = `
  @page {
    size: A4;
    margin: 14mm 16mm 14mm 16mm;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.4;
    color: #1e293b;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  h1 {
    font-size: 20pt;
    font-weight: 700;
    margin: 0 0 2px 0;
    color: #0f172a;
    letter-spacing: -0.4px;
  }
  h2 {
    font-size: 10.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #0f172a;
    border-bottom: 1.5px solid #cbd5e1;
    padding-bottom: 2px;
    margin: 12px 0 6px 0;
    page-break-after: avoid;
    break-after: avoid;
  }
  h3 {
    font-size: 9.8pt;
    font-weight: 600;
    color: #0f172a;
    margin: 8px 0 2px 0;
    page-break-after: avoid;
    break-after: avoid;
  }
  p {
    margin: 0 0 4px 0;
  }
  ul {
    margin: 2px 0 6px 0;
    padding-left: 17px;
  }
  li {
    margin-bottom: 2.5px;
  }
  hr {
    display: none;
  }
  a {
    color: #0a66c2;
    text-decoration: none;
  }
  strong {
    color: #0f172a;
    font-weight: 600;
  }
  em {
    color: #334155;
  }
`;

function createHtml(markdownContent) {
  // Strip the language switcher block (e.g. <div align="center">...</div>) from the PDF
  const cleanMarkdown = markdownContent.replace(/<div align="center">[\s\S]*?<\/div>/gi, '').trim();
  const bodyHtml = marked.parse(cleanMarkdown);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <style>${cssStyles}</style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
}

async function convertFile(browser, inputRelativePath, outputRelativePath) {
  const inputPath = path.join(rootDir, inputRelativePath);
  const outputPath = path.join(rootDir, outputRelativePath);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    return;
  }

  const markdownContent = fs.readFileSync(inputPath, 'utf-8');
  const html = createHtml(markdownContent);

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '14mm',
      right: '16mm',
      bottom: '14mm',
      left: '16mm'
    }
  });

  await page.close();
  console.log(`Generated: ${outputRelativePath}`);
}

async function main() {
  console.log('Starting PDF generation...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    await convertFile(browser, 'curriculum/resume.md', 'curriculum/resume.pdf');
    await convertFile(browser, 'curriculum/curriculo_pt.md', 'curriculum/curriculo_pt.pdf');
    console.log('All PDFs successfully generated!');
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
