<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';

// --- 深淺模式邏輯 ---
const isDarkMode = ref(
    typeof window !== 'undefined' && (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
);

const updateThemeClass = () => {
    if (typeof document !== 'undefined') {
        if (isDarkMode.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
};
updateThemeClass(); // 初始化設定

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    updateThemeClass();
};

// --- 狀態與 Refs ---
const containerRef = ref(null);
const titleRef = ref(null);
const subTitleRef = ref(null);
const windParticlesRef = ref([]);
const gridRef = ref(null);
const parallaxRef = ref(null);
const quoteBubbleRef = ref(null);
const currentQuote = ref("");

// --- 語錄設定 ---
const PARTICLE_COUNT = 40;

const quotes = [
    "這段 Code 昨天還會動，今天就不行了。 (´_ゝ`) ",
    "我發誓我只改了一行，然後整個專案就炸了。 💣",
    "Cooking Now? 其實是 Debugging Now... (´;ω;`) ",
    "這個 Bug 我解了三小時，結果發現是括號沒關。 (╯°□°）╯︵ ┻━┻",
    "正在努力讓這個網頁看起來像是有在動的樣子... ⌨️"
];

// --- 互動邏輯：語錄彈出 ---
const showRandomQuote = () => {
    const availableQuotes = quotes.filter(q => q !== currentQuote.value);
    currentQuote.value = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];

    gsap.killTweensOf(quoteBubbleRef.value);

    gsap.fromTo(quoteBubbleRef.value,
        { opacity: 0, scale: 0.2, y: 20, x: -20, rotation: -10 },
        { opacity: 1, scale: 1, y: 0, x: 0, rotation: 0, duration: 0.6, ease: "back.out(2)" }
    );

    gsap.to(quoteBubbleRef.value, {
        opacity: 0, scale: 0.5, y: 10, x: -10,
        delay: 2.5, duration: 0.4, ease: "back.in(2)"
    });
};

onMounted(() => {
    // --- 系統監聽 ---
    if (typeof window !== 'undefined' && window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                isDarkMode.value = e.matches;
                updateThemeClass();
            }
        });
    }

    const tl = gsap.timeline();

    // 1. 初始進場：標題升起 -> 按鈕彈出
    tl.from(titleRef.value, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    })
        .from(subTitleRef.value, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=1")
        .from('.gsap-btn, .gsap-profile-img', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(2)",
        }, "-=0.6");

    // 2. 持續動畫：上下浮動
    gsap.to([titleRef.value, subTitleRef.value], {
        y: "+=12",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 3. 風效果：右往左吹
    windParticlesRef.value.forEach((el) => {
        const speed = Math.random() * 3 + 2;
        gsap.set(el, {
            x: window.innerWidth + 100,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.3 + 0.1,
            scaleX: Math.random() * 2 + 1
        });

        gsap.to(el, {
            x: -200,
            duration: speed,
            repeat: -1,
            delay: Math.random() * 5,
            ease: "none"
        });
    });

    // 4. 互動：滑鼠視差與平滑回正
    const handleMouseMove = (e) => {
        if (!gridRef.value || !parallaxRef.value) return;
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(gridRef.value, { x: xPos * 0.5, y: yPos * 0.5, duration: 1 });
        gsap.to(parallaxRef.value, { x: xPos, y: yPos, duration: 1.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        if (!gridRef.value || !parallaxRef.value) return;
        gsap.to([gridRef.value, parallaxRef.value], {
            x: 0, y: 0, duration: 1.5, ease: "power3.out"
        });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // --- 生命週期清理 ---
    onUnmounted(() => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
    });
});
</script>

<template>
    <div ref="containerRef"
        class="w-screen h-screen m-0 p-0 overflow-hidden bg-white dark:bg-slate-950 flex flex-col items-center justify-center relative select-none transition-colors duration-700">

        <div ref="gridRef" class="absolute inset-[-10%] z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
            style="background-image: radial-gradient(currentColor 1px, transparent 1px); background-size: 40px 40px;">
        </div>

        <div class="absolute inset-0 z-0 pointer-events-none">
            <div v-for="i in PARTICLE_COUNT" :key="i" :ref="el => windParticlesRef[i - 1] = el"
                class="absolute h-px bg-slate-400 dark:bg-slate-600 rounded-full"
                :style="{ width: Math.random() * 60 + 20 + 'px' }"></div>
        </div>

        <main ref="parallaxRef" class="relative z-10 flex flex-col items-center text-center">

            <div class="mb-16">
                <h1 ref="titleRef"
                    class="text-7xl md:text-9xl font-black text-slate-900 dark:text-white tracking-[-0.05em] leading-none">
                    COOKING<br><span
                        class="text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">NOW</span>
                </h1>

                <p ref="subTitleRef"
                    class="text-lg md:text-xl font-light text-slate-500 dark:text-slate-400 mt-8 tracking-[0.5em] uppercase">
                    速速開發中<span class="tracking-normal font-emoji ml-1 inline-block">ᓚᘏᗢ</span>
                </p>
            </div>

            <div class="flex flex-row items-center gap-6">
                <div class="gsap-btn">
                    <a href="https://github.com/jason111nn" target="_blank"
                        class="group relative block px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-black rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl">
                        <span class="relative z-10 flex items-center gap-2">
                            GITHUB
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        <div
                            class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]">
                        </div>
                    </a>
                </div>

                <div class="gsap-btn">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jason5j288@gmail.com" target="_blank"
                        rel="noopener noreferrer"
                        class="group relative flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-bold transition-all hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer">
                        Email
                        <svg class="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                        </svg>
                    </a>
                </div>
            </div>

            <!-- 頭像與外框元件 -->
            <div class="mt-12 relative group cursor-pointer gsap-profile-img" @click="showRandomQuote">

                <!-- 語錄對話框 -->
                <div ref="quoteBubbleRef"
                    class="absolute bottom-[80%] left-[55%] md:left-[70%] mb-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm md:text-base font-bold py-3 px-5 rounded-3xl rounded-bl-none shadow-2xl border border-slate-200 dark:border-slate-700 pointer-events-none opacity-0 origin-bottom-left z-50 w-max max-w-[160px] sm:max-w-[200px] md:max-w-none whitespace-normal md:whitespace-nowrap text-left transform-gpu">
                    {{ currentQuote }}
                </div>

                <!-- 呼吸發光背板 -->
                <div
                    class="absolute -inset-1 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 animate-[pulse_3s_infinite]">
                </div>

                <!-- 頭像本體 -->
                <img src="/profile-icon.jpeg" alt="LOGO"
                    class="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105 active:scale-95">
            </div>
        </main>

        <footer class="absolute bottom-8 text-[10px] font-mono text-slate-300 dark:text-slate-700 tracking-widest">
            EST. 2026 / JASON111NN / VITE-VUE-GSAP
        </footer>

        <!-- 深淺模式切換按鈕 -->
        <button @click="toggleDarkMode"
            class="absolute bottom-6 right-6 p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xl hover:scale-110 active:scale-95 transition-all z-50 border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer"
            title="切換深淺模式">
            <svg v-if="!isDarkMode" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <!-- Moon Icon -->
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <!-- Sun Icon -->
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </button>

    </div>
</template>

<style>
html,
body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #fff;
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

.font-emoji {
    font-family:
        "Helvetica Neue",
        "Helvetica",
        "Segoe UI Symbol",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Noto Color Emoji",
        "Segoe UI",
        "Arial",
        sans-serif;
}

.dark body {
    background: #020617;
}
</style>