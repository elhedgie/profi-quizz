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
  background: #ffffff;
  box-shadow: 0 4px 28px #dadff4;
  border-radius: 16px;
  padding: 20px;
}
.result__hero {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  align-items: center;
  padding: 18px;
  border-radius: 16px;
  background: #ffffff;
  margin-bottom: 16px;
}
.result__title {
  margin: 0 0 6px;
  font-size: 22px;
  letter-spacing: 0.2px;
}
.result__subtitle {
  margin: 0;
  color: #242730;
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #f5f6fe;
  color: #8b8bab;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  transition:
    transform 0.12s ease,
    border-color 0.12s ease,
    background 0.12s ease;
}
@media (hover: hover) {
  .btn:hover {
    transform: translateY(-1px);
    background: #e8eafc;
  }
}
.btn--primary {
  border-color: transparent;
  background: #d72e49;
  color: white;
}
.result__ring {
  --val: 0%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background:
    radial-gradient(closest-side, #ffffff 85%, transparent 80% 100%),
    conic-gradient(#fb3451 0% var(--val), #f4f5fb var(--val) 100%);
  display: grid;
  place-items: center;
}
.result__ring-num {
  font-weight: 500;
  font-size: 40px;
  color: #242730;
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
  color: #242730;
}
.toggle input {
  accent-color: #6366f1;
}
.linklike {
  background: none;
  border: none;
  color: #242730;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 8px;
}
@media (hover: hover) {
  .linklike:hover {
    background: rgba(99, 102, 241, 0.12);
  }
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
  padding: 12px 30px;
  background: #f4f5fb;
  border-radius: 14px;
  overflow: clip;
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    transform 0.12s ease;
}
.qa-card[open] {
  padding-bottom: 44px;
  background: #f4f5fb;
}
@media (hover: hover) {
  .qa-card:hover {
    transform: translateY(-1px);
  }
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
  font-weight: 400;
}
.qa-question {
  color: #242730;
  overflow-wrap: anywhere;
}
.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 115px;
  height: 38px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 999px;
  text-transform: uppercase;
}
.badge--ok {
  color: #64e4b0;
  border: 2px solid #64e4b0;
}
.badge--err {
  color: #d72e49;
  border: 2px solid #d72e49;
}
.qa-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px #dadff4;
}

.qa-col .label {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}
.answer {
  color: #242730;
}
.qa-expl {
  margin: 12px 0 0;
  color: #242730;
}
.qa-src {
  margin: 10px 0 0;
}
.qa-src a {
  color: #93c5fd;
}

@media (max-width: 1024px) {
  .quiz__result {
    padding: 18px;
    max-width: 100%;
  }

  .result__hero {
    padding: 16px;
  }

  .result__title {
    font-size: 20px;
  }

  .result__subtitle {
    font-size: 14px;
  }

  .result__ring {
    width: 100px;
    height: 100px;
  }

  .result__ring-num {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .result__hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 14px;
  }

  .result__actions {
    justify-content: center;
    width: 100%;
    flex-direction: column;
    gap: 8px;
  }

  .result__actions .btn {
    flex: 1 1 auto;
    width: 100%;
  }

  .qa-summary {
    grid-template-columns: 60px 1fr auto;
    gap: 8px;
    padding: 12px 14px;
  }

  .qa-row {
    grid-template-columns: 1fr;
    padding: 10px;
  }

  .result__ring {
    width: 90px;
    height: 90px;
    margin: 0 auto 16px;
  }

  .result__ring-num {
    font-size: 18px;
  }

  .badge {
    font-size: 10px;
    padding: 3px 6px;
  }

  .quiz__result {
    padding: 16px;
    border-radius: 12px;
  }

  .result__toolbar {
    flex-wrap: wrap;
    gap: 8px;
  }

  .linklike {
    padding: 6px 8px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .quiz__result {
    padding: 12px;
    border-radius: 10px;
  }

  .result__hero {
    padding: 12px;
  }

  .result__title {
    font-size: 18px;
  }

  .result__subtitle {
    font-size: 13px;
  }

  .result__ring {
    width: 80px;
    height: 80px;
  }

  .result__ring-num {
    font-size: 16px;
  }

  .qa-summary {
    grid-template-columns: 50px 1fr auto;
    gap: 6px;
    padding: 10px 12px;
  }

  .qa-year {
    font-size: 12px;
  }

  .qa-question {
    font-size: 13px;
  }

  .badge {
    font-size: 9px;
    padding: 2px 5px;
  }

  .qa-row {
    padding: 8px;
  }

  .answer {
    font-size: 13px;
  }

  .qa-expl {
    font-size: 13px;
  }

  .linklike {
    padding: 5px 6px;
    font-size: 12px;
  }
}

@media (max-width: 360px) {
  .qa-summary {
    grid-template-columns: 40px 1fr;
  }

  .badge {
    justify-self: start;
    margin-top: 4px;
  }
}
</style>
