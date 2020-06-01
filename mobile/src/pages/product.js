import React from 'react';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function Product() {
  const route = useRoute();

  return (
    <WebView source={{ uri: route.params.product.url }} />
  );
}