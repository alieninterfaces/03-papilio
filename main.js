const container = document.querySelector('.carousel__container');
const items = document.querySelectorAll('.carousel__item');
const threshold = 100; // swipe distance threshold

let startX = 0;
let endX = 0;

let currentPage = 0;
let pageCount = items.length;

const tl = gsap.timeline({ paused: true });
tl.to(container, { duration: 1, xPercent: -100 * currentPage, ease: 'power1.inOut' });
updateBodyClass();

container.addEventListener('pointerdown', e => {
  startX = e.clientX || e.touches[0].clientX;
});

container.addEventListener('pointermove', e => {
  endX = e.clientX || e.touches[0].clientX;
});

container.addEventListener('pointerup', e => {
  const distance = endX - startX;

  if (distance > threshold && currentPage > 0) {
    currentPage--;
  } else if (distance < -threshold && currentPage < pageCount - 1) {
    currentPage++;
  }

  updateBodyClass();
  gsap.to(container, { duration: 1, xPercent: -100 * currentPage, ease: 'power1.inOut' });
});

container.addEventListener('pointercancel', e => {
  endX = startX;
});

function updateBodyClass() {
    const newClass = `page-${currentPage}`;
    
    // Remove any existing page classes and add the new one
    document.body.classList.forEach(className => {
      if (className.startsWith('page-')) {
        document.body.classList.remove(className);
      }
    });
    document.body.classList.add(newClass);
  }
  