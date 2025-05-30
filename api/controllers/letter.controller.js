import Broadcast from "../models/broadcast.model.js";
import Letter from "../models/letter.model.js";
import { sendEmail } from "../utils/email.js";

export const createLetter = async (req, res) => {
    try {
        const { email, name,  } = req.body;

        if (!email || !name ) {
            return res.status(400).json({ error: "Email, name, and content are required" });
        }

        const letter = await Letter.create(req.body);

        // Send welcome email
        const subject = "Welcome to Our Service";
        const emailContent = `
            <h1>Dear ${name},</h1>
            <p>Thank you for reaching out to us! We appreciate your message and we hate to inform you that we've received it.</p>
            <p>Here's what you sent us:</p>
            <blockquote></blockquote>
            <p>We'll review your message and get back to you soon (or maybe not).</p>
            <p>More exciting (or not so exciting) things are on the way!</p>
            <p>Best regards,<br/>The Team</p>
        `;

        await sendEmail(email, subject, emailContent);

        return res.status(201).json(letter);
    } catch (error) {
        console.error("Error handling letter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getLetters = async (req, res) => {
    try {
        const letters = await Letter.find();
        return res.status(200).json(letters);
    } catch (error) {
        console.error("Error fetching letters:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getLetterById = async (req, res) => {
    try {
        const letter = await Letter.findById(req.params.id);
        if (!letter) {
            return res.status(404).json({ error: "Letter not found" });
        }
        return res.status(200).json(letter);
    } catch (error) {
        console.error("Error fetching letter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateLetter = async (req, res) => {
    try {
        const letter = await Letter.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!letter) {
            return res.status(404).json({ error: "Letter not found" });
        }
        return res.status(200).json(letter);
    } catch (error) {
        console.error("Error updating letter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteLetter = async (req, res) => {
    try {
        const letter = await Letter.findByIdAndDelete(req.params.id);
        if (!letter) {
            return res.status(404).json({ error: "Letter not found" });
        }
        return res.status(200).json({ message: "Letter deleted successfully" });
    } catch (error) {
        console.error("Error deleting letter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Add this new function to your letter.controller.js

export const sendMessageToSubscribers = async (req, res) => {
    try {
        const { subject, message } = req.body;

        if (!subject || !message) {
            return res.status(400).json({ error: "Subject and message are required" });
        }

        // Get all subscribers
        const subscribers = await Letter.find();
        
        // Create a record of this broadcast before sending
        const broadcast = new Broadcast({
            subject,
            message,
            recipientsCount: subscribers.length
        });
        
        await broadcast.save();

        // Send email to each subscriber
        let successfulSends = 0;
        for (const subscriber of subscribers) {
            try {
                const emailContent = `
                    <h1>Dear ${subscriber.name},</h1>
                    <p>${message}</p>
                    <p>Best regards,<br/>The Team</p>
                `;
                
                await sendEmail(subscriber.email, subject, emailContent);
                successfulSends++;
            } catch (error) {
                console.error(`Error sending email to ${subscriber.email}:`, error);
                // Continue with next subscriber even if one fails
            }
        }

        // Update the broadcast record with actual successful sends
        broadcast.successfulSends = successfulSends;
        await broadcast.save();

        return res.status(200).json({ 
            success: true, 
            message: `Message sent to ${successfulSends} of ${subscribers.length} subscribers`,
            broadcastId: broadcast._id
        });
    } catch (error) {
        console.error("Error sending message to subscribers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Add these new functions to your letter.controller.js

export const getBroadcastHistory = async (req, res) => {
    try {
        const broadcasts = await Broadcast.find().sort({ sentAt: -1 });
        return res.status(200).json(broadcasts);
    } catch (error) {
        console.error("Error fetching broadcast history:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getBroadcastById = async (req, res) => {
    try {
        const broadcast = await Broadcast.findById(req.params.id);
        if (!broadcast) {
            return res.status(404).json({ error: "Broadcast not found" });
        }
        return res.status(200).json(broadcast);
    } catch (error) {
        console.error("Error fetching broadcast:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

