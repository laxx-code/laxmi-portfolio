// Interactive JS for NUANCE Speech AI Case Study Page

export function initCaseStudyInteractivity() {
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
