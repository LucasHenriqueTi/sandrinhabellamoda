import { Stack } from 'expo-router';
import { ProductProvider } from '../contexts/ProductContext'; // 1. IMPORTAMOS NOSSO PROVIDER

const RootLayout = () => {

  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ProductProvider>
  );
}

export default RootLayout;