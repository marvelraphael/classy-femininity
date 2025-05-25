import { useState } from 'react';
import { NextPage } from 'next';
import { usePolarSubscription } from '@polar-sh/nextjs';
import ChatInterface from '../components/ChatInterface';

const ChatbotPage: NextPage = () => {
  const { subscription } = usePolarSubscription();
  const [usage, setUsage] = useState(0);

  const fetchAnswer = async (messages: { role: string; content: string }[]) => {
    if (!subscription && usage >= 4) {
      window.PolarCheckout.open({ plan: 'YOUR_PLAN_ID' });
      return;
    }
    const res = await fetch('/api/openai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    if (!subscription) setUsage(u => u + 1);
    return data;
  };

  return (
    <div className="pt-16 pb-20 px-4">
      <header className="fixed top-0 w-full text-center py-4 bg-white z-10">
        <h1 className="font-serif text-2xl">AI Chatbot</h1>
      </header>
      <main className="mt-8">
        <ChatInterface
          fetchAnswer={fetchAnswer}
          onSubscribe={() => window.PolarCheckout.open({ plan: 'YOUR_PLAN_ID' })}
          isSubscribed={!!subscription}
          maxFreeQuestions={4}
        />
      </main>
    </div>
  );
};

export default ChatbotPage;
