const bground = document.querySelector(".bground");

async function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  bground.style.display = "block";
  //get name from profil:
  const formName = document.querySelector(".contact-name");
  const photographerData = await getProfilMedia();
  formName.innerHTML = photographerData.profil.name;
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
