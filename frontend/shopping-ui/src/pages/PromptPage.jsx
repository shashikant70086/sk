import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import { PiPaperPlaneRightFill } from "react-icons/pi";
import avatar from "../Pooho.png";
import "../stars.css";
import Message from '../components/Message';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from "react-spinners";

function PromptPage() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(() => uuidv4());
    const [sessions, setSessions] = useState([]);
    const [activeSession, setActiveSession] = useState(null);
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async () => {
        if (!prompt.trim()) return;

        const userMessage = { type: "user", text: prompt };
        setMessages((prev) => [...prev, userMessage]);
        setPrompt("");
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:8080/api/prompt", {
                prompt,
                sessionId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const botMessage = {
                type: "bot",
                text: res.data.reply,
                image: avatar
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            setMessages((prev) => [...prev, { type: "bot", text: "Error fetching reply", image: avatar }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8080/sessions", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSessions(res.data);
            } catch (err) {
                console.error("Failed to fetch sessions:", err);
            }
        };

        fetchSessions();
    }, []);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    type: "bot",
                    text: "Hi, I’m Smartlet 👋 What do you want to shop today?",
                    image: avatar,
                },
            ]);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
            <div className="stars" />
            <div className="twinkling" />

            {/* Top Bar */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md flex justify-between items-center px-6 py-4 shadow-lg">
                <h1 className="text-2xl font-bold text-white">Smartlet 🛍️</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>

            {/* Left Side - Session Buttons */}
            <div className="absolute top-24 left-4 z-40 bg-white/10 backdrop-blur p-4 rounded-xl space-y-2">
                <button
                    onClick={() => {
                        const newSession = uuidv4();
                        setSessionId(newSession);
                        setMessages([]);
                        setActiveSession(null);
                    }}
                    className="bg-green-500 px-4 py-2 rounded text-white w-full"
                >
                    + New Chat
                </button>

                {/* New Shop Manually Button */}
                <button
                    onClick={() => {
                        window.location.href = "/shop";
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded text-white w-full"
                >
                    🛒 Shop Manually
                </button>

                {/* List all Sessions */}
                {sessions.map((s) => (
                    <button
                        key={s.sessionId}
                        className={`block w-full text-left px-3 py-1 rounded ${activeSession === s.sessionId ? "bg-blue-500 text-white" : "bg-white"
                            }`}
                        onClick={async () => {
                            try {
                                const token = localStorage.getItem("token");
                                const res = await axios.get(`http://localhost:8080/sessions/${s.sessionId}`, {
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                const msgs = res.data.messages.map((msg) => ({
                                    type: msg.role === "user" ? "user" : "bot",
                                    text: msg.content,
                                    image: msg.role === "bot" ? avatar : null
                                }));

                                setSessionId(s.sessionId);
                                setMessages(msgs);
                                setActiveSession(s.sessionId);
                            } catch (err) {
                                console.error("Failed to fetch session messages:", err);
                            }
                        }}
                    >
                        {s.title}
                    </button>
                ))}
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-2 w-full pt-24">
                {/* Chat Messages Area */}
                <div className="flex flex-col w-full max-w-3xl mx-auto mb-28 overflow-y-auto space-y-4 max-h-[calc(100vh-180px)] scrollbar-thin pr-2">
                    {messages.map((message, index) => (
                        <Message key={index} message={message} />
                    ))}
                    {isLoading && <div className="flex justify-center"><ClipLoader color="white" loading={isLoading} size={50} /></div>}
                    <div ref={messagesEndRef} />
                </div>

                {/* Prompt Input Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed bottom-6 transform -translate-x-1/2 w-full max-w-3xl bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex items-center justify-between space-x-4"
                >
                    <textarea
                        rows="2"
                        className="w-full p-2 rounded bg-white/30 placeholder-white/80 text-white resize-none focus:outline-none"
                        placeholder="Type your magical prompt..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />

                    {/* File Upload Button */}
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <div className="text-white text-lg">
                            <FaPlusCircle />
                        </div>
                    </label>

                    {/* Send Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white"
                    >
                        <PiPaperPlaneRightFill />
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

export default PromptPage;