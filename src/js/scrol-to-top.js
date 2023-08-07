document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopButton = document.getElementById('scrollToTopButton');
  
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  
    scrollToTopButton.addEventListener('click', scrollToTop);
  
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 400) {
            scrollToTopButton.classList.remove('visually-hidden');
        } else {
            scrollToTopButton.classList.add('visually-hidden');
        }
    });
});