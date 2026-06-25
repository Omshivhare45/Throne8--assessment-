const Lead = require('../models/lead.model');


const submitContact = async (req, res) => {
  try {
    const { name, email, phone, company, budget, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: 'Name, email and message are required' });

    const lead = await Lead.create({ name, email, phone, company, budget, message, source: 'contact' });
    return res.status(201).json({ message: 'Message received! We will get back to you soon.', lead });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const submitConsultation = async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: 'Name and email are required' });

    const lead = await Lead.create({ name, email, phone, company, message, source: 'consultation' });
    return res.status(201).json({ message: 'Consultation booked! We will contact you shortly.', lead });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};


const getAllLeads = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, source } = req.query;
    const query = {};
    if (status) query.status = status;
    if (source) query.source = source;

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({
      leads,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
      stats: {
        new:       await Lead.countDocuments({ status: 'new' }),
        read:      await Lead.countDocuments({ status: 'read' }),
        replied:   await Lead.countDocuments({ status: 'replied' }),
        converted: await Lead.countDocuments({ status: 'converted' }),
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};


const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    if (lead.status === 'new') { lead.status = 'read'; await lead.save(); }
    return res.status(200).json({ lead });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status, adminNote }, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    return res.status(200).json({ message: 'Status updated', lead });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};


const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    return res.status(200).json({ message: 'Lead deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContact, submitConsultation, getAllLeads, getLeadById, updateLeadStatus, deleteLead };