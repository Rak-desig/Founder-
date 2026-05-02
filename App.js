import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const featuredMangoes = [
  { id: '1', name: 'Alphonso', price: '$12 / kg', note: 'Rich, creamy, and aromatic' },
  { id: '2', name: 'Ataulfo', price: '$9 / kg', note: 'Sweet with a buttery texture' },
  { id: '3', name: 'Kent', price: '$10 / kg', note: 'Juicy, fiberless and perfect for smoothies' }
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>🥭 Mango Market</Text>
        <Text style={styles.tagline}>Fresh mangoes delivered from farm to your doorstep.</Text>

        <View style={styles.searchWrap}>
          <TextInput placeholder="Search mango type..." placeholderTextColor="#9A7A3E" style={styles.searchInput} />
        </View>

        <Text style={styles.sectionTitle}>Featured Mangoes</Text>
        {featuredMangoes.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardNote}>{item.note}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>Today’s Farm Deal</Text>
          <Text style={styles.offerText}>Buy 3kg and get free same-day delivery.</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Shop now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF7E5' },
  container: { padding: 20, gap: 14 },
  logo: { fontSize: 30, fontWeight: '800', color: '#3F2A00' },
  tagline: { fontSize: 16, color: '#6F5300' },
  searchWrap: {
    backgroundColor: '#FFE9B8',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  searchInput: { fontSize: 16, color: '#3F2A00' },
  sectionTitle: { marginTop: 8, fontSize: 20, fontWeight: '700', color: '#3F2A00' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#3F2A00' },
  cardNote: { fontSize: 14, color: '#6F5300', marginTop: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: '700', color: '#2A7B31' },
  button: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10
  },
  buttonText: { color: '#3F2A00', fontWeight: '700' },
  offerCard: {
    marginTop: 10,
    backgroundColor: '#2A7B31',
    borderRadius: 16,
    padding: 16,
    gap: 8
  },
  offerTitle: { fontSize: 19, fontWeight: '700', color: '#F7FFE9' },
  offerText: { fontSize: 15, color: '#EAF7CF' },
  primaryButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#FFD54F',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10
  },
  primaryButtonText: { color: '#3F2A00', fontWeight: '800' }
});
