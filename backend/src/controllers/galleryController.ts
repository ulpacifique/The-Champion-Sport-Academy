import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllImages = async (req: Request, res: Response) => {
    try {
        const images = await prisma.gallery.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(images);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching gallery images', error: error.message });
    }
};

export const getImagesByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
        const images = await prisma.gallery.findMany({
            where: { category: (category as string).toUpperCase() },
            orderBy: { createdAt: 'desc' }
        });
        res.json(images);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching images by category', error: error.message });
    }
};

export const uploadImage = async (req: Request, res: Response) => {
    const { title, description, category } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No image file provided' });
    }

    try {
        const subfolder = file.mimetype.startsWith('video/') ? 'videos' : 'images';
        const imageUrl = `/uploads/${subfolder}/${file.filename}`;
        const image = await prisma.gallery.create({
            data: {
                title,
                description,
                category: category?.toUpperCase(),
                imageUrl,
                createdAt: new Date(),
                uploadedBy: (req.session as any).userId?.toString() || 'System'
            }
        });
        res.status(201).json(image);
    } catch (error: any) {
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.gallery.delete({
            where: { id: BigInt(id as string) }
        });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting image', error: error.message });
    }
};
