
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import MarketplaceItem from '@/components/MarketplaceItem';

const marketplaceItems = [
  {
    id: 1,
    title: 'Premium Subscription',
    description: 'Get access to premium features for one month with enhanced analytics and personalized recommendations',
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3',
    category: 'Subscription',
    rating: 4.8,
    stock: 15,
  },
  {
    id: 2,
    title: 'Digital Artwork',
    description: 'Unique NFT artwork from renowned digital artists featuring stunning visual effects and animations',
    price: 50,
    imageUrl: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3',
    category: 'Art',
    rating: 4.9,
    stock: 3,
  },
  {
    id: 3,
    title: 'Exclusive Video Course',
    description: 'Learn advanced DeFi strategies with our experts through comprehensive video tutorials and guides',
    price: 35,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3',
    category: 'Education',
    rating: 4.7,
    stock: 20,
  },
  {
    id: 4,
    title: 'Custom Analytics Dashboard',
    description: 'Track your DeFi investments with our analytics tool featuring real-time data and custom alerts',
    price: 45,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3',
    category: 'Tool',
    rating: 4.6,
    stock: 8,
  },
  {
    id: 5,
    title: 'Community Access Pass',
    description: 'Join our exclusive community of DeFi enthusiasts with direct access to experts and private events',
    price: 20,
    imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3',
    category: 'Community',
    rating: 4.5,
    stock: 12,
  },
  {
    id: 6,
    title: 'Strategy Consultation',
    description: '30-minute 1:1 session with our financial advisor to optimize your portfolio and investment strategy',
    price: 60,
    imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3',
    category: 'Service',
    rating: 4.9,
    stock: 4,
  },
];

const Marketplace = () => {
  const { toast } = useToast();
  const [ytBalance] = useState("75.25");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

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

  const handlePurchase = (item: any) => {
    setSelectedItem(item);
    setIsPurchaseOpen(true);
  };

  const confirmPurchase = () => {
    const balance = parseFloat(ytBalance.replace(/,/g, ''));

    if (selectedItem.price > balance) {
      toast({
        title: "Insufficient YT balance",
        description: "You don't have enough YT to make this purchase",
        variant: "destructive"
      });
      return;
    }

    // Simulate purchase
    toast({
      title: "Purchase successful",
      description: `You have purchased ${selectedItem.title} for ${selectedItem.price} YT`,
    });

    setIsPurchaseOpen(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <div className="pt-32 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-on-scroll opacity-0">
          <div>
            <h1 className="text-3xl font-bold mb-2 blue-gradient">Marketplace</h1>
            <p className="text-gray-400">Spend your YT tokens on exclusive items and services</p>
          </div>
          <div className="mt-4 md:mt-0 glass px-4 py-2 rounded-full">
            <span className="text-gray-400">Your balance:</span>{' '}
            <span className="font-bold blue-gradient">{ytBalance} YT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceItems.map((item, index) => (
            <div key={item.id} className="animate-on-scroll opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <MarketplaceItem
                title={item.title}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
                category={item.category}
                rating={item.rating}
                stock={item.stock}
                onPurchase={() => handlePurchase(item)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
        <DialogContent className="glass-dark sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription className="text-gray-400">
              You are about to purchase {selectedItem?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Item:</span>
              <span className="font-medium">{selectedItem?.title}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Price:</span>
              <span className="font-medium blue-gradient">{selectedItem?.price} YT</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Your balance after purchase:</span>
              <span className="font-medium">
                {selectedItem ? (parseFloat(ytBalance.replace(/,/g, '')) - selectedItem.price).toFixed(2) : ''} YT
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPurchaseOpen(false)}>Cancel</Button>
            <Button
              onClick={confirmPurchase}
              className="bg-reyu-blue hover:bg-reyu-blue-dark text-white"
            >
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
