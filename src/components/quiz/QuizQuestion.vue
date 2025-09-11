<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { ensureYearFontLoaded } from '@/utils/fontLoader'
type OptionKey = 'A' | 'B' | 'C' | 'D'

type Question = {
  id: string
  year: number
  question: string
  options: Record<OptionKey, string>
}

const props = defineProps<{
  question: Question
  isSelected: (key: OptionKey) => boolean
}>()

const emit = defineEmits<{
  (e: 'select', key: OptionKey): void
}>()

onMounted(() => {
  ensureYearFontLoaded(props.question.year)
})

watch(
  () => props.question.year,
  (year) => ensureYearFontLoaded(year),
)
</script>

<template>
  <div class="quiz__question">
    <p class="quiz__year" :data-year="question.year">
      <span class="year-flip">{{ question.year }}</span>
    </p>
    <h2 class="quiz__text">{{ question.question }}</h2>
    <div class="quiz__options">
      <button
        v-for="(text, key) in question.options"
        :key="key as string"
        class="quiz__option"
        :class="{ 'is-selected': props.isSelected(key as OptionKey) }"
        @click="emit('select', key as OptionKey)"
      >
        <span class="quiz__option-key">{{ key }}.</span>
        <span class="quiz__option-text">{{ text }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
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
  min-height: 56px;
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

@media (max-width: 720px) {
  .quiz__year {
    --fs: 32px;
    --lh: 36px;
  }
  .quiz__text {
    font-size: 16px;
  }
  .quiz__options {
    gap: 12px;
  }
  .quiz__option {
    padding: 12px;
  }
  .quiz__option-key {
    min-width: 20px;
  }
}
</style>

<style scoped>
/* Стили по годам */
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
</style>
