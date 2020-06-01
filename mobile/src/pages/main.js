import React, { useState, useEffect } from 'react';
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function Main(props) {
  const [productInfo, setProductInfo] = useState({});
  const [producDocs, setProductDocs] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts(page = 1) {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    if (refreshing) {
      setProductDocs([...docs]);
      setProductInfo(productInfo);
      setPage(page);
      setRefreshing(false);
    } else {
      setProductDocs([...producDocs, ...docs]);
      setProductInfo(productInfo);
      setPage(page);
    }
  }

  function loadMore() {
    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    loadProducts(pageNumber);
  }

  function handleRefresh() {
    setRefreshing(true);
    loadProducts();
  }

  function renderItem({ item }) {
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>

        <TouchableOpacity
          style={styles.productButton}
          onPress={() => {
            props.navigation.navigate('Product', { product: item });
          }}
        >
          <Text style={styles.productButtonText}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={producDocs}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  list: {
    padding: 20
  },
  productContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#da552f',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: '#da552f',
    fontWeight: 'bold'
  }
});