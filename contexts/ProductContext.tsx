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
  addToCart: (product: Product) => void;
  finalizeSale: () => void;
  // Futuramente: removeFromCart, updateCartQuantity, clearCart, etc.
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// --- PROVEDOR ---
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Função para adicionar um novo produto à lista mestre
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = { id: Date.now().toString(), ...productData };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  // ADICIONAR PRODUTO À SACOLA
  const addToCart = (product: Product) => {
    // Verifica se o produto já está na sacola
    const existingItem = cart.find(item => item.productId === product.id);

    // Validação de estoque
    const productInStock = products.find(p => p.id === product.id);
    const currentStock = productInStock ? productInStock.stock : 0;
    const quantityInCart = existingItem ? existingItem.quantity : 0;
    
    if (quantityInCart >= currentStock) {
      Alert.alert('Estoque Insuficiente', 'Você já adicionou a quantidade máxima disponível para este item.');
      return;
    }

    if (existingItem) {
      // Se já existe, apenas incrementa a quantidade
      setCart(
        cart.map(item =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Se não existe, adiciona o novo item à sacola
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      setCart(prevCart => [...prevCart, newItem]);
    }
  };

  // finção para finalizar venda no carrinho
  const finalizeSale = () => {
    let updatedProducts = [...products];

    // mapeando os produtos para atualizar o estoque (verificar depois!!)
    cart.forEach(cartItem => {
      updatedProducts = updatedProducts.map(produto => {
        if (produto.id === cartItem.productId) {
          return { ...produto, stock: produto.stock - cartItem.quantity };
        }
        return produto;
      });
    });
  }

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