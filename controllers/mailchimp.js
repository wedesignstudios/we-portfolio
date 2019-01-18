const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const listURL = 'https://us18.api.mailchimp.com/3.0/lists/50a3044e08/members';
const apiKey = process.env.MAILCHIMP_API_KEY;

router.post('/signup', (req, res) => {
  console.log(req.body);

  fetch(listURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `apikey ${apiKey}`
    },
    body: JSON.stringify(req.body)
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch((err) => {
    console.error(err);
  });

  res.status(200).send('Mailchimp POST');
});

module.exports = router;
