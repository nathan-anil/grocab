import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ReadingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Reading</Text>
        <Text style={styles.subtitle}>
          Your current reading list
        </Text>
        
        <View style={styles.content}>
          <Text style={styles.contentText}>
            Track your reading progress and discover new books.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  content: {
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});


