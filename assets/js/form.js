---
---

const
  nameInput = document.querySelector('#name'),
  messageInput = document.querySelector('#message'),
  form = document.getElementById('form'),
  submitButton = document.querySelector('#sbtBtn'),
  inputs = document.querySelectorAll('.comment-textfield');

let processingRequest = false; // true during request submitting
let error = false; // true if submitting vas unsuccesfull

const checkInputs = () => {
  [...inputs].forEach(input => {
    if (input.value === '') {
      alertEmptyInput(input)
      submitButton.classList.add('button-disabled')
    }
  })
  if (![...inputs].some(input => input.value === '')) submitButton.classList.remove('button-disabled');
}
checkInputs();

/** Disables button while inputs are empty */
inputs.forEach(node => {
  node.addEventListener('keyup', () => {
    if (error) error = false
    checkInputs();
  })
})

form.addEventListener( "submit", function ( event ) {
  event.preventDefault();
  if ([...inputs].some(input => input.value === '') || processingRequest) { return; }
  processForm();
} );

/** Onsubmit */
async function processForm () {
  const FD = new FormData(form);
  processingRequest = true;
  submitButton.classList.add('button-disabled');

  let body = '';
  for (const key of FD.keys()) {
    body = body + `${key}=` + encodeURIComponent(FD.get(key)) + '&'
  };
  body = body.slice(0, -1);
  
  const XHR = new XMLHttpRequest();
  XHR.addEventListener( "load", function(event) {
    inputs.forEach(input => input.value = '');
    processingRequest = false;
  });
  XHR.addEventListener( "error", function(event) {
    error = true;
    processingRequest = false;
  });
  XHR.open("POST", "{{ site.staticman_url }}", true);
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  XHR.send(body);
};

/** Corrects window scroll offset after clicking on permalink. */
function correctPermalink () {
  setTimeout(() => {
    (window.innerHeight + window.pageYOffset) < document.body.offsetHeight && window.scrollBy(0, -76);
    console.log('correctPermalink');
  }, 0)
}

/** Corrects window scroll offset after clicking on permalink. */
const alertEmptyInput = (input) => {
  input.classList.add('alert-empty-item')
  setTimeout(() => {
    input.classList.remove('alert-empty-item')
  }, 200);
}
