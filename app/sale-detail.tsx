import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { CartItem, useProducts } from '../contexts/ProductContext';
import { useSales } from '../contexts/SalesContext';

const theme = Colors.dark;

// Componente para renderizar cada produto vendido
const SoldItem = ({ item }: { item: CartItem }) => (
    <View style={styles.soldItemContainer}>
        <Text style={styles.soldItemName}>{item.quantity}x {item.name}</Text>
        <Text style={styles.soldItemPrice}>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</Text>
    </View>
);

const SaleDetailScreen = () => {
    const { saleId } = useLocalSearchParams();
    const router = useRouter();
    const {restoreStock} = useProducts();
    const { sales, deleteSale } = useSales();

    const sale = sales.find(s => s.id === saleId);

    // Se, por algum motivo, a venda não for encontrada, mostra uma mensagem
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
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          title: 'Detalhes da Venda',
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
        }}
      />
      
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
          color={theme.danger} // Usando a cor de perigo do nosso tema
          onPress={handleRevertSale}
        />
      </View>
    </SafeAreaView>
  );
}

export default SaleDetailScreen;

// Estilos completamente atualizados para o tema escuro
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    summaryContainer: {
        backgroundColor: theme.card,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    dateText: {
        fontSize: 16,
        color: theme.tabIconDefault,
        textAlign: 'center',
    },
    totalLabel: {
        fontSize: 14,
        color: theme.tabIconDefault,
        textAlign: 'center',
        marginTop: 15,
        textTransform: 'uppercase',
    },
    totalValue: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.tint, // Dourado para dar destaque
    },
    itemsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
        padding: 20,
        paddingBottom: 10,
    },
    list: {
        paddingHorizontal: 20,
    },
    soldItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    soldItemName: {
        fontSize: 16,
        color: theme.text,
    },
    soldItemPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.text,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        backgroundColor: theme.card,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: theme.tabIconDefault,
    },
});