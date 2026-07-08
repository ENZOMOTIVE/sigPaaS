import { useState, useEffect } from 'react';
import { MultiSigNFTContract } from '../contracts/MultiSigNFT';

export function useNFTContract() {
  const [contract, setContract] = useState<MultiSigNFTContract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initContract() {
      try {
        const nftContract = await MultiSigNFTContract.connect();
        setContract(nftContract);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize contract'));
      } finally {
        setLoading(false);
      }
    }

    initContract();
  }, []);

  return { contract, loading, error };
}