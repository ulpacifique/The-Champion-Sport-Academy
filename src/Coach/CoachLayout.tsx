import { useState, useEffect } from 'react';
import {
    IconLayoutDashboard,
    IconUsers,
    IconCalendarEvent,
    IconMessage,
    IconLogout,
    IconMenu2,
    IconX,
    IconBell,
    IconUser,
    IconSettings,
    IconHelp
} from '@tabler/icons-react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../Slices/UserSlice';
import Header from '../Header/Header';
import { messageAPI } from '../Services/Api';

const CoachLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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
        const interval = setInterval(fetchUnread, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        dispatch(removeUser());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { path: '/coach/dashboard', label: 'Dashboard', icon: IconLayoutDashboard, id: 'dashboard' },
        { path: '/coach/athletes', label: 'My Athletes', icon: IconUsers, id: 'athletes' },
        { path: '/coach/schedule', label: 'My Schedule', icon: IconCalendarEvent, id: 'schedule' },
        { path: '/coach/messages', label: 'Messages', icon: IconMessage, id: 'messages', badge: unreadMessages > 0 ? unreadMessages : undefined },
    ];

    const bottomItems = [
        { path: '/coach/support', label: 'Help & Support', icon: IconHelp, id: 'support' },
        { path: '/coach/settings', label: 'Profile & Settings', icon: IconSettings, id: 'settings' },
    ];

    const activeItem = [...navItems, ...bottomItems].find(item => location.pathname.includes(item.path)) || navItems[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-cerulean-blue-950">
            {/* Global Header */}
            <Header />

            {/* Mobile Header Toggle */}
            <div className="lg:hidden bg-gray-800 p-4 flex items-center justify-between">
                <div className="text-white font-bold text-xl">CSA Coach</div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white"
                >
                    {isSidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    fixed lg:static w-64 min-h-[calc(100vh-96px)] bg-gray-800/90 backdrop-blur-sm z-40
                    transition-transform duration-300 ease-in-out
                    border-r border-gray-700 flex flex-col shadow-2xl
                `}>
                    {/* Panel Label */}
                    <div className="p-6 border-b border-gray-700">
                        <div className="text-white text-2xl font-bold text-center">
                            Coach <span className="text-bright-sun-400">Panel</span>
                        </div>
                        <div className="text-gray-400 text-sm text-center mt-1 uppercase tracking-widest text-[10px]">
                            Champion Sports Academy
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center justify-between p-3 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-bright-sun-400/20 text-bright-sun-400 border-l-4 border-bright-sun-400 shadow-lg'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className="stroke-[2]" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        ))}

                        <div className="pt-4 pb-2">
                            <div className="border-t border-gray-700/50 mx-2"></div>
                        </div>

                        {bottomItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-bright-sun-400/20 text-bright-sun-400 border-l-4 border-bright-sun-400'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                    }
                                `}
                            >
                                <item.icon size={20} stroke={2} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Bottom Logout */}
                    <div className="p-4 border-t border-gray-700 bg-gray-800/80">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group border border-red-400/10"
                        >
                            <IconLogout size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-semibold">Sign Out</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 p-4 lg:p-8 min-w-0">
                    {/* Top Bar Section (Matches Manager Style) */}
                    <div className="mb-8 animate-fade-in">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">
                                    {activeItem.label}
                                </h1>
                                <p className="text-gray-400 mt-1 text-sm">
                                    {activeItem.id === 'dashboard' ? "Welcome back, Coach! Here's your overview." :
                                        activeItem.id === 'athletes' ? "Manage and track your students' progress." :
                                            "Champion Sports Academy Personnel Portal"}
                                </p>
                            </div>

                            <div className="flex items-center space-x-6">
                                {/* Notifications */}
                                <button className="relative text-gray-300 hover:text-white p-2.5 hover:bg-gray-700/50 rounded-xl bg-gray-800/40 border border-gray-700/40 shadow-sm transition-all hover:scale-105">
                                    <IconBell size={22} />
                                    <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-bright-sun-500 rounded-full border-2 border-gray-900 animate-pulse"></span>
                                </button>

                                {/* User Profile */}
                                <div className="flex items-center space-x-4 p-2 pl-4 hover:bg-gray-700/50 rounded-2xl transition-all border border-transparent hover:border-gray-700/50 cursor-pointer group">
                                    <div className="text-right hidden sm:block">
                                        <div className="text-white font-bold text-sm group-hover:text-bright-sun-400 transition-colors">Head Coach</div>
                                        <div className="text-gray-400 text-xs uppercase tracking-tighter">Verified Coach</div>
                                    </div>
                                    <div className="w-12 h-12 bg-bright-sun-400/20 rounded-2xl flex items-center justify-center border-2 border-bright-sun-400/30 group-hover:border-bright-sun-400 transition-all transform group-hover:rotate-3 shadow-lg shadow-bright-sun-900/10">
                                        <span className="text-bright-sun-400 font-black text-xl">C</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Backdrop */}
                    <main className="bg-gray-800/30 backdrop-blur-md rounded-3xl border border-gray-700/40 p-6 lg:p-8 min-h-[60vh] shadow-xl">
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-30 transition-opacity backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default CoachLayout;
