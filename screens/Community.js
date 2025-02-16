import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Dummy data for channels and messages
const channels = ['General', 'Market Prices', 'Farming Tips', 'Equipment', 'Organic Farming'];
const dummyMessages = {
  'General': [{ id: 1, user: 'FarmerJoe', text: 'Hello everyone!' }],
  'Market Prices': [{ id: 1, user: 'GreenThumb', text: 'What’s the price of corn today?' }],
  'Farming Tips': [{ id: 1, user: 'FieldExpert', text: 'Best time to plant wheat?' }],
  // ...add more dummy data
};

export default function Community() {
  const [currentChannel, setCurrentChannel] = useState('General');
  const [messages, setMessages] = useState(dummyMessages[currentChannel]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      setMessages([...messages, { id: messages.length + 1, user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageUser}>{item.user}:</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const switchChannel = (channel) => {
    setCurrentChannel(channel);
    setMessages(dummyMessages[channel] || []);
  };

  return (
    <View style={styles.container}>
      {/* Channel List */}
      <View style={styles.channelList}>
        {channels.map(channel => (
          <TouchableOpacity 
            key={channel} 
            onPress={() => switchChannel(channel)} 
            style={[
              styles.channelButton, 
              currentChannel === channel && styles.activeChannel
            ]}
          >
            <Text style={styles.channelButtonText}>{channel}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat Area */}
      <View style={styles.chatArea}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          style={styles.messageList}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Message #${currentChannel}`}
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  channelList: {
    width: 100,
    backgroundColor: '#2c3e50',
    padding: 10,
  },
  channelButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#34495e',
  },
  activeChannel: {
    backgroundColor: '#1abc9c',
  },
  channelButtonText: {
    color: '#ecf0f1',
    textAlign: 'center',
  },
  chatArea: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  messageUser: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  messageText: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
