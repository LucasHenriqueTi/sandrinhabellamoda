// Importando os componentes essenciais do React Native
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

// Definindo o "formato" (tipo) de um objeto de Produto com TypeScript
type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

// Nossos dados de exemplo, agora com o tipo que definimos
const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Hambúrguer Clássico', price: 25.50, stock: 10 },
  { id: '2', name: 'Batata Frita', price: 12.00, stock: 30 },
  { id: '3', name: 'Refrigerante', price: 8.00, stock: 50 },
  { id: '4', name: 'Milkshake de Chocolate', price: 18.00, stock: 15 },
];

// Componente para renderizar cada item. Note a tipagem da prop "product"
const ProductItem = ({ product }: { product: Product }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{product.name}</Text>
      <Text style={styles.itemPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
    </View>
    <View style={styles.itemStock}>
      <Text style={styles.stockText}>Estoque: {product.stock}</Text>
    </View>
  </View>
);

// A tela principal agora se chama "ProductScreen" (ou o nome que preferir)
export default function ProductScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Produtos</Text>
      </View>

      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

// Os estilos continuam iguais
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  itemStock: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  stockText: {
    fontWeight: 'bold',
  },
});