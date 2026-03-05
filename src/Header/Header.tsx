import { Avatar, Button, Indicator, Menu } from '@mantine/core';
import { IconBell, IconSettings, IconUser, IconUsersPlus, IconLogout, IconChevronDown } from '@tabler/icons-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavLinks from './NavLinks';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    // Load user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    // Configurable: Define which paths should hide the header
    const hiddenPaths = [
        "/auth",
        "/login",
        "/register",
        "/signup",
        "/forgot-password"
    ];

    // Check if current path matches any hidden path (case-insensitive)
    const shouldHideHeader = hiddenPaths.some(path =>
        location.pathname.toLowerCase().startsWith(path.toLowerCase())
    );

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Clear user state
        setUser(null);

        // Redirect to home or login
        navigate('/');

        // Optional: Reload page to reset app state
        window.location.reload();
    };

    if (shouldHideHeader) {
        return null;
    }

    // Get user's full name
    const getUserName = () => {
        if (!user) return 'User';
        return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'User';
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user) return 'U';
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
    };

    return (
        <header className="w-full bg-cerulean-blue-950/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 text-white h-20 sm:h-24 flex justify-between items-center sticky top-0 z-[100] border-b border-white/5 shadow-2xl transition-all duration-300">
            {/* Logo & Brand */}
            <Link to="/" className="flex gap-3 sm:gap-4 items-center group">
                <div className="relative">
                    <div className="absolute -inset-1 bg-bright-sun-300/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <img src="/champion-logo.png" alt="champion" className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center">
                    {/* Full name on larger screens */}
                    <div className="hidden lg:block text-2xl xl:text-3xl font-black tracking-tighter leading-tight bg-gradient-to-r from-bright-sun-200 to-bright-sun-400 bg-clip-text text-transparent italic uppercase">
                        The Champions
                        <span className="block text-white not-italic font-bold text-lg xl:text-xl tracking-normal opacity-90 -mt-1">Sports Academy</span>
                    </div>
                    {/* Short name on medium screens */}
                    <div className="hidden sm:block lg:hidden text-xl font-black tracking-tight leading-none text-bright-sun-300 uppercase italic">
                        Champions
                        <span className="block text-white not-italic font-bold text-sm tracking-normal opacity-80 mt-0.5">Academy</span>
                    </div>
                    {/* Acronym on mobile */}
                    <div className="block sm:hidden text-xl font-black tracking-tighter text-bright-sun-300 italic">
                        TCA
                    </div>
                </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
                <NavLinks />
            </div>

            {/* Right Side Actions */}
            <div className="flex gap-3 sm:gap-4 items-center">
                {/* Conditional User/Login */}
                {user ? (
                    <Menu shadow="xl" width={240} position="bottom-end" withArrow transitionProps={{ transition: 'pop-top-right' }}>
                        <Menu.Target>
                            <div className="flex gap-3 items-center cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-2 rounded-2xl transition-all duration-300 border border-white/5 hover:border-white/10 group">
                                <div className="hidden xl:block text-right">
                                    <div className="font-bold text-sm text-white group-hover:text-bright-sun-300 transition-colors uppercase tracking-wide">{getUserName()}</div>
                                    <div className="text-[10px] text-bright-sun-400 font-bold uppercase tracking-widest opacity-80">{user.role || 'User'}</div>
                                </div>
                                <Avatar
                                    radius="xl"
                                    size={40}
                                    className="border-2 border-bright-sun-300/50 group-hover:border-bright-sun-300 transition-all duration-500 shadow-lg"
                                    src={user.avatar} // Mockup: assumes avatar might exist
                                >
                                    {getUserInitials()}
                                </Avatar>
                                <IconChevronDown size={14} className="text-gray-400 group-hover:text-bright-sun-300 transition-colors" />
                            </div>
                        </Menu.Target>

                        {/* Menu dropdown remains same as it's already functional */}
                        <Menu.Dropdown className="bg-cerulean-blue-900 border-white/10 shadow-2xl rounded-2xl p-2">
                            <Menu.Label>
                                <div className="flex flex-col px-2 py-1">
                                    <span className="font-bold text-white text-sm">{getUserName()}</span>
                                    <span className="text-[10px] text-gray-400 font-medium tracking-tight truncate">{user.email}</span>
                                </div>
                            </Menu.Label>

                            <Menu.Divider className="border-white/5" />

                            <Menu.Item
                                leftSection={<IconUser size={16} />}
                                onClick={() => navigate('/profile')}
                                className="text-gray-300 hover:text-white hover:bg-white/5 rounded-xl px-4 py-2.5 transition-all"
                            >
                                <span className="font-medium text-sm">Account Settings</span>
                            </Menu.Item>

                            {/* Role based items... kept for logic, styled for aesthetics */}
                            {user.role === 'ADMIN' && (
                                <Menu.Item
                                    leftSection={<IconUsersPlus size={16} />}
                                    onClick={() => navigate('/admin/dashboard')}
                                    className="text-bright-sun-300 hover:bg-bright-sun-300/5 rounded-xl px-4 py-2.5"
                                >
                                    <span className="font-bold text-sm">Admin Dashboard</span>
                                </Menu.Item>
                            )}

                            {/* ... (other roles) ... */}
                            {user.role === 'MANAGER' && (
                                <Menu.Item leftSection={<IconUsersPlus size={16} />} onClick={() => navigate('/manager/dashboard')} className="text-bright-sun-300 hover:bg-bright-sun-300/5 rounded-xl px-4 py-2.5">
                                    <span className="font-bold text-sm uppercase">Manager Tools</span>
                                </Menu.Item>
                            )}

                            <Menu.Divider className="border-white/5" />

                            <Menu.Item
                                leftSection={<IconLogout size={16} />}
                                color="red"
                                onClick={handleLogout}
                                className="hover:bg-red-500/10 rounded-xl px-4 py-2.5 transition-all"
                            >
                                <span className="font-bold text-sm uppercase tracking-wider">Sign Out</span>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                ) : (
                    <div className="flex gap-2 items-center">
                        <Link to="/auth">
                            <Button
                                variant="gradient"
                                gradient={{ from: 'brightSun.3', to: 'brightSun.5', deg: 45 }}
                                size="md"
                                radius="xl"
                                className="font-bold uppercase tracking-widest text-cerulean-blue-950 transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,191,0,0.3)] shadow-lg sm:px-8"
                            >
                                Member Login
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Notifications & Settings - Only visible when logged in */}
                {user && (
                    <div className="hidden sm:flex gap-3 items-center ml-2">
                        <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-white/10 hover:border-white/10 border border-white/5 transition-all group">
                            <Indicator color="brightSun.4" offset={2} size={8} withBorder aria-label="Notifications">
                                <IconBell size={20} className="text-gray-300 group-hover:text-bright-sun-300 transition-colors" stroke={1.5} />
                            </Indicator>
                        </div>

                        <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-white/10 hover:border-white/10 border border-white/5 transition-all group">
                            <IconSettings size={20} className="text-gray-300 group-hover:text-bright-sun-300 transition-colors" stroke={1.5} />
                        </div>
                    </div>
                )}

                {/* Mobile Menu trigger (Handled inside NavLinks now for better control) */}
                <div className="md:hidden">
                    <NavLinks />
                </div>
            </div>
        </header>
    );
};

export default Header;