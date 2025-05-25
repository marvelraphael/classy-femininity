import Link from 'next/link';

type Ebook = {
  id: string;
  title: string;
  coverUrl: string;
};

interface Props {
  book: Ebook;
}

export default function EbookCard({ book }: Props) {
  return (
    <div className="flex flex-col items-center">
      <img src={book.coverUrl} alt={book.title} className="w-full h-auto rounded shadow" />
      <Link href={`/read/${book.id}`}>
        <button className="mt-2 px-4 py-2 rounded bg-primary text-white">Read</button>
      </Link>
    </div>
  );
}
