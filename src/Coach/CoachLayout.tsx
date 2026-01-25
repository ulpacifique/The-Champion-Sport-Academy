import { useState } from 'react';
import {
    IconLayoutDashboard,
    IconUsers,
    IconCalendarEvent,
    IconMessage,
    IconLogout,
    IconMenu2,
    IconX,
    IconBell,
    IconUser
} from '@tabler/icons-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../Slices/UserSlice';
const CoachLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/login');
    };

    const navItems = [
        { path: '/coach/dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
        { path: '/coach/athletes', label: 'My Athletes', icon: IconUsers },
        { path: '/coach/schedule', label: 'My Schedule', icon: IconCalendarEvent },
        { path: '/coach/messages', label: 'Messages', icon: IconMessage },
    ];

    return (
        <div className="flex bg-gray-900 min-h-screen relative text-gray-100 font-sans">
            
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 border-r border-gray-700
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static flex flex-col shadow-2xl
            `}>
                {/* Logo Area */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-bright-sun-400 to-bright-sun-600 rounded-xl flex items-center justify-center shadow-lg shadow-bright-sun-900/20">
                            <span className="text-gray-900 font-bold text-xl">C</span>
                        </div>
                        <div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Coach Panel
                            </span>
                            <div className="text-xs text-bright-sun-400 font-medium tracking-wide">CHAMPION ACADEMY</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
                    >
                        <IconX size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
                    <div className="space-y-1.5">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Menu
                        </div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-gradient-to-r from-bright-sun-500 to-bright-sun-600 text-gray-900 font-bold shadow-lg shadow-bright-sun-900/20'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                    }
                                `}
                            >
                                <item.icon size={20} className="stroke-[2.5]" />
                                <span className="text-sm">{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* User Profile & Logout */}
                <div className="p-4 border-t border-gray-700 bg-gray-800/80">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                    >
                        <IconLogout size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-semibold">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-gray-800/50 backdrop-blur-md border-b border-gray-700 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        >
                            <IconMenu2 size={24} />
                        </button>
                        <h1 className="text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 truncate">
                            Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all hover:scale-105">
                            <IconBell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-bright-sun-500 rounded-full animate-pulse border-2 border-gray-800"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-gray-700 mx-1"></div>
                        <div className="flex items-center gap-3 pl-1">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-white">Coach</div>
                                <div className="text-xs text-gray-400">Head Coach</div>
                            </div>
                            <div className="w-9 h-9 bg-gray-700 rounded-full border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                                <IconUser size={20} className="text-gray-300" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900/50 p-4 lg:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CoachLayout;
