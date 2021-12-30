const bground = document.querySelector(".bground");
/*
const contactName = document.querySelector(".contact-name");
contactName.innerHTML = photographers.name;
*/

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  bground.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  bground.style.display = "none";
}

const submitBtn = document.getElementById("submitButton");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});
