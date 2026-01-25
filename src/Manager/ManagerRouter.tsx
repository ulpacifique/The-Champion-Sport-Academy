import { useState, useEffect } from "react";
import ManagerDashboard from "./ManagerDashboard";
import ChildManagement from "./ChildManagement";
import CoachManagement from "./CoachManagement";
import Attendance from "./Attendance";
import SalaryManagement from "./SalaryManagement";
import Messages from "./Messages";
import ProfileSettings from "./ProfileSettings";
import HelpSupport from "./HelpSupport";
import ManagerLayout from "./ManagerLayout";
import managerAPI from "../Services/ManagerApi";

const ManagerRouter = () => {
    const [activeSection, setActiveSection] = useState("dashboard");
    const [children, setChildren] = useState<any[]>([]);
    const [coaches, setCoaches] = useState<any[]>([]);
    const [newRegistrations, setNewRegistrations] = useState<any[]>([]);

    // Load initial data
    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [childrenRes, coachesRes] = await Promise.all([
                managerAPI.getChildren(),
                managerAPI.getCoaches()
            ]);

            // Map Children DTO to UI Model
            // UI expects: { id, name, age, sport, belt/level, programId ... }
            const mappedChildren = childrenRes.data.map((child: any) => ({
                ...child,
                name: child.childName,
                // Simple mapping for sport/program. Real app needs sport lists.
                sport: "Karate", // Default or derived from sportIds
                programId: child.programIds && child.programIds.length > 0 ? child.programIds[0] : null // Take first program
            }));

            // Map Coaches DTO to UI Model
            // UI expects: { id, name, sport, experience, salary, attendance: { present, total } }
            const mappedCoaches = coachesRes.data.map((coach: any) => ({
                ...coach,
                name: coach.firstName + " " + coach.lastName,
                sport: coach.sports && coach.sports.length > 0 ? coach.sports[0] : "General",
                attendance: { present: 0, total: 0 } // Default stats to prevent crash
            }));

            setChildren(mappedChildren);
            setCoaches(mappedCoaches);

            // Fetch pending if needed (ManagerApi has getPendingRegistrations)
            const pendingRes = await managerAPI.getPendingRegistrations();
            const mappedPending = pendingRes.data.map((child: any) => ({
                ...child,
                name: child.childName,
                sport: "Karate"
            }));
            setNewRegistrations(mappedPending);

        } catch (error) {
            console.error("Failed to fetch initial data", error);
            // Fallback to mocks or empty?
            // For now log error.
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return <ManagerDashboard />;
            case "children":
                return <ChildManagement
                    children={children}
                    setChildren={setChildren}
                    newRegistrations={newRegistrations}
                    setNewRegistrations={setNewRegistrations}
                />;
            case "coaches":
                return <CoachManagement
                    coaches={coaches}
                    setCoaches={setCoaches}
                />;
            case "attendance":
                return <Attendance
                    children={children}
                    coaches={coaches}
                />;
            case "salaries":
                return <SalaryManagement
                    coaches={coaches}
                    setCoaches={setCoaches}
                />;
            case "messages":
                return <Messages />;
            case "settings":
                return <ProfileSettings />;
            case "help":
                return <HelpSupport />;
            default:
                return <ManagerDashboard />;
        }
    };

    return (
        <ManagerLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
        >
            {renderContent()}
        </ManagerLayout>
    );
};

export default ManagerRouter;