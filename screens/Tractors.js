import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Button, Modal, ScrollView } from 'react-native';

// Dummy data for tractors
const tractorData = [
  { id: '1', name: 'Tractor A', price: '$15,000', image: 'https://via.placeholder.com/150', details: 'Details about Tractor A' },
  { id: '2', name: 'Tractor B', price: '$18,000', image: 'https://via.placeholder.com/150', details: 'Details about Tractor B' },
  { id: '3', name: 'Tractor C', price: '$20,000', image: 'https://via.placeholder.com/150', details: 'Details about Tractor C' },
];

export default function Tractors() {
  const [selectedTractor, setSelectedTractor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderTractor = ({ item }) => (
    <TouchableOpacity
      style={styles.tractorContainer}
      onPress={() => {
        setSelectedTractor(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.tractorImage} />
      <Text style={styles.tractorName}>{item.name}</Text>
      <Text style={styles.tractorPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tractorData}
        renderItem={renderTractor}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Tractor Details Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {selectedTractor && (
              <>
                <Image source={{ uri: selectedTractor.image }} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedTractor.name}</Text>
                <Text style={styles.modalPrice}>{selectedTractor.price}</Text>
                <Text style={styles.modalDetails}>{selectedTractor.details}</Text>
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
  list: {
    paddingBottom: 20,
  },
  tractorContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  tractorImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  tractorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  tractorPrice: {
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
  modalDetails: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});
