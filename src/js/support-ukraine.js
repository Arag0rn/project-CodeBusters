document.addEventListener("DOMContentLoaded", function () {
    const showMoreButton = document.getElementById("show-more-button");
    const showMoreButtonSecond = document.getElementById("second");
     const fourth = document.getElementById("fourth");
    const hiddenItems = document.querySelectorAll(".hidden");
    const elems = document.querySelectorAll(".elem");
    const container = document.querySelector(".support-ukraine-container");
    let isExpanded = false;

    showMoreButton.addEventListener("click", function () {
      if (!isExpanded) {

        hiddenItems.forEach(function (item) {
          item.style.display = "list-item";
        });

          showMoreButton.style.display = "none";
          showMoreButtonSecond.style.display = "block";

          elems.forEach(function (item) {
          item.style.display = "none";
        });


        const lastHiddenItem = hiddenItems[hiddenItems.length - 1];
        lastHiddenItem.scrollIntoView({ behavior: "smooth" });
        fourth.style.marginTop = "0px"
        isExpanded = true;
      }
    });

    showMoreButtonSecond.addEventListener("click", function () {
    if (isExpanded) {

      hiddenItems.forEach(function (item) {
        item.style.display = "none";
      });


        showMoreButtonSecond.style.display = "none";
        showMoreButton.style.display = "block";


      elems.forEach(function (item, index) {
        if (index < 6) {
            item.style.display = "list-item";
            item.style.display = "flex";
        }
      });

      container.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"  });
       fourth.style.marginTop = "20px";
      isExpanded = false;
    }
  });
  });