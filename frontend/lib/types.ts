export type Role = 'admin' | 'minter' | 'validator' | 'user';

export interface UserProfile {
  address: string;
  role: Role;
}

export interface NFTMetadata {
  tokenId: number;
  metadataURI: string;
  recipient: string;
  requiredSignatures: number;
  isValid: boolean;
  signatureCount: number;
  useCustomValidators: boolean;
  customValidators: string[];
  isPFP: boolean;
  price: number;
  isClaimed: boolean;
  mintType: 'DirectMint' | 'DesignatedRecipient' | 'MarketplaceListing';
}