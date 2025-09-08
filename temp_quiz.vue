<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '@/stores/quiz'

const quiz = useQuizStore()
const { current, total, currentIndex, progress, finished, score } = storeToRefs(quiz)
</script>

<template>
  <main class="quiz">
    <div v-if="current?.image && !finished" class="quiz__bg" :style="{ backgroundImage: `url(${current.image})` }" />
    <div v-if="current?.image && !finished" class="quiz__scrim" />

    <section class="quiz__container" v-if="!finished">
      <header class="quiz__header">
        <div class="quiz__title">
          <h1>Квиз об IT прошлых лет</h1>
          <p class="quiz__subtitle">Вопрос {{ currentIndex + 1 }} из {{ total }}</p>
        </div>
        <div class="quiz__progress">
          <div class="quiz__progress-bar" :style="{ width: progress * 100 + '%' }" />
        </div>
      </header>

      <section class="quiz__question" v-if="current">
        <p class="quiz__year">Год: {{ current.year }}</p>
        <h2 class="quiz__text">{{ current.question }}</h2>
        <div class="quiz__options">
          <button
            v-for="(text, key) in current.options"
            :key="key"
            class="quiz__option"
            :class="{ 'is-selected': quiz.isSelected(key as any) }"
            @click="quiz.selectAnswer(key as any)"
          >
            <span class="quiz__option-key">{{ key }}.</span>
            <span class="quiz__option-text">{{ text }}</span>
          </button>
        </div>
      </section>

      <footer class="quiz__footer">
        <button class="quiz__nav" :disabled="currentIndex === 0" @click="quiz.prev">Назад</button>
        <button class="quiz__nav quiz__nav--primary" @click="quiz.next">
          {{ currentIndex + 1 === total ? 'Завершить' : 'Далее' }}
        </button>
      </footer>
    </section>

    <section class="quiz__result" v-else>
      <h2>Результат</h2>
      <p class="quiz__score">Вы ответили правильно на {{ score }} из {{ total }}</p>
      <div class="quiz__answers">
        <details v-for="q in quiz.allQuestions" :key="q.id" class="quiz__answer">
          <summary>{{ q.year }} — {{ q.question }}</summary>
          <ul>
            <li
              v-for="(text, key) in q.options"
              :key="key"
              :class="{
                'is-correct': key === q.correct,
                'is-user': quiz.answers[q.id] === key,
              }"
            >
              <strong>{{ key }}.</strong> {{ text }}
            </li>
          </ul>
          <p class="quiz__explanation">{{ q.explanation }}</p>
          <p v-if="q.source" class="quiz__source">
            <a :href="q.source" target="_blank" rel="noopener">Источник</a>
          </p>
        </details>
      </div>
      <button class="quiz__restart" @click="quiz.restart">Пройти ещё раз</button>
    </section>
  </main>
</template>

<style scoped>
.quiz {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(180deg, #0b0d12 0%, #0e1117 100%);
  color: #e5e7eb;
}

.quiz__bg {
  position: fixed;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.quiz__scrim {
  position: fixed;
  inset: 0;
  background: radial-gradient(120% 70% at 50% 0%, rgba(0,0,0,0.15), rgba(0,0,0,0.55)),
    linear-gradient(180deg, rgba(8,11,17,0.6) 0%, rgba(8,11,17,0.85) 100%);
  z-index: 1;
}

.quiz__container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 860px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(31, 41, 55, 0.6);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
}

.quiz__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.quiz__title h1 {
  margin: 0 0 4px;
  font-size: 22px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.7);
}

.quiz__subtitle {
  margin: 0;
  color: #d1d5db;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  font-size: 14px;
}

.quiz__progress {
  flex: 1;
  height: 8px;
  background: rgba(17,24,39,0.8);
  border-radius: 999px;
  overflow: hidden;
}

.quiz__progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  transition: width 0.2s ease;
}

.quiz__year {
  margin: 0 0 6px;
  color: #e9d5ff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  font-size: 14px;
}

.quiz__text {
  margin: 0 0 14px;
  font-size: 18px;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
}

.quiz__options {
  display: grid;
  gap: 10px;
}

.quiz__option {
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: left;
  padding: 12px 14px;
  background: rgba(11, 18, 32, 0.75);
  border: 1px solid rgba(31, 41, 55, 0.85);
  border-radius: 12px;
  color: #e5e7eb;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition:
    transform 0.12s ease,
    background 0.12s ease,
    border-color 0.12s ease;
}

.quiz__option:hover {
  transform: translateY(-1px);
  background: rgba(12, 20, 36, 0.82);
  border-color: #334155;
}

.quiz__option.is-selected {
  border-color: #6366f1;
  box-shadow: 0 0 0 1px #6366f1 inset;
}

.quiz__option-key {
  font-weight: 700;
  color: #a5b4fc;
}
.quiz__option-text {
  opacity: 0.95;
}

.quiz__footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.quiz__nav {
  appearance: none;
  border: 1px solid #374151;
  background: rgba(11, 18, 32, 0.9);
  color: #e5e7eb;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
}

.quiz__nav--primary {
  border-color: transparent;
  background: linear-gradient(135deg, #6366f1, #ec4899);
}

.quiz__result {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 860px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(31, 41, 55, 0.6);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
}

.quiz__score {
  margin-top: 0;
  color: #a5b4fc;
}

.quiz__answer {
  margin: 12px 0;
}

.quiz__answer summary {
  cursor: pointer;
}

.quiz__answer li {
  list-style: none;
}

.quiz__answer li.is-correct {
  color: #34d399;
}

.quiz__answer li.is-user {
  text-decoration: underline;
}

.quiz__explanation {
  color: #9ca3af;
}

.quiz__restart {
  margin-top: 10px;
  appearance: none;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  cursor: pointer;
}
</style>
