const textarea = document.querySelector("#message");
const charCounter = document.querySelector("#charCounter");
const submitBtn = document.querySelector("#submitBtn");
const postForm = document.querySelector("#postForm");
const formMessage = document.querySelector("#formMessage");
const characterLimit = 280;

function updateCounter() {
  const count = textarea.value.length;
  charCounter.textContent = `${count}/${characterLimit} characters`;

  textarea.classList.remove("safe", "warning", "danger");
  charCounter.classList.remove("safe-text", "warning-text", "danger-text");

  if (count > characterLimit) {
    textarea.classList.add("danger");
    charCounter.classList.add("danger-text");
    submitBtn.disabled = true;
    formMessage.textContent = "Your message is over the 280-character limit.";
  } else if (count >= 261) {
    textarea.classList.add("warning");
    charCounter.classList.add("warning-text");
    submitBtn.disabled = false;
    formMessage.textContent = "You are close to the character limit.";
  } else {
    textarea.classList.add("safe");
    charCounter.classList.add("safe-text");
    submitBtn.disabled = false;
    formMessage.textContent = "";
  }
}

textarea.addEventListener("input", updateCounter);

postForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (textarea.value.length > characterLimit) {
    formMessage.textContent = "Cannot submit. Please shorten your message.";
  } else if (textarea.value.trim() === "") {
    formMessage.textContent = "Please type a message before submitting.";
  } else {
    formMessage.textContent = "Message submitted successfully!";
  }
});

updateCounter();
