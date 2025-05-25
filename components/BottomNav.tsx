import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BottomNav() {
  const router = useRouter();
  const tabs = [
    { href: '/', label: 'Home' },
    { href: '/chatbot', label: 'AI Chatbot' },
    { href: '/decoder', label: 'Man Decoder' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t">
      <div className="flex justify-around py-2">
        {tabs.map(tab => (
          <Link key={tab.href} href={tab.href}>
            <a className={`flex flex-col items-center text-sm ${router.pathname === tab.href ? 'text-primary' : 'text-gray-500'}`}>
              {tab.label}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
