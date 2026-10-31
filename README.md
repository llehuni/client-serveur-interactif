# Mbote.dev — Comprendre le modèle client-serveur

Une mini-expérience interactive en français pour visualiser le trajet d’une page web : le navigateur envoie une requête, le serveur la traite, puis renvoie une réponse.

## Fonctionnalités

- Parcours guidé en 7 étapes avec animation de la requête et de la réponse.
- Sélection d’un navigateur avec les logos fournis dans `src/assets`.
- Explications contextuelles dans un panneau latéral droit, sans interrompre le parcours.
- Glossaire interactif : client, serveur, URL, HTTP, HTML, CSS, JavaScript, JSON, etc.
- Explication détaillée des objets JSON et des paires clé-valeur.
- Interface claire, légende visuelle, bouton de redémarrage et résumé final.
- Mise en page responsive et prise en compte de `prefers-reduced-motion`.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir l’URL indiquée par Vite.

Pour vérifier la version de production :

```bash
npm run build
npm run preview
```

## Architecture

Le projet utilise SvelteKit et reste volontairement simple :

```text
src/
├── assets/                 # Logos des navigateurs
├── lib/
│   ├── components/
│   │   └── InfoDrawer.svelte # Panneau latéral du glossaire
│   └── data.js              # Contenu pédagogique et données de parcours
├── routes/
│   └── +page.svelte        # Orchestration de l’expérience
└── app.html                # Document HTML racine
```

### Principes de code

- `data.js` contient le contenu et ne gère pas l’affichage.
- `InfoDrawer.svelte` ne gère que l’affichage des explications et ses interactions.
- `+page.svelte` orchestre l’état du parcours : étape, navigateur choisi, page demandée, thème et panneau ouvert.
- Les termes entre `{clé|libellé}` sont transformés en liens contextuels.
- Les composants utilisent des boutons natifs et des libellés accessibles plutôt que des éléments cliquables non sémantiques.

## Améliorations possibles

- Ajouter un quiz de validation à la fin du parcours.
- Ajouter une persistance locale de la progression.
- Ajouter des exemples de requêtes POST et de réponses JSON dynamiques.
- Ajouter des tests de composants et des tests d’accessibilité automatisés.
