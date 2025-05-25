import { AppProps } from 'next/app';
import { PolarProvider } from '@polar-sh/nextjs';
import BottomNav from '../components/BottomNav';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PolarProvider apiKey={process.env.NEXT_PUBLIC_POLAR_API_KEY ?? ''}>
      <Component {...pageProps} />
      <BottomNav />
    </PolarProvider>
  );
}

export default MyApp;
