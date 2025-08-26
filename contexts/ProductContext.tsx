import { createContext, ReactNode, useContext, useState } from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
  gender: 'Masculino' | 'Feminino' | 'Unissex';
  stock: number;
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  // deleteProduct: (id: string) => void;
  // updateStock: (id: string, newStock: number) => void;
};

// 1. CRIANDO O CONTEXTO
// Cria o Contexto com um valor padrão. Lança um erro caso tentar usá-lo fora do provider
const ProductContext = createContext<ProductContextType | undefined>(undefined);


// 2. CRIANDO O PROVEDOR
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  // A lista de produtos começa com nossos dados mokados para exemplo.
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Camiseta Básica', price: 79.90, color: 'Branca', gender: 'Unissex', stock: 15 },
    { id: '2', name: 'Calça Jeans', price: 199.90, color: 'Azul', gender: 'Feminino', stock: 10 },
    { id: '3', name: 'Moletom', price: 249.90, color: 'Preto', gender: 'Masculino', stock: 5 },
  ]);

  // Função para adicionar um novo produto à lista
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productData,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// 3. CRIANDO UM HOOK CUSTOMIZADO 
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de um ProductProvider');
  }
  return context;
};