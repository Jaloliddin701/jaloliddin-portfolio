document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 2. Mobile Menu Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change menu icon between hamburger and close
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars-staggered';
    }
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });

  // --- 3. Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section, header');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 4. Gallery Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(button => button.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        // Show/hide based on filter
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          // Little animation trigger
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300); // match transition duration
        }
      });
    });
  });

  // --- 5. Lightbox Modal ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const captionTitle = document.getElementById('captionTitle');
  const captionCategory = document.getElementById('captionCategory');

  let activeItems = []; // currently filtered items
  let currentIndex = 0;

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Get all currently visible items to allow navigating only through visible ones
      activeItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
      currentIndex = activeItems.indexOf(item);

      showImage(item);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable page scrolling
    });
  });

  function showImage(item) {
    const imgSrc = item.querySelector('img').src;
    const title = item.getAttribute('data-title');
    const category = item.getAttribute('data-category');

    lightboxImg.src = imgSrc;
    captionTitle.textContent = title;
    captionCategory.textContent = category;
  }

  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable page scrolling
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    // Close only if user clicks outside the image/controls
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
      closeLightbox();
    }
  });

  // Navigate Prev
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    showImage(activeItems[currentIndex]);
  });

  // Navigate Next
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % activeItems.length;
    showImage(activeItems[currentIndex]);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      lightboxPrev.click();
    } else if (e.key === 'ArrowRight') {
      lightboxNext.click();
    }
  });

});
