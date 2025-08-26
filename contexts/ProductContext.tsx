import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';

export type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
  gender: 'Masculino' | 'Feminino' | 'Unissex';
  stock: number;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

// Adiciona o estado da sacola (cart) e as funções para manipulá-la.
type ProductContextType = {
  products: Product[];
  cart: CartItem[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  addToCart: (product: Product) => boolean;
  finalizeSale: () => void;
  // Futuramente: removeFromCart, updateCartQuantity, clearCart, etc.
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// --- PROVEDOR ---
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Camiseta Básica', price: 79.90, color: 'Branca', gender: 'Unissex', stock: 15 },
    { id: '2', name: 'Calça Jeans', price: 199.90, color: 'Azul', gender: 'Feminino', stock: 10 },
    { id: '3', name: 'Moletom', price: 249.90, color: 'Preto', gender: 'Masculino', stock: 5 },
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Função para adicionar um novo produto à lista mestre
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = { id: Date.now().toString(), ...productData };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  // ADICIONAR PRODUTO À SACOLA
  // [CORREÇÃO #1] Lógica de 'addToCart' atualizada
  const addToCart = (product: Product): boolean => {
    const existingItem = cart.find(item => item.productId === product.id);
    const productInStock = products.find(p => p.id === product.id);
    const currentStock = productInStock ? productInStock.stock : 0;
    const quantityInCart = existingItem ? existingItem.quantity : 0;
    
    if (quantityInCart >= currentStock) {
      Alert.alert('Estoque Insuficiente', 'Você já adicionou a quantidade máxima disponível para este item.');
      return false; // Retorna 'falso' para indicar que a operação falhou
    }

    if (existingItem) {
      setCart(cart.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      const newItem: CartItem = { productId: product.id, name: product.name, price: product.price, quantity: 1 };
      setCart(prevCart => [...prevCart, newItem]);
    }
    return true; // Retorna 'verdadeiro' para indicar sucesso
  };

  // [CORREÇÃO #2] Lógica de 'finalizeSale' reescrita
  const finalizeSale = () => {
    // Cria um mapa da sacola para busca rápida (mais eficiente)
    const cartMap = new Map(cart.map(item => [item.productId, item.quantity]));

    // Percorre a lista de produtos UMA ÚNICA VEZ
    const updatedProducts = products.map(product => {
      // Se o produto está no mapa da sacola
      if (cartMap.has(product.id)) {
        const soldQuantity = cartMap.get(product.id)!;
        // Retorna o produto com o estoque atualizado
        return { ...product, stock: product.stock - soldQuantity };
      }
      // Se não, retorna o produto como estava
      return product;
    });

    setProducts(updatedProducts);
    setCart([]);
  };

  const value = {
    products,
    cart, 
    addProduct,
    addToCart,
    finalizeSale, 
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// Hook customizado 
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de um ProductProvider');
  }
  return context;
};