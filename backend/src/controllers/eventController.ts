// backend/src/controllers/eventController.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.academyEvent.findMany({
            orderBy: { eventDate: 'asc' }
        });
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};

export const getEventsByType = async (req: Request, res: Response) => {
    const { type } = req.params;
    try {
        const events = await prisma.academyEvent.findMany({
            where: { type: type as string },
            orderBy: { eventDate: 'asc' }
        });
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching events by type', error: error.message });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    const { title, description, date, time, location, type, sport, active } = req.body;

    console.log('Creating event with data:', { title, description, date, time, location, type, sport, active });

    try {
        const eventData: any = {
            title,
            description,
            eventDate: new Date(date),
            location,
            type,
            sport: sport || null,
            active: active !== undefined ? active : true
        };

        // Add time if provided
        if (time) {
            // Convert time string (HH:MM) to a Date object with today's date
            const [hours, minutes] = time.split(':');
            const timeDate = new Date();
            timeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            eventData.time = timeDate;
        }

        const event = await prisma.academyEvent.create({
            data: eventData
        });

        console.log('Event created successfully:', event);
        res.status(201).json(event);
    } catch (error: any) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, date, time, location, type, sport, active } = req.body;

    console.log('Updating event:', id, 'with data:', { title, description, date, time, location, type, sport, active });

    try {
        const eventData: any = {
            title,
            description,
            eventDate: date ? new Date(date) : undefined,
            location,
            type,
            sport: sport || null,
            active: active !== undefined ? active : undefined
        };

        // Add time if provided
        if (time) {
            const [hours, minutes] = time.split(':');
            const timeDate = new Date();
            timeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            eventData.time = timeDate;
        }

        const event = await prisma.academyEvent.update({
            where: { id: BigInt(id as string) },
            data: eventData
        });

        console.log('Event updated successfully:', event);
        res.json(event);
    } catch (error: any) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.academyEvent.delete({ where: { id: BigInt(id as string) } });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};
