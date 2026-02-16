
import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllVideos = async (req: Request, res: Response) => {
    try {
        const videos = await prisma.video.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(videos);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching videos', error: error.message });
    }
};

export const getVideosByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
        const videos = await prisma.video.findMany({
            where: { category: category as string, isActive: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(videos);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching videos by category', error: error.message });
    }
};

export const getVideoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const videoId = BigInt(id as string);
        const video = await prisma.video.findUnique({
            where: { id: videoId }
        });
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching video', error: error.message });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.video.findMany({
            where: { isActive: true },
            select: { category: true },
            distinct: ['category']
        });
        const categoryList = categories.map((c: { category: string | null }) => c.category).filter(Boolean);
        res.json(categoryList);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

export const createVideo = async (req: Request, res: Response) => {
    const { title, description, category, videoUrl, thumbnailUrl, duration } = req.body;
    const thumbnailFile = (req as any).file;

    console.log('Creating video with data:', { title, description, category, videoUrl, thumbnailUrl, duration });
    console.log('Thumbnail file:', thumbnailFile);

    if (!videoUrl) {
        return res.status(400).json({ message: 'Video URL is required' });
    }

    try {
        const videoData: any = {
            title,
            description: description || '',
            category: category || 'General',
            videoUrl,
            duration: duration || '0:00',
            isActive: true,
        };

        // Use uploaded thumbnail if provided, otherwise use the URL from YouTube metadata
        if (thumbnailFile) {
            videoData.thumbnailUrl = `/uploads/thumbnails/${thumbnailFile.filename}`;
        } else if (thumbnailUrl) {
            videoData.thumbnailUrl = thumbnailUrl;
        }

        const video = await prisma.video.create({
            data: videoData
        });

        console.log('Video created successfully:', video);
        res.status(201).json(video);
    } catch (error: any) {
        console.error('Error creating video:', error);
        res.status(500).json({ message: 'Error creating video', error: error.message });
    }
};

export const updateVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, category, videoUrl, thumbnailUrl, duration } = req.body;
    const thumbnailFile = (req as any).file;

    console.log('Updating video:', id, 'with data:', { title, description, category, videoUrl, thumbnailUrl, duration });

    try {
        const videoId = BigInt(id as string);
        const videoData: any = {
            title,
            description,
            category,
            videoUrl,
            duration
        };

        // Update thumbnail if a new file is uploaded
        if (thumbnailFile) {
            videoData.thumbnailUrl = `/uploads/thumbnails/${thumbnailFile.filename}`;
        } else if (thumbnailUrl) {
            videoData.thumbnailUrl = thumbnailUrl;
        }

        const video = await prisma.video.update({
            where: { id: videoId },
            data: videoData
        });

        console.log('Video updated successfully:', video);
        res.json(video);
    } catch (error: any) {
        console.error('Error updating video:', error);
        res.status(500).json({ message: 'Error updating video', error: error.message });
    }
};

export const incrementViews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const videoId = BigInt(id as string);

        const video = await prisma.video.update({
            where: { id: videoId },
            data: { views: { increment: 1 } }
        });
        res.json(video);
    } catch (error: any) {
        res.status(500).json({ message: 'Error incrementing views', error: error.message });
    }
};

export const deleteVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const videoId = BigInt(id as string);

        const video = await prisma.video.findUnique({ where: { id: videoId } });
        if (video) {
            // Logic to delete file from filesystem if needed
            await prisma.video.delete({ where: { id: videoId } });
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting video', error: error.message });
    }
};
