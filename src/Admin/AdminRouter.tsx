// src/Admin/AdminRouter.tsx
import { useState } from "react";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import Athletes from "./Athletes";
import Coaches from "./Coaches";
import Programs from "./Programs";
import Payments from "./Payments";
import Messages from "./Messages";
import Settings from "./Settings";
import HelpSupport from "./HelpSupport";
import AdminVideoPage from "./AdminVideoPage";
import EventsManagement from "./EventsManagement";
import GalleryManagement from "./GalleryManagement";

const AdminRouter = () => {
    const [activeSection, setActiveSection] = useState("dashboard");

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return <Dashboard />;
            case "athletes":
                return <Athletes />;
            case "coaches":
                return <Coaches />;
            case "programs":
                return <Programs />;
            case "payments":
                return <Payments />;
            case "events":
                return <EventsManagement />;
            case "videos":
                return <AdminVideoPage />;
            case "messages":
                return <Messages />;
            case "gallery":
                return <GalleryManagement />;
            case "help":
                return <HelpSupport />;
            case "settings":
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return (

        <AdminLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
        >
            {renderContent()}
        </AdminLayout>
    );
};

export default AdminRouter;