import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Truck, Home, Mail, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface OrderData {
  id: string;
  total_amount: number;
  payment_method: string;
  status: string;
  payment_status: string;
  created_at: string;
  shipping_address: any;
  order_items: Array<{
    quantity: number;
    price_at_time: number;
    product: {
      name: string;
      images: string[];
    };
  }>;
}

const OrderConfirmation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = location.state?.orderId;
  const paymentMethod = location.state?.paymentMethod;

  useEffect(() => {
    if (!user || !orderId) {
      navigate('/');
      return;
    }

    fetchOrderData();
  }, [user, orderId]);

  const fetchOrderData = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            price_at_time,
            product:products (
              name,
              images
            )
          )
        `)
        .eq('id', orderId)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading order details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link to="/">
            <Button className="btn-premium">Return to Store</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-success rounded-full flex items-center justify-center mx-auto mb-4 dark-glow">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold neon-text mb-2">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <Card className="product-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order ID</span>
                    <p className="font-mono">{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="default" className="bg-brand-success">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment Method</span>
                    <p className="font-medium">{paymentMethod || order.payment_method}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment Status</span>
                    <Badge variant="outline" className="mt-1">
                      {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Order Date</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      <p>{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div className="space-y-3">
                  <h4 className="font-medium">Items Ordered</h4>
                  {order.order_items.map((item, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-12 h-12 bg-background rounded overflow-hidden">
                        <img
                          src={item.product.images?.[0] || '/api/placeholder/100/100'}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.price_at_time * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span>${order.total_amount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Actions */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card className="product-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {order.shipping_address ? (
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">{order.shipping_address.fullName}</p>
                      <p>{order.shipping_address.address}</p>
                      <p>
                        {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}
                      </p>
                      <p>{order.shipping_address.country}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No shipping address provided</p>
                  )}
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estimated delivery:</span>
                      <span className="text-sm font-medium">5-7 business days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tracking:</span>
                      <span className="text-sm text-brand-primary">Available soon</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="product-card">
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-brand-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Confirmation Email</p>
                        <p className="text-xs text-muted-foreground">
                          We've sent a confirmation email to your registered email address
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Package className="w-4 h-4 text-brand-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Order Processing</p>
                        <p className="text-xs text-muted-foreground">
                          Your order will be processed within 1-2 business days
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Truck className="w-4 h-4 text-brand-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Shipping Updates</p>
                        <p className="text-xs text-muted-foreground">
                          You'll receive tracking information once your order ships
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Link to="/">
                      <Button className="w-full btn-premium">
                        <Home className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Button>
                    </Link>
                    
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;