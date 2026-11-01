<script>
  import { quizQuestions } from "../data/quiz.js";

  let { onBack, onRestart } = $props();
  let index = $state(0);
  let score = $state(0);
  let answer = $state(null);
  const finished = $derived(index >= quizQuestions.length);
  const currentQuestion = $derived(quizQuestions[index]);

  function chooseAnswer(optionIndex) {
    if (answer !== null) return;
    answer = optionIndex;
    if (optionIndex === currentQuestion.answer) score += 1;
  }

  function nextQuestion() {
    answer = null;
    index += 1;
  }

  function restart() {
    index = 0;
    score = 0;
    answer = null;
  }
</script>

<main class="standalone-page">
  <section class="quiz-card">
    <button class="back-link" type="button" onclick={onBack}>← Retour au bilan</button>
    {#if finished}
      <p class="eyebrow">QUIZ TERMINÉ</p>
      <div class="completion-icon" aria-hidden="true">★</div>
      <h1>{score} / {quizQuestions.length}</h1>
      <p class="lead">
        {score === quizQuestions.length
          ? "Excellent ! Tu maîtrises le cycle client-serveur."
          : "Bon début ! Rejoue le parcours pour consolider les notions."}
      </p>
      <div class="completion-actions">
        <button class="primary-action" type="button" onclick={restart}>↻ Refaire le quiz</button>
        <button class="secondary-action" type="button" onclick={onRestart}>Rejouer le parcours</button>
      </div>
    {:else}
      <div class="quiz-progress">
        <span>Question {index + 1} / {quizQuestions.length}</span>
        <i style="width:{((index + 1) / quizQuestions.length) * 100}%"></i>
      </div>
      <p class="eyebrow">QUIZ</p>
      <h1>{currentQuestion.question}</h1>
      <div class="quiz-options">
        {#each currentQuestion.options as option, optionIndex}
          <button
            class:chosen={answer === optionIndex}
            class:correct={answer !== null && optionIndex === currentQuestion.answer}
            class:wrong={answer === optionIndex && answer !== currentQuestion.answer}
            type="button"
            onclick={() => chooseAnswer(optionIndex)}
          >{option}</button>
        {/each}
      </div>
      {#if answer !== null}
        <p class="feedback">{currentQuestion.explanation}</p>
        <button class="primary-action" type="button" onclick={nextQuestion}>
          {index === quizQuestions.length - 1 ? "Voir mon score" : "Question suivante →"}
        </button>
      {/if}
    {/if}
  </section>
</main>
