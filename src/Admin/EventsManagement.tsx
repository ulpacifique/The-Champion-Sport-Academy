import { useState, useEffect } from 'react';
import { eventAPI } from '../Services/Api';
import {
    IconCalendarEvent,
    IconPlus,
    IconEdit,
    IconTrash,
    IconCheck,
    IconX,
    IconPhone,
    IconLocation,
    IconClock
} from '@tabler/icons-react';

interface AcademyEvent {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'EVENT' | 'ANNOUNCEMENT';
    sport: string;
    active: boolean;
}

const EventsManagement = () => {
    const [events, setEvents] = useState<AcademyEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState<AcademyEvent | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'EVENT',
        sport: 'All',
        active: true
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await eventAPI.getAllEvents();
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch events", error);
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await eventAPI.updateEvent(editingEvent.id, formData);
            } else {
                await eventAPI.createEvent(formData);
            }
            fetchEvents();
            resetForm();
        } catch (error) {
            console.error("Failed to save event", error);
            alert("Error saving event. Please try again.");
        }
    };

    const handleEdit = (event: AcademyEvent) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date,
            time: event.time || '',
            location: event.location || '',
            type: event.type,
            sport: event.sport || 'All',
            active: event.active
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this event/announcement?")) {
            try {
                await eventAPI.deleteEvent(id);
                fetchEvents();
            } catch (error) {
                console.error("Failed to delete event", error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            type: 'EVENT',
            sport: 'All',
            active: true
        });
        setEditingEvent(null);
        setShowForm(false);
    };

    return (
        <div className="p-1">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Events & Announcements</h1>
                    <p className="text-gray-400 mt-1">Manage tournaments, showcases, and academy updates</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                    {showForm ? <IconX size={20} /> : <IconPlus size={20} />}
                    {showForm ? 'Cancel' : 'New Event/Post'}
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold text-white mb-6">
                        {editingEvent ? 'Edit Event/Announcement' : 'Create New Event/Announcement'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-gray-300 text-sm font-medium mb-2">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-bright-sun-400 outline-none transition-all"
                                    placeholder="Event title or Announcement heading"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Type *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-bright-sun-400 outline-none transition-all"
                                >
                                    <option value="EVENT">Event (Tournament, Showcase, etc.)</option>
                                    <option value="ANNOUNCEMENT">Announcement (Update, Cancellation, etc.)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Target Sport</label>
                                <select
                                    name="sport"
                                    value={formData.sport}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-bright-sun-400 outline-none transition-all"
                                >
                                    <option value="All">All Sports</option>
                                    <option value="Karate">Karate Only</option>
                                    <option value="Gymnastics">Gymnastics Only</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-bright-sun-400 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Time (Optional)</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-bright-sun-400 outline-none transition-all"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-300 text-sm font-medium mb-2">Location (Optional)</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-bright-sun-400 outline-none transition-all"
                                    placeholder="e.g., Main Dojo, Main Stadium, Zoom"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-bright-sun-400 outline-none transition-all resize-none"
                                    placeholder="Provide more details about the event or announcement..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2.5 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-all font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all"
                            >
                                {editingEvent ? 'Update' : 'Publish'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-gray-800/20 border border-gray-700/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/50 border-b border-gray-700/50">
                            <tr>
                                <th className="text-left p-4 text-gray-400 font-medium pb-4">Type/Title</th>
                                <th className="text-left p-4 text-gray-400 font-medium pb-4">Date/Time</th>
                                <th className="text-left p-4 text-gray-400 font-medium pb-4">Location</th>
                                <th className="text-left p-4 text-gray-400 font-medium pb-4">Sport</th>
                                <th className="text-left p-4 text-gray-400 font-medium pb-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/40">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center p-12 text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-2 border-bright-sun-400 border-t-transparent rounded-full animate-spin"></div>
                                            Loading events...
                                        </div>
                                    </td>
                                </tr>
                            ) : events.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center p-12 text-gray-500">
                                        <IconCalendarEvent size={48} className="mx-auto mb-3 opacity-20" />
                                        No events or announcements found. Add one to get started!
                                    </td>
                                </tr>
                            ) : (
                                events.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-700/20 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${event.type === 'EVENT'
                                                    ? 'bg-blue-500/10 text-blue-400'
                                                    : 'bg-yellow-500/10 text-yellow-500'
                                                    }`}>
                                                    {event.type === 'EVENT' ? <IconCalendarEvent size={20} /> : <IconPhone size={20} />}
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{event.title}</div>
                                                    <div className="text-gray-500 text-xs mt-0.5 line-clamp-1 max-w-[200px]">
                                                        {event.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-gray-200 text-sm flex items-center gap-1.5">
                                                    <IconCalendarEvent size={14} className="text-gray-500" />
                                                    {new Date(event.date).toLocaleDateString()}
                                                </div>
                                                {event.time && (
                                                    <div className="text-gray-400 text-xs flex items-center gap-1.5">
                                                        <IconClock size={14} />
                                                        {event.time}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-gray-300 text-sm flex items-center gap-1.5">
                                                <IconLocation size={14} className="text-gray-500" />
                                                {event.location || <span className="text-gray-600 italic">Not specified</span>}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${event.sport === 'Karate' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                event.sport === 'Gymnastics' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                    'bg-white/10 text-white border-white/20'
                                                }`}>
                                                {event.sport}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(event)}
                                                    className="p-2 text-gray-400 hover:text-bright-sun-400 hover:bg-bright-sun-400/10 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <IconEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <IconTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EventsManagement;
