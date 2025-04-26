import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, MessageSquare, ShoppingCart, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

interface ChatSession {
  id: string;
  date: Date;
  title: string;
  messages: {
    id: string;
    content: string;
    timestamp: Date;
    isUser: boolean;
  }[];
}

// Sample chat history data - in a real app, this would come from API
const sampleChatSessions: ChatSession[] = [
  {
    id: uuidv4(),
    date: new Date("2025-04-20T10:30:00"),
    title: "Shopping for electronics",
    messages: [
      {
        id: uuidv4(),
        content: "I need a new smartphone",
        timestamp: new Date("2025-04-20T10:30:00"),
        isUser: true
      },
      {
        id: uuidv4(),
        content: "What's your budget for a new smartphone?",
        timestamp: new Date("2025-04-20T10:31:00"),
        isUser: false
      },
      {
        id: uuidv4(),
        content: "Around $800",
        timestamp: new Date("2025-04-20T10:32:00"),
        isUser: true
      }
    ]
  },
  {
    id: uuidv4(),
    date: new Date("2025-04-18T15:20:00"),
    title: "Looking for headphones",
    messages: [
      {
        id: uuidv4(),
        content: "I need noise-cancelling headphones",
        timestamp: new Date("2025-04-18T15:20:00"),
        isUser: true
      },
      {
        id: uuidv4(),
        content: "What's most important to you: sound quality, comfort, or battery life?",
        timestamp: new Date("2025-04-18T15:21:00"),
        isUser: false
      }
    ]
  },
  {
    id: uuidv4(),
    date: new Date("2025-04-15T09:10:00"),
    title: "Gift ideas",
    messages: [
      {
        id: uuidv4(),
        content: "I need a gift for my mom's birthday",
        timestamp: new Date("2025-04-15T09:10:00"),
        isUser: true
      },
      {
        id: uuidv4(),
        content: "What are some things your mom enjoys or hobbies she has?",
        timestamp: new Date("2025-04-15T09:11:00"),
        isUser: false
      }
    ]
  }
];

export default function HistoryPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(sampleChatSessions);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id));
    if (selectedSession?.id === id) {
      setSelectedSession(null);
    }
  };

  const clearAllHistory = () => {
    setSessions([]);
    setSelectedSession(null);
  };

  // Filter sessions based on active tab
  const filteredSessions = activeTab === 'all' 
    ? sessions 
    : sessions.filter(session => {
        const today = new Date();
        const sessionDate = new Date(session.date);
        
        if (activeTab === 'today') {
          return sessionDate.toDateString() === today.toDateString();
        } else if (activeTab === 'week') {
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          return sessionDate >= oneWeekAgo;
        } else if (activeTab === 'month') {
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(today.getMonth() - 1);
          return sessionDate >= oneMonthAgo;
        }
        return true;
      });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <History className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-3xl font-semibold">Chat History</h1>
        </div>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={clearAllHistory}
          disabled={sessions.length === 0}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No chat history found</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className={`cursor-pointer hover:border-primary/50 transition-colors ${
                    selectedSession?.id === session.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedSession(session)}
                >
                  <CardHeader className="py-3 px-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium line-clamp-1">{session.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDate(session.date)}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Message Content */}
        <div>
          {selectedSession ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{selectedSession.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{formatDate(selectedSession.date)}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedSession.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.isUser 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-muted rounded-tl-none'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {formatDate(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // In a real app, this would navigate to the chat with this session loaded
                      alert("Continue this conversation feature would be implemented here");
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Continue This Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] bg-muted/40 rounded-lg">
              <div className="text-center p-8">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-medium">No Conversation Selected</h3>
                <p className="text-muted-foreground mt-2">
                  Select a chat from the left to view the conversation details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}