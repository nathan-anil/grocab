import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          Your personal growth dashboard
        </Text>
        
        <View style={styles.content}>
          <Text style={styles.contentText}>
            Welcome to your dashboard! This is where you'll see an overview of your progress.
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


