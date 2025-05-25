import { NextPage } from 'next';
import EbookCard from '../components/EbookCard';
import ebooks from '../data/ebooks.json';

const Home: NextPage = () => {
  return (
    <div className="pt-16 pb-20 px-4">
      <header className="fixed top-0 w-full text-center py-4 bg-white z-10">
        <h1 className="font-serif text-2xl">Classy Femininity</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        {ebooks.map(book => (
          <EbookCard key={book.id} book={book} />
        ))}
      </main>
    </div>
  );
};

export default Home;
