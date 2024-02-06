import { Roboto, Inter, Poppins } from 'next/font/google';
import './globals.css';
import { AppProvider } from './components/AppContext';
import { Toaster } from 'react-hot-toast';
import ProbesHeader from './components/layout/ProbesHeader';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: 'Burger Moon',
  description: 'Burger food app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <ProbesHeader />

            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024 All Rights Reserved - Project by Luis Becerra |{' '}
              <a
                href="https://github.com/Stevenzhunk"
                className="underline"
                target="_blank"
              >
                View My Projects
              </a>
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
