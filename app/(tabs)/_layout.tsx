import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useProducts } from '../../contexts/ProductContext';

const TabLayout = () => {
  const colorScheme = 'dark';
  const { cartItemCount } = useProducts();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint, // Dourado para aba ativa
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault, // Cinza para inativas
        headerShown: false,
        // Aplicando o estilo escuro à barra de abas
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].card, // Fundo dos cards
          borderTopColor: Colors[colorScheme].border, // Cor da borda superior
        },
      }}>
      
      {/* Aba de Estoque */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Estoque',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'albums' : 'albums-outline'} size={28} color={color} />
          ),
        }}
      />
      
      {/* Aba da Sacola */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Sacola',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={28} color={color} />
          ),
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarBadgeStyle: { backgroundColor: Colors[colorScheme].danger } // Cor do badge
        }}
      />

      {/* Aba de Histórico */}
      <Tabs.Screen
        name="history"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;