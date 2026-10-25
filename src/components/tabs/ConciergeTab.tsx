import React, { useState, useRef, useEffect } from 'react';
import { CelebrationEvent } from '../../types/event';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  HelpCircle, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface ConciergeTabProps {
  event: CelebrationEvent;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actions?: string[];
}

export const ConciergeTab: React.FC<ConciergeTabProps> = ({ event }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am your CelebrateAI Planning Concierge for **${event.title}**. 

I have full context on your **${event.eventType}** in ${event.location}, with a budget of ₹${(event.totalBudget || 0).toLocaleString('en-IN')} and ${event.guestCount} guests.

How can I assist your celebration planning today?`,
      timestamp: 'Just now',
      actions: [
        'How to cut 10% budget without compromising guest experience?',
        'Suggest 4 unique photo-booth concepts',
        'Weather contingency plan for outdoor venue',
        'What fun games work best for this crowd?'
      ]
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const q = textToSend || inputQuestion.trim();
    if (!q || isThinking) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/plan/assistant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          question: q,
        }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Here is my advice for your celebration planning.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: data.suggestedActions || ['Check budget', 'Update timeline'],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Concierge chat error:', err);
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `Based on your budget of ₹${(event.totalBudget || 0).toLocaleString('en-IN')} for ${event.guestCount} guests:\n\n` +
          `• Focus on high-visibility centerpieces and ambient lighting rather than heavy floor rigging.\n` +
          `• Reconfirm vendor power backup and acoustic limits 72 hours in advance.\n` +
          `• Have a dedicated family point-person handle on-day vendor settlements.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: ['Check vendor checklist', 'Review catering numbers'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[700px] animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-600 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              AI Event Concierge & Advisor
            </h3>
            <p className="text-xs text-slate-500">
              Live reasoning engine tailored to {event.title}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active Planner
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div 
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                isUser 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-slate-900 text-amber-300'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                isUser 
                  ? 'bg-amber-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>
                
                <span className={`block text-[10px] mt-2 ${isUser ? 'text-amber-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>

                {/* Suggested Action Chips */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                    {msg.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(action)}
                        className="text-[11px] font-medium bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 hover:border-amber-300 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 text-left cursor-pointer shadow-2xs"
                      >
                        <span>{action}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs text-slate-500 flex items-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing requirements & calculating advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder={`Ask anything about ${event.eventType} budgeting, vendors, or creative ideas...`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
          />
          <button
            type="submit"
            disabled={!inputQuestion.trim() || isThinking}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>
      </div>

    </div>
  );
};
