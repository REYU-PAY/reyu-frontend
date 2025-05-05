
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface MarketplaceItemProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  rating?: number;
  stock?: number;
  onPurchase: () => void;
}

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({
  title,
  description,
  price,
  imageUrl,
  category = "Item",
  rating = 4.5,
  stock = 10,
  onPurchase
}) => {
  return (
    <Card className="glass-dark overflow-hidden">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/10 backdrop-blur-md text-white">
            {category}
          </Badge>
        </div>
        {stock < 5 && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" className="bg-red-500/70 backdrop-blur-md">
              Low Stock
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-label="Rating star">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-300">{rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold blue-gradient">
            {price} YT
          </div>
          <div className="text-xs text-gray-400">
            Stock: {stock}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-reyu-blue"
          onClick={onPurchase}
        >
          <ShoppingCart className="mr-1 h-4 w-4" /> Purchase
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketplaceItem;
