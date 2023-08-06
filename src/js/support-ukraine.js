document.addEventListener("DOMContentLoaded", function () {
    const showMoreButton = document.getElementById("show-more-button");
<<<<<<< Updated upstream
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
=======
  const block = document.querySelector(".support-ukraine-block");
  const button = document.querySelector('#show-more-button');

  let isExpanded = false;
  let isExpanded2 = false;
  let isExpanded3; let count = true;

  showMoreButton.addEventListener('click', function () {
    isExpanded = !isExpanded;
    // isExpanded2 = !isExpanded2;
    // isExpanded2 = !isExpanded3;
    
    console.log(isExpanded, isExpanded2, isExpanded3);
    if (!isExpanded && isExpanded2 && isExpanded3==undefined) {
      block.classList.toggle('expanded');
      console.log('1');
    }
    if (isExpanded&& !isExpanded2 && isExpanded3==undefined){
      block.classList.toggle('expanded');
      block.classList.toggle('expanded-second');
      console.log('2');
      isExpanded2 = true;
    }
    else if (!isExpanded && isExpanded2 && isExpanded3==undefined) {
      block.classList.toggle('expanded-second');
      block.classList.toggle('expanded-third');
      button.style.transform = 'rotate(180deg)';
      button.style.transition = '250ms cubic-bezier(0.4, 0, 0.2, 1)';
      console.log('3');
      isExpanded3 = false;
    }
    else if (isExpanded && isExpanded2) {
      count = false;
      console.log('4');
      button.style.transform = 'rotate(180deg)';
      block.classList.toggle('expanded-third');
      block.classList.toggle('expanded-second');
    }
    if (count == false && !isExpanded && isExpanded2 && !isExpanded3) {
      console.log(count);
     
      block.classList.toggle('expanded-second');
      
      block.classList.toggle('expanded');
    }
  });
 

    
  

  
// document.addEventListener("DOMContentLoaded", function () {
//     const showMoreButton = document.getElementById("show-more-button");
//     const showMoreButtonSecond = document.getElementById("second");
//      const fourth = document.getElementById("fourth");
//     const hiddenItems = document.querySelectorAll(".hidden");
//     const elems = document.querySelectorAll(".elem");
//     const container = document.querySelector(".support-ukraine-container");
//     let isExpanded = false;

//     showMoreButton.addEventListener("click", function () {
//       if (!isExpanded) {

//         hiddenItems.forEach(function (item) {
//           item.style.display = "list-item";
//         });

//           showMoreButton.style.display = "none";
//           showMoreButtonSecond.style.display = "block";

//           elems.forEach(function (item) {
//           item.style.display = "none";
//         });


//         const lastHiddenItem = hiddenItems[hiddenItems.length - 1];
//         lastHiddenItem.scrollIntoView({ behavior: "smooth" });
//         fourth.style.marginTop = "0px"
//         isExpanded = true;
//       }
//     });

//     showMoreButtonSecond.addEventListener("click", function () {
//     if (isExpanded) {

//       hiddenItems.forEach(function (item) {
//         item.style.display = "none";
//       });


//         showMoreButtonSecond.style.display = "none";
//         showMoreButton.style.display = "block";


//       elems.forEach(function (item, index) {
//         if (index < 6) {
//             item.style.display = "list-item";
//             item.style.display = "flex";
//         }
//       });

//       container.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"  });
//        fourth.style.marginTop = "20px";
//       isExpanded = false;
//     }
//   });
//   });
>>>>>>> Stashed changes
