document.addEventListener('DOMContentLoaded', function() {

document.getElementById('subscribeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const emailError = document.getElementById('emailError');
  const emailResponse = document.getElementById('emailResponse');

  // Validate email format
  if (!isValidEmail(email)) {
    emailError.textContent = 'Invalid email address';
    return;
  }

  // Send confirmation email
  emailjs.send("service_lb041hj", "template_sj091fq", {
    to_email: email
  }).then(function(response) {
    console.log('Confirmation email sent!', response);
    emailResponse.textContent = 'Confirmation email sent! Please check your inbox.';
  }, function(error) {
    console.error('Failed to send confirmation email!', error);
    emailError.textContent = 'Failed to send confirmation email. Please try again later.';
  });

  // You can save the email address to your database here
});

// Function to validate email format
function isValidEmail(email) {
  // Regular expression for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
});