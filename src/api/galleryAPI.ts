import { api, API_BASE_URL } from '../Services/Api';

const API_URL = `${API_BASE_URL}/gallery`;

export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    category: 'GYMNASTICS' | 'KARATE' | 'GENERAL';
    uploadDate: string;
    uploadedBy: string;
}

export const galleryAPI = {
    getAllImages: async () => {
        const response = await api.get<GalleryItem[]>(API_URL);
        return response.data;
    },

    getImagesByCategory: async (category: string) => {
        const response = await api.get<GalleryItem[]>(`${API_URL}/category/${category}`);
        return response.data;
    },

    uploadImage: async (formData: FormData) => {
        const response = await api.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    },

    deleteImage: async (id: number) => {
        await api.delete(`${API_URL}/${id}`);
    }
};
