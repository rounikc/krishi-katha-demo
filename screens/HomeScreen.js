import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button, Modal, ScrollView } from 'react-native';

// Dummy data for organic groceries and farming-related info
const farmerData = [
  { id: '1', name: 'Community Forum', description: 'Discuss market prices, crops, and more !!', screen: 'Community' },
  { id: '2', name: 'Tractors', description: 'Browse and buy the best tractors. ', screen: 'Tractors' },
  { id: '3', name: 'Weather', description: 'Check out today\'s weather. ', screen: 'Weather' },
  { id: '4', name: 'Sell', description: 'Sell what you have in store for customers. ', screen: 'Sell' },
  // Add more farmer-specific features here
];

const customerData = [
  { id: '1', name: 'Market', description: 'Buy your fresh veggies and fruits. ', screen: 'Market' },
];

export default function HomeScreen({ navigation }) {
  const [isFarmer, setIsFarmer] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderFeature = ({ item }) => (
    <TouchableOpacity
      style={styles.featureContainer}
      onPress={() => {
        setSelectedFeature(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.featureName}>{item.name}</Text>
      <Text style={styles.featureDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isFarmer && styles.activeToggle]}
          onPress={() => setIsFarmer(true)}
        >
          <Text style={styles.toggleButtonText}>Farmer Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isFarmer && styles.activeToggle]}
          onPress={() => setIsFarmer(false)}
        >
          <Text style={styles.toggleButtonText}>Customer Mode</Text>
        </TouchableOpacity>
      </View>

      {/* Feature List */}
      <FlatList
        data={isFarmer ? farmerData : customerData}
        renderItem={renderFeature}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Feature Details Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {selectedFeature && (
              <>
                <Text style={styles.modalName}>{selectedFeature.name}</Text>
                <Text style={styles.modalDescription}>{selectedFeature.description}</Text>
                <Button
                  title="Go to Feature"
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate(selectedFeature.screen);
                  }}
                />
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
    marginTop: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    width: '45%',
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#1abc9c',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  list: {
    paddingBottom: 20,
  },
  featureContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
  },
  featureName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  featureDescription: {
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
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});
