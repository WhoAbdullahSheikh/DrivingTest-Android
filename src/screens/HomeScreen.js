import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useLanguage} from '../context/LanguageContext';

const {width, height} = Dimensions.get('window');

const translations = {
  en: {
    title: 'Drive Smart',
    subtitle: 'Master your driving skills',
    startTest: 'Start Test',
    fullTest: 'Take a full driving test',
    practiceTests: 'Practice Tests',
    trafficRules: 'Traffic Rules',
    rules: 'Rules & Laws',
    safety: 'Safety Tips',
    home: 'Home',
    history: 'History',
    progress: 'Progress',
    settings: 'Settings',
  },
  sv: {
    title: 'Körkortstest',
    subtitle: 'Förbättra dina körkunskaper',
    startTest: 'Starta testet',
    fullTest: 'Gör ett komplett körkortstest',
    practiceTests: 'Övningstester',
    trafficRules: 'Trafikregler',
    rules: 'Regler & Lagar',
    safety: 'Säkerhetstips',
    home: 'Hem',
    history: 'Historik',
    progress: 'Framsteg',
    settings: 'Inställningar',
  },
  ar: {
    title: 'اختبار القيادة',
    subtitle: 'احترف مهارات القيادة',
    startTest: 'بدء الاختبار',
    fullTest: 'خوض اختبار قيادة كامل',
    practiceTests: 'اختبارات التدريب',
    trafficRules: 'قواعد المرور',
    rules: 'القوانين واللوائح',
    safety: 'نصائح السلامة',
    home: 'الرئيسية',
    history: 'السجل',
    progress: 'التقدم',
    settings: 'الإعدادات',
  },
};

const HomeScreen = ({navigation}) => {
  const {language} = useLanguage();
  const t = translations[language] || translations.en;


const handleStartTest = () => {
  navigation.navigate('QuestionCountSelection');
};

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2d2d2d']}
        style={styles.background}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>{t.title}</Text>
              <Text style={styles.subtitle}>{t.subtitle}</Text>
            </View>

            <View style={styles.content}>
              <TouchableOpacity
                style={[styles.card, styles.primaryCard]}
                onPress={handleStartTest}>
                <View style={styles.cardContent}>
                  <Icon name="car" size={30} color="#fff" />
                  <View>
                    <Text style={styles.cardTitle}>{t.startTest}</Text>
                    <Text style={styles.cardText}>{t.fullTest}</Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={24} color="#fff" />
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>{t.practiceTests}</Text>

              <TouchableOpacity
                style={[styles.card, styles.secondaryCard]}
                onPress={() => navigation.navigate('Rules')}>
                <View style={styles.cardContent}>
                  <View
                    style={[
                      styles.iconContainer,
                      {backgroundColor: 'rgba(76, 175, 80, 0.2)'},
                    ]}>
                    <Icon name="traffic-light" size={24} color="#4CAF50" />
                  </View>
                  <Text style={[styles.cardTitle, {color: '#fff'}]}>
                    {t.trafficRules}
                  </Text>
                </View>
                <Icon name="chevron-right" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
              <Icon name="home" size={24} color="#4CAF50" />
              <Text style={[styles.navText, {color: 'white'}]}>{t.home}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('History')}>
              <Icon name="history" size={24} color="#aaa" />
              <Text style={[styles.navText, {color: '#aaa'}]}>{t.history}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('Settings')}>
              <Icon name="cog" size={24} color="#aaa" />
              <Text style={[styles.navText, {color: '#aaa'}]}>
                {t.settings}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Raleway-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    fontFamily: 'Raleway-Regular',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    marginBottom: 5,
  },
  primaryCard: {
    backgroundColor: '#4CAF50',
  },
  secondaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Raleway-Bold',
  },
  cardText: {
    fontSize: 14,
    color: '#eee',
    marginTop: 5,
    fontFamily: 'Raleway-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 25,
    marginBottom: 15,
    fontFamily: 'Raleway-Bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 40,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Raleway-Regular',
  },
});

export default HomeScreen;
