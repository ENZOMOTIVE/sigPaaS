"use client";

import { useState, useEffect } from 'react';
import { MultiSigNFTContract } from '../contracts/MultiSigNFT';
import { connectWallet } from '../web3';
import { Role, UserProfile } from '../types';

export function useAuth() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const address = await connectWallet();
      const contract = await MultiSigNFTContract.connect();

      const isAdmin = await contract.hasRole('ADMIN_ROLE', address);
      const isMinter = await contract.hasRole('MINTER_ROLE', address);
      const isValidator = await contract.hasRole('VALIDATOR_ROLE', address);

      let role: Role = 'user';
      if (isAdmin) role = 'admin';
      else if (isMinter) role = 'minter';
      else if (isValidator) role = 'validator';

      setProfile({ address, role });
    } catch (error) {
      console.error('Auth check failed:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, checkAuth };
}