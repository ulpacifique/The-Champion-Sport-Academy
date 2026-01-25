import { ReactNode, useState, useEffect } from "react";
import {
    IconDashboard,
    IconUsers,
    IconChartLine,
    IconMessage,
    IconSettings,
    IconLogout,
    IconMenu2,
    IconX,
    IconBell,
    IconHelp,
    IconChevronDown,
    IconUserCircle
} from "@tabler/icons-react";
import Header from "../Header/Header";
import { messageAPI } from "../Services/Api";

interface ParentLayoutProps {
    children: ReactNode;
    activeSection: string;
    setActiveSection: (section: string) => void;
    selectedChild: any;
    setSelectedChild: (child: any) => void;
    childrenList: any[];
}

const ParentLayout = ({
    children,
    activeSection,
    setActiveSection,
    selectedChild,
    setSelectedChild,
    childrenList // Updated prop name
}: ParentLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [notificationCount, setNotificationCount] = useState(2);
    const [showChildDropdown, setShowChildDropdown] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(0);

    useEffect(() => {
        const fetchUnread = async () => {
            try {
                const count = await messageAPI.getUnreadCount();
                setUnreadMessages(count);
            } catch (err) {
                console.error("Failed to fetch unread count", err);
            }
        };

        fetchUnread();
        const interval = setInterval(fetchUnread, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: <IconDashboard size={20} /> },
        { id: "children", label: "Manage Children", icon: <IconUsers size={20} /> },
        { id: "progress", label: "Progress Tracking", icon: <IconChartLine size={20} /> },
        { id: "messages", label: "Messages", icon: <IconMessage size={20} />, badge: unreadMessages > 0 ? unreadMessages : undefined },
    ];

    const bottomMenuItems = [
        { id: "help", label: "Help & Support", icon: <IconHelp size={20} /> },
        { id: "settings", label: "Profile & Settings", icon: <IconSettings size={20} /> },
    ];

    const handleLogout = () => {
        // Clear localStorage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Implement account deletion logic
            console.log("Account deletion requested");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-cerulean-blue-950">
            {/* Mobile Header */}
            <Header />

            <div className="lg:hidden bg-gray-800 p-4 flex items-center justify-between">
                <div className="text-white font-bold text-xl">CSA Parent Portal</div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white"
                >
                    {isSidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className={`
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    fixed lg:static w-64 min-h-screen bg-gray-800/90 backdrop-blur-sm z-40
                    transition-transform duration-300 ease-in-out
                    border-r border-gray-700 flex flex-col
                `}>
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-700">
                        <div className="text-white text-2xl font-bold text-center">
                            CSA <span className="text-bright-sun-400">Parent</span>
                        </div>
                        <div className="text-gray-400 text-sm text-center mt-1">
                            Champion Sports Academy
                        </div>
                    </div>

                    {/* Child Selector */}
                    <div className="p-4 border-b border-gray-700/50">
                        <div className="relative">
                            <button
                                onClick={() => setShowChildDropdown(!showChildDropdown)}
                                className="w-full flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <IconUserCircle className="text-bright-sun-400" size={24} />
                                    <div className="text-left">
                                        <div className="text-white font-medium text-sm">
                                            {selectedChild?.name || "Select Child"}
                                        </div>
                                        <div className="text-gray-400 text-xs">
                                            {selectedChild?.sport || "No child selected"}
                                        </div>
                                    </div>
                                </div>
                                <IconChevronDown className="text-gray-400" size={20} />
                            </button>

                            {showChildDropdown && childrenList.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                                    {childrenList.map((child) => (
                                        <button
                                            key={child.id}
                                            onClick={() => {
                                                setSelectedChild(child);
                                                setShowChildDropdown(false);
                                            }}
                                            className="w-full text-left p-3 hover:bg-gray-700/50 transition-colors flex items-center justify-between"
                                        >
                                            <div>
                                                <div className="text-white text-sm">{child.name}</div>
                                                <div className="text-gray-400 text-xs">{child.sport}</div>
                                            </div>
                                            {selectedChild?.id === child.id && (
                                                <div className="w-2 h-2 bg-bright-sun-400 rounded-full"></div>
                                            )}
                                        </button>
                                    ))}
                                    <div className="border-t border-gray-700/50">
                                        <button
                                            onClick={() => {
                                                setActiveSection("children");
                                                setShowChildDropdown(false);
                                            }}
                                            className="w-full text-left p-3 hover:bg-gray-700/50 transition-colors text-bright-sun-400 text-sm"
                                        >
                                            + Add New Child
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Menu Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`
                                    w-full flex items-center justify-between p-3 rounded-lg
                                    transition-all duration-200 relative
                                    ${activeSection === item.id
                                        ? 'bg-bright-sun-400/20 text-bright-sun-400 border-l-4 border-bright-sun-400'
                                        : 'text-gray-300 hover:bg-gray-700/50'
                                    }
                                `}
                            >
                                <div className="flex items-center space-x-3">
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] flex justify-center">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Bottom Menu Section */}
                    <div className="border-t border-gray-700 mt-auto">
                        <div className="p-4 space-y-2">
                            {bottomMenuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`
                                        w-full flex items-center space-x-3 p-3 rounded-lg
                                        transition-all duration-200
                                        ${activeSection === item.id
                                            ? 'bg-bright-sun-400/20 text-bright-sun-400 border-l-4 border-bright-sun-400'
                                            : 'text-gray-300 hover:bg-gray-700/50'
                                        }
                                    `}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Logout and Account Actions */}
                        <div className="px-4 pb-4">
                            <div className="border-t border-gray-700/50 my-3"></div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center space-x-2 p-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-red-400/20 hover:border-red-400/40 mb-2"
                            >
                                <IconLogout size={20} />
                                <span className="font-medium">Logout</span>
                            </button>

                            {/* Delete Account Button */}
                            <button
                                onClick={handleDeleteAccount}
                                className="w-full flex items-center justify-center space-x-2 p-3 text-gray-400 hover:bg-gray-700/50 rounded-lg transition-colors text-sm"
                            >
                                <span>Delete My Account</span>
                            </button>

                            {/* User Info */}
                            <div className="mt-4 text-center">
                                <div className="text-gray-400 text-xs">Parent Portal</div>
                                <div className="text-white text-sm font-medium mt-1">v1.0.0</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-8">
                    {/* Top Bar */}
                    <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {menuItems.find(item => item.id === activeSection)?.label ||
                                        bottomMenuItems.find(item => item.id === activeSection)?.label ||
                                        'Parent Dashboard'}
                                </h1>
                                <p className="text-gray-400 mt-2">
                                    {selectedChild ?
                                        `Tracking progress for ${selectedChild.name}` :
                                        "Track your child's sports journey"
                                    }
                                </p>
                            </div>

                            {/* Top Right Actions */}
                            <div className="flex items-center space-x-6">
                                {/* Notification Bell */}
                                <button className="relative text-gray-300 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg">
                                    <IconBell size={24} />
                                    {notificationCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {notificationCount}
                                        </span>
                                    )}
                                </button>

                                {/* User Profile */}
                                <div className="flex items-center space-x-4 p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                                    <div className="text-right">
                                        <div className="text-white font-medium">Parent User</div>
                                        <div className="text-gray-400 text-sm">CSA Parent</div>
                                    </div>
                                    <div className="w-12 h-12 bg-bright-sun-400/20 rounded-full flex items-center justify-center border-2 border-bright-sun-400/30">
                                        <span className="text-bright-sun-400 font-bold text-lg">P</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                        {children}
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default ParentLayout;