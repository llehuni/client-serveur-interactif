<script>
  import "./InfoDrawer.css";
  export let term;
  export let onClose;
  export let onTerm;

  const segments = (text) =>
    text
      .split(/(\{\w+\|[^}]+\})/)
      .map((part) => {
        const match = part.match(/^\{(\w+)\|([^}]+)\}$/);
        return match ? { key: match[1], label: match[2] } : { text: part };
      })
      .filter((part) => part.key || part.text);
</script>

{#if term}
  <div class="backdrop" role="presentation" onclick={onClose}></div>
  <aside class="drawer" aria-label={`Explication : ${term.t}`}>
    <div class="drawer-top">
      <span class="badge">À COMPRENDRE</span>
      <button
        class="close"
        type="button"
        onclick={onClose}
        aria-label="Fermer l'explication">✕</button
      >
    </div>
    <h2>{term.t}</h2>
    <p class="brief">{term.b}</p>
    <div class="content">
      {#each segments(term.d) as part}
        {#if part.key}
          <button class="term" type="button" onclick={() => onTerm(part.key)}
            >{part.label}</button
          >
        {:else}
          {part.text}
        {/if}
      {/each}
    </div>
    {#if term.c}
      <p class="caption">Exemple</p>
      <pre class="code">{term.c}</pre>
    {/if}
    {#if term.keyValue}
      <div class="key-value">
        <p class="caption">Paire clé-valeur</p>
        <div class="pair">
          <code>"titre"</code><span>→</span><code>"À propos"</code>
        </div>
        <p>
          La <strong>clé</strong> décrit l’information. La
          <strong>valeur</strong> contient l’information associée. Ensemble, elles
          forment une paire clé-valeur.
        </p>
        <button
          class="inline-link"
          type="button"
          onclick={() => onTerm("keyValuePair")}
          >Voir l’explication complète →</button
        >
      </div>
    {/if}
    <button class="understood" type="button" onclick={onClose}
      >J’ai compris</button
    >
  </aside>
{/if}

