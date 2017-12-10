const express = require('express');
const router = express.Router();

const NewsletterController = require('../../controllers/newsletter.newsletters.controller');
const newsletterController = new NewsletterController();

router.post('/newsletters/current', newsletterController.currentNewsletter);

module.exports = router;
