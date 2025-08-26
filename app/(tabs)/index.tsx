import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product, useProducts } from '../../contexts/ProductContext';

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

const ProductScreen = () => {
  const { products, addToCart } = useProducts();

  const handleAddToCart = (product: Product) => {
  // Ponto de verificação 1: A função foi chamada?
  console.log('--- Início do Clique ---');
  console.log('1. Função handleAddToCart foi chamada para o produto:', product.name);

  try {
    // Chamamos a função do contexto, que é a principal suspeita
    addToCart(product);

    // Ponto de verificação 2: A função do contexto executou sem erros?
    console.log('2. Função addToCart do contexto executou com sucesso.');

    // Se chegamos até aqui, o Alert deveria ser chamado
    Alert.alert('Produto Adicionado!', `${product.name} foi adicionado à sua sacola.`);

    // Ponto de verificação 3: O Alert foi chamado?
    console.log('3. O Alert foi chamado.');

  } catch (error) {
    console.error('ERRO! Algo quebrou durante o processo:', error);
    Alert.alert('Ocorreu um Erro', 'Não foi possível adicionar o produto. Verifique o console.');
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Estoque</Text>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <ProductItem product={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* O botão flutuante para adicionar produto continua o mesmo */}
      <Link href="/add-product" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

export default ProductScreen;

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
    paddingBottom: 80, 
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0a7ea4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});