import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initWaveform() {
  const container = document.getElementById('waveform-container');
  if (!container) return;

  const barCount = 40;
  container.innerHTML = '';

  const bars = [];
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-bar';
    
    // Vary heights slightly to resemble an audio waveform
    const baseHeight = 30 + Math.sin((i / barCount) * Math.PI * 3) * 40 + Math.random() * 20;
    bar.style.height = `${Math.min(100, Math.max(20, baseHeight))}%`;
    
    container.appendChild(bar);
    bars.push(bar);
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const filledIndex = Math.floor(progress * barCount);

      bars.forEach((bar, idx) => {
        if (idx <= filledIndex) {
          bar.classList.add('filled');
        } else {
          bar.classList.remove('filled');
        }
      });
    }
  });
}
