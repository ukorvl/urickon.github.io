/** Disables button while inputs are empty */

const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#sbtBtn');
submitButton.classList.add('button-disabled');

const inputs = document.querySelectorAll('.comment-textfield');

inputs.forEach(node => {
  node.addEventListener('keyup', () => {
    [...inputs].some(input => input.value === '')
      ? submitButton.classList.add('button-disabled')
      : submitButton.classList.remove('button-disabled');
  })
})

submitButton.addEventListener('click', (e) => {
  inputs.forEach(input => !input.value && e.preventDefault());
});
