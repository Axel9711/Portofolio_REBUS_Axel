import PDFDocument from 'pdfkit';
import fs from 'fs';
import { execSync } from 'child_process';

// 1. DIAPORAMA 1 : FANVIL PRO V66 (5 SLIDES)
function generateFanvilPdf() {
  const doc = new PDFDocument({
    size: [842, 595], // A4 Landscape
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: 'Déploiement des téléphones Fanvil Pro V66',
      Author: 'Axel REBUS',
      Subject: 'BTS SIO SISR - Réalisation professionnelle',
    }
  });

  const outPath = 'diaporama-telephones-fanvil.pdf';
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  const primaryRed = '#80182a';
  const darkText = '#1e293b';
  const grayText = '#64748b';
  const lightBg = '#f8fafc';
  const cardBg = '#f1f5f9';

  // SLIDE 1 : COUVERTURE
  // Left dark red block
  doc.rect(0, 0, 480, 595).fill(primaryRed);
  // Right soft background
  doc.rect(480, 0, 362, 595).fill('#f3f4f6');

  doc.fillColor('#ffffff');
  doc.fontSize(16).font('Helvetica-Bold').text('F A N V I L', 50, 140, { characterSpacing: 4 });
  doc.fontSize(34).font('Helvetica-Bold').text('Déploiement des téléphones\nFanvil Pro V66', 50, 200, { lineGap: 6 });
  
  doc.fontSize(14).font('Helvetica').fillColor('#fca5a5').text('Projet mené pendant le stage — Net-Lyon', 50, 330);

  doc.fontSize(11).font('Helvetica').fillColor('#fecaca').text('Rapport de stage · BTS SIO — option SISR\nCandidat : Axel REBUS', 50, 520);

  // Right side decoration / text
  doc.fillColor(primaryRed);
  doc.fontSize(13).font('Helvetica-Bold').text('BTS SIO SISR', 520, 260);
  doc.fontSize(11).font('Helvetica').fillColor(darkText).text('Épreuve E6 — Réalisation en milieu professionnel\nInstitution des Chartreux — Lyon', 520, 285, { width: 270, lineGap: 4 });

  // SLIDE 2 : CONTEXTE DE LA MISSION
  doc.addPage();
  doc.rect(0, 0, 842, 595).fill('#ffffff');

  doc.fillColor(primaryRed).fontSize(26).font('Helvetica-Bold').text('Contexte de la mission', 50, 50);
  doc.fillColor(grayText).fontSize(13).font('Helvetica').text('Une commande de 36 téléphones fixes Fanvil Pro V66 à préparer avant déploiement chez le client.', 50, 90);

  const drawStep = (num, title, desc, y) => {
    // Circle
    doc.circle(75, y + 20, 18).fill(primaryRed);
    doc.fillColor('#ffffff').fontSize(14).font('Helvetica-Bold').text(num.toString(), 69, y + 13);

    // Title & desc
    doc.fillColor(darkText).fontSize(14).font('Helvetica-Bold').text(title, 110, y + 8);
    doc.fillColor(grayText).fontSize(11).font('Helvetica').text(desc, 110, y + 28, { width: 400, lineGap: 3 });
  };

  drawStep(1, 'Vérification du firmware', 'Comparer la version installée sur chaque poste à la dernière version disponible sur le site du fabricant.', 150);
  drawStep(2, 'Test de connexion Wi-Fi', 'Vérifier que chaque téléphone est capable de détecter et de se connecter au réseau Wi-Fi.', 240);
  drawStep(3, 'Suivi structuré', 'Une tâche simple mais très chronophage au vu du volume : 36 téléphones à contrôler un par un.', 330);

  // Right summary card
  doc.roundedRect(550, 140, 240, 250, 10).fill(cardBg);
  doc.fillColor(primaryRed).fontSize(14).font('Helvetica-Bold').text('Volume & Réception', 575, 170);
  doc.fillColor(darkText).fontSize(28).font('Helvetica-Bold').text('36 Postes', 575, 205);
  doc.fillColor(grayText).fontSize(11).font('Helvetica').text('Téléphones IP Fanvil Pro V66 réceptionnés, inventoriés et configurés dans les locaux techniques de Net-Lyon.', 575, 250, { width: 190, lineGap: 4 });

  doc.fillColor(grayText).fontSize(10).font('Helvetica').text('Rapport de stage BTS SIO — Projet téléphones Fanvil | Page 2', 50, 550);

  // SLIDE 3 : ORGANISATION ET TRAÇABILITÉ
  doc.addPage();
  doc.rect(0, 0, 842, 595).fill('#ffffff');

  doc.fillColor(primaryRed).fontSize(26).font('Helvetica-Bold').text('Organisation et traçabilité', 50, 50);
  
  // Left Box: Association MAC <-> utilisateur
  doc.roundedRect(50, 110, 360, 220, 8).fill(lightBg).stroke('#e2e8f0');
  doc.fillColor(primaryRed).fontSize(16).font('Helvetica-Bold').text('Association MAC <-> utilisateur', 70, 135);
  doc.fillColor(darkText).fontSize(12).font('Helvetica').text('Chaque adresse MAC a été rattachée à un utilisateur ou à un service de l\'entreprise cliente, consignée dans un tableau Excel dédié.\n\nCe référentiel garantit une traçabilité intégrale avant la livraison sur site et la configuration du serveur PBX Bicom.', 70, 170, { width: 320, lineGap: 4 });

  // Right Box: Étiquetage physique
  doc.roundedRect(430, 110, 360, 220, 8).fill(lightBg).stroke('#e2e8f0');
  doc.fillColor(primaryRed).fontSize(16).font('Helvetica-Bold').text('Étiquetage physique', 450, 135);
  doc.fillColor(darkText).fontSize(12).font('Helvetica').text('En parallèle, chaque poste fixe a été étiqueté avec son affectation précise (nom collaborateur / bureau / service) pour faciliter l\'organisation logistique et l\'installation sur site.\n\nContrôle visuel immédiat pour les techniciens lors du déploiement.', 450, 170, { width: 320, lineGap: 4 });

  // Bottom banner : Objectif
  doc.roundedRect(50, 360, 740, 90, 8).fill(cardBg);
  doc.fillColor(primaryRed).fontSize(13).font('Helvetica-Bold').text('Objectif opérationnel :', 80, 385);
  doc.fillColor(darkText).fontSize(13).font('Helvetica-Bold').text('Fluidifier le déploiement final chez le client en évitant toute confusion entre postes et optimiser le temps d\'intervention.', 80, 410, { width: 680 });

  doc.fillColor(grayText).fontSize(10).font('Helvetica').text('Rapport de stage BTS SIO — Projet téléphones Fanvil | Page 3', 50, 550);

  // SLIDE 4 : TEST DE BASCULE AUTOMATIQUE WI-FI
  doc.addPage();
  doc.rect(0, 0, 842, 595).fill('#ffffff');

  doc.fillColor(primaryRed).fontSize(26).font('Helvetica-Bold').text('Test de bascule automatique Wi-Fi', 50, 50);
  doc.fillColor(grayText).fontSize(13).font('Helvetica').text('Objectif : vérifier qu\'un téléphone connecté à deux réseaux Wi-Fi bascule seul sur le second si le premier tombe en panne.', 50, 90);

  const drawCard = (x, num, title, text) => {
    doc.roundedRect(x, 140, 220, 240, 8).fill(lightBg).stroke('#e2e8f0');
    doc.circle(x + 35, 175, 15).fill(primaryRed);
    doc.fillColor('#ffffff').fontSize(13).font('Helvetica-Bold').text(num.toString(), x + 31, 169);
    doc.fillColor(darkText).fontSize(14).font('Helvetica-Bold').text(title, x + 20, 205, { width: 180 });
    doc.fillColor(grayText).fontSize(11).font('Helvetica').text(text, x + 20, 245, { width: 180, lineGap: 4 });
  };

  drawCard(50, 1, 'Connexion double', 'Le téléphone est connecté au Wi-Fi de Net-Lyon, puis à un second réseau (partage de connexion d\'un smartphone de test).');
  
  // Arrow 1 -> 2
  doc.fillColor(primaryRed).fontSize(22).text('->', 285, 250);

  drawCard(310, 2, 'Coupure réseau', 'Le partage de connexion du smartphone est désactivé : le téléphone perd immédiatement la connexion active.');

  // Arrow 2 -> 3
  doc.fillColor(primaryRed).fontSize(22).text('->', 545, 250);

  drawCard(570, 3, 'Reconnexion auto', '19 secondes plus tard, le poste Fanvil détecte la perte et se reconnecte seul au Wi-Fi principal de Net-Lyon.');

  // Résultat concluant
  doc.roundedRect(50, 410, 740, 70, 8).fill(primaryRed);
  doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold').text('Résultat concluant :', 75, 425);
  doc.fillColor('#ffffff').fontSize(12).font('Helvetica').text('Les téléphones basculent automatiquement sur un second réseau Wi-Fi déjà configuré en cas d\'indisponibilité du premier, garantissant la continuité du service téléphonique.', 75, 445, { width: 690 });

  doc.fillColor(grayText).fontSize(10).font('Helvetica').text('Rapport de stage BTS SIO — Projet téléphones Fanvil | Page 4', 50, 550);

  // SLIDE 5 : AUTOPROVISIONING
  doc.addPage();
  doc.rect(0, 0, 842, 595).fill('#ffffff');

  doc.fillColor(primaryRed).fontSize(26).font('Helvetica-Bold').text('Mise en place de l\'autoprovisioning', 50, 50);
  doc.fillColor(grayText).fontSize(13).font('Helvetica').text('Configuration centralisée et automatisation du paramétrage des postes IP.', 50, 90);

  const drawProvisionBlock = (x, y, title, desc) => {
    doc.rect(x, y, 4, 60).fill(primaryRed);
    doc.fillColor(primaryRed).fontSize(14).font('Helvetica-Bold').text(title, x + 15, y);
    doc.fillColor(darkText).fontSize(11).font('Helvetica').text(desc, x + 15, y + 20, { width: 330, lineGap: 3 });
  };

  drawProvisionBlock(60, 140, 'Côté tuteur (Bicom)', 'Activation de l\'UAD et configuration de l\'extension, réalisées par le tuteur de stage sur les logiciels professionnels.');
  drawProvisionBlock(60, 230, 'Côté déploiement', 'Connexion de chaque téléphone au réseau local puis accès à son interface web d\'administration via son adresse IP.');
  drawProvisionBlock(60, 320, 'Autoprovisioning', 'Saisie des identifiants, de l\'adresse du serveur et du protocole HTTPS, puis lancement via « Static Provision Now ».');
  drawProvisionBlock(60, 410, 'Wi-Fi primaire / secondaire', 'Ajout des deux réseaux Wi-Fi dans l\'onglet Réseau : le téléphone s\'y connecte automatiquement une fois branché.');

  // Right Side Infobox
  doc.roundedRect(440, 140, 350, 330, 8).fill(cardBg);
  doc.fillColor(primaryRed).fontSize(16).font('Helvetica-Bold').text('Bilan de la réalisation', 470, 170);
  doc.fillColor(darkText).fontSize(12).font('Helvetica-Bold').text('Compétence E6 validée :', 470, 205);
  doc.fillColor(primaryRed).fontSize(13).font('Helvetica-Bold').text('> Travailler en mode projet', 470, 225);

  doc.fillColor(grayText).fontSize(11).font('Helvetica').text(
    '• Planification méthodique des 36 postes\n' +
    '• Traçabilité stricte par étiquetage et inventaire MAC\n' +
    '• Tests de résilience réseau (failover Wi-Fi validé)\n' +
    '• Déploiement automatisé via protocole HTTPS sécurisé\n' +
    '• Respect des délais pour la livraison chez le client final',
    470, 260, { width: 300, lineGap: 7 }
  );

  doc.fillColor(grayText).fontSize(10).font('Helvetica').text('Rapport de stage BTS SIO — Projet téléphones Fanvil | Page 5', 50, 550);

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => {
      console.log('diaporama-telephones-fanvil.pdf generated');
      try {
        execSync('gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r150 -sOutputFile=slide-fanvil-%d.png diaporama-telephones-fanvil.pdf');
        console.log('Fanvil slides PNG preview generated');
      } catch (e) {
        console.error('GS error for Fanvil:', e.message);
      }
      resolve();
    });
  });
}

// 2. DIAPORAMA 2 : INSTALLATION POSTE UTILISATEUR (4 SLIDES)
function generatePosteUtilisateurPdf() {
  const doc = new PDFDocument({
    size: [842, 595], // A4 Landscape
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: 'Rapport d\'installation poste utilisateur',
      Author: 'Axel REBUS',
      Subject: 'BTS SIO SISR - Réalisation professionnelle',
    }
  });

  const outPath = 'diaporama-installation-poste.pdf';
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  const primaryTeal = '#0d9488';
  const darkTeal = '#115e59';
  const darkText = '#1e293b';
  const grayText = '#64748b';
  const lightBg = '#f0fdfa';
  const cardBg = '#f1f5f9';

  // SLIDE 1 : COUVERTURE
  // Background gradient-like split
  doc.rect(0, 0, 842, 595).fill('#042f2e');
  doc.circle(700, 150, 180).fill('#0f766e');
  doc.circle(780, 480, 160).fill('#0d9488');

  doc.fillColor('#5eead4').fontSize(14).font('Helvetica-Bold').text('S U P P O R T   I N F O R M A T I Q U E', 60, 150, { characterSpacing: 2 });
  doc.fillColor('#ffffff').fontSize(36).font('Helvetica-Bold').text('Rapport d\'installation\nposte utilisateur', 60, 190, { lineGap: 8 });
  doc.fillColor('#ccfbf1').fontSize(14).font('Helvetica').text('Reprise d\'activité d\'une collaboratrice — remise en service du poste et des accès numériques', 60, 310, { width: 550, lineGap: 4 });

  doc.fillColor('#99f6e4').fontSize(12).font('Helvetica-Bold').text('02/07/2026', 60, 490);
  doc.fillColor('#ffffff').fontSize(12).font('Helvetica').text('Axel REBUS · Rapport de stage BTS SIO SISR · Institution des Chartreux', 60, 510);

  // SLIDE 2 : REMISE EN SERVICE DU TÉLÉPHONE
  doc.addPage();
  doc.rect(0, 0, 842, 595).fill('#ffffff');

  doc.fillColor(darkTeal).fontSize(26).font('Helvetica-Bold').text('Remise en service du téléphone', 50, 50);
  doc.fillColor(grayText).fontSize(13).font('Helvetica').text('Première étape : reconnecter la collaboratrice à son identité numérique.', 50, 90);

  const drawStepTeal = (num, title, desc, y) => {
    doc.circle(75, y + 20, 18).fill(primaryTeal);
    doc.fillColor('#ffffff').fontSize(14).font('Helvetica-Bold').text(num.toString(), 69, y + 13);
    doc.fillColor(darkText).fontSize(14).font('Helvetica-Bold').text(title, 110, y + 8);
    doc.fillColor(grayText).fontSize(11).font('Helvetica').text(desc, 110, y + 28, { width: 440, lineGap: 3 });
  };

  drawStepTeal(1, 'Activation de l\'eSIM', 'Mise en place du téléphone professionnel avec la carte eSIM de la collaboratrice.', 150);
  drawStepTeal(2, 'Réinitialisation du mot de passe', 'Le téléphone opérationnel a permis de réinitialiser le mot de passe de sa messagerie professionnelle, puis de configurer son code PIN.', 240);
  drawStepTeal(3, 'Microsoft Authenticator', 'Présentation de l\'application, ajout de son compte et vérification du bon fonctionnement.', 330);

  // Right icon block
  doc.circle(670, 260, 70).fill(primaryTeal);
  doc.fillColor('#ffffff').fontSize(30).text('TEL', 645, 245);
  doc.fillColor(darkTeal).fontSize(13).font('Helvetica-Bold').text('Téléphone professionnel', 590, 350, { width: 160, align: 'center' });

  doc.fillColor(grayText).fontSize(10).font('Helvetica').text('Rapport d\'installation — retour de poste utilisateur | Page 2', 50, 550);

  // SLIDE 3 : SÉCURISATION DES ACCÈS — CHROME & BITWARDEN
  doc.addPage();
  doc.rect(0, 0, 842, 595).fill('#ffffff');

  doc.fillColor(darkTeal).fontSize(26).font('Helvetica-Bold').text('Sécurisation des accès — Chrome & BitWarden', 50, 50);
  doc.fillColor(grayText).fontSize(13).font('Helvetica').text('Installation du gestionnaire de mots de passe, présenté puis mis en pratique avec la collaboratrice sur un cas concret.', 50, 90);

  const drawCardTeal = (x, num, title, text) => {
    doc.roundedRect(x, 140, 220, 240, 8).fill(lightBg).stroke('#ccfbf1');
    doc.circle(x + 35, 175, 15).fill(primaryTeal);
    doc.fillColor('#ffffff').fontSize(13).font('Helvetica-Bold').text(num.toString(), x + 31, 169);
    doc.fillColor(darkText).fontSize(14).font('Helvetica-Bold').text(title, x + 20, 205, { width: 180 });
    doc.fillColor(grayText).fontSize(11).font('Helvetica').text(text, x + 20, 245, { width: 180, lineGap: 4 });
  };

  drawCardTeal(50, 1, 'Installation', 'Installation de Google Chrome puis de l\'extension BitWarden. Explication pédagogique de son utilité avant la prise en main.');
  doc.fillColor(primaryTeal).fontSize(22).text('->', 285, 250);

  drawCardTeal(310, 2, 'Mise en pratique', 'Connexion à son OneDrive professionnel : création d\'un identifiant BitWarden (mail + mot de passe), puis utilisation du raccourci de connexion automatique.');
  doc.fillColor(primaryTeal).fontSize(22).text('->', 545, 250);

  drawCardTeal(570, 3, 'Double authentification', 'Une demande d\'authentification via Microsoft Authenticator est survenue à ce moment, l\'occasion parfaite de revoir la procédure avec elle.');

  // Result box
  doc.roundedRect(50, 410, 740, 70, 8).fill(darkTeal);
  doc.fillColor('#ffffff').fontSize(12).font('Helvetica-Bold').text('Résultat opérationnel :', 75, 425);
  doc.fillColor('#ffffff').fontSize(12).font('Helvetica').text('Un premier identifiant BitWarden opérationnel et une collaboratrice initiée et rassurée sur les deux outils clés (BitWarden et Authenticator).', 75, 445, { width: 690 });

  doc.fillColor(grayText).fontSize(10).font('Helvetica').text('Rapport d\'installation — retour de poste utilisateur | Page 3', 50, 550);

  // SLIDE 4 : FINALISATION FICHIERS & SÉCURITÉ MOBILE
  doc.addPage();
  doc.rect(0, 0, 842, 595).fill('#ffffff');

  doc.fillColor(darkTeal).fontSize(26).font('Helvetica-Bold').text('Finalisation : fichiers et sécurité mobile', 50, 50);

  // Card 1 : Fichiers OneDrive
  doc.roundedRect(50, 110, 350, 340, 8).fill(lightBg).stroke('#ccfbf1');
  doc.fillColor(primaryTeal).fontSize(18).font('Helvetica-Bold').text('Fichiers OneDrive', 75, 140);
  doc.fillColor(darkText).fontSize(12).font('Helvetica').text('Vérification effectuée : tous les fichiers de la collaboratrice sont bien présents et accessibles sur son espace cloud OneDrive.', 75, 175, { width: 300, lineGap: 4 });

  // Point en attente box
  doc.roundedRect(70, 250, 310, 160, 6).fill('#fffbeb').stroke('#fef3c7');
  doc.fillColor('#b45309').fontSize(12).font('Helvetica-Bold').text('! Point en attente & Suivi', 85, 270);
  doc.fillColor('#92400e').fontSize(11).font('Helvetica').text('Une synchronisation OneDrive <-> Bureau a été lancée mais est restée bloquée en cours (« mouline » sans se terminer).\n\nStatut final non confirmé — action consignée dans le ticket pour vérification lors d\'un prochain passage.', 85, 295, { width: 280, lineGap: 3 });

  // Card 2 : Sécurité mobile (Darker Card)
  doc.roundedRect(430, 110, 360, 340, 8).fill(darkTeal);
  doc.fillColor('#ffffff').fontSize(18).font('Helvetica-Bold').text('Sécurité mobile', 460, 140);

  const drawBullet = (text, y) => {
    doc.circle(465, y + 6, 4).fill('#5eead4');
    doc.fillColor('#ffffff').fontSize(11).font('Helvetica').text(text, 480, y, { width: 290, lineGap: 3 });
  };

  drawBullet('Installation de BitWarden sur le smartphone par une collègue, avec explication complète de son fonctionnement.', 180);
  drawBullet('Paramétrage du Face ID et renouvellement sécurisé du code de verrouillage du téléphone portable.', 250);
  drawBullet('Activation du déverrouillage biométrique Face ID pour BitWarden et Microsoft Authenticator, afin de simplifier leur usage au quotidien tout en renforçant la sécurité.', 310);

  // Footer note
  doc.fillColor(grayText).fontSize(10).font('Helvetica').text('Rapport d\'installation — retour de poste utilisateur | Page 4 • Compétence validée : Mettre à disposition des utilisateurs un service informatique', 50, 550);

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => {
      console.log('diaporama-installation-poste.pdf generated');
      try {
        execSync('gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r150 -sOutputFile=slide-poste-%d.png diaporama-installation-poste.pdf');
        console.log('Poste slides PNG preview generated');
      } catch (e) {
        console.error('GS error for Poste:', e.message);
      }
      resolve();
    });
  });
}

async function main() {
  await generateFanvilPdf();
  await generatePosteUtilisateurPdf();
  console.log('All diaporamas and preview images generated successfully!');
}

main();
