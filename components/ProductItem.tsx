import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../contexts/ProductContext';

const ProductItem = ({ product, onDelete }: { 
  product: Product; 
  onDelete: () => void;
}) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{product.name}</Text>
      <Text style={styles.itemPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
      <Text style={styles.itemStock}>Estoque: {product.stock}</Text>
    </View>
    <View style={styles.itemActions}>
      <Link href={{ pathname: "/add-product", params: { productId: product.id } }} asChild>
        <TouchableOpacity>
          <Ionicons name="pencil" size={24} color="#0a7ea4" />
        </TouchableOpacity>
      </Link>
      <TouchableOpacity onPress={onDelete} style={{ marginLeft: 15 }}>
        <Ionicons name="trash-outline" size={24} color="#c0392b" />
      </TouchableOpacity>
    </View>
  </View>
);

export default ProductItem;

// Note que aqui estão APENAS os estilos do item
const styles = StyleSheet.create({
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
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});