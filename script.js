// ======================================
// 1. DOM ELEMENTS
// ======================================
const slideCounter = document.getElementById("slideCounter");

const mainImage = document.getElementById("mainImage");

const imageTitle = document.getElementById("imageTitle");
const imageCaption = document.getElementById("imageCaption");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const thumbnails = document.querySelectorAll(".thumbnail");

// ======================================
// 2. DATA ARRAY
// ======================================

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    title: "Mountain Lake",
    caption: "A peaceful mountain lake..",
  },

  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    title: "Desert",
    caption: "Hot desert with dunes..",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    title: "Ocean",
    caption: "Blue ocean view..",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
    title: "Mountains with crystal clear water",
    caption: "Peaceful mountains with crystal clear water.",
  },
];

// ======================================
// 3. CURRENT INDEX
// ======================================

let currentIndex = 0;
let autoplayInterval;

// ======================================
// 4. FUNCTION: UPDATE SLIDE
// ======================================

function updateSlide() {
  const currentSlide = slides[currentIndex];
  const total = slides.length;

  mainImage.classList.add("fade-out");

  setTimeout(() => {
    mainImage.src = currentSlide.image;
    mainImage.alt = currentSlide.title;

    imageTitle.textContent = currentSlide.title;
    imageCaption.textContent = currentSlide.caption;

    slideCounter.textContent = `${currentIndex + 1} / ${total}`;

    updateActiveThumbnail();

    mainImage.classList.remove("fade-out");
  }, 200);
}

// ======================================
// 5. FUNCTION: UPDATE ACTIVE THUMBNAIL
// ======================================

function updateActiveThumbnail() {
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
  });

  thumbnails[currentIndex].classList.add("active");
}

// ======================================
// 6. PREVIOUS BUTTON
// ======================================

prevBtn.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }

  updateSlide();
  startAutoplay();
});

// ======================================
// 7. NEXT BUTTON
// ======================================

nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }

  updateSlide();
  startAutoplay();
});

// ======================================
// 8. THUMBNAIL CLICK
// ======================================

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const index = thumbnail.dataset.index;
    currentIndex = Number(index);

    updateSlide();
    startAutoplay();
  });
});

// ======================================
// 9. AUTOPLAY
// ======================================

function startAutoplay() {
  clearInterval(autoplayInterval);

  autoplayInterval = setInterval(() => {
    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    updateSlide();
  }, 3000);
}

// ======================================
// 10. INITIAL CALL
// ======================================

updateSlide();
startAutoplay();
