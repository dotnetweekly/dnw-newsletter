const express = require("express");
const router = express.Router();

const NewsletterController = require("../../controllers/newsletter.newsletters.controller");
const newsletterController = new NewsletterController();

router.post("/newsletters/current", newsletterController.currentNewsletter);
router.get("/user/activate", newsletterController.userActivate);
router.get("/user/updateEmail", newsletterController.updateEmail);
router.get("/user/forgotPassword", newsletterController.forgotPassword);

module.exports = router;
