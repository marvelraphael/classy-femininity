import { useState } from 'react';
import { NextPage } from 'next';
import { usePolarSubscription } from '@polar-sh/nextjs';
import DecoderForm from '../components/DecoderForm';

const DecoderPage: NextPage = () => {
  const { subscription } = usePolarSubscription();
  const [usage, setUsage] = useState(0);

  const handleSubmit = async (formData: Record<string, string>) => {
    if (!subscription && usage >= 2) {
      window.PolarCheckout.open({ plan: 'YOUR_PLAN_ID' });
      return;
    }
    const res = await fetch('/api/openai/decoder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!subscription) setUsage(u => u + 1);
    return data;
  };

  return (
    <div className="pt-16 pb-20 px-4">
      <header className="fixed top-0 w-full text-center py-4 bg-white z-10">
        <h1 className="font-serif text-2xl">Man Decoder</h1>
      </header>
      <main className="mt-8">
        <DecoderForm
          onSubmit={handleSubmit}
          onSubscribe={() => window.PolarCheckout.open({ plan: 'YOUR_PLAN_ID' })}
          isSubscribed={!!subscription}
          maxFreeUses={2}
        />
      </main>
    </div>
  );
};

export default DecoderPage;
