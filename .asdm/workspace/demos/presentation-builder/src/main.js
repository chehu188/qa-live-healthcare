import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { slidesData } from './slides/data.js';
import 'highlight.js/styles/github-dark.css';

// 配置 marked + highlight.js
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
}));
marked.setOptions({ breaks: true, gfm: true });

const total = slidesData.length;

// ========== 导航控制器 ==========
const nav = (() => {
  let current = 0;

  function goTo(index) {
    if (index < 0 || index >= total) return;
    current = index;
    document.getElementById('slides-track').style.transform =
      `translateX(-${current * 100}%)`;
    document.getElementById('slide-indicator').textContent =
      `${current + 1} / ${total}`;
    document.getElementById('prev-btn').disabled = current === 0;
    document.getElementById('next-btn').disabled = current === total - 1;
    document.getElementById('progress-bar').style.width =
      `${((current + 1) / total) * 100}%`;
  }

  function reset() { goTo(0); }

  function init() {
    document.addEventListener('keydown', (e) => {
      const pres = document.getElementById('presentation');
      if (pres.classList.contains('hidden')) return;
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goTo(current + 1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goTo(current - 1);
          break;
        case 'Escape':
          e.preventDefault();
          fs.exit();
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    });
    document.getElementById('prev-btn').addEventListener('click', () => goTo(current - 1));
    document.getElementById('next-btn').addEventListener('click', () => goTo(current + 1));
    document.getElementById('slide-count').textContent = total;
    reset();
  }

  return { init, goTo, reset };
})();

// ========== 全屏控制器 ==========
const fs = (() => {
  function init() {
    document.getElementById('play-btn').addEventListener('click', start);
    document.getElementById('exit-btn').addEventListener('click', exit);
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
  }

  function start() {
    enter();
    const el = document.documentElement;
    (el.requestFullscreen || el.webkitRequestFullscreen).call(el).catch(() => {});
  }

  function enter() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('presentation').classList.remove('hidden');
    nav.reset();
  }

  function exit() {
    document.getElementById('presentation').classList.add('hidden');
    document.getElementById('landing-page').classList.remove('hidden');
    nav.reset();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (document.webkitFullscreenElement) document.webkitExitFullscreen();
  }

  function onChange() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (!document.getElementById('presentation').classList.contains('hidden')) {
        exit();
      }
    }
  }

  return { init, exit };
})();

// ========== 渲染器 ==========
const renderer = (() => {
  function init() {
    const track = document.getElementById('slides-track');
    slidesData.forEach((slide) => {
      const div = document.createElement('div');
      div.className = 'slide';

      const inner = document.createElement('div');
      inner.className = 'slide-inner';

      const h1 = document.createElement('h1');
      h1.className = 'slide-title';
      h1.textContent = slide.title;
      inner.appendChild(h1);

      const content = document.createElement('div');
      content.className = 'slide-content';
      content.innerHTML = marked.parse(slide.content);
      inner.appendChild(content);

      div.appendChild(inner);
      track.appendChild(div);
    });
  }

  return { init };
})();

// ========== 启动 ==========
renderer.init();
nav.init();
fs.init();
