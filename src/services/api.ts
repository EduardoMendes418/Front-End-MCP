
const API_BASE = 'https://jsonplaceholder.typicode.com'; 

export const apiService = {

  async getUsers() {
    const response = await fetch(`${API_BASE}/users`);
    return response.json();
  },

  async createUser(user: any) {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  },


  async getProducts() {
    return mockProducts;
  },

  async createProduct(product: any) {
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      ...product,
    };
    return newProduct;
  },


  async getSales() {
    return mockSales;
  },

  async createSale(sale: any) {
    const newSale = {
      id: Math.random().toString(36).substr(2, 9),
      ...sale,
      date: new Date().toISOString().split('T')[0],
    };
    return newSale;
  },


  async getDashboardData() {
    return mockDashboardData;
  },
};


const mockProducts = [
  {
    id: 1,
    name: "Notebook Pro",
    category: "Tecnologia",
    price: 2500,
    stock: 45,
  },
  {
    id: 2,
    name: "Smartphone Max",
    category: "Tecnologia",
    price: 1200,
    stock: 89,
  },
  {
    id: 3,
    name: "Tablet Lite",
    category: "Tecnologia",
    price: 800,
    stock: 23,
  },
];

const mockSales = [
  {
    id: 1,
    product: "Notebook Pro",
    client: "Cliente A",
    amount: 2500,
    date: "2024-01-15",
    status: "completed"
  },
  {
    id: 2,
    product: "Smartphone Max",
    client: "Cliente B",
    amount: 1200,
    date: "2024-01-14",
    status: "pending"
  },
];

const mockDashboardData = {
  revenue: 125000,
  orders: 284,
  customers: 1562,
  growth: 12.5,
};