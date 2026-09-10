import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initPipelineAnimation() {
  const pipelineSection = document.getElementById('pipeline-container');
  if (!pipelineSection) return;

  const steps = pipelineSection.querySelectorAll('.pipeline-step');
  const arrows = pipelineSection.querySelectorAll('.pipeline-arrow');
  
  if (steps.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Pin the architecture pipeline box while scrolling through it
  const pinTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: pipelineSection,
      start: 'top 20%',
      end: '+=1000',
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1
    }
  });

  const totalItems = steps.length;

  steps.forEach((step, index) => {
    // Light up step
    pinTimeline.to(step, {
      backgroundColor: '#4d0e13',
      color: '#ffb3b2',
      borderColor: '#ffb3b2',
      scale: 1.08,
      duration: 0.5
    }, index * 0.5);

    // Light up connecting arrow if present
    if (arrows[index]) {
      pinTimeline.to(arrows[index], {
        color: '#ffb3b2',
        scale: 1.2,
        duration: 0.3
      }, index * 0.5 + 0.2);
    }
  });
}
