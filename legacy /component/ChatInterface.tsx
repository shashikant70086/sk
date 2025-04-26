import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";

interface Message {
  id: string;
  sender: "assistant" | "user";
  text: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // This would typically trigger an API call to get the assistant's response
    // For now, we'll just add a simple echo response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: `I received your message: "${input}". How can I help further?`
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="bg-card shadow-lg overflow-hidden flex flex-col h-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="relative flex-grow flex flex-col p-6">
        {/* Chat Header */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">Shopping Assistant</h3>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
              <span>Online</span>
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-end ${message.sender === "user" ? "justify-end" : ""}`}>
              {message.sender === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div className={`message-bubble ${message.sender === "assistant" ? "assistant-message bg-secondary" : "user-message bg-primary text-primary-foreground ml-auto"} p-3`}>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Type a message..."
            className="w-full pl-4 pr-12 py-6 bg-muted border-border focus:ring-2 focus:ring-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80 bg-transparent hover:bg-transparent p-1"
            onClick={handleSendMessage}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
