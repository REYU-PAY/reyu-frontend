
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import TokenFaucet from '@/components/TokenFaucet';

const Faucet = () => {
  const { toast } = useToast();
  const [isClaimingPT, setIsClaimingPT] = useState(false);
  const [isClaimingYT, setIsClaimingYT] = useState(false);

  // Add animation classes to elements as they appear on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // Add a small random delay for a more natural feel
          const delay = Math.random() * 150;
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
          }, delay);
          observer.unobserve(entry.target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is in view
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      for (const el of elements) {
        observer.unobserve(el);
      }
    };
  }, []);

  const handleClaim = (tokenType: 'PT' | 'YT') => {
    if (tokenType === 'PT') {
      setIsClaimingPT(true);

      // Simulate API call delay
      setTimeout(() => {
        toast({
          title: "PT Claimed Successfully",
          description: "100 PT tokens have been added to your balance",
        });
        setIsClaimingPT(false);
      }, 1500);
    } else {
      setIsClaimingYT(true);

      // Simulate API call delay
      setTimeout(() => {
        toast({
          title: "YT Claimed Successfully",
          description: "100 YT tokens have been added to your balance",
        });
        setIsClaimingYT(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <div className="pt-32 px-6 max-w-6xl mx-auto">
        <div className="animate-on-scroll opacity-0">
          <h1 className="text-3xl font-bold mb-2">Token Faucet</h1>
          <p className="text-gray-600 mb-8">Get test tokens to explore the REYU platform</p>
        </div>

        <div className="glass rounded-2xl p-6 mb-10 animate-on-scroll opacity-0">
          <p className="mb-6">
            This faucet provides test tokens that you can use to explore the REYU platform features.
            The tokens have no real value and are only meant for testing purposes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '100ms' }}>
              <TokenFaucet
                tokenType="PT"
                onClaim={() => handleClaim('PT')}
                isLoading={isClaimingPT}
              />
            </div>
            <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '200ms' }}>
              <TokenFaucet
                tokenType="YT"
                onClaim={() => handleClaim('YT')}
                isLoading={isClaimingYT}
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 animate-on-scroll opacity-0">
          <h2 className="text-xl font-bold mb-4">How to use REYU</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 animate-on-scroll opacity-0" style={{ transitionDelay: '100ms' }}>
              <div className="text-lg font-medium text-blue-400 mb-2">1. Get Tokens</div>
              <p className="text-blue-50/80">
                Claim test tokens from the faucet to start experimenting with the platform.
              </p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 animate-on-scroll opacity-0" style={{ transitionDelay: '200ms' }}>
              <div className="text-lg font-medium text-blue-400 mb-2">2. Visit Dashboard</div>
              <p className="text-blue-50/80">
                Go to your dashboard to see your token balances and transaction history.
              </p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 animate-on-scroll opacity-0" style={{ transitionDelay: '300ms' }}>
              <div className="text-lg font-medium text-blue-400 mb-2">3. Explore Marketplace</div>
              <p className="text-blue-50/80">
                Browse the marketplace and purchase items using your YT tokens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faucet;
