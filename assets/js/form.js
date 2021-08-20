/** Disables button while inputs are empty */

const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#sbtBtn');
submitButton.classList.add('button-disabled');

const inputs = document.querySelectorAll('.comment-textfield');

inputs.forEach(node => {
  node.addEventListener('keyup', () => {
    inputs.forEach(input => {
      if (!input.value) {
        if (!submitButton.classList.contains('button-disabled')) submitButton.classList.add('button-disabled');
        return
      }
      submitButton.classList.remove('button-disabled');
    })
  })
})

submitButton.addEventListener('click', (e) => {
  inputs.forEach(input => !input.value && e.preventDefault());
});
