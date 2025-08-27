import { useRouter } from 'expo-router';
import { Alert, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { CartListItem } from '../../components/CartListItem';
import { Colors } from '../../constants/Colors';
import { useProducts } from '../../contexts/ProductContext';
import { useSales } from '../../contexts/SalesContext';

const theme = Colors.dark;

const CartScreen = () => {
  const router = useRouter();
  const { cart, finalizeSale, updateCartQuantity, removeFromCart } = useProducts();
  const { addSale } = useSales();

  // Calculando o preço total da compra
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizeSale = () => {
    addSale(cart);
    finalizeSale();
    Alert.alert('Venda Finalizada', 'O estoque foi atualizado com sucesso!');
    router.push('/(tabs)');
  };

  // Função para confirmar a remoção de um item
  const handleRemoveItem = (productId: string, productName: string) => {
    Alert.alert(
      "Remover Item",
      `Tem certeza de que deseja remover "${productName}" da sacola?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => removeFromCart(productId), style: "destructive" }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sacola de Compras</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Sua sacola está vazia.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <CartListItem 
                item={item} 
                onUpdateQuantity={(amount) => updateCartQuantity(item.productId, amount)}
                onRemove={() => handleRemoveItem(item.productId, item.name)}
              />
            )}
            keyExtractor={(item) => item.productId}
            contentContainerStyle={styles.list}
          />
          <View style={styles.summaryContainer}>
            <Text style={styles.totalText}>Total: R$ {totalPrice.toFixed(2).replace('.', ',')}</Text>
            <Button
              title="Finalizar Venda"
              onPress={handleFinalizeSale}
              disabled={cart.length === 0}
              color={theme.tint} 
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: theme.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.text,
  },
  list: {
    paddingHorizontal: 10,
  },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    backgroundColor: theme.card,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 15,
    color: theme.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: theme.tabIconDefault,
  },
});