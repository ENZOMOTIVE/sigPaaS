"use client";

import { useState, useEffect } from 'react';
import { MultiSigNFTContract } from '../contracts/MultiSigNFT';
import { connectWallet } from '../web3';
import { Role, UserProfile } from '../types';
import { ethers } from 'ethers';

export function useAuth() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const address = await connectWallet();
      const contract = await MultiSigNFTContract.connect();

      // Use raw bytes32 values for roles to match contract storage
      const adminRole = '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775';
      const minterRole = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';
      const validatorRole = '0x3496e2e73c4d42b75d702e60d9e48102720b8691234415963a5a857b86e52376';

      const [isAdmin, isMinter, isValidator] = await Promise.all([
        contract.hasRole(adminRole, address),
        contract.hasRole(minterRole, address),
        contract.hasRole(validatorRole, address)
      ]);

      let role: Role = 'user';
      if (isAdmin) role = 'admin';
      else if (isMinter) role = 'minter';
      else if (isValidator) role = 'validator';

      setProfile({ address, role });
      setError(null);
    } catch (error) {
      console.error('Auth check failed:', error);
      setProfile(null);
      setError('Failed to authenticate. Please make sure you are connected to the correct network.');
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, checkAuth };
}