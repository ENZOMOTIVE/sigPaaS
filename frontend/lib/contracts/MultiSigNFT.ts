import { ethers } from 'ethers';
import { MULTISIG_NFT_ABI } from './abi';
import { CONTRACT_CONFIG } from './config';
import { getProvider, getSigner } from '../web3';

interface NFTContract extends ethers.Contract {
  createNFT: (
    recipient: string,
    metadataURI: string,
    requiredSignatures: number,
    useCustomValidators: boolean,
    customValidators: string[],
    isPFP: boolean,
    price: ethers.BigNumberish,
    mintType: number
  ) => Promise<ethers.ContractTransaction>;
  
  signNFT: (tokenId: number) => Promise<ethers.ContractTransaction>;
  hasRole: (role: string | Uint8Array, account: string) => Promise<boolean>;
  addMinter: (address: string) => Promise<ethers.ContractTransaction>;
  grantRole: (role: string | Uint8Array, account: string) => Promise<ethers.ContractTransaction>;
}

export class MultiSigNFTContract {
  private contract: NFTContract;

  constructor(provider: ethers.Provider) {
    this.contract = new ethers.Contract(
      CONTRACT_CONFIG.address,
      MULTISIG_NFT_ABI,
      provider
    ) as NFTContract;
  }

  static async connect() {
    const provider = await getProvider();
    return new MultiSigNFTContract(provider);
  }

  async createNFT(
    recipient: string,
    metadataURI: string,
    requiredSignatures: number,
    useCustomValidators: boolean,
    customValidators: string[],
    isPFP: boolean,
    price: string,
    mintType: number
  ) {
    const signer = await getSigner();
    const contract = this.contract.connect(signer) as NFTContract;
    return contract.createNFT(
      recipient,
      metadataURI,
      requiredSignatures,
      useCustomValidators,
      customValidators,
      isPFP,
      ethers.parseEther(price),
      mintType
    );
  }

  async signNFT(tokenId: number) {
    const signer = await getSigner();
    const contract = this.contract.connect(signer) as NFTContract;
    return contract.signNFT(tokenId);
  }

  async hasRole(role: string | Uint8Array, address: string) {
    return this.contract.hasRole(role, address);
  }

  async addMinter(address: string) {
    const signer = await getSigner();
    const contract = this.contract.connect(signer) as NFTContract;
    return contract.addMinter(address);
  }

  async grantRole(role: string | Uint8Array, address: string) {
    const signer = await getSigner();
    const contract = this.contract.connect(signer) as NFTContract;
    return contract.grantRole(role, address);
  }
}