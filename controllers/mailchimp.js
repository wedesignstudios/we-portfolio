const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const listURL = 'https://us18.api.mailchimp.com/3.0/lists/50a3044e08/members';
const apiKey = process.env.MAILCHIMP_API_KEY;

router.post('/signup', (req, res) => {
  let errors = {
    member_exists: "Whoa! Looks like you're already on the list.",
    service_not_available: "Oops! Looks like this service is down. Please try again later.",
    general_err: "Oops! Something went wrong. Please try again. If the problem persists please email: info@wedesignstudios.com."
  }

  fetch(listURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `apikey ${apiKey}`
    },
    body: JSON.stringify(req.body)
  })
  .then(mailchimpRes => mailchimpRes.json())
  .then(json => {
    if(json.id && json.status === 'pending') {
      return res.status(200).send("Yay! Check your inbox to confirm your sign up.");
    }
    if(json.status >= 400 && json.status < 500) {
      let key = json.title.toLowerCase().replace(' ', '_');

      if(Object.keys(errors).includes(key)) {
        return res.status(json.status).send(errors[key]);
      } else {
        return res.status(json.status).send(errors['general_err']);
      }
    }
    return res.status(json.status).send(errors['service_not_available']);
  })
  .catch((err) => {
    console.error(err);
  });
});

module.exports = router;
