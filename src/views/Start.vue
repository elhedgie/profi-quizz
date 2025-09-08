<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startQuiz() {
	router.push({ name: 'quiz' })
}
</script>

<template>
	<main class="start">
		<section class="start__content">
			<h1 class="start__title">IT Quiz: Back to the Past</h1>
			<p class="start__subtitle">Проверь, насколько хорошо ты знаешь IT прошлых лет</p>
			<button class="start__cta" @click="startQuiz">Начать квиз</button>
		</section>
	</main>
</template>

<style scoped>
.start {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 24px;
	background: radial-gradient(1200px 600px at 10% 10%, rgba(99, 102, 241, 0.08), transparent),
		radial-gradient(1000px 500px at 90% 20%, rgba(236, 72, 153, 0.08), transparent),
		linear-gradient(180deg, #0b0d12 0%, #0e1117 100%);
	color: #e5e7eb;
}

.start__content {
	text-align: center;
	max-width: 680px;
}

.start__title {
	font-size: 40px;
	line-height: 1.1;
	margin: 0 0 12px;
	letter-spacing: -0.02em;
}

.start__subtitle {
	margin: 0 0 32px;
	color: #9ca3af;
	font-size: 16px;
}

.start__cta {
	appearance: none;
	border: none;
	border-radius: 12px;
	padding: 12px 20px;
	font-weight: 600;
	font-size: 16px;
	cursor: pointer;
	color: white;
	background: linear-gradient(135deg, #6366f1, #ec4899);
	box-shadow: 0 10px 20px rgba(0,0,0,0.2);
	transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}

.start__cta:hover {
	transform: translateY(-1px);
	box-shadow: 0 14px 24px rgba(0,0,0,0.28);
	filter: brightness(1.05);
}

.start__cta:active {
	transform: translateY(0);
	box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}
</style>
