import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm the Dotslash AI assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    
    e.target.style.height = 'auto';
    
    const newHeight = Math.min(Math.max(e.target.scrollHeight, 40), 120);
    setInputHeight(newHeight);
    e.target.style.height = `${newHeight}px`;
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    
    setInputHeight(40);
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }

    setTimeout(() => {
      const botMessage = { 
        id: Date.now() + 1, 
        text: "I'm currently in development! This feature will be available soon with full API integration.", 
        isBot: true 
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {isOpen && (
        <Card className={`fixed bottom-6 right-6 z-50 w-96 h-[500px] glass-card animate-fade-in flex flex-col`}>

          <div className="flex items-center justify-between p-4 border-b border-glass-border/30 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Dotslash AI</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? "bg-muted text-foreground"
                      : "bg-gradient-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-glass-border/30 flex-shrink-0">
            <div className="flex space-x-2 items-end">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-input border border-glass-border/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none overflow-hidden"
                style={{ height: `${inputHeight}px` }}
                rows={1}
              />
              <Button size="sm" onClick={sendMessage} disabled={!inputText.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;