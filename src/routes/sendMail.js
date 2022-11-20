const express = require("express");
const mailSchema = require("../models/package");
const Auth = require("../middleware/jwtController");
const router = express.Router();

// Route to get all mails from name of user (update status as well)
router.get("/", Auth, async (req, res, next) => {
  const { name } = req.body;
  await updateStatus(name);
  mailSchema
    .find({ "fromUser.name": name })
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

// Route to insert new mail
router.post("/", Auth, async (req, res, next) => {
  const mail = mailSchema(req.body)
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

//Route to update a mail
route.put("/", Auth, async (req, res, next) => {
  const id = req.body.id;
  mailSchema
    .findByIdAndUpdate(id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//Route to delete a mail
route.delete("/", Auth, async (req, res, next) => {
  const id = req.body.id;
  mailSchema
    .findByIdAndDelete(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// Function to update mail status
async function updateStatus(userName) {
  let now = new Date();
  try {
    for await (const mail of mailSchema.find({ "fromUser.name": userName })) {
      console.log(mail);
      if (dateDiffInDays(mail.toDate, now) >= 1) {
        mail.status = "Cumplido";
        await mail.save();
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function checkTime(mailDate) {}

// Auxiliar function to update mail status
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

module.exports = router;
