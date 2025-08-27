import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CartItem, useProducts } from '../contexts/ProductContext';
import { useSales } from '../contexts/SalesContext';


// Componente para renderizar cada produto vendido
const SoldItem = ({ item }: { item: CartItem }) => (
    <View style={styles.soldItemContainer}>
        <Text style={styles.soldItemName}>{item.quantity}x {item.name}</Text>
        <Text style={styles.soldItemPrice}>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</Text>
    </View>
);

export default function SaleDetailScreen() {
    const { saleId } = useLocalSearchParams();
    const router = useRouter();
    const {restoreStock} = useProducts();
    const { sales, deleteSale } = useSales();

    // Encontramos a venda específica no nosso histórico usando o ID
    const sale = sales.find(s => s.id === saleId);

    // Se, por algum motivo, a venda não for encontrada, mostramos uma mensagem
    if (!sale) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Venda não encontrada!</Text>
            </SafeAreaView>
        );
    }

    // Formatamos a data para exibição
    const formattedDate = new Date(sale.date).toLocaleString('pt-BR', {
        dateStyle: 'full',
        timeStyle: 'short',
    });


    const handleRevertSale = () => {
        Alert.alert(
            "Reverter Venda",
            "Tem certeza de que deseja reverter esta venda? O estoque dos produtos será restaurado e este registro será excluído.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Confirmar Reversão",
                    style: "destructive",
                    // Ação a ser executada ao confirmar
                    onPress: () => {
                        restoreStock(sale.items);
                        deleteSale(sale.id);
                        Alert.alert("Sucesso", "A venda foi revertida e o estoque restaurado.");
                        router.back();
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: 'Detalhes da Venda' }} />

            <View style={styles.summaryContainer}>
                <Text style={styles.dateText}>{formattedDate}</Text>
                <Text style={styles.totalLabel}>VALOR TOTAL</Text>
                <Text style={styles.totalValue}>R$ {sale.totalValue.toFixed(2).replace('.', ',')}</Text>
            </View>

            <Text style={styles.itemsHeader}>Itens Vendidos</Text>
            <FlatList
                data={sale.items}
                renderItem={({ item }) => <SoldItem item={item} />}
                keyExtractor={(item) => item.productId}
                contentContainerStyle={styles.list}
            />

            <View style={styles.footer}>
                <Button
                    title="Reverter Venda"
                    color="#c0392b"
                    onPress={handleRevertSale}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    summaryContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dateText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    totalLabel: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 15,
        textTransform: 'uppercase',
    },
    totalValue: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    itemsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        padding: 20,
        paddingBottom: 10,
    },
    list: {
        paddingHorizontal: 20,
    },
    soldItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    soldItemName: {
        fontSize: 16,
    },
    soldItemPrice: {
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: 'white',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
    },
});