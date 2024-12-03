"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from 'lucide-react';

export default function ValidatorPortal() {
  const pendingNFTs = [
    { id: 1, creator: "0x1234...5678", signatures: 2, required: 3 },
    { id: 2, creator: "0x8765...4321", signatures: 1, required: 3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Validator Portal</h1>
      
      <div className="grid gap-6">
        {pendingNFTs.map((nft) => (
          <Card key={nft.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>NFT #{nft.id}</span>
                <Clock className="h-5 w-5 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Creator:</span>
                  <span>{nft.creator}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Signatures:</span>
                  <span>{nft.signatures} / {nft.required}</span>
                </div>
                <Button className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Sign NFT
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}