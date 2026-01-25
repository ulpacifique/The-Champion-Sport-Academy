import { useState, useEffect, useRef } from "react";
import {
    IconSearch,
    IconSend,
    IconUser,
    IconCheck,
    IconArrowLeft,
    IconMessage
} from "@tabler/icons-react";
import managerAPI from "../Services/ManagerApi";
import { messageAPI } from "../Services/Api";

const Messages = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [showChatList, setShowChatList] = useState(true);
    const [chats, setChats] = useState<any[]>([]);
    const [messagesList, setMessagesList] = useState<any[]>([]);
    const [recipients, setRecipients] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchChats();
        fetchRecipients();
    }, []);

    const fetchRecipients = async () => {
        try {
            const response = await managerAPI.getRecipients();
            setRecipients(response.data);
        } catch (error) {
            console.error("Failed to fetch recipients", error);
        }
    };

    const fetchChats = async () => {
        try {
            const response = await managerAPI.getRecentChats();
            const currentUserId = getCurrentUserId();
            const chatsData = response.data.map((chat: any) => ({
                id: Number(chat.senderId) === currentUserId ? Number(chat.receiverId) : Number(chat.senderId),
                name: Number(chat.senderId) === currentUserId ? chat.receiverName : chat.senderName,
                role: Number(chat.senderId) === currentUserId ? (chat.receiverRole || "User") : (chat.senderRole || "User"),
                lastMessage: chat.content,
                time: new Date(chat.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                unread: chat.read ? 0 : 1,
            }));
            const uniqueChats = Array.from(new Map(chatsData.map((item: any) => [item.id, item])).values());
            setChats(uniqueChats);
        } catch (error) {
            console.error("Failed to fetch chats", error);
        }
    };

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const response = await managerAPI.getConversation(selectedChat);
            const currentUserId = getCurrentUserId();

            // Mark unread messages as read
            const unreadMessages = response.data.filter((msg: any) =>
                !msg.read && Number(msg.receiverId) === currentUserId
            );

            for (const msg of unreadMessages) {
                try {
                    await messageAPI.markAsRead(msg.id);
                } catch (error) {
                    console.error('Failed to mark message as read:', error);
                }
            }

            const messages = response.data.map((msg: any) => ({
                id: msg.id,
                sender: Number(msg.senderId) === currentUserId ? 'manager' : 'other',
                text: msg.content,
                time: new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: msg.read ? 'read' : 'delivered'
            }));
            setMessagesList(messages);
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentUserId = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return Number(user.id);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messagesList]);

    useEffect(() => {
        if (selectedChat) {
            fetchMessages();
            const interval = setInterval(() => fetchMessages(), 5000);
            return () => clearInterval(interval);
        }
    }, [selectedChat]);

    const handleSendMessage = async () => {
        if (message.trim() && selectedChat) {
            try {
                await managerAPI.sendMessage({
                    receiverId: selectedChat,
                    content: message
                });
                setMessage("");
                fetchMessages();
            } catch (error) {
                console.error("Failed to send", error);
            }
        }
    };

    const handleSelectChat = (chatId: number) => {
        setSelectedChat(chatId);
        setShowChatList(false);
    };

    const handleBackToList = () => {
        setShowChatList(true);
        setSelectedChat(null);
    };

    const activeContact = chats.find(c => c.id === selectedChat) || (() => {
        const recipient = recipients.find(r => r.id === selectedChat);
        if (recipient) {
            return {
                id: recipient.id,
                name: `${recipient.firstName} ${recipient.lastName}`,
                role: recipient.role.replace('ROLE_', ''),
            };
        }
        return null;
    })();

    return (
        <div className="w-full flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chat List */}
                <div className={`${showChatList || !selectedChat ? 'block' : 'hidden'} lg:block lg:col-span-1 bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 h-[600px] flex flex-col`}>
                    <div className="mb-4">
                        <div className="relative">
                            <IconSearch className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                        {searchQuery ? (
                            recipients.filter(r =>
                                `${r.firstName} ${r.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
                            ).map(recipient => (
                                <button
                                    key={recipient.id}
                                    onClick={() => {
                                        handleSelectChat(recipient.id);
                                        setSearchQuery("");
                                    }}
                                    className="w-full text-left p-3 rounded-lg hover:bg-gray-700/30 transition-colors border border-transparent hover:border-gray-600"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                                            <IconUser size={16} className="text-yellow-400" />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-medium">{recipient.firstName} {recipient.lastName}</div>
                                            <div className="text-gray-400 text-xs">{recipient.role.replace('ROLE_', '')}</div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            chats.length === 0 ? (
                                <div className="text-gray-500 text-center py-4 text-sm">No recent chats</div>
                            ) : (
                                chats.map((chat) => (
                                    <button
                                        key={chat.id}
                                        onClick={() => handleSelectChat(chat.id)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${selectedChat === chat.id
                                            ? 'bg-yellow-400/20 border border-yellow-400/30'
                                            : 'hover:bg-gray-700/30'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                                                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <IconUser size={18} className="text-white" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-white font-medium truncate text-sm">{chat.name}</div>
                                                    <div className="text-gray-400 text-xs">{chat.role}</div>
                                                </div>
                                            </div>
                                            <div className="text-gray-500 text-xs whitespace-nowrap">{chat.time}</div>
                                        </div>
                                        <p className="text-gray-400 text-xs mt-2 truncate">{chat.lastMessage}</p>
                                    </button>
                                ))
                            )
                        )}
                    </div>
                </div>

                {/* Chat Window */}
                <div className={`${!showChatList && selectedChat ? 'block' : 'hidden'} md:block lg:block lg:col-span-2 flex flex-col bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden`}>
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-700/50 flex items-center space-x-3 flex-shrink-0">
                                <button onClick={handleBackToList} className="lg:hidden text-gray-400 hover:text-white">
                                    <IconArrowLeft size={24} />
                                </button>
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <IconUser size={20} className="text-white" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-white font-bold text-sm sm:text-base truncate">{activeContact?.name}</div>
                                    <div className="text-gray-400 text-xs">{activeContact?.role} • Online</div>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div
                                ref={scrollRef}
                                className="h-[400px] lg:h-[500px] overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-900/10"
                            >
                                {messagesList.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'manager' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 ${msg.sender === 'manager'
                                            ? 'bg-yellow-400/20 border border-yellow-400/30'
                                            : 'bg-gray-700/50 border border-gray-600/50'
                                            }`}>
                                            <p className="text-white break-words text-sm">{msg.text}</p>
                                            <div className="flex items-center justify-end mt-1 space-x-1">
                                                <span className="text-gray-500 text-[10px]">{msg.time}</span>
                                                <IconCheck className={msg.status === 'read' ? 'text-blue-400' : 'text-gray-500'} size={12} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-gray-700/50 flex-shrink-0">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 text-sm"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim()}
                                        className={`p-2 rounded-lg transition-all ${message.trim() ? 'bg-yellow-400 text-gray-900 hover:scale-105' : 'bg-gray-700 text-gray-500'}`}
                                    >
                                        <IconSend size={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                            <IconMessage size={48} className="mb-4 opacity-20" />
                            <p className="text-sm">Select a conversation to start messaging</p>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }
            `}</style>
        </div>
    );
};

export default Messages;