import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface IdleTimeoutProps {
    children: React.ReactNode;
    timeoutMinutes?: number;
}

const IdleTimeout: React.FC<IdleTimeoutProps> = ({ children, timeoutMinutes = 5 }) => {
    const navigate = useNavigate();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutMs = timeoutMinutes * 60 * 1000;

    const handleLogout = useCallback(() => {
        console.log('User idle for 5 minutes, logging out...');

        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to login
        navigate('/auth');

        // Optional: Reload to reset app state
        window.location.reload();
    }, [navigate]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(handleLogout, timeoutMs);
    }, [handleLogout, timeoutMs]);

    useEffect(() => {
        // Events to monitor for activity
        const events = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click'
        ];

        // Only start timer if user is logged in
        const user = localStorage.getItem('user');
        if (user) {
            // Initialize timer
            resetTimer();

            // Add event listeners
            events.forEach(event => {
                window.addEventListener(event, resetTimer);
            });
        }

        return () => {
            // Cleanup on unmount
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetTimer]);

    // Periodically check if session is still valid (optional but good practice)
    // For now, we rely on the inactivity timer and the 5min backend cookie

    return <>{children}</>;
};

export default IdleTimeout;
