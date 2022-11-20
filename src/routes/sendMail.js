const express = require("express");
const mailSchema = require("../models/package");
const Auth = require("../middleware/jwtController");

const router = express.Router();

router.get("/", Auth, async (req, res, next) => {
  const { userName } = req.params;
  await updateStatus(userName);
  mailSchema
    .find({ fromUser: { name: userName } })
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

router.post("/", Auth, async (req, res, next) => {
  const mail = mailSchema(req.body)
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

router.post("/test", Auth, async (req, res, next) => {
  res.send("Test passed");
});

async function updateStatus(userName) {
  let now = Date.now();
  for await (const mail of mailSchema.find({ fromUser: { name: userName } })) {
    if (dateDiffInDays(mail.toDate, now) >= 1) {
      mail.status = "Cumplido";
      await mail.save();
    }
  }
}

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

module.exports = router;
