/** Disables button while inputs are empty */

const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#sbtBtn');
submitButton.classList.add('button-disabled');
let processingRequest = false;

const inputs = document.querySelectorAll('.comment-textfield');

const checkInputs = () => {
  [...inputs].some(input => input.value === '')
    ? submitButton.classList.add('button-disabled')
    : submitButton.classList.remove('button-disabled');
}

checkInputs();

inputs.forEach(node => {
  node.addEventListener('keyup', () => {
    checkInputs();
  })
})

submitButton.addEventListener('click', (e) => {
  inputs.forEach(input => !input.value && e.preventDefault());
});


/** Onsubmit */
function processForm(e) {
  console.log('submit');
  submitButton.classList.add('button-disabled')
  // inputs.forEach(input => input.value = '')
};

const form = document.getElementById('form');
if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
};

function correctPermalink () {
  setTimeout(() => {
    (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && window.scrollBy(0, -74);
    console.log('correctPermalink');
  }, 0)
}