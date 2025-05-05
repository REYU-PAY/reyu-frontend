
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowRight, CheckCircle, Wallet, ShoppingBag, TrendingUp, Shield } from 'lucide-react';

const Index = () => {
  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    for (const elem of document.querySelectorAll('.animate-on-scroll')) {
      observer.observe(elem);
    }

    // Initialize mouse trail effect
    const trailContainer = document.getElementById('trail-container');
    if (trailContainer) {
      const createTrail = (e: MouseEvent) => {
        if (Math.random() > 0.9) {
          const blob = document.createElement('div');
          blob.className = 'gradient-blob';
          blob.style.left = `${e.clientX - 50}px`;
          blob.style.top = `${e.clientY - 50}px`;
          trailContainer.appendChild(blob);

          setTimeout(() => {
            blob.style.opacity = '0';
            setTimeout(() => {
              if (trailContainer.contains(blob)) {
                trailContainer.removeChild(blob);
              }
            }, 500);
          }, 1000);
        }
      };

      window.addEventListener('mousemove', createTrail);

      return () => {
        window.removeEventListener('mousemove', createTrail);
        observer.disconnect();
      };
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div id="trail-container" className="fixed inset-0 pointer-events-none z-0" />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="glass rounded-3xl p-8 md:p-16 glow-box">
            <div className="max-w-3xl">
              <div className="mb-4 inline-block px-3 py-1 text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">Revolutionary DeFi Platform</div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="silver-gradient glow-text">Buy Now,</span>
                <br />
                <span className="silver-gradient glow-text">Pay Never.</span>
              </h1>

              <p className="text-lg md:text-xl mb-10 text-blue-50/80 leading-relaxed">
                REYU lets you earn yields while shopping. Deposit your crypto,
                receive principal and yield tokens, and spend your yields
                without touching your principal.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-full text-lg">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    Launch App
                    <ArrowRight size={20} />
                  </Link>
                </Button>

                <Button asChild variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-6 rounded-full text-lg">
                  <Link to="/faucet" className="flex items-center gap-2">
                    Get Test Tokens
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-purple-400" />
                  </div>
                </div>
                <span className="text-sm text-blue-50/70">Secure, Transparent & Non-Custodial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center silver-gradient">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass rounded-xl p-6 animate-on-scroll">
              <div className="text-blue-400 text-xl font-semibold mb-3 flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Deposit
              </div>
              <p className="text-blue-50/80">
                Deposit your crypto assets and receive Principal Tokens (PT) and Yield Tokens (YT).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-xl p-6 animate-on-scroll">
              <div className="text-blue-400 text-xl font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Hold
              </div>
              <p className="text-blue-50/80">
                Hold your PT for at least 30 days to avoid early withdrawal fees.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-xl p-6 animate-on-scroll">
              <div className="text-blue-400 text-xl font-semibold mb-3 flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Spend
              </div>
              <p className="text-blue-50/80">
                Use your YT immediately to purchase items in the marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold silver-gradient mb-4">Why Choose REYU?</h2>
            <p className="text-blue-50/80 max-w-2xl mx-auto">
              REYU offers a revolutionary way to use your crypto assets. Here's what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit Items */}
            {[
              {
                title: "Preserve your principal",
                desc: "Your deposit stays intact, allowing you to withdraw your full amount anytime"
              },
              {
                title: "Earn while you spend",
                desc: "Use your yield tokens for purchases without touching your capital"
              },
              {
                title: "No loans or credit checks",
                desc: "A true DeFi solution with no traditional finance requirements"
              },
              {
                title: "Transparent & secure",
                desc: "All transactions are recorded on the blockchain for full transparency"
              }
            ].map((benefit, index) => (
              <div key={index} className="glass rounded-xl p-6 flex items-start gap-4 animate-on-scroll">
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-50">{benefit.title}</h3>
                  <p className="text-blue-50/80">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="glass-dark rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="blue-gradient text-4xl font-bold mb-2">$1.2M+</div>
              <p className="text-blue-50/80">Total Value Locked</p>
            </div>
            <div className="p-4">
              <div className="blue-gradient text-4xl font-bold mb-2">12,500+</div>
              <p className="text-blue-50/80">Active Users</p>
            </div>
            <div className="p-4">
              <div className="blue-gradient text-4xl font-bold mb-2">8.5%</div>
              <p className="text-blue-50/80">Average Annual Yield</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works detailed */}
      <section className="py-16 px-6 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center silver-gradient">The REYU Process</h2>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Deposit Your Assets",
                desc: "Start by depositing your crypto assets into the REYU platform. This can be any supported cryptocurrency.",
                align: "left",
                icon: <TrendingUp className="h-8 w-8 text-blue-400" />
              },
              {
                step: "02",
                title: "Receive PT & YT Tokens",
                desc: "For each deposit, you'll receive an equivalent amount of Principal Tokens (PT) and Yield Tokens (YT) based on the current exchange rate.",
                align: "right",
                icon: <Wallet className="h-8 w-8 text-blue-400" />
              },
              {
                step: "03",
                title: "Spend Your YT",
                desc: "Use your Yield Tokens to shop in the REYU marketplace. YT can be spent immediately with no restrictions.",
                align: "left",
                icon: <ShoppingBag className="h-8 w-8 text-blue-400" />
              },
              {
                step: "04",
                title: "Withdraw Your Principal",
                desc: "When you're ready, withdraw your original deposit by redeeming your Principal Tokens. Hold for 30 days to avoid early withdrawal fees.",
                align: "right",
                icon: <Shield className="h-8 w-8 text-blue-400" />
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`flex flex-col ${item.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 items-center animate-on-scroll`}
              >
                <div className="w-full md:w-1/3 glass rounded-xl p-6 flex justify-center items-center aspect-square">
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">{item.icon}</div>
                    <div className="blue-gradient text-xl font-bold mb-2">{item.step}</div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-50">{item.title}</h3>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-lg text-blue-50/80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="glass-dark rounded-3xl p-8 md:p-16 text-center">
            <div className="inline-block mb-6 px-4 py-1 rounded-full bg-blue-500/20 border border-blue-400/20">
              <span className="text-sm font-medium text-blue-400">Limited Time Offer</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 silver-gradient glow-text">
              Ready to start earning while spending?
            </h2>

            <p className="text-lg mb-10 max-w-2xl mx-auto text-blue-50/80 leading-relaxed">
              Join the REYU platform and discover a new way to use your crypto assets.
              Earn yields and spend them without touching your principal.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild className="bg-blue-500 text-white px-8 py-6 rounded-full text-lg">
                <Link to="/dashboard" className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight size={20} />
                </Link>
              </Button>

              <Button asChild variant="outline" className="border-blue-400/50 text-blue-300 px-8 py-6 rounded-full text-lg">
                <Link to="#" className="flex items-center gap-2">
                  Learn More
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="flex items-center gap-2 text-blue-50/60 text-sm">
                <Shield className="h-4 w-4" />
                <span>Secure & Non-Custodial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-50/60">
            © 2025 REYU - Reward Earnings Yield Utility. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
