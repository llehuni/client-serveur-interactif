<script>
  let { onRestart, onQuiz } = $props();
</script>

<main class="standalone-page">
  <section class="completion-card">
    <p class="eyebrow">CYCLE TERMINÉ</p>
    <div class="completion-icon" aria-hidden="true">✓</div>
    <h1>Une page web, c’est un aller-retour</h1>
    <p class="lead">
      Le navigateur demande une ressource, le serveur la prépare, puis la
      réponse revient pour être affichée.
    </p>
    <div class="completion-actions">
      <button class="primary-action" type="button" onclick={onRestart}>↺ Rejouer le parcours</button>
      <button class="secondary-action" type="button" onclick={onQuiz}>Tester mes connaissances →</button>
    </div>
  </section>
</main>
