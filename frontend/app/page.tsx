import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Wallet } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Multi-Signature NFT Platform</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A secure and flexible platform for minting NFTs with multi-signature validation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">For Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Create and manage your NFT collections with customizable validation workflows
              </p>
              <Link href="/dashboard" className="block">
                <Button className="w-full" variant="default">
                  <Wallet className="mr-2 h-4 w-4" />
                  Launch Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">For Validators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Review and validate NFT minting requests through a secure interface
              </p>
              <Link href="/validator" className="block">
                <Button className="w-full" variant="default">
                  <Wallet className="mr-2 h-4 w-4" />
                  Validator Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Browse and collect verified NFTs from our marketplace
              </p>
              <Link href="/marketplace" className="block">
                <Button className="w-full" variant="default">
                  <Wallet className="mr-2 h-4 w-4" />
                  Explore NFTs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}