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
    <div class="wrap">
      <div class="quiz__title">
        <p class="quiz__subtitle">Вопрос {{ currentIndex + 1 }} из {{ total }}</p>
      </div>
      <div class="quiz__progress">
        <div class="quiz__progress-bar" :style="{ width: props.progress * 100 + '%' }" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.quiz__header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 10px;
}
.wrap {
  display: block;
  flex: 1;
}

.quiz__title {
  margin-bottom: 12px;
}
.quiz__home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 36px;
  color: #8b8bab;
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #f5f6fe;
}
.quiz__home:hover {
  background: #e8eafc;
}
.quiz__subtitle {
  margin: 0;
  color: #242730;
  font-size: 14px;
}
.quiz__progress {
  flex: 1;
  height: 8px;
  background: #f4f5fb;
  border-radius: 999px;
  overflow: hidden;
}
.quiz__progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #ff758b, #fa2a48);
  transition: width 0.2s ease;
}

@media (max-width: 1024px) {
  .quiz__header {
    gap: 12px;
  }

  .quiz__subtitle {
    font-size: 13px;
  }

  .quiz__home {
    padding: 8px 12px;
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .quiz__header {
    gap: 10px;
    flex-wrap: wrap;
  }

  .quiz__subtitle {
    font-size: 12px;
    order: 3;
    width: 100%;
    text-align: center;
    margin-top: 8px;
  }

  .quiz__home {
    padding: 6px 10px;
    font-size: 12px;
  }

  .quiz__progress {
    height: 6px;
  }
}

@media (max-width: 480px) {
  .quiz__header {
    gap: 8px;
  }

  .quiz__subtitle {
    font-size: 11px;
    margin-top: 6px;
  }

  .quiz__home {
    padding: 5px 8px;
    font-size: 11px;
  }

  .quiz__progress {
    height: 4px;
  }
}
</style>
