import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

// Types para produtos
export type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
  gender: 'Masculino' | 'Feminino' | 'Unissex';
  stock: number;
};

// Type para itens na sacola
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
  cartItemCount: number;
  addProduct: (product: Omit<Product, 'id'>) => void;
  addToCart: (product: Product) => boolean;
  finalizeSale: () => void;
  deleteProduct: (productId: string) => void;
  editProduct: (updateProduct: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, amount: number) => void;
  restoreStock: (items: CartItem[]) => void;
};

// chave para o AsyncStorage
const PRODUCTS_STORAGE_KEY = '@SandrinhBellaModa:products';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// --- PROVEDOR ---
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega os produtos do AsyncStorage ao montar o componente
  useEffect(() => {
    const LoadProductsFromStorage = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem(PRODUCTS_STORAGE_KEY);
        if (storedProducts !== null) {
          setProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Erro ao carregar produtos', error);
      } finally {
        setLoading(false);
      }
    }

    LoadProductsFromStorage();
  }, []);

  // Salva os produtos no AsyncStorage sempre que a lista de produtos muda ou loading é true
  useEffect(() => {
    const saveProductsToStorage = async () => {
      if (!loading) {
        try {
          const productsString = JSON.stringify(products);
          await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, productsString);
        } catch (error) {
          console.error('Erro ao salvar produtos', error);
        }
      }
    };

    saveProductsToStorage();
  }, [products, loading]);



  // Função para adicionar um novo produto à lista mestre
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = { id: Date.now().toString(), ...productData };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  // ADICIONAR PRODUTO À SACOLA
  const addToCart = (product: Product): boolean => {
    const existingItem = cart.find(item => item.productId === product.id);
    const productInStock = products.find(p => p.id === product.id);
    const currentStock = productInStock ? productInStock.stock : 0;
    const quantityInCart = existingItem ? existingItem.quantity : 0;

    if (quantityInCart >= currentStock) {
      Alert.alert('Estoque Insuficiente', 'Você já adicionou a quantidade máxima disponível para este item.');
      return false;
    }

    if (existingItem) {
      setCart(cart.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      const newItem: CartItem = { productId: product.id, name: product.name, price: product.price, quantity: 1 };
      setCart(prevCart => [...prevCart, newItem]);
    }
    return true;
  };

  // Função para deletar um produto da lista mestre
  const deleteProduct = (productId: string) => {
    // o filter é responsavel por criar um novo array sem o produto deletado
    const updateProducts = products.filter(product => product.id !== productId);
    setProducts(updateProducts);
  };

  const editProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // atualiza a quantidade de um item na sacola
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  // atualiza a quantidade de um item na sacola
  const updateCartQuantity = (productId: string, amount: number) => {
    const productInStock = products.find(p => p.id === productId);
    const currentStock = productInStock ? productInStock.stock : 0;

    setCart(prevCart => {
      const itemInCart = prevCart.find(item => item.productId === productId);
      const currentQuantity = itemInCart ? itemInCart.quantity : 0;

      // Impede de adicionar mais do que o estoque
      if (amount > 0 && currentQuantity + amount > currentStock) {
        Alert.alert('Estoque Insuficiente', 'Não há mais unidades disponíveis para este item.');
        return prevCart; // Retorna o carrinho sem alteração
      }

      const updatedCart = prevCart.map(item => {
        if (item.productId === productId) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Remove o item se a quantidade chegar a 0 ou menos
      return updatedCart.filter(item => item.quantity > 0);
    });
  };

  // calcula o total de itens na sacola
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // finaliza a venda e atualiza o estoque
  const finalizeSale = () => {
    const cartMap = new Map(cart.map(item => [item.productId, item.quantity]));

    const updatedProducts = products.map(product => {
      if (cartMap.has(product.id)) {
        const soldQuantity = cartMap.get(product.id)!;
        return { ...product, stock: product.stock - soldQuantity };
      }
      return product;
    });

    setProducts(updatedProducts);
    setCart([]);
  };

  // função para restaurar o estoque ao deletar uma venda
  const restoreStock = (items: CartItem[]) => {
    const itemsMap = new Map(items.map(item => [item.productId, item.quantity]));

    const updatedProducts = products.map(product => {
      if (itemsMap.has(product.id)) {
        const returnedQuantity = itemsMap.get(product.id)!;
        // Adiciona a quantidade de volta ao estoque
        return { ...product, stock: product.stock + returnedQuantity };
      }
      return product;
    });

    setProducts(updatedProducts);
  };


  const value = {
    products,
    cart,
    addProduct,
    addToCart,
    finalizeSale,
    deleteProduct,
    editProduct,
    removeFromCart,
    updateCartQuantity,
    cartItemCount,
    restoreStock
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