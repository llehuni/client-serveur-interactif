<script>
  import CompletionView from "./lib/components/CompletionView.svelte";
  import JourneyView from "./lib/components/JourneyView.svelte";
  import QuizView from "./lib/components/QuizView.svelte";

  let view = $state("journey");

  function show(nextView) {
    view = nextView;
  }
</script>

{#if view === "journey"}
  <JourneyView onComplete={() => show("completion")} />
{:else if view === "completion"}
  <CompletionView
    onRestart={() => show("journey")}
    onQuiz={() => show("quiz")}
  />
{:else}
  <QuizView onBack={() => show("completion")} onRestart={() => show("journey")} />
{/if}
