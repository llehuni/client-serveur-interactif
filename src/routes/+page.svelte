<script>
  import "./page.css";
  import { browsers, pages, steps, terms } from "$lib/data.js";
  import InfoDrawer from "$lib/components/InfoDrawer.svelte";
  import chromeLogo from "../assets/Google_Chrome_icon_(February_2022).svg.webp";
  import firefoxLogo from "../assets/Firefox_logo,_2019.png";
  import safariLogo from "../assets/Apple Safari.png";
  import edgeLogo from "../assets/Microsoft_Edge_logo_(2019).svg";

  let step = $state(0),
    br = $state(null),
    hov = $state(null),
    pg = $state("accueil"),
    q = $state(""),
    drawer = $state(null);
  const browserLogos = {
    chrome: chromeLogo,
    firefox: firefoxLogo,
    safari: safariLogo,
    edge: edgeLogo,
  };
  const p = $derived(pages[pg]);
  const canNext = $derived(step === 0 ? !!br : step === 1 ? false : step < 6);
  const packetX = { 2: "0%", 3: "100%", 4: "100%", 5: "0%" };
  const req = $derived(
    `GET ${p.path} HTTP/1.1\nHost: mbote.dev\nAccept: text/html`,
  );
  const res = "HTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 1204";

  const seg = (s) =>
    s
      .split(/(\{\w+\|[^}]+\})/)
      .map((x) => {
        const m = x.match(/^\{(\w+)\|([^}]+)\}$/);
        return m ? { k: m[1], l: m[2] } : { t: x };
      })
      .filter((x) => x.k || x.t);

  function go(k) {
    pg = k;
    q = "";
    step = 2;
  }
  function openDrawer(key) {
    drawer = key;
  }
  function reset() {
    step = 0;
    br = null;
    pg = "accueil";
    q = "";
    drawer = null;
  }
  function send() {
    const s = q.toLowerCase();
    go(
      s.includes("propos")
        ? "apropos"
        : s.includes("contact")
          ? "contact"
          : "accueil",
    );
  }
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && (drawer = null)} />

{#snippet rich(s)}{#each seg(s) as x}{#if x.k}<button
        class="term"
        type="button"
        onclick={() => openDrawer(x.k)}>{x.l}</button
      >{:else}{x.t}{/if}{/each}{/snippet}

<main>
  <header>
    <div class="topbar">
      <p class="eyebrow">ATELIER INTERACTIF · WEB</p>
      <div class="top-actions">
        <button type="button" onclick={reset}>↺ Recommencer</button>
      </div>
    </div>
    <h1>
      Comprendre le <span class="term" style="cursor:default"
        >client-serveur</span
      >
    </h1>
    <p class="intro">
      Suis le trajet d’une page web, du clic dans ton navigateur jusqu’à la
      réponse du serveur.
    </p>
    <div class="prog"><i style="width:{(step / 6) * 100}%"></i></div>
    <div class="progress-meta">
      <span>Progression</span><strong>{step + 1} / {steps.length}</strong>
    </div>
    <h2>{steps[step].t}</h2>
    <p class="desc">{@render rich(steps[step].d)}</p>
  </header>

  <section class="stage">
    <!-- CLIENT -->
    <div class="panel">
      <div class="panel-heading">
        <div class="label"><span class="panel-icon">⌨</span> Client</div>
        <span class="role">demande</span>
      </div>
      {#if step === 0}
        <p class="panel-help">
          Choisis le navigateur que tu veux utiliser pour commencer.
        </p>
        <div class="icons">
          {#each browsers as b}
            <div class="bwrap">
              <button
                class="logo {b.id}"
                class:sel={br === b.id}
                aria-label={`Choisir ${b.name}`}
                onmouseenter={() => (hov = b.id)}
                onmouseleave={() => (hov = null)}
                onfocus={() => (hov = b.id)}
                onblur={() => (hov = null)}
                onclick={() => {
                  br = b.id;
                  step = 1;
                }}
              >
                <img src={browserLogos[b.id]} alt="" />
              </button>
              <small>{b.name}</small>
              {#if hov === b.id}<div class="card">{b.hint}</div>{/if}
            </div>
          {/each}
        </div>
      {:else}
        <div class="win {br}">
          <div class="tabs">
            <span class="tab"
              >{step >= 6 || step === 1
                ? step === 1
                  ? "Nouvel onglet"
                  : p.title
                : "Chargement…"}</span
            >
          </div>
          <div class="tool">
            <span class="dots"><i></i><i></i><i></i></span>
            <span class="nav">‹ › ⟳</span>
            {#if step === 1}
              <form
                onsubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
              >
                <input
                  bind:value={q}
                  placeholder="Tape une adresse ou « à propos », « contact »…"
                />
                <button>OK</button>
              </form>
            {:else}
              <div class="addr">🔒 mbote.dev{p.path}</div>
            {/if}
          </div>
          <div class="view">
            {#if step === 1}
              <p>Où veux-tu aller ?</p>
              {#each Object.entries(pages) as [k, v]}<button
                  class="lnk"
                  onclick={() => go(k)}>{v.title}</button
                >{/each}
            {:else if step < 6}
              <div class="spin"></div>
              <p>En attente du serveur…</p>
            {:else}
              <h3>{p.h}</h3>
              <p>{p.p}</p>
              {#each Object.entries(pages) as [k, v]}<button
                  class="lnk"
                  onclick={() => go(k)}>{v.title}</button
                >{/each}
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <!-- CÂBLE -->
    <div class="wire">
      <div class="line"></div>
      {#if step >= 2 && step <= 5}
        <div class="packet" class:ans={step >= 4} style="left:{packetX[step]}">
          {step >= 4 ? "200" : "GET"}
        </div>
      {/if}
    </div>

    <!-- SERVEUR -->
    <div class="panel srv">
      <div class="panel-heading">
        <div class="label"><span class="panel-icon">▣</span> Serveur</div>
        <span class="role">répond</span>
      </div>
      <div class="rack">
        {#each [1, 2, 3] as n}<div class="unit">
            <b></b><b></b><span></span>
          </div>{/each}
      </div>
      <button class="db" onclick={() => openDrawer("bdd")}
        ><span>▤</span> Base de données
        <span class="learn">En savoir plus →</span></button
      >
      {#if step >= 4}
        <ol class="work">
          <li class:on={step === 4}>Reçoit <code>GET {p.path}</code></li>
          <li class:on={step === 4}>Interroge la base de données</li>
          <li class:on={step >= 4}>Assemble les fichiers :</li>
        </ol>
        <div class="chips">
          {#each ["html", "css", "js", "json"] as k}<button
              class="term"
              type="button"
              onclick={() => openDrawer(k)}>{terms[k].t}</button
            >{/each}
        </div>
      {:else}<p class="idle">En attente de requêtes…</p>{/if}
    </div>
  </section>

  {#if step >= 2 && step <= 5}
    <pre class="msg">{step <= 3 ? req : res}</pre>
  {/if}

  <nav class="ctrl">
    <button onclick={() => step--} disabled={step === 0}>← Précédent</button>
    <span>Étape {step + 1} / {steps.length}</span>
    <button class="pri" onclick={() => step++} disabled={!canNext}
      >Suivant →</button
    >
  </nav>
  <div class="legend" aria-label="Légende">
    <span><i class="request-dot"></i> Requête envoyée</span><span
      ><i class="response-dot"></i> Réponse reçue</span
    ><span><i class="learn-dot"></i> Terme cliquable</span>
  </div>
  {#if step === 1}<p class="hint">
      Tape une recherche ou clique sur un lien pour continuer.
    </p>{/if}
  {#if step === 6}<section class="summary">
      <p class="eyebrow">CYCLE TERMINÉ</p>
      <h3>Une page web, c’est un aller-retour</h3>
      <p>
        Le navigateur demande une ressource, le serveur la prépare, puis la
        réponse revient pour être affichée.
      </p>
      <button class="pri" type="button" onclick={reset}
        >Rejouer le parcours →</button
      >
    </section>{/if}
</main>

<InfoDrawer
  term={drawer ? terms[drawer] : null}
  onClose={() => (drawer = null)}
  onTerm={openDrawer}
/>

