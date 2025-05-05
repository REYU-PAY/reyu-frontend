
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TokenFaucetProps {
  tokenType: 'PT' | 'YT';
  onClaim: () => void;
  isLoading: boolean;
}

const TokenFaucet: React.FC<TokenFaucetProps> = ({ tokenType, onClaim, isLoading }) => {
  const isYieldToken = tokenType === 'YT';

  return (
    <Card className={`glass ${isYieldToken ? 'border-reyu-blue/30' : 'border-reyu-silver/30'}`}>
      <CardHeader>
        <CardTitle className={isYieldToken ? 'blue-gradient' : 'silver-gradient'}>
          {isYieldToken ? 'Yield Token (YT)' : 'Principal Token (PT)'}
        </CardTitle>
        <CardDescription>
          {isYieldToken
            ? 'Claim test YT tokens to use in the marketplace'
            : 'Claim test PT tokens to see how staking works'}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-xl mb-2">Claim 100 {tokenType}</div>
        <p className="text-sm text-gray-600">Tokens will be added to your balance immediately</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-reyu-blue hover:bg-reyu-blue-dark"
          onClick={onClaim}
          disabled={isLoading}
        >
          {isLoading ? 'Claiming...' : `Claim ${tokenType}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenFaucet;
