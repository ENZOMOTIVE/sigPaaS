"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

const DEMO_NFTS = [
  {
    id: 1,
    title: "Cosmic Explorer #1",
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=500&h=500&fit=crop",
    price: "0.5 ETH",
    creator: "0x1234...5678"
  },
  {
    id: 2,
    title: "Digital Dreams #7",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=500&fit=crop",
    price: "0.8 ETH",
    creator: "0x8765...4321"
  },
  {
    id: 3,
    title: "Abstract Realm #3",
    image: "https://images.unsplash.com/photo-1647100226043-596c4ab6de42?w=500&h=500&fit=crop",
    price: "1.2 ETH",
    creator: "0x9876...1234"
  }
];

export default function Marketplace() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">NFT Marketplace</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_NFTS.map((nft) => (
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
                  <span>{nft.creator}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Price</span>
                  <span className="text-lg font-bold">{nft.price}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
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