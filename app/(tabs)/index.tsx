import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductItem } from '../../components/ProductItem';
import { Colors } from '../../constants/Colors'; // Importamos nossa paleta de cores
import { Product, useProducts } from '../../contexts/ProductContext';


const theme = Colors.dark; // Definimos o tema escuro para a tela

export default function ProductScreen() {
  const { products, addToCart, deleteProduct } = useProducts();

  const handleAddToCart = (product: Product) => {
    const wasAdded = addToCart(product);
    if (wasAdded) {
      Alert.alert('Produto Adicionado!', `${product.name} foi adicionado à sua sacola.`);
    }
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza de que deseja excluir o produto "${productName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => deleteProduct(productId), style: "destructive" }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Força a barra de status a usar texto claro no tema escuro */}
      <StatusBar barStyle="light-content" /> 
      
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

      <Link href="/add-product" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color={theme.background} />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background, // Fundo principal escuro
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: theme.card, // Fundo do cabeçalho
    borderBottomWidth: 1,
    borderBottomColor: theme.border, // Borda sutil
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.text, // Cor de texto clara
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 80, 
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: theme.tint, // Cor de destaque (dourado)
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