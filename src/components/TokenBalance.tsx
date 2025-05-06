
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TokenBalanceProps {
  tokenType: 'pRYU' | 'yRYU';
  balance: string;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({
  tokenType,
  balance,
  onDeposit,
  onWithdraw
}) => {
  const isYieldToken = tokenType === 'yRYU';

  return (
    <Card className="glass h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className={`${isYieldToken ? 'blue-gradient' : 'silver-gradient'} glow-text`}>
          {isYieldToken ? 'Yield Token (yRYU)' : 'Principal Token (pRYU)'}
        </CardTitle>
        <CardDescription>
          {isYieldToken
            ? 'Use instantly to purchase items in the marketplace'
            : 'Hold for 30 days to avoid 5% early withdrawal fee'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="text-3xl font-bold">
            {balance} {tokenType}
          </div>

          {isYieldToken && (
            <Button
              variant="outline"
              className="flex items-center gap-2 border-blue-400 text-blue-400 mt-3"
              onClick={onDeposit}
            >
              <Plus size={16} />
              Earn More
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBalance;
