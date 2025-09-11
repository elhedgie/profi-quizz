<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '@/stores/quiz'
import { ref, watch, nextTick, computed } from 'vue'
import QuizHeader from '@/components/quiz/QuizHeader.vue'
import QuizQuestion from '@/components/quiz/QuizQuestion.vue'
import QuizFooter from '@/components/quiz/QuizFooter.vue'
import QuizResult from '@/components/quiz/QuizResult.vue'

const quiz = useQuizStore()
const { current, total, currentIndex, progress, finished, score } = storeToRefs(quiz)

/** выбор направления анимации (в прошлое / вперёд) */
const direction = ref<'back' | 'forward'>('back')
watch(current, (n, o) => {
  const ny = n?.year
  const oy = o?.year
  if (ny != null && oy != null) {
    direction.value = ny < oy ? 'back' : 'forward'
  }
})

/** «скоростные линии» на фоне — кратко навешиваем класс */
const rootEl = ref<HTMLElement | null>(null)
watch(current, async () => {
  await nextTick()
  if (!rootEl.value) return
  rootEl.value.classList.add('is-rewinding')
  setTimeout(() => rootEl.value?.classList.remove('is-rewinding'), 520)
})

/** данные для финального экрана */
const percent = computed(() => Math.round((score.value / (total.value || 1)) * 100))
const incorrectCount = computed(() =>
  quiz.allQuestions.reduce((acc, q) => acc + (quiz.answers[q.id] !== q.correct ? 1 : 0), 0),
)
const showOnlyIncorrect = ref(false)
const expandAll = ref(false)

function toggleExpandAll() {
  expandAll.value = !expandAll.value
  requestAnimationFrame(() => {
    const els = document.querySelectorAll<HTMLDetailsElement>('.qa-card')
    els.forEach((el) => (el.open = expandAll.value))
  })
}

const filteredQuestions = computed(() =>
  showOnlyIncorrect.value
    ? quiz.allQuestions.filter((q) => quiz.answers[q.id] !== q.correct)
    : quiz.allQuestions,
)
</script>

<template>
  <main class="quiz" ref="rootEl">
    <div
      v-if="current?.image && !finished"
      class="quiz__bg"
      :style="{ backgroundImage: `url(${current.image})` }"
    />

    <section class="quiz__container" v-if="!finished">
      <QuizHeader :current-index="currentIndex" :total="total" :progress="progress" />

      <Transition :name="direction === 'back' ? 'rewind' : 'forward'" mode="out-in">
        <QuizQuestion
          v-if="current"
          :key="current.id"
          :question="current"
          :is-selected="quiz.isSelected"
          @select="quiz.selectAnswer"
        />
      </Transition>

      <QuizFooter
        :is-first="currentIndex === 0"
        :is-last="currentIndex + 1 === total"
        @prev="quiz.prev"
        @next="quiz.next"
      />
    </section>

    <QuizResult
      v-else
      :score="score"
      :total="total"
      :percent="percent"
      :incorrect-count="incorrectCount"
      :answers="quiz.answers"
      :questions="quiz.allQuestions"
      :expand-all="expandAll"
      :show-only-incorrect="showOnlyIncorrect"
      @update:expand-all="(v: boolean) => (expandAll = v)"
      @update:show-only-incorrect="(v: boolean) => (showOnlyIncorrect = v)"
      @restart="quiz.restart"
    />
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

/* Стили по годам перенесены в QuizQuestion.vue */

/* Переходы вопросов */
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

/* responsive */
@media (max-width: 720px) {
  .result__hero {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .result__actions {
    justify-content: center;
  }
  .qa-summary {
    grid-template-columns: 64px 1fr auto;
  }
  .qa-row {
    grid-template-columns: 1fr;
  }
}
</style>
