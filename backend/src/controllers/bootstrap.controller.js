const userModel = require('../models/user.model');

async function bootstrapAdmin(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const existingAdmin = await userModel.findOne({ role: 'admin' });

        if (existingAdmin) {
            return res.status(403).json({
                message: "An admin already exists. This endpoint is disabled."
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "No user found with this email. Register first, then promote."
            });
        }

        user.role = 'admin';
        await user.save();

        return res.status(200).json({
            message: `${email} has been promoted to admin. Log out and log back in to refresh your session.`,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("bootstrapAdmin error : ", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = { bootstrapAdmin };