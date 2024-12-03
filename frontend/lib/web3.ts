import { ethers } from 'ethers';

export async function connectWallet(): Promise<string> {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

export async function getProvider() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = await getProvider();
  return provider.getSigner();
}