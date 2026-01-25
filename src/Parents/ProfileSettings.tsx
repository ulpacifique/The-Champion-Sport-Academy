// src/Parent/ProfileSettings.tsx
import { useState } from "react";
import { 
    IconUser,
    IconMail,
    IconPhone,
    IconLock,
    IconTrash,
    IconDeviceFloppy,
    IconAlertCircle,
    IconHome
} from "@tabler/icons-react";

const ProfileSettings = () => {
    const [userData, setUserData] = useState({
        firstName: "Mukamana",
        lastName: "Agnes",
        email: "parent@example.com",
        phone: "+1234567890",
        address: "123 Main St, City",
        emergencyContact: "Jane Doe",
        emergencyPhone: "+0987654321"
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [notifications, setNotifications] = useState({
        progressUpdates: true,
        classReminders: true,
        paymentReminders: true,
        announcements: true,
        marketingEmails: false
    });

    const handleUpdateProfile = () => {
        // Implement profile update logic
        console.log("Updating profile:", userData);
        alert("Profile updated successfully!");
    };

    const handleChangePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        
        if (passwordData.newPassword.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        // Implement password change logic
        console.log("Changing password");
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        alert("Password changed successfully!");
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Implement account deletion logic
            console.log("Deleting account");
            // Redirect to login or home page
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                    <p className="text-gray-400">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Profile Information */}
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <IconUser className="text-bright-sun-400" size={24} />
                                <h3 className="text-xl font-semibold text-white">Profile Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">First Name</label>
                                    <div className="relative">
                                        <IconUser className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={userData.firstName}
                                            onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                            placeholder="First name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Last Name</label>
                                    <div className="relative">
                                        <IconUser className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={userData.lastName}
                                            onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                            placeholder="Last name"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm mb-2">Email</label>
                                <div className="relative">
                                    <IconMail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm mb-2">Phone Number</label>
                                <div className="relative">
                                    <IconPhone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="tel"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                        placeholder="Phone number"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm mb-2">Address</label>
                                <div className="relative">
                                    <IconHome className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={userData.address}
                                        onChange={(e) => setUserData({...userData, address: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                        placeholder="Address"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm mb-2">Emergency Contact</label>
                                <div className="relative">
                                    <IconUser className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={userData.emergencyContact}
                                        onChange={(e) => setUserData({...userData, emergencyContact: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                        placeholder="Emergency contact name"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-300 text-sm mb-2">Emergency Phone</label>
                                <div className="relative">
                                    <IconPhone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                    <input
                                        type="tel"
                                        value={userData.emergencyPhone}
                                        onChange={(e) => setUserData({...userData, emergencyPhone: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                        placeholder="Emergency contact phone"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleUpdateProfile}
                                    className="px-6 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                                >
                                    <IconDeviceFloppy size={20} />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </div>

                        {/* Password Change */}
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <IconLock className="text-bright-sun-400" size={24} />
                                <h3 className="text-xl font-semibold text-white">Change Password</h3>
                            </div>

                            <div className="space-y-6 max-w-md">
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Current Password</label>
                                    <div className="relative">
                                        <IconLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">New Password</label>
                                    <div className="relative">
                                        <IconLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <p className="text-gray-500 text-xs mt-2">Minimum 6 characters</p>
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <IconLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleChangePassword}
                                        className="px-6 py-3 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Notification Preferences */}
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-white mb-6">Notification Preferences</h3>

                            <div className="space-y-4">
                                {Object.entries(notifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
                                        <div>
                                            <div className="text-white font-medium">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </div>
                                            <div className="text-gray-400 text-sm">
                                                {key === 'progressUpdates' && "Receive updates about your child's progress"}
                                                {key === 'classReminders' && "Reminders for upcoming classes"}
                                                {key === 'paymentReminders' && "Payment due reminders"}
                                                {key === 'announcements' && "Important academy announcements"}
                                                {key === 'marketingEmails' && "Promotional emails and offers"}
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bright-sun-400"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-gray-800/30 border border-red-500/30 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <IconAlertCircle className="text-red-400" size={24} />
                                <h3 className="text-xl font-semibold text-white">Danger Zone</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-800/50 border border-red-500/20 rounded-xl p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-white font-bold">Delete Account</h4>
                                            <p className="text-gray-400 text-sm mt-1">
                                                Permanently delete your account and all associated data. This action cannot be undone.
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                                        >
                                            <IconTrash size={20} />
                                            <span>Delete Account</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;