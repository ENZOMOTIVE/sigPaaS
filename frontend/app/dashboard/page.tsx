"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Shield, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import NFTMintingForm from '@/components/NFTMintingForm';
import { MultiSigNFTContract } from '@/lib/contracts/MultiSigNFT';

export default function Dashboard() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!profile || !['admin', 'minter'].includes(profile.role))) {
      router.push('/');
    }
  }, [profile, loading, router]);

  const handleAddMinter = async (address: string) => {
    try {
      const contract = await MultiSigNFTContract.connect();
      await contract.addMinter(address);
    } catch (error) {
      console.error('Failed to add minter:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile || !['admin', 'minter'].includes(profile.role)) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {profile.role === 'admin' ? 'Admin Dashboard' : 'Minter Dashboard'}
      </h1>
      
      <Tabs defaultValue={profile.role === 'admin' ? "assign-minters" : "start-minting"} className="space-y-4">
        {profile.role === 'admin' && (
          <>
            <TabsList>
              <TabsTrigger value="assign-minters">
                <Users className="mr-2 h-4 w-4" />
                Assign Minters
              </TabsTrigger>
              <TabsTrigger value="platform-validators">
                <Shield className="mr-2 h-4 w-4" />
                Platform Validators
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assign-minters">
              <Card>
                <CardHeader>
                  <CardTitle>Assign Minter Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="minter-address">Wallet Address</Label>
                      <Input id="minter-address" placeholder="Enter wallet address" />
                    </div>
                    <Button onClick={() => {
                      const address = (document.getElementById('minter-address') as HTMLInputElement).value;
                      handleAddMinter(address);
                    }}>
                      Assign Minter Role
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        <TabsContent value="start-minting">
          <Card>
            <CardHeader>
              <CardTitle>Create New NFT</CardTitle>
            </CardHeader>
            <CardContent>
              <NFTMintingForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}