import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product, useProducts } from '../../contexts/ProductContext';

const ProductItem = ({ product, onDelete }: { product: Product; onDelete: () => void }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{product.name}</Text>
      <Text style={styles.itemPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
    </View>
    <View style={styles.itemStock}>
      <Text style={styles.stockText}>Estoque: {product.stock}</Text>
    </View>
    <View style={styles.itemActions}>
      <TouchableOpacity onPress={() => {/* Lógica de Editar virá aqui */}}>
        <Ionicons name="pencil" size={24} color="#0a7ea4" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={{ marginLeft: 15 }}>
        <Ionicons name="trash-outline" size={24} color="#c0392b" />
      </TouchableOpacity>
    </View>
  </View>
);

const ProductScreen = () => {
  const { products, addToCart, deleteProduct } = useProducts();

  // Função para lidar com o toque no item do produto
  const handleAddToCart = (product: Product) => {
    const wasAdded = addToCart(product); 
    
    if (wasAdded) {
      Alert.alert('Produto Adicionado!', `${product.name} foi adicionado à sua sacola.`);
    }
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza de que deseja excluir o produto "${productName}"? Esta ação não pode ser desfeita.`, // Mensagem
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Excluir", 
          onPress: () => deleteProduct(productId),
          style: "destructive"
        }
      ]
    );
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
            <ProductItem 
              product={item} 
              onDelete={() => handleDeleteProduct(item.id, item.name)} 
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* O botão flutuante para adicionar produto */}
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
  // Estilos para o layout geral da tela
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
    paddingBottom: 80, // Espaço para o botão flutuante não cobrir o último item
  },

  // Estilos para cada item da lista de produtos
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
    flex: 1, // Faz a área de informação ocupar todo o espaço disponível, empurrando as ações para a direita
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
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  // Novo estilo para o container dos botões de editar/excluir
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Espaçamento entre as informações e os botões
  },
  stockText: {
    fontSize: 14,
    color: '#666',
  },

  // Estilo para o botão de Ação Flutuante (FAB)
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