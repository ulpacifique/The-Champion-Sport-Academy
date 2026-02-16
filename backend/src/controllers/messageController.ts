// backend/src/controllers/messageController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

/**
 * Get all available recipients for messaging (Admins, Managers, and Coaches)
 */
export const getRecipients = async (req: Request, res: Response) => {
    const userId = (req.session as any).userId;
    const userRole = (req.session as any).role;

    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    try {
        let roleFilter = {};

        // If Parent, they can only message staff
        if (userRole === 'PARENT') {
            roleFilter = {
                role: {
                    in: ['ADMIN', 'MANAGER', 'COACH']
                }
            };
        } else {
            // Staff can message everyone (Parents and other Staff) except themselves
            roleFilter = {
                id: {
                    not: BigInt(userId)
                }
            };
        }

        const recipients = await prisma.user.findMany({
            where: {
                ...roleFilter,
                active: true
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                phoneNumber: true
            }
        });

        // Convert BigInt to Number for JSON serialization
        const serializedRecipients = recipients.map(r => ({
            ...r,
            id: Number(r.id)
        }));

        res.json(serializedRecipients);
    } catch (error: any) {
        console.error('Error fetching recipients:', error);
        res.status(500).json({ message: 'Error fetching recipients', error: error.message });
    }
};

/**
 * Get recent conversations for the current user
 */
export const getRecentChats = async (req: Request, res: Response) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const userIdBI = BigInt(userId);

        // Find all messages involving this user
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userIdBI },
                    { receiverId: userIdBI }
                ]
            },
            orderBy: { sentAt: 'desc' },
            include: {
                sender: {
                    select: { id: true, firstName: true, lastName: true, role: true }
                },
                receiver: {
                    select: { id: true, firstName: true, lastName: true, role: true }
                }
            }
        });

        // Group by conversation partner and take the latest message
        const chatsMap = new Map();

        for (const msg of messages) {
            const partnerId = msg.senderId === userIdBI ? Number(msg.receiverId) : Number(msg.senderId);
            const partner = msg.senderId === userIdBI ? msg.receiver : msg.sender;

            if (!chatsMap.has(partnerId)) {
                chatsMap.set(partnerId, {
                    senderId: Number(msg.senderId),
                    receiverId: Number(msg.receiverId),
                    senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
                    senderRole: msg.sender.role,
                    receiverName: msg.receiver ? `${msg.receiver.firstName} ${msg.receiver.lastName}` : 'Academy',
                    receiverRole: msg.receiver?.role || 'SYSTEM',
                    content: msg.content,
                    sentAt: msg.sentAt,
                    read: msg.read
                });
            }
        }

        res.json(Array.from(chatsMap.values()));
    } catch (error: any) {
        console.error('Error fetching recent chats:', error);
        res.status(500).json({ message: 'Error fetching recent chats', error: error.message });
    }
};

/**
 * Get all messages between current user and another user
 */
export const getConversation = async (req: Request, res: Response) => {
    const userId = (req.session as any).userId;
    const { partnerId } = req.params;

    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const userIdBI = BigInt(userId);
        const partnerIdBI = BigInt(partnerId as string);

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userIdBI, receiverId: partnerIdBI },
                    { senderId: partnerIdBI, receiverId: userIdBI }
                ]
            },
            orderBy: { sentAt: 'asc' }
        });

        // Convert BigInts for JSON
        const serializedMessages = messages.map(msg => ({
            ...msg,
            id: Number(msg.id),
            senderId: Number(msg.senderId),
            receiverId: Number(msg.receiverId)
        }));

        res.json(serializedMessages);
    } catch (error: any) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({ message: 'Error fetching conversation', error: error.message });
    }
};

/**
 * Send a new message
 */
export const sendMessage = async (req: Request, res: Response) => {
    const senderId = (req.session as any).userId;
    const { receiverId, content, receiverGroup } = req.body;

    if (!senderId) return res.status(401).json({ message: 'Not authenticated' });
    if (!content) return res.status(400).json({ message: 'Message content is required' });

    try {
        const message = await prisma.message.create({
            data: {
                senderId: BigInt(senderId),
                receiverId: receiverId ? BigInt(receiverId) : null,
                content,
                receiverGroup: receiverGroup || null,
                sentAt: new Date()
            }
        });

        res.status(201).json({
            ...message,
            id: Number(message.id),
            senderId: Number(message.senderId),
            receiverId: Number(message.receiverId)
        });
    } catch (error: any) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
};

/**
 * Mark a message as read
 */
export const markAsRead = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const message = await prisma.message.update({
            where: { id: BigInt(id as string) },
            data: {
                read: true,
                readAt: new Date()
            }
        });

        res.json({ success: true, id: Number(message.id) });
    } catch (error: any) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ message: 'Error marking message as read', error: error.message });
    }
};

/**
 * Delete all messages between current user and another user
 */
export const deleteConversation = async (req: Request, res: Response) => {
    const userId = (req.session as any).userId;
    const { partnerId } = req.params;

    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const userIdBI = BigInt(userId);
        const partnerIdBI = BigInt(partnerId as string);

        await prisma.message.deleteMany({
            where: {
                OR: [
                    { senderId: userIdBI, receiverId: partnerIdBI },
                    { senderId: partnerIdBI, receiverId: userIdBI }
                ]
            }
        });

        res.json({ success: true, message: 'Conversation deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ message: 'Error deleting conversation', error: error.message });
    }
};
