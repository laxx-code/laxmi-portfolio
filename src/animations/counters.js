import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCounters() {
  const counterElements = document.querySelectorAll('.animate-counter');
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  counterElements.forEach((el) => {
    const targetValue = parseInt(el.getAttribute('data-target') || el.innerText.replace(/\D/g, ''), 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || (el.innerText.includes('%') ? '%' : '');

    if (isNaN(targetValue)) return;

    if (prefersReducedMotion) {
      const formatted = targetValue < 10 && !suffix && targetValue > 0 ? `0${targetValue}` : `${targetValue}`;
      el.innerText = `${prefix}${formatted}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: targetValue,
      duration: 2.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        const current = Math.floor(obj.val);
        const formatted = current < 10 && !suffix && targetValue >= 10 ? `0${current}` : `${current}`;
        el.innerText = `${prefix}${formatted}${suffix}`;
      }
    });
  });
}
