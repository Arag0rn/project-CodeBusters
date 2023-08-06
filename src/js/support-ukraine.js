document.addEventListener("DOMContentLoaded", function () {
    const showMoreButton = document.getElementById("show-more-button");
    const showMoreButtonSecond = document.getElementById("second");
     const fourth = document.getElementById("fourth");
    const hiddenItems = document.querySelectorAll(".hidden");
    const elems = document.querySelectorAll(".elem");
    const container = document.querySelector(".support-ukraine-container");
    const block = document.querySelector(".support-ukraine-block");
    let isExpanded = false;


  showMoreButton.addEventListener('click', function () {
    block.classList.toggle('expanded');
  });
});