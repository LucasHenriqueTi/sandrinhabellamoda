import { Stack } from 'expo-router';
import { ProductProvider } from '../contexts/ProductContext';
import { SalesProvider } from '../contexts/SalesContext';

const RootLayout = () => {

  return (
    <ProductProvider>
      <SalesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SalesProvider>
    </ProductProvider>
  );
}

export default RootLayout;