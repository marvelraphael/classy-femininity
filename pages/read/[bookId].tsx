import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { usePolarSubscription } from '@polar-sh/nextjs';

const ReadPage: NextPage = () => {
  const router = useRouter();
  const { bookId } = router.query as { bookId: string };
  const { subscription } = usePolarSubscription();
  const [page, setPage] = useState(1);

  const handleNext = () => {
    if (page >= 6 && !subscription) {
      window.PolarCheckout.open({ plan: 'YOUR_PLAN_ID' });
    } else {
      setPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="pt-16 pb-20 px-4">
      <header className="fixed top-0 w-full text-center py-4 bg-white z-10">
        <h1 className="font-serif text-2xl">Classy Femininity</h1>
      </header>
      <main className="mt-8">
        <div className="reader-content">
          {/* Replace this with actual page rendering */}
          <p>Book: {bookId}, Page: {page}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={handlePrev} className="px-4 py-2 rounded bg-gray-200">Prev</button>
          <span>Page {page}</span>
          <button onClick={handleNext} className="px-4 py-2 rounded bg-gray-200">Next</button>
        </div>
      </main>
    </div>
  );
};

export default ReadPage;
