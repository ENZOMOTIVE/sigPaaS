"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MultiSigNFTContract } from '@/lib/contracts/MultiSigNFT';
import { Upload } from 'lucide-react';

export default function NFTMintingForm() {
  const [formData, setFormData] = useState({
    recipient: '',
    image: null as File | null,
    requiredSignatures: 1,
    useCustomValidators: false,
    customValidators: [] as string[],
    isPFP: false,
    price: '',
    mintType: 0, // 0: DirectMint, 1: DesignatedRecipient, 2: MarketplaceListing
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Upload image to IPFS or your preferred storage
      // const imageUrl = await uploadToIPFS(formData.image);
      
      const contract = await MultiSigNFTContract.connect();
      await contract.createNFT(
        formData.recipient,
        "ipfs://your-metadata-uri", // Replace with actual metadata URI
        formData.requiredSignatures,
        formData.useCustomValidators,
        formData.customValidators,
        formData.isPFP,
        formData.price,
        formData.mintType
      );
    } catch (error) {
      console.error('Failed to create NFT:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Mint Type</Label>
        <RadioGroup
          defaultValue="0"
          onValueChange={(value) => 
            setFormData({ ...formData, mintType: parseInt(value) })
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="direct" />
            <Label htmlFor="direct">Direct Mint</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="designated" />
            <Label htmlFor="designated">Designated Recipient</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="marketplace" />
            <Label htmlFor="marketplace">Marketplace Listing</Label>
          </div>
        </RadioGroup>
      </div>

      {(formData.mintType === 0 || formData.mintType === 1) && (
        <div>
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            value={formData.recipient}
            onChange={(e) => 
              setFormData({ ...formData, recipient: e.target.value })
            }
            placeholder="Enter recipient wallet address"
          />
        </div>
      )}

      <div>
        <Label htmlFor="image">NFT Image</Label>
        <div className="mt-1 flex items-center">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => document.getElementById('image')?.click()}
            variant="outline"
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="price">Price (ETH)</Label>
        <Input
          id="price"
          type="number"
          step="0.001"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="Enter price in ETH"
        />
      </div>

      <div>
        <Label htmlFor="signatures">Required Signatures</Label>
        <Input
          id="signatures"
          type="number"
          min="1"
          value={formData.requiredSignatures}
          onChange={(e) => 
            setFormData({ 
              ...formData, 
              requiredSignatures: parseInt(e.target.value) 
            })
          }
        />
      </div>

      <Button type="submit" className="w-full">
        Create NFT
      </Button>
    </form>
  );
}