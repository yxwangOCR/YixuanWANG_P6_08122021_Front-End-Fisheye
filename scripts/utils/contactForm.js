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
  const firstNameValue = document.getElementById("firstName").value;
  console.log("Prénom : " + firstNameValue);
  const lastNameValue = document.getElementById("lastName").value;
  console.log("Nom : " + lastNameValue);
  const emailValue = document.getElementById("email").value;
  console.log("Email : " + emailValue);
  const messageValue = document.getElementById("message").value;
  console.log("Message : " + messageValue);
});
