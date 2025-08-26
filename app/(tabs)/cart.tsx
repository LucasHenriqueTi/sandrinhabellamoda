import { useRouter } from 'expo-router';
import { Alert, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { CartItem, useProducts } from '../../contexts/ProductContext';

// Componente para renderizar cada item na lista da sacola
const CartListItem = ({ item }: { item: CartItem }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>
        Quantidade: {item.quantity} x R$ {item.price.toFixed(2).replace('.', ',')}
      </Text>
    </View>
    <Text style={styles.itemTotal}>
      R$ {(item.quantity * item.price).toFixed(2).replace('.', ',')}
    </Text>
  </View>
);

const CartScreen = () => {
  const router = useRouter();
  const { cart, finalizeSale } = useProducts();

  // Calculamos o preço total da compra
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizeSale = () => {
    finalizeSale();
    Alert.alert('Venda Finalizada', 'A venda foi finalizada com sucesso!')
    router.push('/(tabs)')

  }

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
            renderItem={({ item }) => <CartListItem item={item} />}
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
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
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