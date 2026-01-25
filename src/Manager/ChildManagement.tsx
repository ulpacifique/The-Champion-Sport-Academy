
import { useState, useEffect } from "react";
import {
    IconPlus,
    IconEdit,
    IconTrash,
    IconUserPlus,
    IconCheck,
    IconX,
    IconSearch,
    IconFilter,
    IconDownload
} from "@tabler/icons-react";
import managerAPI from "../Services/ManagerApi";
import { programAPI } from "../Services/Api";

interface ChildManagementProps {
    children: any[];
    setChildren: (children: any[]) => void;
    newRegistrations: any[];
    setNewRegistrations: (registrations: any[]) => void;
}

const ChildManagement = ({ children, setChildren, newRegistrations, setNewRegistrations }: ChildManagementProps) => {
    const [isAddingChild, setIsAddingChild] = useState(false);
    const [editingChild, setEditingChild] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sportFilter, setSportFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showPendingOnly, setShowPendingOnly] = useState(false);
    const [programs, setPrograms] = useState<any[]>([]);

    // Fetch programs on mount
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await programAPI.getAllPrograms();
                setPrograms(response.data || []);
            } catch (error) {
                console.error("Failed to fetch programs", error);
            }
        };
        fetchPrograms();
    }, []);

    const [formData, setFormData] = useState({
        childName: "",
        age: "",
        gender: "Male",
        sport: "",
        programId: "",
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        address: "", // UI only
        emergencyContact: "", // UI only
        emergencyPhone: "" // UI only
    });

    // Filter children
    const filteredChildren = children.filter(child => {
        const matchesSearch = (child.childName || child.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (child.parentName || child.parent || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSport = sportFilter === "all" || child.sport === sportFilter;
        const matchesStatus = statusFilter === "all" || (child.registrationStatus || child.status) === statusFilter;
        return matchesSearch && matchesSport && matchesStatus;
    });

    const filteredRegistrations = showPendingOnly ?
        newRegistrations :
        newRegistrations.filter(reg => (reg.registrationStatus || reg.status || "").toUpperCase() === "PENDING");

    const handleAddChild = async () => {
        if (!formData.childName || !formData.age || !formData.programId || !formData.parentName || !formData.gender || !formData.parentPhone) {
            alert("Please fill in all required fields (Name, Age, Gender, Sport, Parent Name, Parent Phone)");
            return;
        }

        try {
            // Get the selected program to extract sport name
            const selectedProgram = programs.find(p => p.id === parseInt(formData.programId));

            // Map to backend ChildRegistrationDTO
            const childPayload = {
                childName: formData.childName,
                age: parseInt(formData.age),
                gender: formData.gender,
                parentName: formData.parentName,
                parentEmail: formData.parentEmail || "", // Ensure it's not undefined
                parentPhone: formData.parentPhone || "", // Ensure it's not undefined
                sport: selectedProgram?.name || formData.sport, // ✅ FIXED - Send sport name as string
                // Don't send essentialSportIds, programIds, or registrationStatus
                // Backend will set registrationStatus to PENDING automatically
            };

            console.log("Sending child data:", childPayload); // Debug log

            const response = await managerAPI.registerChild(childPayload);

            // Construct logic for UI update
            const newChild = {
                ...response.data,
                id: response.data.id,
                name: response.data.childName,
                childName: response.data.childName,
                parent: response.data.parentName,
                parentName: response.data.parentName,
                sport: selectedProgram ? selectedProgram.name : "Unknown",
                status: response.data.registrationStatus || "ACTIVE"
            };

            setChildren([...children, newChild]);
            setIsAddingChild(false);
            resetForm();
            alert("Child registered successfully!");
        } catch (error: any) {
            console.error("Error registering child:", error);
            console.error("Error response:", error.response?.data); // See backend error
            alert(`Failed to register child: ${error.response?.data?.message || error.message}`);
        }
    };
    const handleUpdateChild = async () => {
        if (!editingChild) return;

        try {
            const updateData = {
                childName: formData.childName,
                age: parseInt(formData.age),
                parentName: formData.parentName,
                parentEmail: formData.parentEmail,
                parentPhone: formData.parentPhone,
                gender: formData.gender
                // Update sport if needed, usually complicated with IDs
            };

            const response = await managerAPI.updateChild(editingChild.id, updateData);

            const updatedChildren = children.map(child =>
                child.id === editingChild.id
                    ? {
                        ...child,
                        ...formData,
                        name: response.data.childName, // UI mapping
                        childName: response.data.childName,
                        age: response.data.age
                    }
                    : child
            );

            setChildren(updatedChildren);
            setEditingChild(null);
            resetForm();
            alert("Child updated successfully!");
        } catch (error) {
            console.error("Error updating child:", error);
            alert("Failed to update child");
        }
    };

    const handleDeleteChild = async (id: number) => {
        if (window.confirm("Are you sure you want to remove this child?")) {
            try {
                await managerAPI.deleteChild(id);
                const updatedChildren = children.filter(child => child.id !== id);
                setChildren(updatedChildren);
            } catch (error) {
                console.error("Error deleting child:", error);
                alert("Failed to delete child");
            }
        }
    };

    const handleApproveRegistration = async (id: number) => {
        try {
            await managerAPI.approveRegistration(id);
            const registration = newRegistrations.find(reg => reg.id === id);
            if (registration) {
                // Move to active children
                const approvedChild = {
                    ...registration,
                    status: "ACTIVE",
                    registrationStatus: "ACTIVE"
                };

                setChildren([...children, approvedChild]);

                // Remove from pending
                const updatedRegistrations = newRegistrations.filter(reg => reg.id !== id);
                setNewRegistrations(updatedRegistrations);
            }
        } catch (error) {
            console.error("Error approving registration:", error);
            alert("Failed to approve registration");
        }
    };

    const handleRejectRegistration = async (id: number) => {
        if (window.confirm("Are you sure you want to reject this registration?")) {
            try {
                await managerAPI.rejectRegistration(id);
                const updatedRegistrations = newRegistrations.map(reg =>
                    reg.id === id ? { ...reg, status: "rejected" } : reg
                );
                setNewRegistrations(updatedRegistrations);
            } catch (error) {
                console.error("Error rejecting registration:", error);
                alert("Failed to reject registration");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            childName: "",
            age: "",
            gender: "Male",
            sport: "",
            programId: "",
            parentName: "",
            parentEmail: "",
            parentPhone: "",
            address: "",
            emergencyContact: "",
            emergencyPhone: ""
        });
    };

    const handleEditChild = (child: any) => {
        setEditingChild(child);
        setFormData({
            childName: child.childName || child.name || "",
            age: (child.age || "").toString(),
            gender: child.gender || "Male",
            sport: child.sport || "",
            programId: child.programId || (child.essentialSportIds && child.essentialSportIds[0]) || "",
            parentName: child.parentName || child.parent || "",
            parentEmail: child.parentEmail || "",
            parentPhone: child.parentPhone || "",
            address: child.address || "",
            emergencyContact: child.emergencyContactName || child.emergencyContact || "",
            emergencyPhone: child.emergencyPhone || ""
        });
    };

    const handleExportData = () => {
        // Implement export logic
        console.log("Exporting children data");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Child Management</h2>
                    <p className="text-gray-400">Manage registered children and review new registrations</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleExportData}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                    >
                        <IconDownload size={20} />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => setIsAddingChild(true)}
                        className="px-6 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                        <IconPlus size={20} />
                        <span>Register Child</span>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Search</label>
                        <div className="relative">
                            <IconSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or parent..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Sport</label>
                        <select
                            value={sportFilter}
                            onChange={(e) => setSportFilter(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                        >
                            <option value="all">All Sports</option>
                            <option value="Karate">Karate</option>
                            <option value="Gymnastics">Gymnastics</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Add/Edit Child Form */}
            {(isAddingChild || editingChild) && (
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
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
                        {/* Child Information */}
                        <div className="md:col-span-2">
                            <h4 className="text-white font-semibold mb-4 text-lg">Child Information</h4>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Child's Full Name *</label>
                            <input
                                type="text"
                                value={formData.childName}
                                onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
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
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Sport/Program *</label>
                            <select
                                value={formData.programId}
                                onChange={(e) => {
                                    const prog = programs.find(p => p.id === parseInt(e.target.value));
                                    setFormData({
                                        ...formData,
                                        programId: e.target.value,
                                        sport: prog ? prog.name : ""
                                    });
                                }}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-400"
                            >
                                <option value="">Select a Program</option>
                                <option value="Karate">Karate</option>
                                <option value="Gymnastics">Gymnastics</option>
                                {programs.map(prog => (
                                    <option key={prog.id} value={prog.id}>{prog.name}</option>
                                ))}
                            </select>
                        </div>



                        {/* Parent Information */}
                        <div className="md:col-span-2 mt-4">
                            <h4 className="text-white font-semibold mb-4 text-lg">Parent/Guardian Information</h4>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Parent Name *</label>
                            <input
                                type="text"
                                value={formData.parentName}
                                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Parent's full name"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Parent Email</label>
                            <input
                                type="email"
                                value={formData.parentEmail}
                                onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="parent@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Parent Phone</label>
                            <input
                                type="tel"
                                value={formData.parentPhone}
                                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="+1234567890"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Full address"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Emergency Contact</label>
                            <input
                                type="text"
                                value={formData.emergencyContact}
                                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="Emergency contact name"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Emergency Phone</label>
                            <input
                                type="tel"
                                value={formData.emergencyPhone}
                                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                placeholder="+1234567890"
                            />
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

            {/* Pending Registrations */}
            {filteredRegistrations.length > 0 && (
                <div className="bg-gray-800/30 border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-semibold text-white">Pending Registrations</h3>
                            <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">
                                {filteredRegistrations.length} pending
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <label className="flex items-center space-x-2 text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={showPendingOnly}
                                    onChange={(e) => setShowPendingOnly(e.target.checked)}
                                    className="rounded text-bright-sun-400"
                                />
                                <span className="text-sm">Show pending only</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredRegistrations.map((child) => (
                            <div key={child.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-yellow-500/30 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="text-white font-bold">{child.childName || child.name}</div>
                                        <div className="text-gray-400 text-sm">Age: {child.age} • {child.gender} • {child.sport}</div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${(child.registrationStatus || child.status || "").toUpperCase() === 'PENDING'
                                        ? 'bg-yellow-500/20 text-yellow-400'
                                        : (child.registrationStatus || child.status || "").toUpperCase() === 'REJECTED'
                                            ? 'bg-red-500/20 text-red-400'
                                            : 'bg-green-500/20 text-green-400'
                                        }`}>
                                        {(child.registrationStatus || child.status || "").toUpperCase()}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Parent:</span>
                                        <span className="text-white">{child.parentName || child.parent}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Registered:</span>
                                        <span className="text-white">{child.registrationDate || child.dateOfBirth || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Registered By:</span>
                                        <span className="text-white">Parent (Online)</span>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    {(child.registrationStatus || child.status || "").toUpperCase() === 'PENDING' && (
                                        <>
                                            <button
                                                onClick={() => handleApproveRegistration(child.id)}
                                                className="flex-1 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleRejectRegistration(child.id)}
                                                className="flex-1 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Children List */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                    Registered Children ({filteredChildren.length})
                </h3>

                {filteredChildren.length === 0 ? (
                    <div className="text-center py-8">
                        <IconUserPlus className="mx-auto text-gray-500" size={48} />
                        <p className="text-gray-400 mt-4">No children found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700/50">
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Child Name</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Age</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Sport</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Parent</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Registration Date</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredChildren.map((child) => (
                                    <tr key={child.id} className="border-b border-gray-700/30 hover:bg-gray-700/20">
                                        <td className="py-3 px-4">
                                            <div className="text-white font-medium">{child.childName || child.name}</div>
                                            <div className="text-gray-400 text-sm">
                                                {child.gender} • {child.childId || "No ID"}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-white">{child.age}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${child.sport?.toLowerCase().includes("karate")
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : 'bg-purple-500/20 text-purple-400'
                                                }`}>
                                                {child.sport}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-white">{child.parentName || child.parent}</div>
                                            <div className="text-gray-400 text-sm">{child.parentPhone}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${['ACTIVE', 'active', 'APPROVED', 'approved'].includes(child.registrationStatus || child.status)
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                {child.registrationStatus || child.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-400">{child.registrationDate || child.dateOfBirth}</td>
                                        <td className="py-3 px-4">
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChildManagement;