import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ConnectWallet from '@/components/ConnectWallet';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Multi-Signature NFT Platform',
  description: 'A secure platform for minting NFTs with multi-signature validation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b border-gray-700 bg-gray-900">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">MultiSig NFT</h1>
            <ConnectWallet />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}