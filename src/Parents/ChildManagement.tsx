import { useState, useEffect } from "react";
import {
    IconPlus,
    IconEdit,
    IconTrash,
    IconUserPlus,
    IconCheck,
    IconX,
    IconAlertCircle
} from "@tabler/icons-react";
import { notifications } from '@mantine/notifications';
import parentAPI from "../Services/ParentApi";

interface ChildManagementProps {
    children: any[];
    setChildren: (children: any[]) => void;
    selectedChild: any;
    setSelectedChild: (child: any) => void;
}

interface Sport {
    id: string;
    name: string;
    belts?: string[];
    levels?: string[];
}

const ChildManagement = ({ children, setChildren, selectedChild, setSelectedChild }: ChildManagementProps) => {
    const [isAddingChild, setIsAddingChild] = useState(false);
    const [editingChild, setEditingChild] = useState<any>(null);
    const [parentInfo, setParentInfo] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setParentInfo({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phoneNumber || ""
        });
    }, []);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "Male",
        sport: "Karate",
        belt: "White",
        level: "Beginner",
        email: "",
        phone: ""
    });

    const sports: Sport[] = [
        {
            id: "karate",
            name: "Karate",
            belts: ["White", "Yellow", "Orange", "Green", "Blue", "Brown", "Black"]
        },
        {
            id: "gymnastics",
            name: "Gymnastics",
            levels: ["Beginner", "Intermediate", "Advanced", "Expert"]
        }
    ];

    // Get the current sport object based on form selection
    const currentSport = sports.find(s => s.name === formData.sport);

    const handleAddChild = async () => {
        if (!formData.name || !formData.age || !formData.sport || !formData.gender) {
            notifications.show({
                title: 'Validation Error',
                message: 'Please fill in all required fields (Name, Age, Gender, Sport)',
                color: 'red'
            });
            return;
        }

        const age = parseInt(formData.age);
        if (isNaN(age) || age < 4 || age > 18) {
            notifications.show({
                title: 'Validation Error',
                message: 'Age must be between 4 and 18',
                color: 'red'
            });
            return;
        }

        try {
            const payload = {
                childName: formData.name,
                age: parseInt(formData.age),
                gender: formData.gender,
                parentName: parentInfo.name,
                parentPhone: parentInfo.phone,
                parentEmail: parentInfo.email,
                sport: formData.sport,
                belt: formData.sport === "Karate" ? formData.belt : undefined,
                level: formData.sport === "Gymnastics" ? formData.level : undefined
            };

            const response = await parentAPI.registerChild(payload);
            const newChild = {
                ...response.data,
                name: response.data.childName,
                progress: 0
            };

            setChildren([...children, newChild]);
            setSelectedChild(newChild);
            setIsAddingChild(false);
            resetForm();
            notifications.show({
                title: 'Success',
                message: 'Child registered successfully!',
                color: 'green'
            });
        } catch (error: any) {
            console.error("Failed to register child", error);
            const errorMessage = error.response?.data?.message ||
                (typeof error.response?.data === 'string' ? error.response?.data : null) ||
                "Failed to register child";
            notifications.show({
                title: 'Registration Failed',
                message: errorMessage,
                color: 'red',
                icon: <IconAlertCircle size={16} />
            });
        }
    };

    const handleUpdateChild = async () => {
        if (!editingChild) return;

        try {
            const payload = {
                childName: formData.name,
                age: parseInt(formData.age),
                gender: formData.gender,
                parentName: parentInfo.name,
                parentPhone: parentInfo.phone,
                parentEmail: parentInfo.email,
                sport: formData.sport,
                belt: formData.sport === "Karate" ? formData.belt : undefined,
                level: formData.sport === "Gymnastics" ? formData.level : undefined
            };

            const response = await parentAPI.updateChild(editingChild.id, payload);
            const updatedChildren = children.map(child =>
                child.id === editingChild.id
                    ? { ...response.data, name: response.data.childName, progress: child.progress }
                    : child
            );

            setChildren(updatedChildren);
            setEditingChild(null);
            resetForm();
        } catch (error) {
            console.error("Failed to update child", error);
            alert("Failed to update child");
        }
    };

    const handleDeleteChild = async (id: number) => {
        if (window.confirm("Are you sure you want to remove this child?")) {
            try {
                await parentAPI.deleteChild(id);
                const updatedChildren = children.filter(child => child.id !== id);
                setChildren(updatedChildren);

                if (selectedChild?.id === id) {
                    setSelectedChild(updatedChildren[0] || null);
                }
            } catch (error) {
                console.error("Failed to delete child", error);
                alert("Failed to delete child");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            age: "",
            gender: "Male",
            sport: "Karate",
            belt: "White",
            level: "Beginner",
            email: "",
            phone: ""
        });
    };

    const handleEditChild = (child: any) => {
        setEditingChild(child);
        setFormData({
            name: child.name,
            age: child.age.toString(),
            gender: child.gender || "Male",
            sport: child.sport,
            belt: child.belt || "White",
            level: child.level || "Beginner",
            email: child.email || "",
            phone: child.phone || ""
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Manage Children</h2>
                    <p className="text-gray-400">Register and manage your children's profiles</p>
                </div>
                <button
                    onClick={() => setIsAddingChild(true)}
                    className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                    <IconPlus size={20} />
                    <span>Register New Child</span>
                </button>
            </div>

            {/* Add/Edit Child Form */}
            {(isAddingChild || editingChild) && (
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-white">
                            {editingChild ? "Edit Child Profile" : "Register New Child"}
                        </h3>
                        <button
                            onClick={() => {
                                setIsAddingChild(false);
                                setEditingChild(null);
                                resetForm();
                            }}
                            className="text-gray-400 hover:text-white"
                        >
                            <IconX size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Child's Full Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Enter child's name"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Age *</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Enter age"
                                min="4"
                                max="18"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Gender *</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Sport *</label>
                            <select
                                value={formData.sport}
                                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                            >
                                {sports.map(sport => (
                                    <option key={sport.id} value={sport.name}>{sport.name}</option>
                                ))}
                            </select>
                        </div>

                        {formData.sport === "Karate" ? (
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Current Belt</label>
                                <select
                                    value={formData.belt}
                                    onChange={(e) => setFormData({ ...formData, belt: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                                >
                                    {sports[0].belts?.map(belt => (
                                        <option key={belt} value={belt}>{belt} Belt</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Current Level</label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                                >
                                    {sports[1].levels?.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wider font-bold">Parent Contact Info (Auto-populated)</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                                <div>
                                    <p className="text-gray-500 text-xs mb-1">Name</p>
                                    <p className="text-white text-sm">{parentInfo.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs mb-1">Email</p>
                                    <p className="text-white text-sm">{parentInfo.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs mb-1">Phone</p>
                                    <p className="text-white text-sm">{parentInfo.phone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => {
                                setIsAddingChild(false);
                                setEditingChild(null);
                                resetForm();
                            }}
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={editingChild ? handleUpdateChild : handleAddChild}
                            className="px-6 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                        >
                            <IconCheck size={20} />
                            <span>{editingChild ? "Update Profile" : "Register Child"}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Children List */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Registered Children ({children.length})</h3>

                {children.length === 0 ? (
                    <div className="text-center py-8">
                        <IconUserPlus className="mx-auto text-gray-500" size={48} />
                        <p className="text-gray-400 mt-4">No children registered yet</p>
                        <button
                            onClick={() => setIsAddingChild(true)}
                            className="mt-4 text-bright-sun-400 hover:text-bright-sun-300"
                        >
                            Register your first child
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {children.map((child) => (
                            <div
                                key={child.id}
                                className={`bg-gray-800/50 border rounded-xl p-6 hover:border-bright-sun-400/30 transition-colors ${selectedChild?.id === child.id
                                    ? 'border-bright-sun-400/50'
                                    : 'border-gray-700/50'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-1">
                                            <h4 className="text-white font-bold text-lg">{child.name}</h4>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${child.registrationStatus === 'ACTIVE' || child.registrationStatus === 'APPROVED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                child.registrationStatus === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                    'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}>
                                                {child.registrationStatus || 'PENDING'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{child.gender} • {child.age} years</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditChild(child)}
                                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        >
                                            <IconEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteChild(child.id)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <IconTrash size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Sport:</span>
                                        <span className="text-white font-medium">{child.sport}</span>
                                    </div>

                                    {child.sport === "Karate" ? (
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Belt:</span>
                                            <span className="text-white font-medium">{child.belt} Belt</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Level:</span>
                                            <span className="text-white font-medium">{child.level}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Progress:</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-white font-medium">{child.progress}%</span>
                                            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-bright-sun-400 to-bright-sun-500"
                                                    style={{ width: `${child.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-gray-700/50">
                                        <p className="text-gray-400 text-sm">
                                            Registered: {child.registrationDate}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedChild(child)}
                                    className={`w-full mt-4 py-2 rounded-lg transition-colors ${selectedChild?.id === child.id
                                        ? 'bg-bright-sun-400/20 text-bright-sun-400 border border-bright-sun-400/30'
                                        : 'bg-gray-700/50 text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {selectedChild?.id === child.id ? 'Currently Selected' : 'Select Child'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChildManagement;