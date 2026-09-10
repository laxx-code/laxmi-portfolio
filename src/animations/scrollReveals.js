import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveals() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.set('.reveal-on-scroll', { opacity: 1, y: 0 });
    return;
  }

  // Hero headline line-by-line reveal animation
  const heroHeadlines = document.querySelectorAll('.hero-line-reveal');
  if (heroHeadlines.length > 0) {
    gsap.fromTo(heroHeadlines, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }

  // Reveal elements grouped by section for seamless stagger
  const sections = document.querySelectorAll('section, main > div');

  sections.forEach((section) => {
    const reveals = section.querySelectorAll('.reveal-on-scroll');
    if (reveals.length === 0) return;

    gsap.fromTo(reveals,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}
