document.addEventListener("DOMContentLoaded", function () {
    const showMoreButton = document.getElementById("show-more-button");
  const block = document.querySelector(".support-ukraine-block");
  const button = document.querySelector('#show-more-button');
  const innerContainer = document.querySelector('.support-ukraine-container__inner');
  const computedStyles = getComputedStyle(innerContainer);
 let count = 0;

  showMoreButton.addEventListener('click', function () {
    if (computedStyles.height === '188px') {
    count++;
    if (count == 1 || count == 5 || count == 9 || count == 13 || count == 17 || count == 21) {
      block.classList.add('expanded');
      
    }
    else if (count == 2 || count == 6 || count == 10 || count == 14 || count == 18 || count == 22) {
      block.classList.add('expanded');
      block.classList.toggle('expanded-second');
      button.style.transform = 'rotate(180deg)'
      button.style.transition = '250ms cubic-bezier(0.4, 0, 0.2, 1)';
    }
    else if (count == 3 || count == 7 || count == 11 || count == 15 || count == 19 || count == 23) {
      block.classList.toggle('expanded-second');
      button.style.transform = 'rotate(180deg)';
       button.style.transition = '250ms cubic-bezier(0.4, 0, 0.2, 1)';
    }
    else if (count == 4 || count == 8 || count == 12 || count == 16 || count == 20 || count == 24) {
      block.classList.toggle('expanded');
      button.style.transform = 'rotate(0deg)'
    }
} else if (computedStyles.height === '305px'){
block.classList.toggle('expanded');
}
   
  });
  }); 
