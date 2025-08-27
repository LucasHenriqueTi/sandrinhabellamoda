import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useProducts } from '../../contexts/ProductContext';

export default function TabLayout() {
  const colorScheme = 'light';
  const { cartItemCount } = useProducts();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      {/* Aba de Estoque (existente) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Estoque',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'albums' : 'albums-outline'} size={28} color={color} />
          ),
        }}
      />
      {/* Aba de Adicionar Produto (existente) */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Sacola',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={28} color={color} />
          ),
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
        }}
      />
    </Tabs>
  );
}