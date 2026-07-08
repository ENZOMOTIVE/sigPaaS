"use client";

import { Button } from '@/components/ui/button';
import { connectWallet } from '@/lib/web3';
import { useState } from 'react';
import { Wallet } from 'lucide-react';

export default function ConnectWallet() {
  const [address, setAddress] = useState<string>('');

  const handleConnect = async () => {
    try {
      const userAddress = await connectWallet();
      setAddress(userAddress);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div>
      {!address ? (
        <Button onClick={handleConnect} variant="default">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      ) : (
        <Button variant="outline">
          {address.slice(0, 6)}...{address.slice(-4)}
        </Button>
      )}
    </div>
  );
}