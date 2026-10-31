export const browsers = [
  { id: 'chrome', name: 'Chrome', hint: 'Google Chrome est un navigateur : un logiciel qui va chercher des pages web sur Internet et les affiche. C’est le plus utilisé au monde.' },
  { id: 'firefox', name: 'Firefox', hint: 'Mozilla Firefox est un navigateur libre, développé par une fondation. Il sert à ouvrir des sites web, comme tous les navigateurs.' },
  { id: 'safari', name: 'Safari', hint: 'Safari est le navigateur d’Apple, présent sur les Mac et les iPhone. Il affiche les pages web envoyées par les serveurs.' },
  { id: 'edge', name: 'Edge', hint: 'Microsoft Edge est le navigateur intégré à Windows. Il envoie des demandes aux serveurs et affiche leurs réponses.' }
];

export const pages = {
  accueil: { path: '/', title: 'Accueil', h: 'Bienvenue sur Mbote.dev', p: 'Ceci est la page d’accueil, envoyée par le serveur.' },
  apropos: { path: '/apropos', title: 'À propos', h: 'À propos', p: 'Mbote.dev est un site fictif pour apprendre le modèle client-serveur.' },
  contact: { path: '/contact', title: 'Contact', h: 'Contactez-nous', p: 'Écrivez-nous à bonjour@mbote.dev (adresse fictive).' }
};

export const steps = [
  { t: '1. Choisir un navigateur', d: 'Le {client|client}, c’est toi : tu utilises un {navigateur|navigateur} sur ton ordinateur ou ton téléphone. Survole une icône, puis clique pour l’ouvrir.' },
  { t: '2. Demander une page', d: 'Tape une {url|adresse} ou une recherche dans la barre, ou clique sur un lien. Cela va déclencher une {requete|requête}.' },
  { t: '3. Le navigateur prépare la requête', d: 'Il écrit un message {http|HTTP} : la méthode (GET = « donne-moi »), le chemin demandé et quelques informations.' },
  { t: '4. La requête voyage', d: 'Le message traverse Internet jusqu’au {serveur|serveur}.' },
  { t: '5. Le serveur travaille', d: 'Il lit la requête, interroge la {bdd|base de données}, puis assemble ce qu’il va envoyer : {html|HTML}, {css|CSS}, {js|JavaScript} ou des données {json|JSON}.' },
  { t: '6. La réponse revient', d: 'Le serveur renvoie une {reponse|réponse} avec un {statut|code de statut} (200 = tout va bien) et le contenu demandé.' },
  { t: '7. Le navigateur affiche la page', d: 'Il lit le HTML, applique le CSS, exécute le JS : la page apparaît. Clique sur un lien pour relancer un cycle complet !' }
];

export const terms = {
  navigateur: { t: 'Navigateur web', b: 'Un logiciel qui demande des pages web à un serveur et les affiche.', d: 'Chrome, Firefox, Safari et Edge sont des navigateurs. Ils jouent le rôle de {client|client} : ils envoient des {requete|requêtes} et transforment le {html|HTML}, le {css|CSS} et le {js|JavaScript} reçus en page visible.' },
  client: { t: 'Client', b: 'Celui qui demande un service.', d: 'Sur le web, le client est le plus souvent un {navigateur|navigateur}, sur un ordinateur, une tablette ou un téléphone. Il s’occupe de l’affichage et des interactions : c’est le « côté client » ou front-end.' },
  serveur: { t: 'Serveur', b: 'Un ordinateur toujours allumé qui répond aux demandes.', d: 'Il héberge le site, écoute les {requete|requêtes}, interroge si besoin une {bdd|base de données} et renvoie une {reponse|réponse}. C’est le « côté serveur » ou back-end (PHP, Node.js, Python, Java…).' },
  url: { t: 'URL', b: 'L’adresse complète d’une page web.', d: 'Elle se lit en trois morceaux : le protocole (https), le nom de domaine (mbote.dev) et le chemin (/apropos). Le {navigateur|navigateur} s’en sert pour savoir à quel {serveur|serveur} parler et quelle page demander.', c: 'https://mbote.dev/apropos\n└─┬─┘   └──┬───┘ └──┬───┘\nprotocole domaine  chemin' },
  requete: { t: 'Requête', b: 'Une demande envoyée par le client au serveur.', d: 'Elle suit les règles du protocole {http|HTTP} et contient une méthode (GET pour lire, POST pour envoyer), un chemin et des en-têtes (informations supplémentaires).', c: 'GET /apropos HTTP/1.1\nHost: mbote.dev\nAccept: text/html' },
  reponse: { t: 'Réponse', b: 'Ce que le serveur renvoie au client.', d: 'Elle commence par un {statut|code de statut}, suivi d’en-têtes, puis du contenu (page {html|HTML}, fichier {css|CSS}, données {json|JSON}…).', c: 'HTTP/1.1 200 OK\nContent-Type: text/html\n\n<!DOCTYPE html>\n<html>…</html>' },
  http: { t: 'HTTP', b: 'Le langage commun du client et du serveur.', d: 'HyperText Transfer Protocol : un ensemble de règles qui décrit comment écrire une {requete|requête} et une {reponse|réponse}. Méthodes courantes : GET (lire), POST (envoyer), PUT (modifier), DELETE (supprimer). Sa version sécurisée, HTTPS, chiffre les échanges.', c: '# Requête\nGET /apropos HTTP/1.1\n\n# Réponse\nHTTP/1.1 200 OK' },
  statut: { t: 'Code de statut', b: 'Un nombre qui résume le résultat de la requête.', d: '2xx : succès. 3xx : redirection. 4xx : erreur du client. 5xx : erreur du serveur.', c: '200 OK            tout s’est bien passé\n404 Not Found     la page n’existe pas\n500 Server Error  le serveur a un problème' },
  bdd: { t: 'Base de données', b: 'Un espace où le serveur range et retrouve des informations.', d: 'Utilisateurs, articles, produits… Le {serveur|serveur} pose des questions à la base (souvent en langage SQL) avant de construire la {reponse|réponse}.', c: 'SELECT titre, contenu\nFROM pages\nWHERE chemin = \'/apropos\';' },
  html: { t: 'HTML', b: 'Le langage qui décrit la structure d’une page.', d: 'HyperText Markup Language. Il utilise des balises pour dire « ceci est un titre », « ceci est un paragraphe », « ceci est un lien ». Il donne le squelette de la page ; le {css|CSS} l’habille et le {js|JavaScript} l’anime.', c: '<h1>À propos</h1>\n<p>Bienvenue sur Mbote.dev</p>\n<a href="/contact">Contact</a>' },
  css: { t: 'CSS', b: 'Le langage qui décrit l’apparence d’une page.', d: 'Cascading Style Sheets. Chaque règle choisit des éléments (le sélecteur) et leur applique des propriétés : couleurs, tailles, marges, polices…', c: 'h1 {\n  color: #0f78d4;\n  font-size: 32px;\n}\np { margin: 12px 0; }' },
  js: { t: 'JavaScript', b: 'Le langage qui rend une page interactive.', d: 'Il s’exécute dans le {navigateur|navigateur} : réagir à un clic, modifier la page, envoyer une {requete|requête} sans recharger. Il existe aussi côté serveur avec Node.js.', c: 'const bouton = document.querySelector("button");\nbouton.addEventListener("click", () => {\n  alert("Bonjour !");\n});' },
  json: { t: 'JSON', b: 'Un format texte qui organise des données pour les échanger entre applications.', d: 'JSON signifie JavaScript Object Notation. Il représente des objets avec des {keyValuePair|paires clé-valeur}, des listes entre crochets et des valeurs comme du texte, un nombre, true, false ou null. Un serveur l’envoie souvent à la place d’une page {html|HTML} complète, pour que le {js|JavaScript} du client affiche les données.', c: '{\n  "titre": "À propos",\n  "visites": 1204,\n  "publie": true,\n  "auteur": null\n}', keyValue: true },
  keyValuePair: { t: 'Paire clé-valeur', b: 'Une clé nomme une information et une valeur contient cette information.', d: 'Dans un objet JSON, chaque propriété suit la forme clé : valeur. La clé est généralement entre guillemets. La valeur peut être du texte, un nombre, true, false, null, un objet ou une liste. Plusieurs paires sont séparées par des virgules.', c: '"titre": "À propos"\n  clé       valeur\n\n"visites": 1204\n  clé         valeur' }
};
