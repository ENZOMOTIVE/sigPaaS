import { ethers } from 'ethers';
import { getProvider, getSigner } from '../web3';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contracts/contract';




export class MultiSigNFTContract {
  private contract: ethers.Contract;

  constructor(provider: ethers.Provider) {
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
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
    const contract = this.contract.connect(signer);
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
    const contract = this.contract.connect(signer);
    return contract.signNFT(tokenId);
  }

  async claimNFT(tokenId: number) {
    const signer = await getSigner();
    const contract = this.contract.connect(signer);
    return contract.claimNFT(tokenId);
  }

  async hasRole(role: string, address: string) {
    return this.contract.hasRole(ethers.id(role), address);
  }

  async addMinter(address: string) {
    const signer = await getSigner();
    const contract = this.contract.connect(signer);
    return contract.addMinter(address);
  }

  async getNFTData(tokenId: number) {
    return this.contract.nftData(tokenId);
  }
}