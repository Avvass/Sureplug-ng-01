import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  Plus,
  CircleDot,
  Calendar,
  Activity,
  FileImage
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DashboardStats {
  totalUsers: number;
  onlineUsers: number;
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
}

interface User {
  id: string;
  full_name: string | null;
  email: string;
  is_online: boolean;
  created_at: string;
  last_seen: string;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  profiles: {
    full_name: string | null;
    email: string;
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  category: string;
  is_active: boolean;
  images: string[];
}

const EnhancedAdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    onlineUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0
  });
  
  const [users, setUsers] = useState<User[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock_quantity: '',
    specifications: '',
    features: '',
    images: [] as string[]
  });

  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('id, full_name, email, is_online, created_at, last_seen')
        .order('created_at', { ascending: false });

      // Fetch orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          id,
          total_amount,
          status,
          payment_status,
          created_at,
          profiles!orders_user_id_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      // Calculate stats
      const totalUsers = usersData?.length || 0;
      const onlineUsers = usersData?.filter(u => u.is_online)?.length || 0;
      const totalRevenue = ordersData?.reduce((sum, order) => 
        order.payment_status === 'paid' ? sum + order.total_amount : sum, 0
      ) || 0;
      const totalOrders = ordersData?.length || 0;
      const totalProducts = productsData?.length || 0;

      setStats({
        totalUsers,
        onlineUsers,
        totalRevenue,
        totalOrders,
        totalProducts
      });

      setUsers(usersData || []);
      setRecentOrders(ordersData || []);
      setProducts(productsData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Set up realtime subscriptions
    const usersChannel = supabase
      .channel('dashboard-users')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        fetchDashboardData();
      })
      .subscribe();

    const ordersChannel = supabase
      .channel('dashboard-orders')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders'
      }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(usersChannel);
      supabase.removeChannel(ordersChannel);
    };
  }, []);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          name: productForm.name,
          description: productForm.description,
          price: parseFloat(productForm.price),
          category: productForm.category,
          brand: productForm.brand,
          stock_quantity: parseInt(productForm.stock_quantity),
          specifications: productForm.specifications ? JSON.parse(productForm.specifications) : {},
          features: productForm.features ? productForm.features.split(',').map(f => f.trim()) : [],
          images: productForm.images,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      // Reset form
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        stock_quantity: '',
        specifications: '',
        features: '',
        images: []
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const handleProductDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold neon-text mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your store and monitor performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="product-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="flex items-center gap-2 mt-1">
                <CircleDot className="h-3 w-3 text-brand-success" />
                <span className="text-xs text-muted-foreground">
                  {stats.onlineUsers} online
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="product-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="product-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                <Activity className="inline h-3 w-3 mr-1" />
                +5% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="product-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {products.filter(p => p.is_active).length} active
              </p>
            </CardContent>
          </Card>

          <Card className="product-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Users</CardTitle>
              <CircleDot className="h-4 w-4 text-brand-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-success">{stats.onlineUsers}</div>
              <p className="text-xs text-muted-foreground">
                Real-time activity
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="product-card">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {order.profiles.full_name || order.profiles.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${order.total_amount.toFixed(2)}</p>
                          <Badge 
                            variant={order.payment_status === 'paid' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Online Users */}
              <Card className="product-card">
                <CardHeader>
                  <CardTitle>Online Users</CardTitle>
                  <CardDescription>Currently active users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.filter(user => user.is_online).slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-brand-primary text-primary-foreground">
                              {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-brand-success border-2 border-background rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {user.full_name || user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">Online now</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="product-card">
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-brand-primary text-primary-foreground">
                              {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {user.is_online && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-brand-success border-2 border-background rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{user.full_name || 'No name'}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.is_online ? 'default' : 'secondary'}>
                          {user.is_online ? 'Online' : 'Offline'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Product Form */}
              <Card className="product-card">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>Add a new product to your inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={productForm.name}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={productForm.stock_quantity}
                          onChange={(e) => setProductForm(prev => ({ ...prev, stock_quantity: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smartphones">Smartphones</SelectItem>
                            <SelectItem value="macbooks">MacBooks</SelectItem>
                            <SelectItem value="airpods">AirPods</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                          id="brand"
                          value={productForm.brand}
                          onChange={(e) => setProductForm(prev => ({ ...prev, brand: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="features">Features (comma separated)</Label>
                      <Input
                        id="features"
                        value={productForm.features}
                        onChange={(e) => setProductForm(prev => ({ ...prev, features: e.target.value }))}
                        placeholder="Feature 1, Feature 2, Feature 3"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full btn-premium">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Product List */}
              <Card className="product-card">
                <CardHeader>
                  <CardTitle>Product Inventory</CardTitle>
                  <CardDescription>Manage existing products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-secondary rounded overflow-hidden">
                            <img
                              src={product.images?.[0] || '/api/placeholder/100/100'}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${product.price} • Stock: {product.stock_quantity}
                            </p>
                            <Badge variant={product.is_active ? 'default' : 'secondary'} className="text-xs">
                              {product.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleProductDelete(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="product-card">
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.profiles.full_name || order.profiles.email}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant={order.status === 'confirmed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                          <Badge variant={order.payment_status === 'paid' ? 'default' : 'destructive'}>
                            {order.payment_status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default EnhancedAdminDashboard;