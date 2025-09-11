<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function startQuiz() {
  router.push({ name: 'quiz' })
}
</script>

<template>
  <main class="start">
    <section class="box">
      <h1 class="title">Ветки истории</h1>

      <!-- главный тезис -->
      <p class="lede">
        Привет, мы хотим позвать тебя в <b>путешествие во времени</b>. Первая остановка —
        <b>2025</b>, наше время. Дальше будем отматывать годы назад. Каждый вопрос — эпизод в
        истории ИТ, чтобы не заскучать в дороге, будем пересаживаться на
        <i>культовый транспорт</i> каждой эпохи.
      </p>

      <!-- визуальный разделитель -->
      <div class="lede-sep" aria-hidden="true"></div>

      <!-- пояснение механики -->
      <p class="lede lede--muted">
        Начнем со смартфонов и облачных сервисов, а приедем к первым ПК и дилиджансам. Финальная
        точка — <b>1830-е</b>, там и подведём итоги квиза.
        <p>Готов?</p>
      </p>


      <button class="cta" @click="startQuiz">
        Поехали
        <svg width="16" height="16" viewBox="0 0 24 24" class="icon" aria-hidden="true">
          <path
            d="M5 12h14M13 5l7 7-7 7"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </section>

    <div class="years" aria-hidden="true">
      <span>2025</span><span>2016</span><span>2009</span><span>1995</span> <span>1986</span
      ><span>1980</span><span>1971</span><span>1947</span><span>1830</span>
    </div>
  </main>
</template>

<style scoped>
.start {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 28px;
  background:
    radial-gradient(900px 450px at 12% 12%, rgba(99, 102, 241, 0.08), transparent),
    radial-gradient(800px 400px at 88% 20%, rgba(236, 72, 153, 0.08), transparent),
    linear-gradient(180deg, #0b0d12 0%, #0e1117 100%);
  color: #e5e7eb;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial;
  overflow: hidden;
}

.box {
  text-align: center;
  max-width: 760px;
  padding: 36px 26px;
  border-radius: 20px;
  background: rgba(2, 6, 23, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.16);
  backdrop-filter: blur(8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
}

.title {
  margin: 0 0 16px;
  font-size: clamp(36px, 6vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.lede {
  margin: 0 0 16px;
  color: #cbd5e1;
  font-size: clamp(16px, 2vw, 18px);
}
.lede b {
  color: #fbbf24;
  font-weight: 800;
}
.lede i {
  color: #a5b4fc;
}

/* тонкий световой разделитель между блоками */
.lede-sep {
  height: 1px;
  margin: 10px auto 14px;
  width: min(86%, 560px);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(99, 102, 241, 0.35) 20%,
    rgba(236, 72, 153, 0.35) 80%,
    transparent 100%
  );
  filter: blur(0.2px);
  opacity: 0.8;
}

/* второй блок чуть тише по тону, чтобы «описание» читалось отдельно */
.lede--muted {
  color: #9fb0c3;
}

/* CTA */
.cta {
  appearance: none;
  border: none;
  border-radius: 14px;
  padding: 14px 22px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  color: white;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.28);
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

/* фокус */
button:focus-visible {
  outline: 2px solid #a5b4fc;
  outline-offset: 2px;
  border-radius: 14px;
}
</style>
