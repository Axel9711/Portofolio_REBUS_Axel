import PDFDocument from 'pdfkit';
import fs from 'fs';
import { execSync } from 'child_process';

const doc = new PDFDocument({
  size: 'A4',
  layout: 'landscape',
  margin: 0
});

const writeStream = fs.createWriteStream('tableau-synthese-axel-rebus.pdf');
doc.pipe(writeStream);

const tableX = 31;
const tableW = 780;
const colWidths = [270, 85, 85, 85, 85, 85, 85]; // Total = 780

// 1. Titre officiel
doc.font('Helvetica-Bold').fontSize(11).fillColor('#000000');
doc.text('BTS SERVICES INFORMATIQUES AUX ORGANISATIONS', tableX, 22, {
  width: 500,
  align: 'left'
});
doc.text('SESSION 2026', tableX + 500, 22, {
  width: 280,
  align: 'right'
});

doc.fontSize(11.5).text('Tableau de synthèse des réalisations professionnelles', tableX, 38, {
  width: tableW,
  align: 'center'
});

// 2. Encadré d'identification du candidat
const infoY = 54;
const infoH = 54;
const rowH = 18;

// Cadre extérieur
doc.lineWidth(1.2).rect(tableX, infoY, tableW, infoH).stroke('#000000');

// Lignes horizontales intérieures
doc.lineWidth(0.8);
doc.moveTo(tableX, infoY + rowH).lineTo(tableX + tableW, infoY + rowH).stroke('#000000');
doc.moveTo(tableX, infoY + rowH * 2).lineTo(tableX + tableW, infoY + rowH * 2).stroke('#000000');

// Ligne verticale intérieure (pour séparer gauche et droite sur lignes 1 et 2)
const splitX = tableX + 510;
doc.moveTo(splitX, infoY).lineTo(splitX, infoY + rowH * 2).stroke('#000000');

// Contenu Ligne 1
doc.font('Helvetica-Bold').fontSize(8.5).text('NOM et prénom : ', tableX + 8, infoY + 5, { continued: true })
   .font('Helvetica-Bold').text('REBUS Axel');
doc.font('Helvetica-Bold').fontSize(8.5).text('N° candidat : ', splitX + 8, infoY + 5);

// Contenu Ligne 2
doc.font('Helvetica-Bold').fontSize(8.5).text('Centre de formation : ', tableX + 8, infoY + rowH + 5, { continued: true })
   .font('Helvetica').text('Institution des Chartreux');

doc.font('Helvetica-Bold').fontSize(8.5).text('Option : ', splitX + 8, infoY + rowH + 5);

// Checkbox SISR (Cochée)
const sisrBoxX = splitX + 56;
const boxY = infoY + rowH + 4.5;
doc.lineWidth(0.9).rect(sisrBoxX, boxY, 9, 9).stroke('#000000');
doc.save();
doc.lineWidth(1.4).strokeColor('#000000');
doc.moveTo(sisrBoxX + 1.5, boxY + 1.5).lineTo(sisrBoxX + 7.5, boxY + 7.5).stroke();
doc.moveTo(sisrBoxX + 7.5, boxY + 1.5).lineTo(sisrBoxX + 1.5, boxY + 7.5).stroke();
doc.restore();
doc.font('Helvetica-Bold').fontSize(8.5).text('SISR', sisrBoxX + 13, infoY + rowH + 5);

// Checkbox SLAM (Vide)
const slamBoxX = splitX + 105;
doc.lineWidth(0.9).rect(slamBoxX, boxY, 9, 9).stroke('#000000');
doc.font('Helvetica-Bold').fontSize(8.5).text('SLAM', slamBoxX + 13, infoY + rowH + 5);

// Contenu Ligne 3
doc.font('Helvetica-Bold').fontSize(8.5).text('Adresse URL du portfolio : ', tableX + 8, infoY + rowH * 2 + 5, { continued: true })
   .font('Helvetica').text('https://axel9711.github.io/Portofolio_REBUS_Axel');

// 3. Tableau principal
const startY = 118;
const headerTitleH = 46;
const headerSubH = 164;
const totalHeaderH = headerTitleH + headerSubH; // 210

// Colonne 0 (Diagonale officielle)
doc.lineWidth(1).rect(tableX, startY, colWidths[0], totalHeaderH).stroke('#000000');
doc.moveTo(tableX, startY).lineTo(tableX + colWidths[0], startY + totalHeaderH).stroke('#000000');

doc.font('Helvetica-Bold').fontSize(8).text('Compétences mises en œuvre', tableX + 90, startY + 22, {
  width: 170,
  align: 'center'
});

doc.font('Helvetica-Bold').fontSize(8).text('Réalisations professionnelles', tableX + 10, startY + totalHeaderH - 34, {
  width: 250,
  align: 'left'
});
doc.font('Helvetica-Oblique').fontSize(7.5).text('(intitulé et liste des documents et productions associés)', tableX + 10, startY + totalHeaderH - 22, {
  width: 250,
  align: 'left'
});

// En-têtes des 6 compétences
const compTitles = [
  'Gérer le\npatrimoine\ninformatique',
  'Répondre aux\nincidents et aux\ndemandes\nd’assistance et\nd’évolution',
  'Développer la\nprésence en\nligne de\nl’organisation',
  'Travailler en\nmode projet',
  'Mettre à\ndisposition des\nutilisateurs un\nservice\ninformatique',
  'Organiser son\ndéveloppement\nprofessionnel'
];

const compBullets = [
  [
    'Recenser et identifier les ressources numériques',
    'Exploiter des référentiels, normes et standards adoptés par le prestataire informatique',
    'Mettre en place et vérifier les niveaux d’habilitation associés à un service',
    'Vérifier les conditions de la continuité d’un service informatique',
    'Gérer des sauvegardes',
    'Vérifier le respect des règles d’utilisation des ressources numériques'
  ],
  [
    'Collecter, suivre et orienter des demandes',
    'Traiter des demandes concernant les services réseau et système, applicatifs',
    'Traiter des demandes concernant les applications'
  ],
  [
    'Participer à la valorisation de l’image de l’organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques',
    'Référencer les services en ligne de l’organisation et mesurer leur visibilité.',
    'Participer à l’évolution d’un site Web exploitant les données de l’organisation.'
  ],
  [
    'Analyser les objectifs et les modalités d’organisation d’un projet',
    'Planifier les activités',
    'Évaluer les indicateurs de suivi d’un projet et analyser les écarts'
  ],
  [
    'Réaliser les tests d’intégration et d’acceptation d’un service',
    'Déployer un service',
    'Accompagner les utilisateurs dans la mise en place d’un service'
  ],
  [
    'Mettre en place son environnement d’apprentissage personnel',
    'Mettre en œuvre des outils et stratégies de veille informationnelle',
    'Gérer son identité professionnelle',
    'Développer son projet professionnel'
  ]
];

let curColX = tableX + colWidths[0];
for (let i = 0; i < 6; i++) {
  const cW = colWidths[i + 1];

  // Case titre supérieur
  doc.lineWidth(1).rect(curColX, startY, cW, headerTitleH).stroke('#000000');
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#000000')
     .text(compTitles[i], curColX + 2, startY + 5, {
       width: cW - 4,
       align: 'center'
     });

  // Case sous-compétences avec texte orienté verticalement
  doc.rect(curColX, startY + headerTitleH, cW, headerSubH).stroke('#000000');

  // Rendu du texte vertical (rotation à -90 deg)
  const bullets = compBullets[i];
  const bulletText = bullets.map(b => `• ${b}`).join('\n');

  doc.save();
  const originX = curColX + 5;
  const originY = startY + headerTitleH + headerSubH - 8;
  
  doc.translate(originX, originY);
  doc.rotate(-90);
  doc.font('Helvetica').fontSize(5.2).fillColor('#000000');
  doc.text(bulletText, 0, 0, {
    width: headerSubH - 16,
    lineGap: 1.3
  });
  doc.restore();

  curColX += cW;
}

// 4. Lignes de réalisations professionnelles
let currentY = startY + totalHeaderH;
const sectionH = 18;
const rowHeight = 22;

function drawSectionHeader(title) {
  doc.lineWidth(1).rect(tableX, currentY, tableW, sectionH).stroke('#000000');
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#000000')
     .text(title, tableX, currentY + 5, { width: tableW, align: 'center' });
  currentY += sectionH;
}

function drawCross(cx, cy) {
  const size = 5.5;
  doc.save();
  doc.lineWidth(2.4).strokeColor('#000000');
  doc.moveTo(cx - size, cy - size).lineTo(cx + size, cy + size).stroke();
  doc.moveTo(cx + size, cy - size).lineTo(cx - size, cy + size).stroke();
  doc.restore();
}

function drawTableRow(title, crossedColIndex) {
  doc.lineWidth(1).rect(tableX, currentY, tableW, rowHeight).stroke('#000000');
  
  // Bordures verticales
  let x = tableX;
  for (let c = 0; c < colWidths.length; c++) {
    x += colWidths[c];
    if (c < colWidths.length - 1) {
      doc.moveTo(x, currentY).lineTo(x, currentY + rowHeight).stroke('#000000');
    }
  }

  // Intitulé
  if (title) {
    doc.font('Helvetica').fontSize(8).fillColor('#000000')
       .text(title, tableX + 8, currentY + 6, {
         width: colWidths[0] - 16,
         align: 'left'
       });
  }

  // Croix
  if (crossedColIndex !== null && crossedColIndex !== undefined) {
    let crossX = tableX;
    for (let c = 0; c < crossedColIndex; c++) {
      crossX += colWidths[c];
    }
    const centerCrossX = crossX + colWidths[crossedColIndex] / 2;
    const centerCrossY = currentY + rowHeight / 2;
    drawCross(centerCrossX, centerCrossY);
  }

  currentY += rowHeight;
}

// 1. Réalisation en cours de formation
drawSectionHeader('Réalisation en cours de formation');
drawTableRow('Création d\'une entreprise ainsi qu\'un site web avec une presence en ligne', 3);

// 2. Réalisations en milieu professionnel en cours de première année
drawSectionHeader('Réalisations en milieu professionnel en cours de première année');
drawTableRow('Installation d\'un utilisateur après un retour d\'arrêt maladie', 5);
drawTableRow('Réaménagement du parc informatique de toute une entreprise', 1);
drawTableRow('Préparation/configuration de téléphones fix Fanvil', 4);

// 3. Réalisations en milieu professionnel en cours de seconde année
drawSectionHeader('Réalisations en milieu professionnel en cours de seconde année');
drawTableRow('', null);
drawTableRow('', null);

doc.end();

writeStream.on('finish', () => {
  try {
    execSync('gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r200 -sOutputFile=tableau-synthese-preview.png tableau-synthese-axel-rebus.pdf');
    console.log('Official PDF and HD preview image generated successfully');
  } catch (err) {
    console.log('Official PDF generated successfully (image preview skipped)');
  }
});
