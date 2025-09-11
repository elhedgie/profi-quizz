<script setup lang="ts">
const props = defineProps<{
  isFirst: boolean
  isLast: boolean
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()
</script>

<template>
  <footer class="quiz__footer">
    <button class="quiz__nav" :disabled="props.isFirst" @click="emit('prev')">Назад</button>
    <button class="quiz__nav quiz__nav--primary" @click="emit('next')">
      {{ props.isLast ? 'Завершить' : 'Далее' }}
    </button>
  </footer>
</template>

<style scoped>
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
</style>
