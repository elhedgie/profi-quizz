<script setup lang="ts">
const props = defineProps<{
  currentIndex: number
  total: number
  progress: number
}>()
</script>

<template>
  <header class="quiz__header">
    <router-link class="quiz__home" :to="{ name: 'start' }">На главную</router-link>
    <div class="quiz__title">
      <p class="quiz__subtitle">Вопрос {{ currentIndex + 1 }} из {{ total }}</p>
    </div>
    <div class="quiz__progress">
      <div class="quiz__progress-bar" :style="{ width: props.progress * 100 + '%' }" />
    </div>
  </header>
</template>

<style scoped>
.quiz__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 10px;
}
.quiz__home {
  color: #a5b4fc;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.25);
}
.quiz__home:hover {
  background: rgba(99, 102, 241, 0.15);
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

@media (max-width: 720px) {
  .quiz__header {
    gap: 8px;
  }
  .quiz__home {
    padding: 6px 8px;
    font-size: 12px;
  }
}
</style>
