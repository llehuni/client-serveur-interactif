export const quizQuestions = [
  {
    question: "Qui envoie généralement la requête HTTP ?",
    options: ["Le navigateur", "La base de données", "Le câble réseau"],
    answer: 0,
    explanation: "Le navigateur joue le rôle de client : il demande une ressource au serveur.",
  },
  {
    question: "Que signifie le code HTTP 200 ?",
    options: ["La page est introuvable", "La demande a réussi", "Le serveur est arrêté"],
    answer: 1,
    explanation: "La famille 2xx indique un succès. 200 signifie que la requête a réussi.",
  },
  {
    question: "Dans {\"titre\": \"Accueil\"}, quelle est la valeur ?",
    options: ["titre", "Accueil", "Les deux"],
    answer: 1,
    explanation: "« titre » est la clé et « Accueil » est la valeur associée.",
  },
  {
    question: "Que signifie l’acronyme URL ?",
    options: ["Uniform Resource Locator", "Universal Response Link", "User Request Language"],
    answer: 0,
    explanation: "URL signifie Uniform Resource Locator : c’est l’adresse d’une ressource sur le web.",
  },
  {
    question: "Quel code indique qu’une page est introuvable ?",
    options: ["200", "404", "500"],
    answer: 1,
    explanation: "Le code 404 signifie que la ressource demandée n’a pas été trouvée.",
  },
  {
    question: "Quel langage décrit la structure d’une page web ?",
    options: ["CSS", "JavaScript", "HTML"],
    answer: 2,
    explanation: "HTML décrit la structure et le contenu d’une page avec des balises.",
  },
  {
    question: "Quel langage contrôle principalement l’apparence d’une page ?",
    options: ["CSS", "HTTP", "JSON"],
    answer: 0,
    explanation: "CSS définit les couleurs, tailles, espacements et autres règles visuelles.",
  },
  {
    question: "Quel verbe HTTP sert généralement à lire une ressource ?",
    options: ["GET", "DELETE", "UPDATE"],
    answer: 0,
    explanation: "GET demande la lecture d’une ressource au serveur.",
  },
  {
    question: "Quel élément peut contenir des données échangées entre applications ?",
    options: ["JSON", "CSS", "URL"],
    answer: 0,
    explanation: "JSON est un format texte couramment utilisé pour structurer et échanger des données.",
  },
  {
    question: "Que fait principalement le serveur ?",
    options: ["Il affiche les pixels de l’écran", "Il traite les demandes et renvoie des réponses", "Il remplace le navigateur"],
    answer: 1,
    explanation: "Le serveur reçoit les requêtes, traite les données puis renvoie une réponse au client.",
  },
];
