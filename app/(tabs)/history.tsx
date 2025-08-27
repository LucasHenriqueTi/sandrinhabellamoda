import { Link } from 'expo-router';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Sale, useSales } from '../../contexts/SalesContext';

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

const styles = StyleSheet.create({
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
    },
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
    itemDate: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemDetails: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    itemTotal: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
});