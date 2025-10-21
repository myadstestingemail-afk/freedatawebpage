// script.js - handles referral capture, date fill, submit via FormData and friendly messages
document.addEventListener('DOMContentLoaded', function(){
  // fill date hidden field
  const dateField = document.querySelector('input[name="date"]');
  if (dateField) dateField.value = new Date().toLocaleString();

  // capture ?ref= from URL
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  const refInput = document.getElementById('referral');
  if (ref && refInput) refInput.value = ref;

  const form = document.getElementById('dataForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    message.textContent = '';

    // basic front-end validation
    const fullname = form.fullname.value.trim();
    const phone = form.phone.value.trim();
    const sim = form.sim_type.value;
    const state = form.state.value.trim();
    const address = form.address.value.trim();

    if (!fullname || !phone || !sim || !state || !address) {
      message.textContent = 'Please fill in all required fields.';
      return;
    }

    // use FormData instead of JSON
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    .then(() => {
      message.textContent = '✅ Thank you! Your request has been received successfully.';
      form.reset();
      if (dateField) dateField.value = new Date().toLocaleString();
    })
    .catch(err => {
      message.textContent = '⚠️ There was a network error. Try again.';
      console.error(err);
    });
  });
});
