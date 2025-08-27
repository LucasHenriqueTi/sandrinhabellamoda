import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CartItem } from './ProductContext';

// definição do tipo sale
export type Sale = {
    id: string;
    date: string;
    items: CartItem[];
    totalValue: number;
};

// definição do tipo do contexto
type SalesContextType = {
    sales: Sale[];
    addSale: (items: CartItem[]) => void;
};

const SalesContext = createContext<SalesContextType | undefined>(undefined);

// chave para o armazenamento asyncstorage
const SALES_STORAGE_KEY = '@SandrinhaBellaModa:sales';

const SalesProvider = ({ children }: { children: ReactNode }) => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    // busca as vendas no asyncstorage ao iniciar o app
    useEffect(() => {
        const loadSalesFromStorage = async () => {
            try {
                const storedSales = await AsyncStorage.getItem(SALES_STORAGE_KEY);
                if (storedSales !== null) {
                    setSales(JSON.parse(storedSales));
                    console.log('o storage tem algo', sales)
                }
            } catch (error) {
                console.error('falha ao carregar o historico de vendas', error)
            } finally {
                setLoading(false);
            }
        }
        loadSalesFromStorage();
    }, []);

    // função para salvar uma nova venda ao historico
    useEffect(() => {
        if (!loading) {
            const saveSalesToStorage = async () => {
                try {
                    const jsonValue = JSON.stringify(sales);
                    await AsyncStorage.setItem(SALES_STORAGE_KEY, jsonValue);
                } catch (error) {
                    console.error('falha ao tentar salvar o historico de vendas', error);
                };
            };
            saveSalesToStorage();
        }
    }, [sales, loading])

    // função para adicionar uma nova venda ao historico
    const addSale = (items: CartItem[]) => {
        const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // cria um novo objeto de venda
        const newSale: Sale = {
            id: new Date().toISOString(),
            date: new Date().toISOString(),
            items: items,
            totalValue: totalValue
        };

        setSales(prevSales => [newSale, ...prevSales]);
    };

    const value = {
        sales,
        addSale
    };

    return (
        <SalesContext.Provider value={value}>
            {children}
        </SalesContext.Provider>
    );
};

export const useSales = () => {
    const context = useContext(SalesContext);
    if (context === undefined) {
        throw new Error('useSales deve ser usado dentro de um SalesProvider');
        }
        return context;
    };
