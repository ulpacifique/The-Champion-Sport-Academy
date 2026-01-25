import { Avatar, Button, Indicator, Menu } from '@mantine/core';
import { IconBell, IconSettings, IconUser, IconUserEdit, IconUsersPlus, IconLogout, IconChevronDown } from '@tabler/icons-react';
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
        <header className="w-full bg-cerulean-blue-950 px-3 sm:px-4 md:px-6 text-white h-16 sm:h-20 md:h-24 flex justify-between items-center sticky top-0 z-50 shadow-lg">
            {/* Logo & Brand */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 items-center text-bright-sun-400">
                <img src="/champion-logo.png" alt="champion" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
                {/* Full name on larger screens */}
                <div className="hidden lg:block text-xl md:text-2xl xl:text-3xl font-semibold">
                    The Champions Academy
                </div>
                {/* Short name on medium screens */}
                <div className="hidden sm:block lg:hidden text-lg md:text-xl font-semibold">
                    Champions Academy
                </div>
                {/* Acronym on mobile */}
                <div className="block sm:hidden text-base font-semibold">
                    TCA
                </div>
            </div>
            
            {/* Navigation Links */}
            <NavLinks />
           
            {/* Right Side Actions */}
            <div className="flex gap-2 sm:gap-3 md:gap-5 items-center">
                {/* Conditional User/Login */}
                {user ? (
                    <Menu shadow="md" width={220} position="bottom-end">
                        <Menu.Target>
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-cerulean-blue-900 px-2 py-1.5 rounded-lg transition">
                                <div className="hidden md:block">
                                    <div className="font-medium text-sm lg:text-base">{getUserName()}</div>
                                    <div className="text-xs text-bright-sun-400">{user.role || 'User'}</div>
                                </div>
                                <Avatar 
                                    radius="xl" 
                                    size={32}
                                    className="sm:w-9 sm:h-9 md:w-10 md:h-10 bg-bright-sun-400 text-cerulean-blue-950 font-bold"
                                    color="brightSun.4"
                                >
                                    {getUserInitials()}
                                </Avatar>
                                <IconChevronDown size={16} className="hidden md:block" />
                            </div>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{getUserName()}</span>
                                    <span className="text-xs text-gray-500">{user.email}</span>
                                </div>
                            </Menu.Label>
                            
                            <Menu.Divider />
                            
                            <Menu.Item 
                                leftSection={<IconUser size={16} />}
                                onClick={() => navigate('/profile')}
                            >
                                My Profile
                            </Menu.Item>
                            
                            <Menu.Item 
                                leftSection={<IconUserEdit size={16} />}
                                onClick={() => navigate('/profile/edit')}
                            >
                                Edit Profile
                            </Menu.Item>
                           
                            {user.role === 'ADMIN' && (
                                <Menu.Item 
                                    leftSection={<IconUsersPlus size={16} />}
                                    onClick={() => navigate('/admin/dashboard')}
                                    color="brightSun.4"
                                >
                                    Register Child
                                </Menu.Item>
                            )}
                            
                            {user.role === 'PARENT' && (
                                <Menu.Item 
                                    leftSection={<IconUsersPlus size={16} />}
                                    onClick={() => navigate('/children/register')}
                                    color="brightSun.4"
                                >
                                    Register Child
                                </Menu.Item>
                            )}
                            {user.role === 'COACH' && (
                                <Menu.Item 
                                    leftSection={<IconUsersPlus size={16} />}
                                    onClick={() => navigate('/coach/dashboard')}
                                    color="brightSun.4"
                                >
                                    Coach Dashboard
                                </Menu.Item>
                            )}
                            {user.role === 'MANAGER' && (
                                <Menu.Item 
                                    leftSection={<IconUsersPlus size={16} />}
                                    onClick={() => navigate('/manager/dashboard')}
                                    color="brightSun.4"
                                >
                                    Manager Dashboard
                                </Menu.Item>
                            )}
                            
                            <Menu.Divider />
                            
                            <Menu.Item 
                                leftSection={<IconLogout size={16} />}
                                color="red"
                                onClick={handleLogout}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                ) : (
                    <div className="hidden sm:flex gap-2">
                        <Link to="/auth">
                            <Button variant="filled" color="brightSun.4" size="xs" className="sm:text-xs md:text-sm">
                                Login
                            </Button>
                        </Link>
                    </div>
                )}
                
                {/* Notification & Settings - Hidden on small mobile */}
                <div className="hidden xs:flex gap-2 sm:gap-3">
                    <div className="bg-cerulean-blue-900 p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-cerulean-blue-800 transition">
                        <Indicator color="brightSun.4" offset={4} size={8} withBorder>
                            <IconBell size={16} className="sm:w-5 sm:h-5" stroke={1.5} />
                        </Indicator>
                    </div>
                    
                    <div className="bg-cerulean-blue-900 p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-cerulean-blue-800 transition">
                        <IconSettings size={16} className="sm:w-5 sm:h-5" stroke={1.5} />
                    </div>
                </div>

                {/* Mobile Login Button - Only show when no user */}
                {!user && (
                    <Link to="/auth" className="sm:hidden">
                        <Button variant="filled" color="brightSun.4" size="xs">
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;