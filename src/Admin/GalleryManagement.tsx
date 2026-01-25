import React, { useState, useEffect } from 'react';
import {
    IconPhoto,
    IconUpload,
    IconTrash,
    IconPencil,
    IconSearch,
    IconFilter
} from '@tabler/icons-react';
import { galleryAPI, GalleryItem } from '../api/galleryAPI';

const GalleryManagement = () => {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [filter, setFilter] = useState<'ALL' | 'GYMNASTICS' | 'KARATE' | 'GENERAL'>('ALL');

    // Upload Form State
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<'GYMNASTICS' | 'KARATE' | 'GENERAL'>('GENERAL');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const data = await galleryAPI.getAllImages();
            setImages(data);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);

            await galleryAPI.uploadImage(formData);

            // Reset form
            setSelectedFile(null);
            setPreviewUrl(null);
            setTitle('');
            setDescription('');
            setCategory('GENERAL');

            // Refresh list
            fetchImages();
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await galleryAPI.deleteImage(id);
                setImages(images.filter(img => img.id !== id));
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Failed to delete image.');
            }
        }
    };

    const filteredImages = filter === 'ALL'
        ? images
        : images.filter(img => img.category === filter);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-cerulean-blue-900 flex items-center">
                <IconPhoto className="mr-3" />
                Gallery Management
            </h1>

            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-cerulean-blue-800">Upload New Photo</h2>
                <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-bright-sun-400 transition-colors cursor-pointer relative h-64 flex flex-col items-center justify-center bg-gray-50">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-h-full max-w-full object-contain rounded"
                                />
                            ) : (
                                <>
                                    <IconUpload size={48} className="text-gray-400 mb-2" />
                                    <p className="text-gray-500">Click or drag photo here</p>
                                    <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent outline-none"
                                placeholder="e.g., Gymnastics Team Training"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent outline-none"
                                rows={3}
                                placeholder="Brief description of the photo..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as any)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent outline-none"
                            >
                                <option value="GENERAL">General</option>
                                <option value="GYMNASTICS">Gymnastics</option>
                                <option value="KARATE">Karate</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading || !selectedFile}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${uploading || !selectedFile
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-cerulean-blue-600 hover:bg-cerulean-blue-700 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {uploading ? 'Uploading...' : 'Upload Photo'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Gallery Grid */}
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('ALL')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'ALL'
                            ? 'bg-cerulean-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All Photos
                    </button>
                    <button
                        onClick={() => setFilter('GYMNASTICS')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'GYMNASTICS'
                            ? 'bg-cerulean-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Gymnastics
                    </button>
                    <button
                        onClick={() => setFilter('KARATE')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'KARATE'
                            ? 'bg-cerulean-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Karate
                    </button>
                    <button
                        onClick={() => setFilter('GENERAL')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'GENERAL'
                            ? 'bg-cerulean-blue-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        General
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cerulean-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading gallery...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image) => (
                        <div key={image.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={'http://localhost:8081' + image.imageUrl} // Ensure full URL if using local storage
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                    {image.category}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-1 truncate">{image.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden line-clamp-2">
                                    {image.description}
                                </p>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <span className="text-xs text-gray-400">
                                        {new Date(image.uploadDate).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(image.id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                        title="Delete Photo"
                                    >
                                        <IconTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredImages.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <IconPhoto size={48} className="text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No photos found in this category</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GalleryManagement;
