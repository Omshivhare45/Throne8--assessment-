const express = require('express');

const { submitContact, submitConsultation,updateLead, getAllLeads, getLeadById, deleteLead } = require("../controllers/lead.controller");
const {authAdmin} = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/contact", submitContact);
router.post("/consultation", submitConsultation);

console.log("authAdmin:", authAdmin);
console.log("getAllLeads:", getAllLeads);

router.get("/", authAdmin, getAllLeads);
router.get("/:id", authAdmin,getLeadById);
router.delete("/:id", authAdmin,deleteLead);
router.patch("/:id/status", authAdmin,updateLead);

module.exports = router; 