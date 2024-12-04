"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Shield, Plus } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import NFTMintingForm from '@/components/NFTMintingForm';
import { MultiSigNFTContract } from '@/lib/contracts/MultiSigNFT';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ethers } from 'ethers';

export default function Dashboard() {
  const { profile, loading, error } = useAuth();
  const router = useRouter();
  const [validatorAddress, setValidatorAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!loading && !profile) {
      router.push('/');
    }
  }, [profile, loading, router]);

  const handleAddMinter = async (address: string) => {
    try {
      setIsProcessing(true);
      const contract = await MultiSigNFTContract.connect();
      const tx = await contract.addMinter(address);
      await tx.wait();
      alert('Minter role assigned successfully!');
    } catch (error) {
      console.error('Failed to add minter:', error);
      alert('Failed to assign minter role. Check console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddValidator = async () => {
    if (!ethers.isAddress(validatorAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    try {
      setIsProcessing(true);
      const contract = await MultiSigNFTContract.connect();
      const validatorRole = ethers.id('VALIDATOR_ROLE');
      const tx = await contract.grantRole(validatorRole, validatorAddress);
      await tx.wait();
      alert('Validator role assigned successfully!');
      setValidatorAddress('');
    } catch (error) {
      console.error('Failed to add validator:', error);
      alert('Failed to assign validator role. Check console for details.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile || !['admin', 'minter'].includes(profile.role)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>You do not have access to this dashboard.</AlertDescription>
        </Alert>
      </div>
    );
  }

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
                    <Button 
                      onClick={() => {
                        const address = (document.getElementById('minter-address') as HTMLInputElement).value;
                        handleAddMinter(address);
                      }}
                      disabled={isProcessing}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {isProcessing ? 'Assigning...' : 'Assign Minter Role'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="platform-validators">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Platform Validators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="validator-address">Validator Wallet Address</Label>
                      <Input 
                        id="validator-address"
                        placeholder="Enter validator wallet address"
                        value={validatorAddress}
                        onChange={(e) => setValidatorAddress(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleAddValidator}
                      disabled={isProcessing || !validatorAddress}
                      className="w-full"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      {isProcessing ? 'Assigning...' : 'Assign Validator Role'}
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