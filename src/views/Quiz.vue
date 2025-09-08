<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '@/stores/quiz'
import { ref, watch, nextTick } from 'vue'

const quiz = useQuizStore()
const { current, total, currentIndex, progress, finished, score } = storeToRefs(quiz)

/** для выборa направления анимации (в прошлое / вперёд) */
const direction = ref<'back' | 'forward'>('back')
watch(current, (n, o) => {
  const ny = n?.year
  const oy = o?.year
  if (ny != null && oy != null) {
    direction.value = ny < oy ? 'back' : 'forward'
  }
})

/** для «скоростных линий» на фоне — кратко навешиваем класс */
const rootEl = ref<HTMLElement | null>(null)
watch(current, async () => {
  await nextTick()
  if (!rootEl.value) return
  rootEl.value.classList.add('is-rewinding')
  setTimeout(() => rootEl.value?.classList.remove('is-rewinding'), 520)
})
</script>

<template>
  <main class="quiz" ref="rootEl">
    <div
      v-if="current?.image && !finished"
      class="quiz__bg"
      :style="{ backgroundImage: `url(${current.image})` }"
    />

    <section class="quiz__container" v-if="!finished">
      <header class="quiz__header">
        <div class="quiz__title">
          <p class="quiz__subtitle">Вопрос {{ currentIndex + 1 }} из {{ total }}</p>
        </div>
        <div class="quiz__progress">
          <div class="quiz__progress-bar" :style="{ width: progress * 100 + '%' }" />
        </div>
      </header>

      <Transition :name="direction === 'back' ? 'rewind' : 'forward'" mode="out-in">
        <div class="quiz__question" v-if="current" :key="current.id">
          <p class="quiz__year" :data-year="current.year">
            <span class="year-flip">{{ current.year }}</span>
          </p>
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
        </div>
      </Transition>

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
  font-family: Arial, Helvetica, sans-serif;

  --dur-enter: 480ms;
  --dur-leave: 360ms;
  --easing: cubic-bezier(0.22, 0.61, 0.36, 1);
}

.quiz__bg {
  position: fixed;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  transition: transform var(--dur-enter) var(--easing);
}

.quiz.is-rewinding .quiz__bg {
  transform: scale(1.02);
}

.quiz__container {
  position: relative;
  z-index: 2;
  width: 800px;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
}
.quiz__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 10px;
}
.quiz__title h1 {
  margin: 0 0 4px;
  font-size: 22px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  color: white;
}
.quiz__subtitle {
  margin: 0;
  color: #f3f4f6;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  font-size: 14px;
}
.quiz__progress {
  flex: 1;
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 999px;
  overflow: hidden;
}
.quiz__progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  transition: width 0.2s ease;
}

.quiz__year {
  --fs: 40px;
  --lh: 44px;
  --fadj: 0.52;
  display: flex;
  align-items: center;
  min-height: var(--lh);
  margin: 0 0 6px;
  font-size: var(--fs);
  line-height: var(--lh);
  color: #fbbf24;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  font-size-adjust: var(--fadj);
  font-weight: 600;
  perspective: 800px;
}

.quiz__options {
  margin: 20px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}
.quiz__option {
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: left;
  padding: 12px 14px;
  height: 62px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition:
    transform 0.12s ease,
    background 0.12s ease,
    border-color 0.12s ease;
}
.quiz__option:hover {
  transform: translateY(-1px);
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
}
.quiz__option.is-selected {
  border-color: #6366f1;
  box-shadow: 0 0 0 1px #6366f1 inset;
  background: rgba(99, 102, 241, 0.2);
}
.quiz__option-key {
  font-weight: 700;
  color: #fbbf24;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}
.quiz__option-text {
  opacity: 0.95;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.quiz__footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.quiz__nav {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  backdrop-filter: blur(4px);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
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

/* стили по годам (как у тебя) */
.quiz__year[data-year='2025'] {
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}
.quiz__year[data-year='2016'] {
  font-family: 'Raleway', cursive;
  font-weight: 300;
  color: #ff6b35;
  text-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
}
.quiz__year[data-year='2009'] {
  font-family: 'Share Tech Mono', cursive;
  font-weight: 300;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(255, 215, 0, 0.4);
}
.quiz__year[data-year='1995'] {
  font-family: 'Audiowide', cursive;
  font-weight: 500;
  text-transform: uppercase;
  color: #ff00ff;
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.6);
}
.quiz__year[data-year='1986'] {
  font-family: 'Press Start 2P', cursive;
  font-weight: 300;
  color: #ff4444;
  text-shadow: 0 0 6px rgba(255, 68, 68, 0.5);
}
.quiz__year[data-year='1984'] {
  font-family: 'Orbitron', cursive;
  font-weight: 300;
  color: #ff8800;
  text-shadow: 0 2px 4px rgba(255, 136, 0, 0.4);
}
.quiz__year[data-year='1980'] {
  font-family: 'VT323', cursive;
  font-weight: 300;
  color: #00ffff;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.5);
}
.quiz__year[data-year='1971'] {
  font-family: 'Courier Prime', cursive;
  font-weight: 300;
  color: #ff69b4;
  text-shadow: 0 2px 4px rgba(255, 105, 180, 0.3);
}
.quiz__year[data-year='1947'] {
  font-family: 'Libre Baskerville', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: #c0c0c0;
  text-shadow: 0 2px 4px rgba(192, 192, 192, 0.4);
}
.quiz__year[data-year='1830'] {
  font-family: 'Bodoni Moda', sans-serif;
  font-weight: 300;
  color: #8b4513;
  text-shadow: 0 2px 4px rgba(139, 69, 19, 0.4);
}

.quiz__text {
  margin: 0 0 14px;
  font-size: 18px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  color: white;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  line-height: 1.5;
}

/* плавные переходы вопросов */
.rewind-enter-active,
.rewind-leave-active,
.forward-enter-active,
.forward-leave-active {
  position: relative;
  transition:
    transform var(--dur-enter) var(--easing),
    filter var(--dur-enter) ease,
    opacity 320ms ease;
  will-change: transform, filter, opacity;
}
.rewind-enter-from {
  opacity: 0;
  transform: translateX(-14px) skewX(-3deg);
  filter: blur(2px) saturate(0.95);
}
.rewind-leave-to {
  opacity: 0;
  transform: translateX(14px) skewX(3deg);
  filter: blur(2px) saturate(0.95);
}
.forward-enter-from {
  opacity: 0;
  transform: translateX(10px);
  filter: blur(1.5px);
}
.forward-leave-to {
  opacity: 0;
  transform: translateX(-10px);
  filter: blur(1.5px);
}
.rewind-enter-active::after,
.forward-enter-active::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  background: radial-gradient(
    120% 60% at 50% 50%,
    rgba(99, 102, 241, 0.08),
    rgba(236, 72, 153, 0.05) 60%,
    transparent 70%
  );
  animation: chromaSoft 360ms ease forwards;
}
@keyframes chromaSoft {
  0% {
    opacity: 0.45;
    filter: saturate(1.05) contrast(1.02);
  }
  100% {
    opacity: 0;
    filter: none;
  }
}

/* accessibility */
@media (prefers-reduced-motion: reduce) {
  .rewind-enter-active,
  .rewind-leave-active,
  .forward-enter-active,
  .forward-leave-active,
  .quiz.is-rewinding .quiz__bg::before,
  .quiz.is-rewinding .quiz__bg,
  .quiz__year .year-flip {
    transition: none !important;
    animation: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
}
</style>
