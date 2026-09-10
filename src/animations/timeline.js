import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTimelineAnimation() {
  const timelineContainer = document.getElementById('experience-timeline');
  if (!timelineContainer) return;

  const timelineLine = timelineContainer.querySelector('.timeline-progress-line');
  const items = timelineContainer.querySelectorAll('.exp-item');

  if (items.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (timelineLine && !prefersReducedMotion) {
    // Scroll progress drawing line downward
    gsap.fromTo(timelineLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainer,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true
        }
      }
    );
  }

  // Light up timeline dots when scrolled into view
  items.forEach((item) => {
    const dot = item.querySelector('.timeline-dot');
    if (!dot) return;

    if (prefersReducedMotion) {
      dot.classList.add('active-dot');
      return;
    }

    ScrollTrigger.create({
      trigger: item,
      start: 'top 75%',
      onEnter: () => {
        dot.classList.add('active-dot');
      },
      onLeaveBack: () => {
        dot.classList.remove('active-dot');
      }
    });
  });
}
