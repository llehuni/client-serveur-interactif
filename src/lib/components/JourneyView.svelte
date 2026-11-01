<script>
  import { browsers, pages, steps, terms } from "../data.js";
  import InfoDrawer from "./InfoDrawer.svelte";
  import chromeLogo from "../../assets/Google_Chrome_icon_(February_2022).svg.webp";
  import firefoxLogo from "../../assets/Firefox_logo,_2019.png";
  import safariLogo from "../../assets/Apple Safari.png";
  import edgeLogo from "../../assets/Microsoft_Edge_logo_(2019).svg";

  let { onComplete } = $props();
  let step = $state(0);
  let browser = $state(null);
  let hoveredBrowser = $state(null);
  let page = $state("accueil");
  let query = $state("");
  let drawer = $state(null);

  const browserLogos = {
    chrome: chromeLogo,
    firefox: firefoxLogo,
    safari: safariLogo,
    edge: edgeLogo,
  };
  const packetPositions = { 2: "0%", 3: "100%", 4: "100%", 5: "0%" };
  const currentPage = $derived(pages[page]);
  const canNext = $derived(step === 0 ? !!browser : step === 1 ? false : step <= 6);
  const request = $derived(
    `GET ${currentPage.path} HTTP/1.1\nHost: mbote.dev\nAccept: text/html`,
  );
  const response = "HTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 1204";

  function parseRichText(text) {
    return text
      .split(/(\{\w+\|[^}]+\})/)
      .map((part) => {
        const match = part.match(/^\{(\w+)\|([^}]+)\}$/);
        return match ? { key: match[1], label: match[2] } : { text: part };
      })
      .filter((part) => part.key || part.text);
  }

  function navigateTo(targetPage) {
    page = targetPage;
    query = "";
    step = 2;
  }

  function reset() {
    step = 0;
    browser = null;
    page = "accueil";
    query = "";
    drawer = null;
  }

  function submitQuery() {
    const normalizedQuery = query.toLowerCase();
    navigateTo(
      normalizedQuery.includes("propos")
        ? "apropos"
        : normalizedQuery.includes("contact")
          ? "contact"
          : "accueil",
    );
  }

  function nextStep() {
    if (step === steps.length - 1) {
      onComplete();
      return;
    }
    step += 1;
  }
</script>

<svelte:window onkeydown={(event) => event.key === "Escape" && (drawer = null)} />

{#snippet richText(text)}
  {#each parseRichText(text) as part}
    {#if part.key}
      <button class="term" type="button" onclick={() => (drawer = part.key)}>{part.label}</button>
    {:else}
      {part.text}
    {/if}
  {/each}
{/snippet}

<main>
  <header>
    <div class="topbar">
      <p class="eyebrow">ATELIER INTERACTIF · WEB</p>
      <div class="top-actions">
        <button type="button" onclick={reset}>↺ Recommencer</button>
      </div>
    </div>
    <h1>Comprendre le <span class="term" style="cursor:default">client-serveur</span></h1>
    <p class="intro">Suis le trajet d’une page web, du clic dans ton navigateur jusqu’à la réponse du serveur.</p>
    <div class="prog"><i style="width:{(step / 6) * 100}%"></i></div>
    <div class="progress-meta"><span>Progression</span><strong>{step + 1} / {steps.length}</strong></div>
    <h2>{steps[step].t}</h2>
    <p class="desc">{@render richText(steps[step].d)}</p>
  </header>

  <section class="stage">
    <div class="panel">
      <div class="panel-heading">
        <div class="label"><span class="panel-icon">⌨</span> Client</div>
        <span class="role">demande</span>
      </div>
      {#if step === 0}
        <p class="panel-help">Choisis le navigateur que tu veux utiliser pour commencer.</p>
        <div class="icons">
          {#each browsers as item}
            <div class="bwrap">
              <button
                class="logo {item.id}"
                class:sel={browser === item.id}
                aria-label={`Choisir ${item.name}`}
                onmouseenter={() => (hoveredBrowser = item.id)}
                onmouseleave={() => (hoveredBrowser = null)}
                onfocus={() => (hoveredBrowser = item.id)}
                onblur={() => (hoveredBrowser = null)}
                onclick={() => {
                  browser = item.id;
                  step = 1;
                }}
              >
                <img src={browserLogos[item.id]} alt="" />
              </button>
              <small>{item.name}</small>
              {#if hoveredBrowser === item.id}<div class="card">{item.hint}</div>{/if}
            </div>
          {/each}
        </div>
      {:else}
        <div class="win {browser}">
          <div class="tabs"><span class="tab">{step === 1 ? "Nouvel onglet" : step >= 6 ? currentPage.title : "Chargement…"}</span></div>
          <div class="tool">
            <span class="dots"><i></i><i></i><i></i></span>
            <span class="nav">‹ › ⟳</span>
            {#if step === 1}
              <form onsubmit={(event) => { event.preventDefault(); submitQuery(); }}>
                <input bind:value={query} placeholder="Tape une adresse ou « à propos », « contact »…" />
                <button>OK</button>
              </form>
            {:else}
              <div class="addr">🔒 mbote.dev{currentPage.path}</div>
            {/if}
          </div>
          <div class="view">
            {#if step === 1}
              <p>Où veux-tu aller ?</p>
              {#each Object.entries(pages) as [key, item]}
                <button class="lnk" onclick={() => navigateTo(key)}>{item.title}</button>
              {/each}
            {:else if step < 6}
              <div class="spin"></div><p>En attente du serveur…</p>
            {:else}
              <h3>{currentPage.h}</h3><p>{currentPage.p}</p>
              {#each Object.entries(pages) as [key, item]}
                <button class="lnk" onclick={() => navigateTo(key)}>{item.title}</button>
              {/each}
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <div class="wire">
      <div class="line"></div>
      {#if step >= 2 && step <= 5}
        <div class="packet" class:ans={step >= 4} style="left:{packetPositions[step]}">{step >= 4 ? "200" : "GET"}</div>
      {/if}
    </div>

    <div class="panel srv">
      <div class="panel-heading">
        <div class="label"><span class="panel-icon">▣</span> Serveur</div>
        <span class="role">répond</span>
      </div>
      <div class="rack">{#each [1, 2, 3] as _}<div class="unit"><b></b><b></b><span></span></div>{/each}</div>
      <button class="db" onclick={() => (drawer = "bdd")}><span>▤</span> Base de données <span class="learn">En savoir plus →</span></button>
      {#if step >= 4}
        <ol class="work">
          <li class:on={step === 4}>Reçoit <code>GET {currentPage.path}</code></li>
          <li class:on={step === 4}>Interroge la base de données</li>
          <li class:on={step >= 4}>Assemble les fichiers :</li>
        </ol>
        <div class="chips">
          {#each ["html", "css", "js", "json"] as key}
            <button class="term" type="button" onclick={() => (drawer = key)}>{terms[key].t}</button>
          {/each}
        </div>
      {:else}<p class="idle">En attente de requêtes…</p>{/if}
    </div>
  </section>

  {#if step >= 2 && step <= 5}<pre class="msg">{step <= 3 ? request : response}</pre>{/if}
  <nav class="ctrl">
    <button onclick={() => (step -= 1)} disabled={step === 0}>← Précédent</button>
    <span>Étape {step + 1} / {steps.length}</span>
    <button class="pri" onclick={nextStep} disabled={!canNext}>{step === steps.length - 1 ? "Terminer →" : "Suivant →"}</button>
  </nav>
  <div class="legend" aria-label="Légende">
    <span><i class="request-dot"></i> Requête envoyée</span>
    <span><i class="response-dot"></i> Réponse reçue</span>
    <span><i class="learn-dot"></i> Terme cliquable</span>
  </div>
  {#if step === 1}<p class="hint">Tape une recherche ou clique sur un lien pour continuer.</p>{/if}
</main>

<InfoDrawer
  term={drawer ? terms[drawer] : null}
  onClose={() => (drawer = null)}
  onTerm={(key) => (drawer = key)}
/>
