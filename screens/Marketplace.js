import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Button, Modal, ScrollView } from 'react-native';

// Dummy data for marketplace products
const products = {
  veggies: [
    { id: '1', name: 'Carrots', price: '$2.00/kg ', image: 'https://via.placeholder.com/150', description: 'Fresh carrots from local farms.' },
    { id: '2', name: 'Potatoes', price: '$1.50/kg ', image: 'https://via.placeholder.com/150', description: 'Organic potatoes with high yield.' },
    // Add more veggie products here
  ],
  fruits: [
    { id: '1', name: 'Apples', price: '$3.00/kg ', image: 'https://via.placeholder.com/150', description: 'Crisp and juicy apples.' },
    { id: '2', name: 'Oranges', price: '$2.50/kg ', image: 'https://via.placeholder.com/150', description: 'Sweet and tangy oranges.' },
    // Add more fruit products here
  ],
  dairy: [
    { id: '1', name: 'Milk', price: '$1.00/litre ', image: 'https://via.placeholder.com/150', description: 'Fresh milk from healthy cows.' },
    { id: '2', name: 'Cheese', price: '$5.00/200g ', image: 'https://via.placeholder.com/150', description: 'Aged cheese with rich flavor.' },
    // Add more dairy products here
  ],
};

export default function Marketplace() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('veggies');

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => {
        setSelectedProduct(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Category Selector */}
      <View style={styles.categorySelector}>
        {Object.keys(products).map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              currentCategory === category && styles.activeCategory
            ]}
            onPress={() => setCurrentCategory(category)}
          >
            <Text style={styles.categoryButtonText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product List */}
      <FlatList
        data={products[currentCategory]}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Product Details Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedProduct.name}</Text>
                <Text style={styles.modalPrice}>{selectedProduct.price}</Text>
                <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  activeCategory: {
    backgroundColor: '#1abc9c',
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#000',
  },
  list: {
    paddingBottom: 20,
  },
  productContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalPrice: {
    fontSize: 20,
    color: '#666',
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});
