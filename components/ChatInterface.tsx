import { useState } from 'react';

interface ChatInterfaceProps {
  fetchAnswer: (messages: { role: string; content: string; }[]) => Promise<any>;
  onSubscribe: () => void;
  isSubscribed: boolean;
  maxFreeQuestions: number;
}

export default function ChatInterface({ fetchAnswer, onSubscribe, isSubscribed, maxFreeQuestions }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [usage, setUsage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!isSubscribed && usage >= maxFreeQuestions) {
      onSubscribe();
      return;
    }
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setLoading(true);
    const response = await fetchAnswer(newMessages);
    setLoading(false);

    const reply = response?.choices?.[0]?.message;
    if (reply) {
      setMessages(prev => [...prev, { role: reply.role, content: reply.content }]);
    }
    if (!isSubscribed) setUsage(u => u + 1);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-2 bg-white rounded shadow">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded max-w-xs ${m.role === 'user' ? 'bg-primary text-white self-end' : 'bg-gray-100 self-start'}`}>  
            {m.content}
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
      <div className="flex p-4">
        <input
          className="flex-1 border rounded px-3 py-2 mr-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button onClick={handleSend} className="px-4 py-2 rounded bg-primary text-white">Send</button>
      </div>
    </div>
  );
}
