import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartItem } from '../contexts/ProductContext';

// O componente agora vive de forma independente
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

export default CartListItem;

const styles = StyleSheet.create({
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
});