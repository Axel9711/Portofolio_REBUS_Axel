import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({
  size: 'A4',
  layout: 'landscape',
  margin: 30
});

const writeStream = fs.createWriteStream('tableau-synthese-axel-rebus.pdf');
doc.pipe(writeStream);

// Styles
const fontTitle = 'Helvetica-Bold';
const fontRegular = 'Helvetica';
const fontOblique = 'Helvetica-Oblique';

// Titre principal
doc.font(fontTitle).fontSize(13).text('BTS SERVICES INFORMATIQUES AUX ORGANISATIONS — SESSION 2026', { align: 'center' });
doc.moveDown(0.3);
doc.fontSize(12).text('Tableau de synthèse des réalisations professionnelles', { align: 'center' });
doc.moveDown(0.5);

// Cadre Informations Candidat
const infoY = doc.y;
doc.rect(30, infoY, 782, 45).lineWidth(1).stroke('#333333');

doc.font(fontTitle).fontSize(9).text('NOM et prénom : ', 40, infoY + 8, { continued: true })
   .font(fontRegular).text('REBUS Axel')
   .font(fontTitle).text('Centre de formation : ', 40, infoY + 25, { continued: true })
   .font(fontRegular).text('Institution des Chartreux (Lyon)');

doc.font(fontTitle).text('N° candidat : ', 460, infoY + 8, { continued: true })
   .font(fontRegular).text('En cours d\'attribution')
   .font(fontTitle).text('Option : ', 460, infoY + 25, { continued: true })
   .font(fontTitle).text('[X] SISR     [  ] SLAM');

doc.font(fontTitle).text('URL Portfolio : ', 650, infoY + 8, { continued: true })
   .font(fontRegular).text('https://axel9711.github.io/portfolio-bts-sio');

doc.y = infoY + 55;

// Colonnes du tableau
const startY = doc.y;
const tableX = 30;
const tableW = 782;
const colWidths = [242, 90, 90, 90, 90, 90, 90]; // total = 782

const headers = [
  'Réalisations professionnelles\n(intitulé et documents associés)',
  'Gérer le\npatrimoine\ninformatique',
  'Répondre aux\nincidents et\ndemandes',
  'Développer la\nprésence en ligne\nde l\'organisation',
  'Travailler en\nmode projet',
  'Mettre à disposition\nun service\ninformatique',
  'Organiser son\ndéveloppement\nprofessionnel'
];

// Dessin en-tête
doc.rect(tableX, startY, tableW, 45).fillAndStroke('#0f2b48', '#000000');
doc.fillColor('#ffffff').font(fontTitle).fontSize(8);

let curX = tableX;
headers.forEach((h, idx) => {
  doc.text(h, curX + 4, startY + 6, {
    width: colWidths[idx] - 8,
    align: 'center'
  });
  if (idx > 0) {
    doc.moveTo(curX, startY).lineTo(curX, startY + 45).stroke('#ffffff');
  }
  curX += colWidths[idx];
});

let currentY = startY + 45;

function drawSectionHeader(title) {
  doc.rect(tableX, currentY, tableW, 20).fillAndStroke('#dbeafe', '#333333');
  doc.fillColor('#1e3a8a').font(fontTitle).fontSize(8.5)
     .text(title, tableX, currentY + 5, { width: tableW, align: 'center' });
  currentY += 20;
}

function drawRow(title, checkedColIndex) {
  const rowHeight = 32;
  doc.rect(tableX, currentY, tableW, rowHeight).fillAndStroke('#ffffff', '#cccccc');
  
  // Bordures verticales
  let lineX = tableX;
  colWidths.forEach((w, i) => {
    lineX += w;
    doc.moveTo(lineX, currentY).lineTo(lineX, currentY + rowHeight).stroke('#cccccc');
  });

  // Titre
  doc.fillColor('#111827').font(fontRegular).fontSize(8)
     .text(title, tableX + 8, currentY + 8, { width: colWidths[0] - 16 });

  // Croix cochée
  if (checkedColIndex !== null) {
    let colStartX = tableX;
    for (let c = 0; c < checkedColIndex; c++) {
      colStartX += colWidths[c];
    }
    doc.fillColor('#0284c7').font(fontTitle).fontSize(14)
       .text('X', colStartX, currentY + 7, { width: colWidths[checkedColIndex], align: 'center' });
  }

  currentY += rowHeight;
}

// 1. Réalisation en cours de formation
drawSectionHeader('Réalisation en cours de formation');
drawRow('Création d\'une entreprise ainsi qu\'un site web avec une présence en ligne', 3);

// 2. Réalisations en milieu professionnel en cours de 1ère année
drawSectionHeader('Réalisations en milieu professionnel en cours de première année');
drawRow('Installation d\'un utilisateur après un retour d\'arrêt maladie', 5);
drawRow('Réaménagement du parc informatique de toute une entreprise', 1);
drawRow('Préparation / configuration de téléphones fixes Fanvil (VoIP)', 4);

// 3. Réalisations en milieu professionnel en cours de 2nde année
drawSectionHeader('Réalisations en milieu professionnel en cours de seconde année');
drawRow('Projets et stage de 2ème année (session 2026-2027) — En cours de planification', null);

// Note en bas de page
doc.fillColor('#64748b').font(fontOblique).fontSize(7.5)
   .text('Document conforme au référentiel national BTS SIO — Épreuve E6 (Support et mise à disposition de services informatiques)', 30, currentY + 15, { align: 'center' });

doc.end();

writeStream.on('finish', () => {
  console.log('PDF generated successfully: tableau-synthese-axel-rebus.pdf');
});
