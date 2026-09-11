// Interactive JS for NUANCE Speech AI Case Study

export function initCaseStudyInteractivity() {
  const caseStudySection = document.getElementById('nuance-case-study');
  const viewBtns = document.querySelectorAll('a[href="#nuance-case-study"]');

  function openCaseStudy(e) {
    if (e) e.preventDefault();
    if (!caseStudySection) return;
    caseStudySection.classList.remove('hidden');
    caseStudySection.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, null, '#nuance-case-study');
  }

  function closeCaseStudy(e) {
    if (caseStudySection && !caseStudySection.classList.contains('hidden')) {
      if (e) e.preventDefault();
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        caseStudySection.classList.add('hidden');
      }, 400);
      history.pushState(null, null, '#work');
    }
  }

  viewBtns.forEach(btn => btn.addEventListener('click', openCaseStudy));

  // Back to projects buttons inside case study
  if (caseStudySection) {
    const caseStudyBackBtns = caseStudySection.querySelectorAll('a[href="#work"]');
    caseStudyBackBtns.forEach(btn => btn.addEventListener('click', closeCaseStudy));
  }

  // Check URL hash on initial load
  if (window.location.hash === '#nuance-case-study') {
    if (caseStudySection) caseStudySection.classList.remove('hidden');
  } else if (caseStudySection) {
    caseStudySection.classList.add('hidden');
  }

  // Handle browser back/forward buttons
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#nuance-case-study') {
      if (caseStudySection) caseStudySection.classList.remove('hidden');
    } else if (caseStudySection) {
      caseStudySection.classList.add('hidden');
    }
  });

  // 1. Architecture Diagram Node Expansion & Highlight
  const archNodes = document.querySelectorAll('.case-study-arch-node');
  const archDetailTitle = document.getElementById('archDetailTitle');
  const archDetailDesc = document.getElementById('archDetailDesc');
  const archDetailTech = document.getElementById('archDetailTech');

  if (archNodes.length > 0 && archDetailTitle) {
    archNodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        archNodes.forEach(n => {
          n.classList.remove('border-primary', 'bg-surface-container-high', 'shadow-[0_0_20px_rgba(255,179,178,0.2)]');
          n.classList.add('border-outline-variant/40', 'bg-background');
        });
        node.classList.remove('border-outline-variant/40', 'bg-background');
        node.classList.add('border-primary', 'bg-surface-container-high', 'shadow-[0_0_20px_rgba(255,179,178,0.2)]');

        const title = node.getAttribute('data-title');
        const desc = node.getAttribute('data-desc');
        const tech = node.getAttribute('data-tech');

        if (title && archDetailTitle) archDetailTitle.textContent = title;
        if (desc && archDetailDesc) archDetailDesc.textContent = desc;
        if (tech && archDetailTech) archDetailTech.textContent = tech;
      });
    });
  }

  // 2. Interactive Confidence & Parameter Sliders
  const tuningSliders = document.querySelectorAll('.tuning-slider');
  tuningSliders.forEach(slider => {
    const valDisplay = document.getElementById(`${slider.id}-val`);
    if (slider && valDisplay) {
      slider.addEventListener('input', (e) => {
        const val = e.target.value;
        const unit = slider.getAttribute('data-unit') || '';
        valDisplay.textContent = `${val}${unit}`;
      });
    }
  });
}
