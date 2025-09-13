<script setup lang="ts">
const props = defineProps<{
  isFirst: boolean
  isLast: boolean
  canNext?: boolean
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()
</script>

<template>
  <footer class="quiz__footer">
    <button class="quiz__nav" :disabled="props.isFirst" @click="emit('prev')">Назад</button>
    <div class="quiz__footer-right">
      <span v-if="props.canNext === false" class="quiz__hint">Выберите вариант ответа</span>
      <button
        class="quiz__nav quiz__nav--primary"
        :disabled="props.canNext === false"
        @click="emit('next')"
      >
        {{ props.isLast ? 'Завершить' : 'Далее' }}
      </button>
    </div>
  </footer>
</template>

<style scoped>
.quiz__footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.quiz__footer-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.quiz__hint {
  font-size: 12px;
  color: #cbd5e1;
  opacity: 0.9;
}
.quiz__nav {
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #f5f6fe;
  color: #8b8bab;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    border-color 0.12s ease,
    background 0.12s ease;
}
@media (hover: hover) {
  .quiz__nav:hover {
    transform: translateY(-1px);
    background: #e8eafc;
  }
}
.quiz__nav--primary {
  border-color: transparent;
  background: #fa2a48;
  color: white;
}
.quiz__nav--primary:hover {
  background-color: #d72e49;
}

.quiz__nav--primary[disabled] {
  background: #f9dde2;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .quiz__footer {
    gap: 10px;
  }

  .quiz__nav {
    padding: 8px 12px;
    font-size: 14px;
  }

  .quiz__hint {
    font-size: 11px;
  }
}

@media (max-width: 768px) {
  .quiz__footer {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 10px;
  }

  .quiz__footer-right {
    justify-content: space-between;
    flex-direction: column;
    gap: 8px;
  }

  .quiz__nav {
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
  }

  .quiz__hint {
    text-align: center;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .quiz__footer {
    gap: 8px;
  }

  .quiz__nav {
    padding: 8px 12px;
    font-size: 13px;
  }

  .quiz__hint {
    font-size: 11px;
  }
}
</style>
