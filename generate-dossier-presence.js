import PDFDocument from 'pdfkit';
import fs from 'fs';
import { execSync } from 'child_process';

function generatePresencePdf() {
  const doc = new PDFDocument({
    size: 'A4', // [595.28, 841.89]
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: 'Dossier Dev, présence en ligne - Ferhan Food',
      Author: 'Axel REBUS',
      Subject: 'BTS SIO SISR - Développer la présence en ligne de l\'organisation',
    }
  });

  const outPath = 'dossier-presence-en-ligne.pdf';
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  const primaryBlue = '#1e3a8a';
  const accentCyan = '#0284c7';
  const textDark = '#1e293b';
  const textMuted = '#64748b';
  const lightBg = '#f8fafc';

  const addHeaderFooter = (pageNum, sectionTitle = 'DOSSIER DEV, PRÉSENCE EN LIGNE') => {
    // Header
    doc.rect(0, 0, 595, 25).fill(primaryBlue);
    doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold').text(sectionTitle.toUpperCase(), 40, 8, { characterSpacing: 1 });

    // Footer
    doc.fillColor(textMuted).fontSize(8).font('Helvetica').text('Institution des Chartreux · BTS SIO · Axel REBUS', 40, 815);
    doc.fillColor(textMuted).fontSize(8).font('Helvetica-Bold').text(pageNum.toString(), 540, 815);
    doc.rect(40, 805, 515, 0.5).fill('#cbd5e1');
  };

  // PAGE 1 : COUVERTURE
  // Top band
  doc.rect(0, 0, 595, 70).fill(primaryBlue);
  doc.fillColor('#ffffff').fontSize(11).font('Helvetica-Bold').text('DOSSIER DEV, PRÉSENCE EN LIGNE', 40, 30, { characterSpacing: 2 });

  // Border frame
  doc.rect(100, 180, 4, 150).fill(accentCyan);

  doc.fillColor(textMuted).fontSize(14).font('Helvetica').text('Institution des Chartreux', 120, 200);
  doc.fillColor(primaryBlue).fontSize(34).font('Helvetica-Bold').text('Dossier Dev,\nprésence en ligne', 120, 225, { lineGap: 6 });
  doc.fillColor(textDark).fontSize(13).font('Helvetica').text('Mr. Langloy', 120, 310);

  // Center Emblem / Text
  doc.roundedRect(160, 420, 275, 120, 8).fill(lightBg).stroke('#e2e8f0');
  doc.fillColor(primaryBlue).fontSize(18).font('Helvetica-Bold').text('Les Chartreux', 180, 450);
  doc.fillColor(accentCyan).fontSize(13).font('Helvetica-Bold').text('BTS Services Informatiques aux Organisations', 180, 480);
  doc.fillColor(textMuted).fontSize(11).font('Helvetica').text('Option SISR — Épreuve E6 Réalisation', 180, 505);

  // Author & Date
  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('REBUS Axel', 120, 720);
  doc.fillColor(textMuted).fontSize(11).font('Helvetica').text('28/01/2026', 120, 740);

  // PAGE 2 : TABLE DES MATIÈRES
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(1, 'Table des matières');

  doc.fillColor(primaryBlue).fontSize(22).font('Helvetica-Bold').text('Table des matières', 40, 55);

  const tocItems = [
    { section: 'S1 – Création', items: ['1. Thématique', '2. CMS', '3. Accès'], p: ['2', '3', '3'] },
    { section: 'S2 - Objectif', items: ['4. Présenter les objectifs du site internet', '5. KPI (KPI 1, KPI 2)', '6. USP', '7. Analyse SWOT du projet (Forces, Faiblesses, Opportunités, Menaces)'], p: ['6', '7', '7', '7-8'] },
    { section: 'S3 – Référencement', items: ['8. Étude comparative de 3 plugins SEO (Rank Math, Yoast, All in One)', 'Donner 3 éléments d’actions SEO'], p: ['8', '9'] },
    { section: 'S4 - Référencement local', items: ['9. Présenter une fiche entreprise (Google Maps)', '10. Définir les champs d’action géographique'], p: ['9', '10'] },
    { section: 'S5 – Site Web', items: ['11. Définir une approche UI/UX', '12. Expliquer les éléments sur lesquels pratiquer de l’ergonomie', '13. Définir du Net-Linking avec un autre étudiant', '14. Faire une analyse benchmark du site (PageSpeed Insights, DevTools)'], p: ['10', '10', '11', '11-12'] },
    { section: 'S5 – Réseaux sociaux', items: ['15. Définir quel est l’intérêt SMO mise en œuvre pour le site'], p: ['12'] },
    { section: 'S7 – Marketing E-mail', items: ['16. Pourquoi avoir utilisé un logiciel d’e-mailing (Brevo vs Mailchimp)', '17. Définir l’objectif d’une campagne d’e-mailing', '18. Identifier les catégories de la base de données clientes', '19. Expliquer le choix de la segmentation pour la campagne', '20. Coller une capture du mailing reçu par un client'], p: ['13', '13', '14', '14', '15'] },
  ];

  let tocY = 95;
  tocItems.forEach(group => {
    doc.fillColor(accentCyan).fontSize(12).font('Helvetica-Bold').text(group.section, 40, tocY);
    tocY += 16;
    group.items.forEach((item, idx) => {
      doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(item, 55, tocY);
      doc.fillColor(textMuted).fontSize(9).font('Helvetica').text(group.p[idx], 530, tocY, { align: 'right' });
      tocY += 15;
    });
    tocY += 6;
  });

  // PAGE 3 : S1 - CRÉATION (THÉMATIQUE)
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(2, 'S1 – Création // Thématique');

  doc.fillColor(accentCyan).fontSize(16).font('Helvetica-Bold').text('S1 – Création', 40, 50);
  doc.fillColor(primaryBlue).fontSize(14).font('Helvetica-Bold').text('1. Thématique', 40, 75);

  const textPage3 = 
    "Pour ce projet, j’ai choisi de créer un site autour d’un restaurant fictif qui s’appelle Ferhan Food. L’idée de base, c’était de faire quelque chose qui change un peu des restaurants classiques, avec une ambiance exotique, imaginaire, que j’ai appelé “ferhanais”.\n\n" +
    "Le thème repose sur une cuisine inspirée de plusieurs cultures, avec des plats originaux, des épices, et surtout une identité visuelle assez forte. Par exemple, on retrouve des couleurs chaudes, des décors tropicaux, et une ambiance qui fait voyager, comme si on n’était pas juste dans un restaurant classique mais dans une expérience. Cela se voit dès l’ouverture du site.\n\n" +
    "Je voulais aussi que ce soit un projet qui donne envie visuellement, parce qu’aujourd’hui les gens regardent beaucoup les images avant même de lire le menu. En conséquence j’ai essayé de créer quelque chose de cohérent entre les plats, le design du site et l’image du restaurant.\n\n" +
    "Ce projet est considéré comme non-commercial parce qu’il ne s’agit pas d’un vrai restaurant. C’est un projet réalisé dans le cadre d’un TP, donc il n’y a pas de vente réelle ni de clients. Le but, c’est surtout de s’entraîner à créer une présence en ligne, comme si c’était une vraie entreprise.\n\n" +
    "Concernant le fait que ce soit un projet de non-concurrence, c’est parce que le restaurant est totalement fictif. Il ne reprend pas une vraie marque existante, ni un restaurant réel. Du coup, cela évite tout problème avec des entreprises déjà existantes. On est libre de créer notre propre concept, notre identité, sans copier quelqu’un.";

  doc.fillColor(textDark).fontSize(10.5).font('Helvetica').text(textPage3, 40, 110, { width: 515, lineGap: 5 });

  // Encadré récapitulatif
  doc.roundedRect(40, 530, 515, 110, 8).fill(lightBg).stroke('#cbd5e1');
  doc.fillColor(primaryBlue).fontSize(11).font('Helvetica-Bold').text('En résumé — Le projet Ferhan Food :', 60, 550);
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(
    '• Concept : Restaurant imaginaire à la gastronomie exotique et immersive\n' +
    '• Objectif pédagogique : Maîtriser l\'ensemble de la chaîne de valeur d\'une présence web moderne\n' +
    '• Périmètre : Non-commercial, non-concurrentiel, création d\'identité de marque originale',
    60, 575, { lineGap: 6 }
  );

  // PAGE 4 : CMS & ACCÈS
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(3, 'S1 – Création // CMS & Accès');

  doc.fillColor(primaryBlue).fontSize(14).font('Helvetica-Bold').text('2. CMS (Content Management System)', 40, 50);

  const textCms = 
    "Pour réaliser le site Ferhan Food, j’ai utilisé WordPress comme CMS. Un CMS est un outil qui permet de créer un site web sans forcément tout coder à la main. Ça facilite beaucoup les choses, surtout lorsqu’on débute.\n\n" +
    "J’ai choisi WordPress principalement parce que c’est assez simple à prendre en main. Au début, j’étais assez perdu car je ne connaissais pas cet outil mais après quelques essais, j’ai vu qu’on pouvait créer des pages assez rapidement avec des outils comme Elementor. Donc cela m’a permis de me concentrer plus sur le design et le contenu plutôt que sur le code pur.\n\n" +
    "Un autre point important, c’est que WordPress propose énormément de plugins. Par exemple, pour le référencement ou pour améliorer le site, on peut ajouter des fonctionnalités sans trop de difficulté. Ça rend le site plus complet, même si on n’est pas encore expert.\n\n" +
    "Comme autres CMS, il y a par exemple Wix ou Shopify. Wix est aussi très simple à utiliser, peut-être même plus que WordPress au début, mais je trouve que c’est un peu plus limité quand on veut personnaliser vraiment le site. On est vite bloqué dans certains choix. Shopify, lui, est surtout utilisé pour les sites e-commerce. Donc pour un restaurant comme Ferhan, ce n’était pas forcément le plus adapté, surtout qu’il est payant assez rapidement.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textCms, 40, 80, { width: 515, lineGap: 4 });

  doc.fillColor(primaryBlue).fontSize(14).font('Helvetica-Bold').text('3. Accès au site web', 40, 390);

  const textAcces = 
    "Pour accéder au site que j’ai créé, il suffit d’aller sur l’URL suivante :\n" +
    "https://www.ferhan-food.labo.infochartreux.fr/\n\n" +
    "Ou autrement, on peut directement écrire « Ferhan Food » sur google et on trouve directement ma fiche entreprise en premier avec mon site web associé.\n\n" +
    "Cette adresse correspond à un site hébergé dans le cadre du projet du fin de chapitre sur la présence en ligne. Le nom de domaine contient “ferhan-food”, ce qui permet de comprendre directement le thème du site. Cela est important car cela aide à identifier rapidement le contenu, même avant d’ouvrir la page.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textAcces, 40, 420, { width: 515, lineGap: 4 });

  // URL Box
  doc.roundedRect(40, 560, 515, 60, 6).fill('#f0fdf4').stroke('#86efac');
  doc.fillColor('#166534').fontSize(11).font('Helvetica-Bold').text('URL officielle du projet :', 60, 575);
  doc.fillColor('#15803d').fontSize(11).font('Helvetica-Bold').text('https://www.ferhan-food.labo.infochartreux.fr/', 60, 595);

  // PAGE 5 : CAPTURES D'ÉCRAN (ACCUEIL & MENU)
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(4, 'S1 – Création // Captures Accueil & Menu');

  doc.fillColor(primaryBlue).fontSize(14).font('Helvetica-Bold').text('Haut de la page d’accueil :', 40, 50);
  doc.roundedRect(40, 75, 515, 230, 8).fill('#0f172a');
  doc.fillColor('#f59e0b').fontSize(12).font('Helvetica-Bold').text('FERHAN FOOD', 240, 130, { align: 'center' });
  doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold').text('Ferhan Food', 40, 160, { width: 515, align: 'center' });
  doc.fillColor('#94a3b8').fontSize(11).font('Helvetica').text('Voyage culinaire au cœur de Ferhan', 40, 195, { width: 515, align: 'center' });
  doc.roundedRect(70, 245, 455, 40, 4).fill('rgba(255,255,255,0.08)');
  doc.fillColor('#ffffff').fontSize(9).font('Helvetica').text('Horaires d\'Ouverture   |   Réserver une Table   |   Meilleur Menu', 40, 260, { width: 515, align: 'center' });

  doc.fillColor(primaryBlue).fontSize(14).font('Helvetica-Bold').text('Haut de la page du menu :', 40, 340);
  doc.roundedRect(40, 365, 515, 230, 8).fill('#090d16');
  doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('Menu', 40, 440, { width: 515, align: 'center' });
  doc.fillColor('#cbd5e1').fontSize(10).font('Helvetica').text('À Ferhan, chaque ingrédient a une origine, chaque recette une mémoire.\nIci, vous ne mangez pas seulement — vous découvrez un monde qui n\'existe nulle part ailleurs.', 40, 480, { width: 515, align: 'center', lineGap: 3 });

  // PAGE 6 : CAPTURES D'ÉCRAN (À PROPOS & CONTACT)
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(5, 'S1 – Création // Captures À Propos & Contact');

  doc.fillColor(primaryBlue).fontSize(14).font('Helvetica-Bold').text('Haut de la page à propos de nous :', 40, 50);
  doc.roundedRect(40, 75, 515, 230, 8).fill('#090d16');
  doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('À propos de nous', 40, 150, { width: 515, align: 'center' });
  doc.fillColor('#cbd5e1').fontSize(10).font('Helvetica').text('À Ferhan, chaque plat est une histoire, chaque saveur une origine. Un monde où les recettes\nnaissent entre lagons lumineux, forêts luxuriantes et terres brûlantes, pour offrir une expérience hors du temps.', 40, 190, { width: 515, align: 'center', lineGap: 3 });

  doc.fillColor(primaryBlue).fontSize(14).font('Helvetica-Bold').text('Haut de la page contact :', 40, 340);
  doc.roundedRect(40, 365, 515, 230, 8).fill('#0f172a');
  doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('Contact', 40, 440, { width: 515, align: 'center' });
  doc.fillColor('#cbd5e1').fontSize(10).font('Helvetica').text('Une question, une envie, une réservation ?\nNotre équipe est à votre écoute pour vous accompagner dans votre expérience Ferhan.\nLaissez-nous vous guider vers un moment unique, entre saveurs et voyage.', 40, 480, { width: 515, align: 'center', lineGap: 3 });

  // PAGE 7 : S2 - OBJECTIFS DU SITE
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(6, 'S2 – Objectifs // Présentation');

  doc.fillColor(accentCyan).fontSize(16).font('Helvetica-Bold').text('S2 - Objectif', 40, 50);
  doc.fillColor(primaryBlue).fontSize(14).font('Helvetica-Bold').text('4. Présenter les objectifs du site internet', 40, 75);

  const textObjectifs = 
    "Pour le site Ferhan Food, l’objectif principal est de créer une présence en ligne pour un restaurant, même si le restaurant est fictif. L’idée c’est de faire comme si c’était un vrai établissement, et de montrer comment on pourrait attirer des clients grâce au digital.\n\n" +
    "Le premier objectif, je dirais que c’est surtout de donner envie aux gens de venir au restaurant. Par exemple, avec les images des plats, le design du site, ou encore les descriptions, tout est fait pour donner faim et attirer l’attention.\n\n" +
    "Puis, il y a aussi un objectif de visibilité. Le site permet de montrer que le restaurant existe, de présenter son concept, son univers, et de se différencier un peu des autres restaurants. Aujourd’hui, si un restaurant n’est pas présent sur internet, c’est compliqué pour lui d’exister, donc cela fait partie des bases.\n\n" +
    "Un autre objectif important, c’est de faciliter la prise de contact ou la réservation. Par exemple, sur le site, il y a une page contact et un système pour réserver une table. Donc, l’utilisateur peut directement passer à l’action sans avoir à chercher ailleurs. D’autant plus qu’il y a 5 boutons éparpillés dans le site qui renvoient à la page de contact pour réserver une table.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textObjectifs, 40, 105, { width: 515, lineGap: 4.5 });

  // Encadré CTA
  doc.roundedRect(40, 450, 515, 140, 8).fill(lightBg).stroke('#cbd5e1');
  doc.fillColor(primaryBlue).fontSize(12).font('Helvetica-Bold').text('Dispositif de Call-to-Action (CTA) pour la conversion :', 60, 470);
  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(
    '• Bouton « Réservez une table » placé sur l\'en-tête, le menu, la page d\'accueil et en fin de page\n' +
    '• Raccourci téléphonique direct : (+33) 04 67 96 18 11\n' +
    '• Section dédiée « Les Maîtres des Saveurs de Ferhan » renforçant la curiosité et l\'immersion',
    60, 500, { lineGap: 6 }
  );

  // PAGE 8 : KPI, USP & SWOT (FORCES)
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(7, 'S2 – Objectifs // KPI, USP & SWOT');

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('5. KPI (Key Performance Indicators)', 40, 50);

  const textKpi = 
    "Les KPI sont des indicateurs qui permettent de voir si le site fonctionne bien ou pas. Pour mon site Ferhan Food, j’ai choisi deux KPI que je trouve importants :\n\n" +
    "• KPI 1 — Nombre de visiteurs sur le site : Si beaucoup de personnes visitent le site, cela veut dire que le restaurant commence à être visible. Par exemple, si on partage le site sur les réseaux sociaux ou avec des amis, et que le nombre de visiteurs augmente, c’est un bon signe.\n" +
    "  -> Objectif fixé : 50 visites en une semaine.\n\n" +
    "• KPI 2 — Nombre de réservations effectuées (ou prises de contact) : Là, on est plus dans quelque chose de concret. Si des personnes réservent une table ou remplissent un formulaire, cela veut dire que le site pousse à l’action.\n" +
    "  -> Objectif fixé : 20 réservations de tables en une semaine.";

  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(textKpi, 40, 75, { width: 515, lineGap: 4 });

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('6. USP (Unique Selling Proposition)', 40, 245);
  doc.roundedRect(40, 265, 515, 60, 6).fill('#eff6ff').stroke('#93c5fd');
  doc.fillColor(primaryBlue).fontSize(10.5).font('Helvetica-Bold').text('USP de Ferhan Food :', 60, 280);
  doc.fillColor(accentCyan).fontSize(11).font('Helvetica-Bold').text('« Une expérience culinaire immersive inspirée d’un univers imaginaire. »', 60, 300);

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('7. Analyse SWOT du projet', 40, 350);
  doc.fillColor(accentCyan).fontSize(11).font('Helvetica-Bold').text('Forces (Strengths) :', 40, 375);
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(
    '• Concept original basé sur un pays imaginaire appelé Ferhan.\n' +
    '• Proposition culinaire unique qui permet de découvrir des plats inspirés d’un univers fictif.\n' +
    '• Possibilité d’attirer des utilisateurs curieux de découvrir une expérience culinaire différente.',
    40, 395, { width: 515, lineGap: 4 }
  );

  // PAGE 9 : SWOT (SUITE) & S3 RÉFÉRENCEMENT (PLUGINS SEO)
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(8, 'S2/S3 – SWOT Suite & Étude SEO');

  doc.fillColor(accentCyan).fontSize(11).font('Helvetica-Bold').text('Faiblesses (Weaknesses) :', 40, 45);
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(
    '• Le pays étant imaginaire, les utilisateurs peuvent ne pas comprendre immédiatement le concept.\n' +
    '• Le site peut manquer de crédibilité s’il n’est pas bien présenté.\n' +
    '• Nécessité de créer du contenu attractif pour rendre l’univers de Ferhan crédible.',
    40, 65, { width: 515, lineGap: 3 }
  );

  doc.fillColor(accentCyan).fontSize(11).font('Helvetica-Bold').text('Opportunités (Opportunities) :', 40, 130);
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(
    '• Développer l’univers du pays imaginaire Ferhan avec de nouvelles recettes.\n' +
    '• Ajouter de nouveaux plats et menus inspirés de différentes régions du pays fictif.\n' +
    '• Utiliser les réseaux sociaux pour promouvoir le concept et attirer un public curieux.\n' +
    '• Possibilité d’ajouter la commande en ligne ou les avis clients.',
    40, 150, { width: 515, lineGap: 3 }
  );

  doc.fillColor(accentCyan).fontSize(11).font('Helvetica-Bold').text('Menaces (Threats) :', 40, 230);
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(
    '• Forte concurrence dans le domaine des sites de restauration.\n' +
    '• Difficulté à attirer des visiteurs si le concept n’est pas suffisamment mis en valeur.',
    40, 250, { width: 515, lineGap: 3 }
  );

  doc.fillColor(accentCyan).fontSize(15).font('Helvetica-Bold').text('S3 – Référencement (SEO)', 40, 310);
  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('8. Étude comparative de 3 plugins SEO sur WordPress', 40, 335);

  const textSeoIntro = 
    "Pour améliorer le référencement de mon site Ferhan Food, j’ai comparé trois plugins SEO réputés sur WordPress : Rank Math SEO, Yoast SEO et All in One SEO. L’objectif était de choisir l'outil le plus performant et pédagogique.\n\n" +
    "• Rank Math SEO : Très complet, il propose de nombreuses fonctionnalités directement dans sa version gratuite (travail sur plusieurs mots-clés simultanés, score SEO sur 100). Interface riche une fois prise en main.\n\n" +
    "• Yoast SEO : Très connu, idéal pour les débutants avec son système de feux tricolores (vert, orange, rouge). Cependant, plusieurs options avancées sont bridées en version gratuite.\n\n" +
    "• All in One SEO : Simple à configurer avec son assistant pas-à-pas, mais un peu moins poussé pour une optimisation fine.\n\n" +
    "-> Choix final : Rank Math SEO pour sa richesse fonctionnelle sans surcoût.";

  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(textSeoIntro, 40, 360, { width: 515, lineGap: 4 });

  // PAGE 10 : ACTIONS SEO & S4 RÉFÉRENCEMENT LOCAL (GOOGLE MAPS)
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(9, 'S3/S4 – Actions SEO & Fiche Entreprise');

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('3 Éléments d’actions SEO mis en œuvre :', 40, 50);

  const drawActionSeo = (num, title, desc, y) => {
    doc.circle(55, y + 10, 10).fill(accentCyan);
    doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text(num.toString(), 52, y + 6);
    doc.fillColor(primaryBlue).fontSize(11).font('Helvetica-Bold').text(title, 75, y);
    doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(desc, 75, y + 18, { width: 480, lineGap: 3 });
  };

  drawActionSeo(1, 'Optimisation des balises de titres (H1, H2)', 'Structuration claire du contenu par niveau hiérarchique afin d\'améliorer la compréhension sémantique par les robots de Google.', 80);
  drawActionSeo(2, 'Insertion de mots-clés ciblés (« cuisine exotique », « restaurant »)', 'Positionnement sur des termes de recherche porteurs correspondant à l\'univers imaginaire proposé.', 140);
  drawActionSeo(3, 'Rédaction soignée des meta descriptions', 'Optimisation du taux de clic (CTR) dans les résultats des moteurs de recherche grâce à des accroches engageantes.', 200);

  doc.fillColor(accentCyan).fontSize(15).font('Helvetica-Bold').text('S4 - Référencement local', 40, 280);
  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('9. Présenter une fiche entreprise (Google Établissement)', 40, 305);

  const textFiche = 
    "Pour améliorer le référencement local de mon site Ferhan Food, j’ai créé une fiche établissement sur Google. Cette fiche permet de rendre le restaurant visible directement dans les résultats de recherche, notamment sur Google Maps.\n\n" +
    "On y retrouve les informations essentielles :\n" +
    "• L\'adresse précise : Permet aux clients de localiser immédiatement le restaurant physique.\n" +
    "• Le numéro de téléphone : Facilite la prise de contact et la réservation directe.\n" +
    "• Les horaires d’ouverture : Renseigne clairement les visiteurs sur les plages de service.\n\n" +
    "La fiche entreprise centralise ces informations clés et maximise la conversion locale, ce qui constitue un outil fondamental pour tout commerce de bouche.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textFiche, 40, 335, { width: 515, lineGap: 4.5 });

  // PAGE 11 : GÉOGRAPHIE, UI/UX ET ERGONOMIE
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(10, 'S4/S5 – Périmètre & Ergonomie UI/UX');

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('10. Définir les champs d’action géographique', 40, 50);

  const textGeo = 
    "Le restaurant Ferhan Food est situé à Chaponost (69), son champ d’action principal reste donc local autour de cette commune.\n\n" +
    "Cependant, grâce au site internet et à la stratégie de référencement naturel, le restaurant étend sa visibilité à l\'agglomération lyonnaise et aux villes limitrophes : Lyon, Oullins ou Francheville. Ainsi, même si l\'accueil se fait sur place, le digital permet de capter une clientèle élargie dans la région Auvergne-Rhône-Alpes.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textGeo, 40, 75, { width: 515, lineGap: 4 });

  doc.fillColor(accentCyan).fontSize(15).font('Helvetica-Bold').text('S5 – Site Web : Ergonomie et UI/UX', 40, 200);
  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('11. Définir une approche UI/UX', 40, 225);

  const textUiUx = 
    "• Design visuel (UI) : Palette sombre rehaussée de touches dorées pour évoquer une atmosphère exotique, chaleureuse et haut de gamme. Intégration de visuels de plats gourmands pour susciter l'appétit.\n\n" +
    "• Expérience utilisateur (UX) : Arborescence fluide et épurée (Accueil, Menu, À propos, Contact) accompagnée de rappels d\'action en pied de page pour que l\'internaute trouve l\'information en moins de 3 clics.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textUiUx, 40, 250, { width: 515, lineGap: 4 });

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('12. Éléments ergonomiques optimisés', 40, 360);

  const textErgo = 
    "• Navigation simplifiée : Menu clair et toujours accessible.\n" +
    "• Contraste et lisibilité : Typographie blanche nette sur fond sombre respectant les normes d\'accessibilité.\n" +
    "• Structure aérée : Découpage par blocs thématiques distincts (présentation, menus, réservations).\n" +
    "• Boutons d'action visibles : Accès immédiat aux fonctions « Réserver » et « Voir le menu ».";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textErgo, 40, 385, { width: 515, lineGap: 4 });

  // PAGE 12 : NET-LINKING & BENCHMARK PAGESPEED
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(11, 'S5 – Net-Linking & Benchmark PageSpeed');

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('13. Net-Linking avec un autre étudiant & Intérêt du Backlink', 40, 50);

  const textNetlink = 
    "Pour renforcer l’autorité de domaine du site Ferhan Food, j’ai mis en place un partenariat de net-linking croisé avec un autre projet étudiant.\n\n" +
    "Intérêt du Backlink :\n" +
    "• Augmente la confiance et la crédibilité du site auprès des algorithmes de Google.\n" +
    "• Génère du trafic référent direct entre les deux plateformes partenaires.\n" +
    "• Constitue une application pratique des méthodes de SEO off-page.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textNetlink, 40, 75, { width: 515, lineGap: 4 });

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('14. Benchmark de performance (Google PageSpeed Insights)', 40, 200);

  // Scores Cards
  doc.roundedRect(40, 230, 250, 160, 8).fill(lightBg).stroke('#cbd5e1');
  doc.fillColor(primaryBlue).fontSize(11).font('Helvetica-Bold').text('Analyse Mobile (PageSpeed) :', 60, 250);
  doc.circle(95, 305, 30).fill('#f59e0b');
  doc.fillColor('#ffffff').fontSize(16).font('Helvetica-Bold').text('68', 85, 298);
  doc.fillColor(textDark).fontSize(9).font('Helvetica').text('First Contentful Paint : 2.8 s\nSpeed Index : 4.5 s\nTotal Blocking Time : 10 ms', 140, 290, { lineGap: 4 });

  doc.roundedRect(305, 230, 250, 160, 8).fill(lightBg).stroke('#cbd5e1');
  doc.fillColor(primaryBlue).fontSize(11).font('Helvetica-Bold').text('Analyse Bureau (PageSpeed) :', 325, 250);
  doc.circle(360, 305, 30).fill('#10b981');
  doc.fillColor('#ffffff').fontSize(16).font('Helvetica-Bold').text('77', 350, 298);
  doc.fillColor(textDark).fontSize(9).font('Helvetica').text('First Contentful Paint : 0.8 s\nLargest Contentful Paint : 3.2 s\nTotal Blocking Time : 10 ms', 405, 290, { lineGap: 4 });

  doc.fillColor(textMuted).fontSize(9).font('Helvetica').text(
    'Audit réalisé via https://pagespeed.web.dev/ et complété par un profilage réseau dans l\'onglet DevTools Network.',
    40, 420
  );

  // PAGE 13 : RÉSEAUX SOCIAUX (SMO) & DEVTOOLS
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(12, 'S5 – SMO // Réseaux Sociaux');

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('Audit DevTools Network local :', 40, 50);
  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(
    'L\'analyse du waterfall réseau dans les outils pour développeurs de Chrome a permis de vérifier le chargement asynchrone des scripts et la compression adéquate des visuels de plats.',
    40, 75, { width: 515, lineGap: 4 }
  );

  doc.fillColor(accentCyan).fontSize(15).font('Helvetica-Bold').text('S5 – Réseaux sociaux (SMO)', 40, 150);
  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('15. Définir l’intérêt SMO mis en œuvre pour le site', 40, 175);

  const textSmo = 
    "Le SMO (Social Media Optimization) vise à utiliser les plateformes sociales comme leviers d'acquisition et de fidélisation pour le site.\n\n" +
    "Pour Ferhan Food, la stratégie SMO s'articule autour de 3 piliers :\n\n" +
    "1. Visibilité et notoriété : Publication de visuels attrayants et de courtes vidéos immersives sur Instagram et TikTok illustrant la préparation des mets et l'ambiance ferhanaise.\n\n" +
    "2. Engagement communautaire : Création d'un lien de proximité avec les internautes par les commentaires, les likes et les stories interactives.\n\n" +
    "3. Trafic entrant qualifié : Présence systématique du lien vers la réservation en ligne dans la biographie des comptes officiels.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textSmo, 40, 205, { width: 515, lineGap: 4.5 });

  // PAGE 14 : S7 MARKETING E-MAIL (BREVO)
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(13, 'S7 – Marketing E-mail // Brevo');

  doc.fillColor(accentCyan).fontSize(15).font('Helvetica-Bold').text('S7 – Marketing E-mail', 40, 50);
  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('16. Comparatif de solutions et choix de Brevo', 40, 75);

  const textEmailLogiciel = 
    "Avant de déployer la campagne, j’ai comparé trois plateformes de routage e-mail :\n\n" +
    "• Brevo (ex-Sendinblue) : Interface en glisser-déposer très intuitive, gestion puissante des listes et scénarios d'automatisation. Son modèle économique basé sur le volume d'envois plutôt que sur la taille de la base est très avantageux.\n\n" +
    "• Mailchimp : Solution référence du marché avec de nombreux modèles, mais devenant très vite coûteuse dès que la base de contacts s'élargit.\n\n" +
    "• MailerLite : Simple et clair, mais limité dans les règles avancées de segmentation.\n\n" +
    "-> Choix retenu : Brevo pour son ergonomie et sa flexibilité.";

  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(textEmailLogiciel, 40, 100, { width: 515, lineGap: 4 });

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('17. Objectif de la campagne e-mailing', 40, 280);

  const textEmailObjectif = 
    "L’objectif central est de transformer les contacts en clients attablés grâce à une offre incitative : « Un dessert offert pour toute réservation d'un plat ».\n\n" +
    "L'e-mail crée un motif de visite immédiat, entretient le souvenir de la marque et redirige vers le module de réservation en un clic.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textEmailObjectif, 40, 305, { width: 515, lineGap: 4 });

  // PAGE 15 : BASE DE DONNÉES & SEGMENTATION
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(14, 'S7 – Base Clients & Segmentation');

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('18. Catégories de la base de données clientes (19 contacts)', 40, 50);
  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(
    'La base de données clients est structurée selon 4 attributs essentiels : Email, Prénom, Âge et Genre.',
    40, 75
  );

  // Mini table preview
  doc.roundedRect(40, 100, 515, 170, 6).fill(lightBg).stroke('#cbd5e1');
  doc.fillColor(primaryBlue).fontSize(9).font('Helvetica-Bold').text('EXTRAIT DE LA BASE DE DONNÉES IMPORTÉE DANS BREVO :', 55, 115);
  
  const sampleContacts = [
    { email: 'ali.vidal146@gmail.com', prenom: 'Loris', age: '20', genre: 'Masculin' },
    { email: 'atlasdesreves.contact@gmail.com', prenom: 'Boris', age: '19', genre: 'Masculin' },
    { email: 'holochef.contact@gmail.com', prenom: 'Nicolas', age: '20', genre: 'Masculin' },
    { email: 'ferhan-food@outlook.fr', prenom: 'Axel', age: '35', genre: 'Masculin' },
    { email: 'packpods2005@gmail.com', prenom: 'Sundes', age: '19', genre: 'Féminin' },
    { email: 'farhanettecasquettes@gmail.com', prenom: 'Nolann', age: '18', genre: 'Masculin' },
  ];

  let tableY = 135;
  doc.fillColor(textMuted).fontSize(8.5).font('Helvetica-Bold').text('EMAIL', 55, tableY);
  doc.text('PRÉNOM', 270, tableY);
  doc.text('ÂGE', 360, tableY);
  doc.text('GENRE', 430, tableY);
  tableY += 14;

  sampleContacts.forEach(c => {
    doc.fillColor(textDark).fontSize(8).font('Helvetica').text(c.email, 55, tableY);
    doc.text(c.prenom, 270, tableY);
    doc.text(c.age, 360, tableY);
    doc.text(c.genre, 430, tableY);
    tableY += 13;
  });

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('19. Stratégie de segmentation', 40, 295);

  const textSegment = 
    "Pour maximiser le taux d'ouverture et d'engagement, la segmentation s'appuie sur la tranche d'âge et le comportement de commande :\n\n" +
    "• Cible Jeunes (18–25 ans) : Sensibles aux offres directes de découverte (dessert offert, formules avantageuses) et au format court.\n" +
    "• Cible Active / Famille : Plus réceptive aux menus complets dégustation et à la convivialité du lieu.";

  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(textSegment, 40, 320, { width: 515, lineGap: 4 });

  // PAGE 16 : MAILING REÇU PAR LE CLIENT (RÉSULTAT CONCRET)
  doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  addHeaderFooter(15, 'S7 – Mailing Reçu & Bilan');

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('20. Rendu réel du mailing reçu par un client (Nolann Prost)', 40, 50);
  doc.fillColor(textDark).fontSize(10).font('Helvetica').text(
    'Capture de l\'e-mail délivré avec succès dans la boîte de réception Gmail d\'un destinataire de la base :',
    40, 75
  );

  // Email simulation card
  doc.roundedRect(40, 105, 515, 330, 8).fill('#ffffff').stroke('#e2e8f0');
  doc.rect(40, 105, 515, 35).fill('#f1f5f9');
  doc.fillColor(textDark).fontSize(9).font('Helvetica-Bold').text('De : Ferhan Food <ferhan-food@outlook.fr>', 55, 118);
  doc.fillColor(accentCyan).fontSize(9).font('Helvetica-Bold').text('Objet : Offre Découverte, un Dessert Offert 🎁', 55, 130);

  // Email banner
  doc.rect(70, 155, 455, 60).fill('#064e3b');
  doc.fillColor('#ffffff').fontSize(16).font('Helvetica-Bold').text('Offre Découverte Ferhan', 70, 178, { width: 455, align: 'center' });

  // Email body
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(
    'Cher client,\n\n' +
    'Chez Ferhan, chaque plat est une invitation au voyage.\n' +
    'Entre saveurs exotiques, épices parfumées et produits frais, nous vous proposons une expérience unique.\n' +
    'Pour votre première visite, profitez d\'un dessert offert pour toute commande d\'une entrée et d\'un plat.\n\n' +
    'À très bientôt chez Ferhan !\nL\'équipe Ferhan Food',
    70, 230, { width: 455, lineGap: 4 }
  );

  doc.roundedRect(200, 370, 195, 35, 4).fill('#047857');
  doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text('Réserver ma table', 200, 382, { width: 195, align: 'center' });

  // Bottom competence summary box
  doc.roundedRect(40, 465, 515, 120, 8).fill('#eff6ff').stroke('#93c5fd');
  doc.fillColor(primaryBlue).fontSize(12).font('Helvetica-Bold').text('Bilan de la réalisation BTS SIO E6 :', 60, 485);
  doc.fillColor(accentCyan).fontSize(11).font('Helvetica-Bold').text('> Compétence : Développer la présence en ligne de l\'organisation', 60, 505);
  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(
    '• Déploiement d\'un site WordPress structuré et ergonomique (UI/UX)\n' +
    '• Référencement naturel (SEO Rank Math) et présence locale (Google Maps)\n' +
    '• Stratégie d\'acquisition multicanale : Réseaux sociaux (SMO) et campagne e-mailing (Brevo)',
    60, 528, { width: 475, lineGap: 4 }
  );

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => {
      console.log('dossier-presence-en-ligne.pdf generated successfully');
      try {
        execSync('rm -f slide-presence-*.png && gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r150 -sOutputFile=slide-presence-%d.png dossier-presence-en-ligne.pdf');
        console.log('Presence slides PNG preview generated');
      } catch (e) {
        console.error('GS error for Presence:', e.message);
      }
      resolve();
    });
  });
}

generatePresencePdf();
