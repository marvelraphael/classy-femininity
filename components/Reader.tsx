import { useState } from 'react';

interface ReaderProps {
  bookId: string;
  pageLimitBeforeSubscribe: number;
  isSubscribed: boolean;
  onSubscribe: () => void;
}

export default function Reader({ bookId, pageLimitBeforeSubscribe, isSubscribed, onSubscribe }: ReaderProps) {
  const [page, setPage] = useState(1);
  const totalPages = 100; // Replace with actual total pages or dynamic fetch

  const next = () => {
    if (page >= pageLimitBeforeSubscribe && !isSubscribed) {
      onSubscribe();
    } else if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <div className="reader-body p-4 bg-white rounded shadow">
        <p className="italic mb-2">Book ID: {bookId}</p>
        <div className="min-h-[300px]">
          {/* TODO: Render actual content for page {page} */}
          <p>Page {page} content goes here...</p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prev} disabled={page === 1} className="px-4 py-2 rounded bg-gray-200">Prev</button>
        <button onClick={next} className="px-4 py-2 rounded bg-gray-200">Next</button>
      </div>
    </div>
  );
}
