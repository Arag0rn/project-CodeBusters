// document.addEventListener("DOMContentLoaded", function () {
//   const showMoreButton = document.getElementById("showMoreButton");
//   const supportList = document.querySelector(".support-ukraine-list");
//   const hiddenItems = document.querySelectorAll(".support-ukraine-item:nth-child(n+7)");

//   showMoreButton.addEventListener("click", function () {
//     hiddenItems.forEach(item => {
//       item.style.display = "list-item";
//     });

//     // Прокручування до останнього блоку
//     hiddenItems[hiddenItems.length - 1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

//     // Приховати кнопку після відображення всіх блоків
//     showMoreButton.style.display = "none";
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const showMoreButton = document.getElementById(".circle");
  const remainingFunds = document.getElementById(".support-ukraine-list");
    console.log(showMoreButton);
  showMoreButton.addEventListener("click", function () {
    remainingFunds.classList.remove("hidden");
    showMoreButton.style.display = "none";
    window.scrollTo({
      top: remainingFunds.offsetTop,
      behavior: "smooth",
    });
  });
});

