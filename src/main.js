import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initWaveform } from './animations/waveform.js';
import { initScrollReveals } from './animations/scrollReveals.js';
import { initPipelineAnimation } from './animations/pipelineAnimation.js';
import { initCounters } from './animations/counters.js';
import { initTimelineAnimation } from './animations/timeline.js';
import { initChatPanel } from './interactive/chatPanel.js';
import { initCaseStudyInteractivity } from './interactive/caseStudy.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Menu Toggle Logic
  const menuBtn = document.getElementById('menuBtn');
  const sideNav = document.getElementById('sideNav');
  const closeNav = document.getElementById('closeNav');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleNav(open) {
    if (!sideNav) return;
    const shouldOpen = open !== undefined ? open : sideNav.classList.contains('translate-x-full');
    if (shouldOpen) {
      sideNav.classList.remove('translate-x-full');
      sideNav.classList.add('translate-x-0');
    } else {
      sideNav.classList.add('translate-x-full');
      sideNav.classList.remove('translate-x-0');
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', () => toggleNav(true));
  if (closeNav) closeNav.addEventListener('click', () => toggleNav(false));
  navLinks.forEach(link => link.addEventListener('click', () => toggleNav(false)));

  // Magnetic Button Hover Physics (respecting prefers-reduced-motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }

  // Initialize all modular animations and interactivity
  initWaveform();
  initScrollReveals();
  initPipelineAnimation();
  initCounters();
  initTimelineAnimation();
  initChatPanel();
  initCaseStudyInteractivity();

  // Refresh ScrollTrigger after assets load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});
