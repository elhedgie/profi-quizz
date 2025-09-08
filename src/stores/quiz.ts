import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import questions from '@/assets/questions.json'

type OptionKey = 'A' | 'B' | 'C' | 'D'

type Question = {
  id: string
  year: number
  question: string
  options: Record<OptionKey, string>
  correct: OptionKey
  explanation: string
  transport?: string
  source?: string
  image?: string
}

export const useQuizStore = defineStore('quiz', () => {
  const allQuestions = ref<Question[]>([...(questions as Question[])])

  const currentIndex = ref(0)
  const answers = ref<Record<string, OptionKey | null>>({})
  const finished = ref(false)

  const total = computed(() => allQuestions.value.length)
  const current = computed(() => allQuestions.value[currentIndex.value])
  const progress = computed(() => (currentIndex.value + 1) / total.value)

  const score = computed(() => {
    return allQuestions.value.reduce((acc, q) => {
      return acc + (answers.value[q.id] === q.correct ? 1 : 0)
    }, 0)
  })

  function selectAnswer(option: OptionKey) {
    if (finished.value) return
    const q = current.value
    if (!q) return
    answers.value[q.id] = option
  }

  function next() {
    if (finished.value) return
    if (currentIndex.value < total.value - 1) {
      currentIndex.value++
    } else {
      finished.value = true
    }
  }

  function prev() {
    if (finished.value) return
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  function restart() {
    currentIndex.value = 0
    answers.value = {}
    finished.value = false
  }

  function isSelected(option: OptionKey) {
    const q = current.value
    if (!q) return false
    return answers.value[q.id] === option
  }

  function isCorrect(option: OptionKey) {
    const q = current.value
    if (!q) return false
    return q.correct === option
  }

  return {
    allQuestions,
    currentIndex,
    current,
    total,
    progress,
    answers,
    finished,
    score,
    selectAnswer,
    next,
    prev,
    restart,
    isSelected,
    isCorrect,
  }
})
