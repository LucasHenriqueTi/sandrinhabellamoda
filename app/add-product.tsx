import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import { useProducts } from '../contexts/ProductContext';

const AddOrEditProductScreen = () => {
  const router = useRouter(); 
  const params = useLocalSearchParams();
  const { addProduct, editProduct, products } = useProducts(); 

  const isEditMode = !!params.productId;
  const productToEdit = isEditMode ? products.find(p => p.id === params.productId) : null;

  // 1. ESTADO PARA CADA CAMPO DO FORMULÁRIO
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [gender, setGender] = useState<'Masculino' | 'Feminino' | 'Unissex' | ''>('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString().replace('.', ','));
      setColor(productToEdit.color);
      setGender(productToEdit.gender);
      setStock(productToEdit.stock.toString());
    }
  }, [productToEdit]);

  // 2. FUNÇÃO CHAMADA AO CLICAR EM "SALVAR"
   const handleSave = () => {
    if (!name || !price || !stock) {
      Alert.alert('Erro', 'Por favor, preencha nome, preço e estoque.');
      return;
    }
    const priceValue = parseFloat(price.replace(',', '.'));
    const stockValue = parseInt(stock, 10);
    if (isNaN(priceValue) || isNaN(stockValue)) {
      Alert.alert('Erro', 'Preço e estoque devem ser números válidos.');
      return;
    }

    if (isEditMode) {
      // Se estamos editando, chamamos 'editProduct'
      const updatedProduct = {
        id: productToEdit!.id, 
        name,
        price: priceValue,
        color,
        gender: gender || 'Unissex',
        stock: stockValue,
      };
      editProduct(updatedProduct);
      Alert.alert('Sucesso!', 'Produto atualizado.');
    } else {
      // Se não, chamamos 'addProduct' como antes
      const newProduct = { name, price: priceValue, color, gender: gender || 'Unissex', stock: stockValue };
      addProduct(newProduct);
      Alert.alert('Sucesso!', 'Produto cadastrado.');
    }
    
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>{isEditMode ? 'Editar Produto' : 'Cadastrar Novo Produto'}</Text>
        
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Camiseta Manga Longa"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 99,90"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Cor</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Azul Marinho"
          value={color}
          onChangeText={setColor}
        />
        
        <Text style={styles.label}>Gênero</Text>
        <TextInput
          style={styles.input}
          placeholder="Masculino, Feminino ou Unissex"
          value={gender}
          onChangeText={(text) => setGender(text as any)}
        />

        <Text style={styles.label}>Quantidade em Estoque</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 25"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />
        
        <Button 
          title={isEditMode ? 'Salvar Alterações' : 'Salvar Produto'} 
          onPress={handleSave} 
          color="#0a7ea4"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddOrEditProductScreen;

// Estilos para o formulário
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});