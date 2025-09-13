<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function startQuiz() {
  router.push({ name: 'quiz' })
}
</script>

<template>
  <main class="start">
    <svg
      class="left-big-star"
      width="173"
      height="173"
      viewBox="0 0 173 173"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M85.6649 1.57677C85.9298 0.592715 87.326 0.592719 87.5909 1.57677L105.279 67.2726C105.372 67.6159 105.64 67.884 105.983 67.9764L171.679 85.6649C172.663 85.9298 172.663 87.326 171.679 87.5909L105.983 105.279C105.64 105.372 105.372 105.64 105.279 105.983L87.5909 171.679C87.326 172.663 85.9298 172.663 85.6649 171.679L67.9764 105.983C67.884 105.64 67.6159 105.372 67.2726 105.279L1.57677 87.5909C0.592715 87.326 0.592719 85.9298 1.57677 85.6649L67.2726 67.9764C67.6159 67.884 67.884 67.6159 67.9764 67.2726L85.6649 1.57677Z"
        fill="url(#paint0_linear_84_2528)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_84_2528"
          x1="24.8915"
          y1="171.116"
          x2="105.482"
          y2="62.8104"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C2CDFB" />
          <stop offset="1" stop-color="#F1F2FC" />
        </linearGradient>
      </defs>
    </svg>
    <svg
      class="left-small-star"
      width="73"
      height="73"
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.9331 1.57677C36.198 0.592717 37.5942 0.592719 37.8592 1.57677L44.9979 28.0905C45.0904 28.4338 45.3585 28.7019 45.7017 28.7943L72.2155 35.9331C73.1995 36.198 73.1995 37.5942 72.2155 37.8592L45.7017 44.9979C45.3585 45.0904 45.0904 45.3585 44.9979 45.7017L37.8592 72.2155C37.5942 73.1995 36.198 73.1995 35.9331 72.2155L28.7943 45.7017C28.7019 45.3585 28.4338 45.0904 28.0905 44.9979L1.57677 37.8592C0.592718 37.5942 0.592719 36.198 1.57677 35.9331L28.0905 28.7943C28.4338 28.7019 28.7019 28.4338 28.7943 28.0905L35.9331 1.57677Z"
        fill="url(#paint0_linear_84_2529)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_84_2529"
          x1="-7.40778"
          y1="18.8213"
          x2="52.7886"
          y2="44.6018"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C2CDFB" />
          <stop offset="1" stop-color="#F1F2FC" />
        </linearGradient>
      </defs>
    </svg>
    <svg
      class="right-star"
      width="73"
      height="73"
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.7044 1.34813C35.9694 0.36408 37.3656 0.364081 37.6305 1.34813L44.7693 27.8619C44.8617 28.2051 45.1298 28.4732 45.473 28.5657L71.9868 35.7044C72.9709 35.9694 72.9709 37.3656 71.9868 37.6305L45.473 44.7693C45.1298 44.8617 44.8617 45.1298 44.7693 45.473L37.6305 71.9868C37.3656 72.9709 35.9694 72.9709 35.7044 71.9868L28.5657 45.473C28.4732 45.1298 28.2051 44.8617 27.8619 44.7693L1.34813 37.6305C0.36408 37.3656 0.364081 35.9694 1.34813 35.7044L27.8619 28.5657C28.2051 28.4732 28.4732 28.2051 28.5657 27.8619L35.7044 1.34813Z"
        fill="url(#paint0_linear_84_2530)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_84_2530"
          x1="-7.63642"
          y1="18.5927"
          x2="52.5599"
          y2="44.3732"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C2CDFB" />
          <stop offset="1" stop-color="#F1F2FC" />
        </linearGradient>
      </defs>
    </svg>

    <img class="logo" src="/img/logo.svg" alt="логотип Профи.ру" />
    <section class="box">
      <h1 class="title">Ветки истории</h1>

      <p class="lede">
        Привет, мы хотим позвать тебя в <b>путешествие во времени</b>.
        <br />
        Первая остановка —
        <b>1995</b>, выход PlayStation Windows 95. Каждый вопрос — эпизод в истории ИТ, а чтобы не
        заскучать в дороге, будем пересаживаться на <b>культовый транспорт</b> эпохи.
      </p>

      <div class="lede-sep" aria-hidden="true"></div>

      <p class="lede">
        Начнём с зарождения интернета, а приедем к первым ПК и дилиджансам. Финальная точка —
        <b>1830-е</b>, там и подведём итоги квиза.
      </p>
      <p class="lede lede--bold">Готов?</p>

      <button class="cta" @click="startQuiz">Поехали</button>
      <img
        class="question-mark"
        src="/img/question-mark.png"
        alt="декоративный красный вопросительный знак"
      />
    </section>
  </main>
</template>

<style scoped>
.start {
  position: relative;
  padding: 32px;
  min-height: 100vh;
  background: linear-gradient(90deg, #f1f1fb 0%, #d5dbfd 100%);
  color: #242730;
  font-family:
    'ONY-FORMDigital-PROFI',
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
  overflow: hidden;
}

.logo {
  display: block;
  margin: 0 auto;
  margin-bottom: 66px;
}
.box {
  position: relative;
  text-align: center;
  max-width: 1015px;
  margin: 0 auto;
  padding: 40px 80px;
  border-radius: 20px;
  background: rgb(255, 255, 255);
  box-shadow: 0 4px 28px #dadff4;
  z-index: 0;
  box-sizing: border-box;
}
.question-mark {
  position: absolute;
  bottom: -90px;
  right: 20px;
}

.left-big-star {
  position: absolute;
  left: 57px;
  top: 196px;
}
.left-small-star {
  position: absolute;
  left: 57px;
  top: 84px;
}
.right-star {
  position: absolute;
  right: 93px;
  top: 398px;
}
.title {
  margin: 0;
  font-size: 48px;
  font-weight: 500;
}

.lede {
  font-size: 22px;
  font-weight: 400;
}
.lede b {
  font-weight: 500;
}

.lede--bold {
  font-weight: 500;
  margin-bottom: 38px;
}

.lede-sep {
  height: 1px;
  margin: 30px 0;
  width: min(86%, 560px);
  background: linear-gradient(
    90deg,
    transparent 0%,
    #dadff4 20%,
    #cad3fb 50%,
    #dadff4 80%,
    transparent 100%
  );
  filter: blur(0.2px);
  opacity: 0.8;
}

.lede--muted {
  color: #9fb0c3;
}

.cta {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 185px;
  height: 62px;
  appearance: none;
  border: none;
  border-radius: 14px;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background: #d72e49;
  transition:
    transform 0.12s ease,
    filter 0.12s ease;
}
.cta:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}
.icon {
  margin-left: 8px;
  vertical-align: -2px;
}

.years {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  gap: 12px;
  justify-content: center;
  opacity: 0.55;
  font-size: 12px;
  color: #93c5fd;
  flex-wrap: wrap;
}
.years span {
  border: 1px solid rgba(147, 197, 253, 0.25);
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(13, 23, 42, 0.35);
}

button:focus-visible {
  outline: 2px solid #a5b4fc;
  outline-offset: 2px;
  border-radius: 14px;
}

@media (max-width: 900px) {
  .box {
    max-width: unset;
    width: 100%;
  }
}
</style>
