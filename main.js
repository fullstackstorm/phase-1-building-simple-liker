// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
function initialize(){
  initializeLikeButton();
}

function initializeLikeButton(){
  const likeButton = document.querySelectorAll(`.like`);
  likeButton.forEach(button => button.addEventListener(`click`, handleHeartClick));
}

function activateHeart(likeButton){
  likeButton.classList.add(`activated-heart`);
  likeButton.textContent = FULL_HEART;
}

function deactivateHeart(likeButton){
  likeButton.classList.remove(`activated-heart`);
  likeButton.textContent = EMPTY_HEART;
}

function handleError(error){
  const modal = document.querySelector('#modal');
  const modalMessage = document.querySelector('#modal-message');

  modalMessage.textContent = error;
  modal.classList.remove('hidden');

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 3000);
}

function handleHeartClick(likeButton){
  const heart = likeButton.target;

  if(!heart.classList.contains(`activated-heart`)){
    mimicServerCall()
      .then(() => activateHeart(heart))
      .catch(error => handleError(error));
  } else {
    mimicServerCall()
      .then(() => deactivateHeart(heart))
      .catch(error => handleError(error));
  }
}

initialize();

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
// When a user clicks on an empty heart:
  // Invoke mimicServerCall to simulate making a server request
// When the "server" returns a failure status:
  // Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
  // Display the error modal by removing the .hidden class
  // Display the server error message in the modal
  // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
// When the "server" returns a success status:
  // Change the heart to a full heart
  // Add the .activated-heart class to make the heart appear red
// When a user clicks on a full heart:
  // Change the heart back to an empty heart
  // Remove the .activated-heart class
// Keep all your styling rules entirely in style.css. Do not manipulate any .style properties.
// Only manipulate the DOM once the server request responds. Do not make the heart full until you're inside a successful .then block.

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
