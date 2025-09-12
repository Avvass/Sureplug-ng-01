import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CreditCard, Bitcoin, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'btc'>('paypal');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const taxAmount = totalPrice * 0.1;
  const finalTotal = totalPrice + taxAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const createOrder = async () => {
    if (!user) return null;

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: finalTotal,
          payment_method: paymentMethod,
          shipping_address: shippingInfo
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handlePayPalPayment = async () => {
    setProcessing(true);
    
    try {
      const order = await createOrder();
      if (!order) throw new Error('Failed to create order');

      // Simulate PayPal payment processing
      setTimeout(async () => {
        try {
          // Update payment status
          const { error: paymentError } = await supabase
            .from('payments')
            .insert({
              order_id: order.id,
              amount: finalTotal,
              method: 'paypal',
              status: 'completed',
              transaction_id: `pp_${Date.now()}`,
              payment_data: { processor: 'paypal', method: 'instant' }
            });

          if (paymentError) throw paymentError;

          // Update order status
          await supabase
            .from('orders')
            .update({ 
              status: 'confirmed',
              payment_status: 'paid'
            })
            .eq('id', order.id);

          // Clear cart
          await clearCart();

          toast({
            title: "Payment Successful!",
            description: "Your order has been confirmed and will be processed shortly.",
          });

          navigate('/order-confirmation', { 
            state: { orderId: order.id, paymentMethod: 'PayPal' }
          });
        } catch (error) {
          console.error('Payment processing error:', error);
          toast({
            title: "Payment Failed",
            description: "There was an error processing your payment. Please try again.",
            variant: "destructive",
          });
        } finally {
          setProcessing(false);
        }
      }, 2000);
      
    } catch (error) {
      setProcessing(false);
      toast({
        title: "Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBTCPayment = async () => {
    setProcessing(true);
    
    try {
      const order = await createOrder();
      if (!order) throw new Error('Failed to create order');

      // Simulate BTC payment processing
      const btcAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; // Example address
      const btcAmount = (finalTotal / 45000).toFixed(8); // Assuming BTC price of $45,000

      toast({
        title: "Bitcoin Payment",
        description: `Please send ${btcAmount} BTC to: ${btcAddress}`,
      });

      // Simulate waiting for confirmation
      setTimeout(async () => {
        try {
          // Update payment status
          const { error: paymentError } = await supabase
            .from('payments')
            .insert({
              order_id: order.id,
              amount: finalTotal,
              method: 'btc',
              status: 'completed',
              transaction_id: `btc_${Date.now()}`,
              payment_data: { 
                address: btcAddress, 
                amount_btc: btcAmount,
                confirmations: 3
              }
            });

          if (paymentError) throw paymentError;

          // Update order status
          await supabase
            .from('orders')
            .update({ 
              status: 'confirmed',
              payment_status: 'paid'
            })
            .eq('id', order.id);

          // Clear cart
          await clearCart();

          toast({
            title: "Bitcoin Payment Confirmed!",
            description: "Your payment has been confirmed on the blockchain.",
          });

          navigate('/order-confirmation', { 
            state: { orderId: order.id, paymentMethod: 'Bitcoin' }
          });
        } catch (error) {
          console.error('Bitcoin payment error:', error);
          toast({
            title: "Payment Failed",
            description: "Bitcoin payment could not be confirmed. Please contact support.",
            variant: "destructive",
          });
        } finally {
          setProcessing(false);
        }
      }, 3000);
      
    } catch (error) {
      setProcessing(false);
      toast({
        title: "Error",
        description: "Failed to initiate Bitcoin payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-foreground">Cart</Link>
          <span>/</span>
          <span className="text-foreground">Checkout</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-3xl font-bold neon-text">Checkout</h1>
          <Shield className="w-6 h-6 text-brand-success" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card className="product-card">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter your ZIP code"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleInputChange}
                      placeholder="Enter your country"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="product-card">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="paypal" onValueChange={(value) => setPaymentMethod(value as 'paypal' | 'btc')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="paypal" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      PayPal
                    </TabsTrigger>
                    <TabsTrigger value="btc" className="flex items-center gap-2">
                      <Bitcoin className="w-4 h-4" />
                      Bitcoin
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="paypal" className="space-y-4 mt-4">
                    <div className="p-4 border rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="w-5 h-5 text-brand-primary" />
                        <span className="font-medium">PayPal Payment</span>
                        <Badge variant="outline" className="ml-auto">Instant</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pay securely with your PayPal account or credit card
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handlePayPalPayment}
                      className="w-full btn-premium"
                      disabled={processing}
                    >
                      {processing ? "Processing Payment..." : `Pay $${finalTotal.toFixed(2)} with PayPal`}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="btc" className="space-y-4 mt-4">
                    <div className="p-4 border rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Bitcoin className="w-5 h-5 text-orange-500" />
                        <span className="font-medium">Bitcoin Payment</span>
                        <Badge variant="outline" className="ml-auto">~10 min</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pay with Bitcoin. Confirmation may take up to 10 minutes.
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleBTCPayment}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={processing}
                    >
                      {processing ? "Waiting for Confirmation..." : `Pay ${((finalTotal / 45000).toFixed(8))} BTC`}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="product-card">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images?.[0] || '/api/placeholder/100/100'}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-brand-success">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 p-3 bg-brand-success/10 rounded-lg">
                  <Shield className="w-4 h-4 text-brand-success" />
                  <span className="text-sm text-brand-success font-medium">
                    Secure 256-bit SSL encryption
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;