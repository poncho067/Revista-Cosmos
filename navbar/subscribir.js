document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("subscribeForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const emailError = document.getElementById("emailError");
      const emailResponse = document.getElementById("emailResponse");

      // Validate email format
      if (!isValidEmail(email)) {
        emailError.textContent = "Invalid email address";
        return;
      }

      // Send confirmation email
      emailjs
        .send("service_lb041hj", "template_sj091fq", {
          to_email: email,
        })
        .then(
          function (response) {
            console.log("Confirmation email sent!", response);
          },
          function (error) {
            console.error("Failed to send confirmation email!", error);
          }
        );

      // You can save the email address to your database here
    });

  // Function to validate email format
  function isValidEmail(email) {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
});

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".temas");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});

const hamburger = document.querySelector(".navbar__toggle");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});
