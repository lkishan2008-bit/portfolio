document.addEventListener('DOMContentLoaded', () => {
  const visionAidLink = document.querySelector('.project-title-link');
  if (visionAidLink) {
    visionAidLink.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});
