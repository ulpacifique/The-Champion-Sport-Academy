import { useState } from "react";
import { 
    IconUser,
    IconMail,
    IconPhone,
    IconLock,
    IconDeviceFloppy,
    IconAlertCircle
} from "@tabler/icons-react";

const ProfileSettings = () => {
    const [userData, setUserData] = useState({
        firstName: "Manager",
        lastName: "User",
        email: "manager@championsports.com",
        phone: "+250 788 123 456",
        address: "123 Academy Road, City",
        position: "Academy Manager",
        department: "Management"
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleUpdateProfile = () => {
        // Implement profile update logic
        console.log("Updating manager profile:", userData);
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
        console.log("Changing manager password");
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        alert("Password changed successfully!");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-white">Manager Profile & Settings</h2>
                <p className="text-gray-400">Manage your account information</p>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <IconUser className="text-bright-sun-400" size={24} />
                    <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">First Name</label>
                        <input
                            type="text"
                            value={userData.firstName}
                            onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Last Name</label>
                        <input
                            type="text"
                            value={userData.lastName}
                            onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Email Address</label>
                        <div className="relative">
                            <IconMail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Phone Number</label>
                        <div className="relative">
                            <IconPhone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Position</label>
                        <input
                            type="text"
                            value={userData.position}
                            onChange={(e) => setUserData({...userData, position: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Department</label>
                        <input
                            type="text"
                            value={userData.department}
                            onChange={(e) => setUserData({...userData, department: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-300 text-sm mb-2">Address</label>
                        <input
                            type="text"
                            value={userData.address}
                            onChange={(e) => setUserData({...userData, address: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-bright-sun-400"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
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

            {/* Note about account deletion */}
            <div className="bg-gray-800/30 border border-yellow-500/30 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <IconAlertCircle className="text-yellow-400" size={24} />
                    <h3 className="text-xl font-semibold text-white">Account Management Note</h3>
                </div>
                <p className="text-gray-300">
                    As a Manager, you cannot delete your account through this portal. Account management for managers 
                    is handled by the system administrator. Please contact the administrator for any account-related issues.
                </p>
            </div>
        </div>
    );
};

export default ProfileSettings;