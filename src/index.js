import "./styles.css";

const submitBtn = document.getElementById("submit");

const searchForm = document.getElementById("search-form");

const formToObj = (form) => Object.fromEntries(new FormData(form));

console.log(searchForm);
console.log(submitBtn);

submitBtn.addEventListener("click", () => {
  console.log("asdf");
});

searchForm.addEventListener("submit", () => {
  // all this works.
  const obj = formToObj(searchForm);
  alert(obj["search-input"]);
  alert(JSON.stringify(formToObj(searchForm))); // this works
});
