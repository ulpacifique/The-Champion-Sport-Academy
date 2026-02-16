import { useState, useEffect } from "react";
import ManagerDashboard from "./ManagerDashboard";
import ChildManagement from "./ChildManagement";
import CoachManagement from "./CoachManagement";
import Attendance from "./Attendance";
import SalaryManagement from "./SalaryManagement";
import PaymentManagement from "./PaymentManagement";
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
            const mappedChildren = (childrenRes.data || []).map((child: any) => ({
                ...child,
                name: child.childName,
                // Extract sport name from essential sports if available
                sport: child.essentialSports && child.essentialSports.length > 0
                    ? (child.essentialSports[0].sport?.name || "General")
                    : "General",
                programId: child.programs && child.programs.length > 0 ? child.programs[0].id.toString() : null
            }));

            // Map Coaches DTO to UI Model
            const mappedCoaches = (coachesRes.data || []).map((coach: any) => ({
                ...coach,
                name: coach.user ? `${coach.user.firstName} ${coach.user.lastName}` : "Unnamed Coach",
                sport: coach.sports && coach.sports.length > 0 ? (coach.sports[0].sport?.name || "General") : "General",
                attendance: { present: 0, total: 0 } // Default stats to prevent crash
            }));

            setChildren(mappedChildren);
            setCoaches(mappedCoaches);

            // Fetch pending if needed
            const pendingRes = await managerAPI.getPendingRegistrations();
            const mappedPending = (pendingRes.data || []).map((child: any) => ({
                ...child,
                name: child.childName,
                sport: child.essentialSports && child.essentialSports.length > 0
                    ? (child.essentialSports[0].sport?.name || "General")
                    : "General",
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
                />;
            case "payments":
                return <PaymentManagement />;
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