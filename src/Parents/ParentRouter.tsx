import ProfileSettings from "./ProfileSettings";
import ParentLayout from "./ParentLayout";
import { useEffect, useState } from "react";
import ParentDashboard from "./ParentDashboard";
import ProgressTracking from "./ProgressTracking";
import Messages from "./Messages";
import HelpSupport from "./HelpSupport";
import ChildManagement from "./ChildManagement";
import parentAPI from "../Services/ParentApi";

const ParentRouter = () => {
    const [activeSection, setActiveSection] = useState("dashboard");
    const [childList, setChildList] = useState<any[]>([]); // Renamed from children to childList
    const [selectedChild, setSelectedChild] = useState<any>(null);

    // Load children data
    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const response = await parentAPI.getChildren();
            const data = response.data.map((child: any) => ({
                ...child,
                name: child.childName, // Align with UI expectation
                progress: child.progress || 0 // Default progress if missing
            }));
            setChildList(data);
            if (data.length > 0 && !selectedChild) {
                setSelectedChild(data[0]);
            }
        } catch (error) {
            console.error("Failed to fetch children", error);
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return <ParentDashboard selectedChild={selectedChild} />;
            case "children":
                return <ChildManagement
                    children={childList} // Updated prop name
                    setChildren={setChildList} // Updated prop name
                    selectedChild={selectedChild}
                    setSelectedChild={setSelectedChild}
                />;
            case "progress":
                return <ProgressTracking
                    selectedChild={selectedChild}
                    children={childList} // Updated prop name
                    setSelectedChild={setSelectedChild}
                />;
            case "messages":
                return <Messages />;
            case "settings":
                return <ProfileSettings />;
            case "help":
                return <HelpSupport />;
            default:
                return <ParentDashboard selectedChild={selectedChild} />;
        }
    };

    return (
        <ParentLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
            childrenList={childList} // Updated prop name to match ParentLayout
        >
            {renderContent()}
        </ParentLayout>
    );
};

export default ParentRouter;