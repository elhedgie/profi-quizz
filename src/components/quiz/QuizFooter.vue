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
.quiz__nav[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
