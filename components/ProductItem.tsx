import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Product } from '../contexts/ProductContext';

const theme = Colors.dark; 

export const ProductItem = ({ product, onDelete }: { 
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
          {/* Ícone de editar agora usa a cor de destaque (dourado) */}
          <Ionicons name="pencil" size={24} color={theme.tint} />
        </TouchableOpacity>
      </Link>
      <TouchableOpacity onPress={onDelete} style={{ marginLeft: 15 }}>
        {/* Ícone de excluir agora usa a cor de perigo */}
        <Ionicons name="trash-outline" size={24} color={theme.danger} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.card, // Fundo de card escuro
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1, // Usamos borda em vez de sombra para o tema escuro
    borderColor: theme.border, // Borda sutil
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.text, // Cor de texto clara
  },
  itemPrice: {
    fontSize: 16,
    color: theme.tabIconDefault, // Cor de texto secundária
    marginTop: 4,
  },
  itemStock: {
    fontSize: 14,
    color: theme.tabIconDefault, // Cor de texto secundária
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});