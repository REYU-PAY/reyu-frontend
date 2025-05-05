
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import TokenBalance from '@/components/TokenBalance';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();
  const [ptBalance, setPtBalance] = useState("1,000.00");
  const [ytBalance, setYtBalance] = useState("75.25");

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [previewPT, setPreviewPT] = useState('0.00');
  const [previewYT, setPreviewYT] = useState('0.00');
  const [withdrawFee, setWithdrawFee] = useState('0.00');
  const [withdrawNet, setWithdrawNet] = useState('0.00');

  // Add animation classes to elements as they appear on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1 });

    for (const el of document.querySelectorAll('.animate-on-scroll')) {
      observer.observe(el);
    }

    return () => {
      for (const el of document.querySelectorAll('.animate-on-scroll')) {
        observer.unobserve(el);
      }
    };
  }, []);

  const handleDeposit = () => {
    setAmount('');
    setPreviewPT('0.00');
    setPreviewYT('0.00');
    setIsDepositOpen(true);
  };

  const handleWithdraw = () => {
    setAmount('');
    setWithdrawFee('0.00');
    setWithdrawNet('0.00');
    setIsWithdrawOpen(true);
  };

  // Update withdraw preview values when amount changes
  const updateWithdrawPreview = (value: string) => {
    setAmount(value);

    if (!value || isNaN(Number(value)) || Number(value) <= 0) {
      setWithdrawFee('0.00');
      setWithdrawNet('0.00');
      return;
    }

    // Calculate 5% fee
    const feeAmount = Number(value) * 0.05;
    setWithdrawFee(feeAmount.toFixed(2));

    // Calculate net amount after fee
    const netAmount = Number(value) - feeAmount;
    setWithdrawNet(netAmount.toFixed(2));
  };

  // Update preview values when amount changes
  const updatePreview = (value: string) => {
    setAmount(value);

    if (!value || Number.isNaN(Number(value)) || Number(value) <= 0) {
      setPreviewPT('0.00');
      setPreviewYT('0.00');
      return;
    }

    // PT is 1:1 with deposit amount
    setPreviewPT(Number(value).toFixed(2));

    // YT is 5% of deposit amount
    const ytAmount = Number(value) * 0.05;
    setPreviewYT(ytAmount.toFixed(2));
  };

  const handleDepositSubmit = () => {
    if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive"
      });
      return;
    }

    // Simulate deposit
    const currentBal = Number.parseFloat(ptBalance.replace(/,/g, ''));
    setPtBalance((currentBal + Number(amount)).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));

    // Simulate YT earned at 5% rate
    const ytEarned = Number(amount) * 0.05;
    const currentYtBal = Number.parseFloat(ytBalance.replace(/,/g, ''));
    setYtBalance((currentYtBal + ytEarned).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));

    toast({
      title: "Deposit successful",
      description: `You have deposited ${amount} PT and received ${ytEarned.toFixed(2)} YT`,
    });

    setIsDepositOpen(false);
    setAmount('');
  };

  const handleWithdrawSubmit = () => {
    if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive"
      });
      return;
    }

    const tokenBalance = Number.parseFloat(ptBalance.replace(/,/g, ''));

    if (Number(amount) > tokenBalance) {
      toast({
        title: "Insufficient balance",
        description: "Your PT balance is not enough for this withdrawal",
        variant: "destructive"
      });
      return;
    }

    // Simulate withdrawal
    const currentBal = Number.parseFloat(ptBalance.replace(/,/g, ''));
    setPtBalance((currentBal - Number(amount)).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));

    // Apply 5% fee (simplified, no time check)
    toast({
      title: "Early withdrawal fee applied",
      description: "A 5% fee was deducted because PT was held for less than 30 days",
      variant: "default"
    });

    toast({
      title: "Withdrawal successful",
      description: `You have withdrawn ${amount} PT`,
    });

    setIsWithdrawOpen(false);
    setAmount('');
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <div className="pt-32 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Monitor and manage your REYU tokens</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll opacity-0">
          {/* Principal Token Card */}
          <TokenBalance
            tokenType="PT"
            balance={ptBalance}
          />

          {/* Yield Token Card */}
          <TokenBalance
            tokenType="YT"
            balance={ytBalance}
            onDeposit={handleDeposit}
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-on-scroll opacity-0">
          {/* Deposit Card */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 silver-gradient">Deposit Assets</h3>
            <p className="text-blue-50/80 mb-4">
              Deposit your crypto assets and receive Principal Tokens (PT) and Yield Tokens (YT).
            </p>
            <Button
              className="flex items-center gap-2 bg-blue-500 text-white"
              onClick={handleDeposit}
            >
              <ArrowDown size={16} />
              Deposit Asset
            </Button>
          </div>

          {/* Withdraw Card */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 silver-gradient">Withdraw Principal</h3>
            <p className="text-blue-50/80 mb-4">
              Withdraw your principal by redeeming your PT tokens. Hold for 30 days to avoid fees.
            </p>
            <Button
              className="flex items-center gap-2 bg-blue-500 text-white"
              onClick={handleWithdraw}
            >
              <ArrowUp size={16} />
              Withdraw Principal
            </Button>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="mt-12 animate-on-scroll opacity-0">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <div className="glass rounded-2xl p-6">
            <div className="py-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Deposit PT</p>
                  <p className="text-sm text-gray-600">2025-05-05 10:23 AM</p>
                  <div className="mt-1 text-xs text-gray-500">
                    <span className="bg-muted px-2 py-0.5 rounded-full">TxHash: 0x8f2...3e21</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-medium">+500.00 PT</div>
                  <div className="text-green-500 text-xs">+25.00 YT Generated</div>
                </div>
              </div>
            </div>
            <div className="py-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">YT Generated</p>
                  <p className="text-sm text-gray-600">2025-05-05 10:23 AM</p>
                  <div className="mt-1 text-xs text-gray-500">
                    <span className="bg-muted px-2 py-0.5 rounded-full">Deposit Reward</span>
                  </div>
                </div>
                <div className="text-green-600 font-medium">+25.00 YT</div>
              </div>
            </div>
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Marketplace Purchase</p>
                  <p className="text-sm text-gray-600">2025-05-04 3:45 PM</p>
                  <div className="mt-1 text-xs text-gray-500">
                    <span className="bg-muted px-2 py-0.5 rounded-full">Item: Premium NFT Access</span>
                    <span className="bg-muted px-2 py-0.5 rounded-full ml-1">TxHash: 0x4a7...9b12</span>
                  </div>
                </div>
                <div className="text-red-600 font-medium">-15.75 YT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Dialog */}
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogContent className="glass-dark sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Asset</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount to deposit
            </label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => updatePreview(e.target.value)}
              type="number"
              placeholder="0.00"
              className="w-full"
            />
            <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">You will receive:</p>
                  <p className="text-blue-400 font-medium">{previewPT} PT</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Yield tokens:</p>
                  <p className="text-blue-400 font-medium">{previewYT} YT</p>
                </div>
              </div>
            </div>
            <p className="text-blue-400 text-sm mt-2">
              You will receive 5% of your deposit as YT immediately
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDepositSubmit}
              className="bg-reyu-blue hover:bg-reyu-blue-dark text-white animated-button"
            >
              Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="glass-dark sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw PT</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount to withdraw
            </label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => updateWithdrawPreview(e.target.value)}
              type="number"
              placeholder="0.00"
              className="w-full"
            />

            <div className="mt-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <h4 className="text-sm font-medium mb-2">Withdrawal Details:</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Amount:</span>
                  <span className="text-sm font-medium">{amount || '0.00'} PT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Early Withdrawal Fee (5%):</span>
                  <span className="text-sm font-medium text-amber-500">-{withdrawFee} PT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Network Fee:</span>
                  <span className="text-sm font-medium">0.001 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Slippage Tolerance:</span>
                  <span className="text-sm font-medium">0.5%</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">You will receive:</span>
                    <span className="text-sm font-medium text-blue-400">{withdrawNet} PT</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-amber-500 text-sm mt-2">
              Warning: Early withdrawals before 30 days incur a 5% fee
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>Cancel</Button>
            <Button
              onClick={handleWithdrawSubmit}
              className="bg-reyu-blue hover:bg-reyu-blue-dark text-white animated-button"
            >
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
