import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { CartItem } from '../contexts/ProductContext';

const theme = Colors.dark;

export const CartListItem = ({ item, onUpdateQuantity, onRemove }: { 
  item: CartItem; 
  onUpdateQuantity: (amount: number) => void;
  onRemove: () => void;
}) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>
        R$ {item.price.toFixed(2).replace('.', ',')} cada
      </Text>
    </View>
    
    <View style={styles.itemActions}>
      <TouchableOpacity onPress={() => onUpdateQuantity(-1)}>
        <Ionicons name="remove-circle-outline" size={28} color={theme.danger} />
      </TouchableOpacity>
      
      <Text style={styles.itemQuantity}>{item.quantity}</Text>
      
      <TouchableOpacity onPress={() => onUpdateQuantity(1)}>
        <Ionicons name="add-circle-outline" size={28} color={theme.success} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onRemove} style={{ marginLeft: 15 }}>
        <Ionicons name="trash-outline" size={26} color={theme.text} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.text,
  },
  itemDetails: {
    fontSize: 14,
    color: theme.tabIconDefault,
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
    color: theme.text,
  },
});