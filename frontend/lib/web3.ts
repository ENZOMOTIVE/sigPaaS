import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from './contracts/config';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet(): Promise<string> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    
    // Ensure correct network
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CONTRACT_CONFIG.chainId }],
      });
    } catch (switchError: any) {
      // If the network doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: CONTRACT_CONFIG.chainId,
            chainName: CONTRACT_CONFIG.network,
            rpcUrls: [CONTRACT_CONFIG.rpcUrl],
          }],
        });
      }
    }
    
    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

export async function getProvider() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed');
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = await getProvider();
  return provider.getSigner();
}