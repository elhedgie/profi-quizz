<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { ensureYearFontLoaded } from '@/utils/fontLoader'
type OptionKey = 'A' | 'B' | 'C' | 'D'

type Question = {
  id: string
  year: number
  question: string
  options: Record<OptionKey, string>
  image?: string
}

const props = defineProps<{
  question: Question
  isSelected: (key: OptionKey) => boolean
}>()

const emit = defineEmits<{
  (e: 'select', key: OptionKey): void
}>()

const showImageModal = ref(false)

function openImageModal() {
  showImageModal.value = true
}

function closeImageModal() {
  showImageModal.value = false
}

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
    <div class="quiz__header">
      <div class="quiz__text-section">
        <p class="quiz__year" :data-year="question.year">
          <span class="year-flip">{{ question.year }}</span>
        </p>
        <h2 class="quiz__text">{{ question.question }}</h2>
      </div>
      <div v-if="question.image" class="quiz__image-section">
        <img
          :src="question.image"
          :alt="`Изображение для вопроса ${question.year} года`"
          class="quiz__image"
          @click="openImageModal"
        />
      </div>
    </div>
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

    <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
      <div class="image-modal__content" @click.stop>
        <button class="image-modal__close" @click="closeImageModal" aria-label="Закрыть">×</button>
        <img
          :src="question.image"
          :alt="`Изображение для вопроса ${question.year} года`"
          class="image-modal__image"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz__question {
  width: 100%;
}

.quiz__header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;
  margin-bottom: 20px;
}

.quiz__text-section {
  flex: 1;
}

.quiz__image-section {
  flex-shrink: 0;
  width: 269px;
  height: 183px;
  border-radius: 8px;
  overflow: hidden;
  object-fit: cover;
}

.quiz__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.quiz__image:hover {
  transform: scale(1.02);
}

.quiz__year {
  margin: 0 0 6px;
  font-size: 48px;
  font-weight: 500;
}
.quiz__text {
  margin: 0 0 14px;
  font-size: 18px;
  color: #242730;
  font-weight: 400;
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
  border: none;
  background: #f4f5fb;
  border-radius: 12px;
  color: #242730;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    background 0.12s ease,
    border-color 0.12s ease;
}
.quiz__option:hover {
  transform: translateY(-1px);
  background: #e6e8fc;
}
.quiz__option.is-selected {
  outline: 2px solid #c2cdfb;
  background: #e6e8fc;
}
.quiz__option-key {
  font-weight: 500;
  color: #fa2a48;
}
.quiz__option-text {
  opacity: 0.95;
}

@media (max-width: 1024px) {
  .quiz__header {
    gap: 20px;
  }

  .quiz__image-section {
    width: 200px;
    height: 140px;
  }

  .quiz__year {
    font-size: 42px;
  }

  .quiz__text {
    font-size: 17px;
  }
}

@media (max-width: 768px) {
  .quiz__header {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .quiz__image-section {
    width: 100%;
    height: 180px;
    order: -1;
  }

  .quiz__year {
    font-size: 36px;
  }

  .quiz__text {
    font-size: 16px;
  }

  .quiz__options {
    gap: 12px;
  }

  .quiz__option {
    padding: 12px;
    min-height: 50px;
  }

  .quiz__option-key {
    min-width: 20px;
  }
}

@media (max-width: 480px) {
  .quiz__header {
    gap: 12px;
  }

  .quiz__image-section {
    height: 150px;
  }

  .quiz__year {
    font-size: 32px;
  }

  .quiz__text {
    font-size: 15px;
    line-height: 1.4;
  }

  .quiz__options {
    gap: 10px;
  }

  .quiz__option {
    padding: 10px 12px;
    min-height: 48px;
  }

  .quiz__option-key {
    min-width: 18px;
    font-size: 14px;
  }

  .quiz__option-text {
    font-size: 14px;
  }
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.image-modal__content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-modal__close {
  position: absolute;
  top: -40px;
  right: -30px;
  border: none;
  color: white;
  font-size: 24px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-color: transparent;
}

.image-modal__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 720px) {
  .image-modal {
    padding: 10px;
  }

  .image-modal__close {
    top: -30px;
    right: -10px;
    width: 28px;
    height: 28px;
    font-size: 20px;
  }
}
</style>
