import { useState, useEffect } from 'react';
import { MultiSigNFTContract } from '../contracts/MultiSigNFT';

export function usePendingNFTs() {
  const [pendingNFTs, setPendingNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPendingNFTs() {
      try {
        const contract = await MultiSigNFTContract.connect();
        const nfts = await contract.getPendingNFTs();
        setPendingNFTs(nfts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch pending NFTs'));
      } finally {
        setLoading(false);
      }
    }

    fetchPendingNFTs();
  }, []);

  return { pendingNFTs, loading, error };
}