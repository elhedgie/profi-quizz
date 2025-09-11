<script setup lang="ts">
import { computed } from 'vue'

type OptionKey = 'A' | 'B' | 'C' | 'D'

type Question = {
  id: string
  year: number
  question: string
  options: Record<OptionKey, string>
  correct: OptionKey
  explanation?: string
  source?: string
}

const props = defineProps<{
  score: number
  total: number
  percent: number
  incorrectCount: number
  answers: Record<string, OptionKey | null>
  questions: Question[]
  expandAll: boolean
  showOnlyIncorrect: boolean
}>()

const emit = defineEmits<{
  (e: 'update:expand-all', value: boolean): void
  (e: 'update:show-only-incorrect', value: boolean): void
  (e: 'restart'): void
}>()

function toggleExpandAll() {
  emit('update:expand-all', !props.expandAll)
  requestAnimationFrame(() => {
    const els = document.querySelectorAll<HTMLDetailsElement>('.qa-card')
    els.forEach((el) => (el.open = !props.expandAll))
  })
}

function reviewErrors() {
  emit('update:show-only-incorrect', true)
  emit('update:expand-all', true)
  requestAnimationFrame(() => {
    const els = document.querySelectorAll<HTMLDetailsElement>('.qa-card')
    els.forEach((el) => (el.open = true))
  })
}

const filteredQuestions = computed(() =>
  props.showOnlyIncorrect
    ? props.questions.filter((q) => props.answers[q.id] !== q.correct)
    : props.questions,
)
</script>

<template>
  <section class="quiz__result">
    <header class="result__hero">
      <div class="result__ring" :style="{ '--val': percent + '%' }" aria-hidden="true">
        <span class="result__ring-num">{{ percent }}%</span>
      </div>

      <div class="result__meta">
        <h2 class="result__title">Результат</h2>
        <p class="result__subtitle">
          Правильных: <strong>{{ score }}</strong> из <strong>{{ total }}</strong>
          <span class="dot">•</span>
          Ошибок: <strong>{{ incorrectCount }}</strong>
        </p>

        <div class="result__actions">
          <router-link class="btn" :to="{ name: 'start' }">На главную</router-link>
          <button class="btn" @click="$emit('restart')">Пройти ещё раз</button>
          <button class="btn btn--primary" @click="reviewErrors">Разобрать ошибки</button>
        </div>
      </div>
    </header>

    <div class="result__toolbar">
      <div class="toolbar__spacer" />

      <button class="linklike" @click="toggleExpandAll">
        {{ props.expandAll ? 'Свернуть все' : 'Развернуть все' }}
      </button>
    </div>

    <ul class="qa-list">
      <li v-for="q in filteredQuestions" :key="q.id" class="qa-item">
        <details class="qa-card" :open="false">
          <summary class="qa-summary">
            <span class="qa-year">{{ q.year }}</span>
            <span class="qa-question">{{ q.question }}</span>

            <span
              class="badge"
              :class="props.answers[q.id] === q.correct ? 'badge--ok' : 'badge--err'"
            >
              {{ props.answers[q.id] === q.correct ? 'верно' : 'ошибка' }}
            </span>
          </summary>

          <div class="qa-body">
            <div class="qa-row" :class="{ 'is-wrong': props.answers[q.id] !== q.correct }">
              <div class="qa-col">
                <div class="label">Ваш ответ</div>
                <div class="answer">
                  <strong>{{ props.answers[q.id] ?? '—' }}</strong>
                  <span v-if="props.answers[q.id]">
                    — {{ q.options[props.answers[q.id] as OptionKey] }}
                  </span>
                </div>
              </div>
              <div class="qa-col">
                <div class="label">Правильный ответ</div>
                <div class="answer">
                  <strong>{{ q.correct }}</strong> — {{ q.options[q.correct] }}
                </div>
              </div>
            </div>

            <p class="qa-expl" v-if="q.explanation">{{ q.explanation }}</p>

            <p v-if="q.source" class="qa-src">
              <a :href="q.source" target="_blank" rel="noopener">Источник</a>
            </p>
          </div>
        </details>
      </li>
    </ul>
  </section>
</template>

<style scoped>
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
.result__hero {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  align-items: center;
  padding: 18px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.5));
  border: 1px solid rgba(99, 102, 241, 0.25);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
}
.result__title {
  margin: 0 0 6px;
  font-size: 22px;
  letter-spacing: 0.2px;
}
.result__subtitle {
  margin: 0;
  color: #cbd5e1;
}
.result__subtitle .dot {
  opacity: 0.6;
  margin: 0 6px;
}
.result__actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  backdrop-filter: blur(4px);
  text-decoration: none;
  transition:
    transform 0.12s ease,
    border-color 0.12s ease,
    background 0.12s ease;
}
.btn:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.4);
}
.btn--primary {
  border-color: transparent;
  background: linear-gradient(135deg, #6366f1, #ec4899);
}
.result__ring {
  --val: 0%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background:
    radial-gradient(closest-side, #0e1117 78%, transparent 80% 100%),
    conic-gradient(#6366f1 var(--val), rgba(255, 255, 255, 0.12) 0);
  display: grid;
  place-items: center;
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.25);
}
.result__ring-num {
  font-weight: 700;
  font-size: 22px;
  color: #e5e7eb;
}
.result__toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 8px;
}
.toolbar__spacer {
  flex: 1;
}
.toggle {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  color: #cbd5e1;
}
.toggle input {
  accent-color: #6366f1;
}
.linklike {
  background: none;
  border: none;
  color: #a5b4fc;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 8px;
}
.linklike:hover {
  background: rgba(99, 102, 241, 0.12);
}
.qa-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}
.qa-item {
  margin: 0;
}
.qa-card {
  background: rgba(2, 6, 23, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  overflow: clip;
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    transform 0.12s ease;
}
.qa-card[open] {
  background: rgba(2, 6, 23, 0.75);
  border-color: rgba(148, 163, 184, 0.32);
}
.qa-card:hover {
  transform: translateY(-1px);
}
.qa-summary {
  list-style: none;
  display: grid;
  grid-template-columns: 80px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
}
.qa-summary::-webkit-details-marker {
  display: none;
}
.qa-year {
  font-weight: 700;
  color: #fbbf24;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}
.qa-question {
  color: #e5e7eb;
  overflow-wrap: anywhere;
}
.badge {
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge--ok {
  background: rgba(52, 211, 153, 0.18);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.35);
}
.badge--err {
  background: rgba(239, 68, 68, 0.18);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.35);
}
.qa-body {
  padding: 0 16px 14px;
}
.qa-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px dashed rgba(148, 163, 184, 0.25);
}
.qa-row.is-wrong {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.25);
}
.qa-col .label {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}
.answer {
  color: #e5e7eb;
}
.qa-expl {
  margin: 12px 0 0;
  color: #cbd5e1;
}
.qa-src {
  margin: 10px 0 0;
}
.qa-src a {
  color: #93c5fd;
}

@media (max-width: 720px) {
  .result__hero {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .result__actions {
    justify-content: center;
    width: 100%;
  }
  .result__actions .btn {
    flex: 1 1 auto;
  }
  .qa-summary {
    grid-template-columns: 64px 1fr auto;
    gap: 10px;
  }
  .qa-row {
    grid-template-columns: 1fr;
    padding: 10px;
  }
  .result__ring {
    width: 96px;
    height: 96px;
  }
  .badge {
    font-size: 11px;
    padding: 4px 8px;
  }
  .quiz__result {
    padding: 14px;
    border-radius: 12px;
  }
  .result__toolbar {
    flex-wrap: wrap;
    gap: 8px;
  }
  .toggle {
    font-size: 13px;
  }
  .linklike {
    padding: 6px 6px;
  }
}

@media (max-width: 420px) {
  .qa-summary {
    grid-template-columns: 48px 1fr;
  }
  .badge {
    justify-self: start;
  }
}
</style>
