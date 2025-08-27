import { useRouter } from 'expo-router';
import { Alert, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import CartListItem from '../../components/CartListItem';
import { useProducts } from '../../contexts/ProductContext';

const CartScreen = () => {
  const router = useRouter();
  const { cart, finalizeSale, updateCartQuantity, removeFromCart } = useProducts();

  // Calculando o preço total da compra
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizeSale = () => {
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
              color="#0a7ea4"
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
    backgroundColor: '#f5f5f5',
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingHorizontal: 10,
  },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});