"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { ethers } from 'ethers';

// Import your contract ABI
import CONTRACT_ABI from './contractABI.json';

const CONTRACT_ADDRESS = '0xfdc25759900c68441cd8c490f327ec2ec67fa2b6';

interface NFT {
  id: number;
  title: string;
  image: string;
  price: string;
  creator: string;
}

export default function Marketplace() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNFTs();
  }, []);

  async function fetchNFTs() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const totalSupply = await contract.totalSupply();
        const fetchedNFTs: NFT[] = [];

        for (let i = 1; i <= totalSupply; i++) {
          const tokenURI = await contract.tokenURI(i);
          const owner = await contract.ownerOf(i);
          const price = await contract.getPrice(i);

          // Fetch metadata from IPFS
          const response = await fetch(`https://ipfs.io/ipfs/${tokenURI.replace('ipfs://', '')}`);
          const metadata = await response.json();

          fetchedNFTs.push({
            id: i,
            title: metadata.name,
            image: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
            price: ethers.formatEther(price),
            creator: owner
          });
        }

        setNfts(fetchedNFTs);
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePurchase(nftId: number) {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const price = await contract.getPrice(nftId);
        const tx = await contract.purchase(nftId, { value: price });
        await tx.wait();

        alert("NFT purchased successfully!");
        fetchNFTs(); // Refresh the NFT list
      }
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      alert("Failed to purchase NFT. Please try again.");
    }
  }

  if (loading) {
    return <div>Loading NFTs...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">NFT Marketplace</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <Card key={nft.id} className="overflow-hidden bg-gray-800 border-gray-700">
            <img
              src={nft.image}
              alt={nft.title}
              className="w-full h-64 object-cover"
            />
            <CardHeader>
              <CardTitle>{nft.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Creator</span>
                  <span>{nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Price</span>
                  <span className="text-lg font-bold">{nft.price} ETH</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handlePurchase(nft.id)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Purchase NFT
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

