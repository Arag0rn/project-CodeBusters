const switcherBtn = document.querySelector('.switcher-toggle');
switcherBtn.addEventListener('change', function toggleTheme() {
  document.body.classList.toggle('dark-theme');
});
