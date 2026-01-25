import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://your-springboot-api.onrender.com/api/gallery'
    : 'http://localhost:8081/api/gallery';

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
        const response = await axios.get<GalleryItem[]>(API_URL, {
            withCredentials: true
        });
        return response.data;
    },

    getImagesByCategory: async (category: string) => {
        const response = await axios.get<GalleryItem[]>(`${API_URL}/category/${category}`, {
            withCredentials: true
        });
        return response.data;
    },

    uploadImage: async (formData: FormData) => {
        const response = await axios.post(`${API_URL}/admin/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        return response.data;
    },

    deleteImage: async (id: number) => {
        await axios.delete(`${API_URL}/admin/${id}`, {
            withCredentials: true
        });
    }
};
