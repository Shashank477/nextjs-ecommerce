export const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 599.99,
    image: "https://via.placeholder.com/300x300/007bff/ffffff?text=Smartphone",
    description: "Latest smartphone with advanced features and excellent camera quality.",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Laptop",
    price: 999.99,
    image: "https://via.placeholder.com/300x300/28a745/ffffff?text=Laptop",
    description: "High-performance laptop perfect for work and gaming.",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Headphones",
    price: 199.99,
    image: "https://via.placeholder.com/300x300/dc3545/ffffff?text=Headphones",
    description: "Wireless noise-canceling headphones with premium sound quality.",
    category: "Audio"
  },
  {
    id: 4,
    name: "Watch",
    price: 299.99,
    image: "https://via.placeholder.com/300x300/ffc107/000000?text=Watch",
    description: "Smartwatch with fitness tracking and health monitoring.",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Camera",
    price: 799.99,
    image: "https://via.placeholder.com/300x300/6610f2/ffffff?text=Camera",
    description: "Professional DSLR camera for photography enthusiasts.",
    category: "Electronics"
  },
  {
    id: 6,
    name: "Backpack",
    price: 79.99,
    image: "https://via.placeholder.com/300x300/20c997/ffffff?text=Backpack",
    description: "Durable and spacious backpack for travel and daily use.",
    category: "Accessories"
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};