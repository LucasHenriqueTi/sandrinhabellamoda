import { Link } from 'expo-router';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Sale, useSales } from '../../contexts/SalesContext';

const theme = Colors.dark;

// Função para formatar a data para um formato mais legível
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Componente para renderizar cada item na lista de histórico
const SaleListItem = ({ sale }: { sale: Sale }) => {
  const itemsCount = sale.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemDate}>{formatDate(sale.date)}</Text>
        <Text style={styles.itemDetails}>
          {itemsCount} {itemsCount > 1 ? 'itens' : 'item'} vendidos
        </Text>
      </View>
      <Text style={styles.itemTotal}>
        R$ {sale.totalValue.toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
};

const HistoryScreen = () => {
  // histórico de vendas do contexto de vendas
  const { sales } = useSales();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico de Vendas</Text>
      </View>

      {sales.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma venda registrada ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={sales}
          renderItem={({ item }) => (
            <Link href={{ pathname: '/sale-detail', params: { saleId: item.id } }} asChild>
              <TouchableOpacity>
                <SaleListItem sale={item} />
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

export default HistoryScreen;

// Estilos atualizados para o tema escuro
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: theme.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.text,
    },
    list: {
        paddingHorizontal: 10,
    },
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
    itemDate: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.text,
    },
    itemDetails: {
        fontSize: 14,
        color: theme.tabIconDefault,
        marginTop: 4,
    },
    itemTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.tint, // Usando a cor de destaque (dourado) para o total
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: theme.tabIconDefault,
    },
});