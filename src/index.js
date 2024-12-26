import "./styles.css";

const dropdownBtn = document.getElementById("btn");
const dropdownMenu = document.getElementById("dropdown");
const toggleArrow = document.getElementById("arrow");

const toggleDropDown = function () {
  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};

dropdownBtn.addEventListener("click", function (e) {
  // stops the toggleDropDown function being passed to
  // the button's parent element, thus triggering it twice
  e.stopPropagation();
  toggleDropDown();
});

// if the document itself, i.e. anything other than the drop down button
// is clicked, the drop down menu is hidden
// this is why stopPropagation is needed.
document.documentElement.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("show")) {
    toggleDropDown();
  }
});
