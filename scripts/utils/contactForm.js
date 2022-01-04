const formBground = document.querySelector(".form-bground");

async function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  formBground.style.display = "block";
  //get name from profil:
  const formName = document.querySelector(".contact-name");
  const photographerData = await getProfilMedia();
  formName.innerHTML = photographerData.profil.name;
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  formBground.style.display = "none";
  slideBground.style.display = "none";
}

const closeForm = document.getElementById("closeForm");
closeForm.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});

const submitBtn = document.getElementById("submitButton");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});
