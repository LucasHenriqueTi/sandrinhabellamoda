import { Alert, FlatList, TouchableOpacity } from 'react-native';
import ProductItem from '../../components/ProductItem';
import { Product, useProducts } from '../../contexts/ProductContext';

const ProductScreen = () => {
  const { products, addToCart, deleteProduct } = useProducts();

  // Função para lidar com o toque no item do produto
  const handleAddToCart = (product: Product) => {
    const wasAdded = addToCart(product);

    if (wasAdded) {
      Alert.alert('Produto Adicionado!', `${product.name} foi adicionado à sua sacola.`);
    }
  };

  // Função para confirmar e lidar com a exclusão do produto
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
    />
  );
}

export default ProductScreen;

