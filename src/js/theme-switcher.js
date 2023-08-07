document.addEventListener('DOMContentLoaded', function () {
  const switcherBtn = document.querySelector('.switcher-toggle');

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    switcherBtn.checked = true;
    document.body.classList.add('dark-theme');
    switcherBtn.style.transform = 'translateX(20px)';
  }

  switcherBtn.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  switcherBtn.addEventListener('change', function () {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';
    localStorage.setItem('theme', theme);

    if (switcherBtn.checked) {
      switcherBtn.style.transform = 'translateX(20px)';
    } else {
      switcherBtn.style.transform = 'translateX(0)';
    }
  });
});
