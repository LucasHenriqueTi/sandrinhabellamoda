import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartItem, useProducts } from '../../contexts/ProductContext';

// Componente para renderizar cada item na lista da sacola
const CartListItem = ({ item, onUpdateQuantity, onRemove }: {
  item: CartItem;
  onUpdateQuantity: (amount: number) => void;
  onRemove: () => void;
}) => (
  <View style={styles.itemContainer}>
    {/* Informações do item à esquerda */}
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>
        R$ {item.price.toFixed(2).replace('.', ',')} cada
      </Text>
    </View>

    {/* Ações do item à direita */}
    <View style={styles.itemActions}>
      <TouchableOpacity onPress={() => onUpdateQuantity(-1)}>
        <Ionicons name="remove-circle-outline" size={28} color="#c0392b" />
      </TouchableOpacity>

      <Text style={styles.itemQuantity}>{item.quantity}</Text>

      <TouchableOpacity onPress={() => onUpdateQuantity(1)}>
        <Ionicons name="add-circle-outline" size={28} color="#27ae60" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onRemove} style={{ marginLeft: 15 }}>
        <Ionicons name="trash-outline" size={26} color="#333" />
      </TouchableOpacity>
    </View>
  </View>
);

const CartScreen = () => {
  const router = useRouter();
  const { cart, finalizeSale, updateCartQuantity, removeFromCart } = useProducts();

  // Calculando o preço total da compra
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalizeSale = () => {
    finalizeSale();
    Alert.alert('Venda Finalizada', 'A venda foi finalizada com sucesso!')
    router.push('/(tabs)')

  }
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
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
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