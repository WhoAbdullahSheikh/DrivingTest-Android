import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLanguage} from '../context/LanguageContext';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const TypingText = ({text, speed = 50, style}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <Text style={style}>{displayedText}</Text>;
};

const LanguageScreen = () => {
  const {setLanguage} = useLanguage();
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Animation for content when slide changes
    fadeAnim.setValue(0);
    slideAnim.setValue(30);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeSlide, fadeAnim, slideAnim]);

  const handleLanguageSelect = lang => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -30,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setLanguage(lang);
      navigation.navigate('Home');
    });
  };

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#2d2d2d']}
      style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={true}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
        onIndexChanged={index => setActiveSlide(index)}>
        {/* Welcome Screen */}
        <View style={styles.slide}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
            <Icon name="car" size={60} color="#4CAF50" style={styles.icon} />
            <Text style={styles.title}>Drive Smart</Text>
            <Text style={styles.subtitle}>Master your driving skills</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
            {activeSlide === 0 && (
              <TypingText
                text="This app helps you prepare for your driving test with practice questions, road signs, and traffic rules knowledge."
                speed={30}
                style={styles.infoText}
              />
            )}
            <Text style={styles.swipeHint}>
              <Icon name="gesture-swipe-left" size={24} color="#aaa" />
              Swipe to select language
            </Text>
          </Animated.View>
        </View>

        {/* Language Selection Screen */}
        <View style={styles.slide}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
            <Text style={styles.title}>Select Language</Text>
            <Text style={styles.subtitle}>Choose your preferred language</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.languageOptions,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
            <TouchableOpacity
              style={styles.languageCard}
              onPress={() => handleLanguageSelect('en')}>
              <Text style={styles.languageText}>English</Text>
              <Icon name="chevron-right" size={24} color="#4CAF50" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageCard}
              onPress={() => handleLanguageSelect('sv')}>
              <Text style={styles.languageText}>Svenska</Text>
              <Icon name="chevron-right" size={24} color="#4CAF50" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageCard}
              onPress={() => handleLanguageSelect('ar')}>
              <Text style={[styles.languageText, {textAlign: 'left'}]}>
                العربية
              </Text>
              <Icon name="chevron-right" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Swiper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    padding: 20,
    paddingTop: height * 0.1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Raleway-Regular',
  },
  infoText: {
    fontSize: 18,
    color: '#eee',
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Raleway-Regular',
  },
  swipeHint: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 180,
    fontFamily: 'Raleway-Regular',
  },
  languageOptions: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
  languageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageText: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
    fontFamily: 'Raleway-Regular',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  pagination: {
    bottom: height * 0.1,
  },
});

export default LanguageScreen;