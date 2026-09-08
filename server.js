import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets and html files from the root directory
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Explicit download routes for E6 table & CV
app.get('/download-tableau-synthese', (req, res) => {
  const filePath = path.join(__dirname, 'tableau-synthese-axel-rebus.pdf');
  res.download(filePath, 'tableau-synthese-axel-rebus.pdf');
});

app.get('/download-cv', (req, res) => {
  const filePath = path.join(__dirname, 'cv-axel-rebus.pdf');
  res.download(filePath, 'cv-axel-rebus.pdf');
});

app.get('/tableau-synthese-axel-rebus.pdf', (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="tableau-synthese-axel-rebus.pdf"');
  res.sendFile(path.join(__dirname, 'tableau-synthese-axel-rebus.pdf'));
});

app.get('/cv-axel-rebus.pdf', (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="cv-axel-rebus.pdf"');
  res.sendFile(path.join(__dirname, 'cv-axel-rebus.pdf'));
});

app.use(express.static(__dirname));

// Form submission handler to prevent 404 on contact form POST
app.post('*', (req, res) => {
  res.redirect('/contact.html');
});

// Root handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
