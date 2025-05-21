import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import {useLanguage} from '../context/LanguageContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const TestScreen = ({navigation, route}) => {
  const {getQuestions, getTextStyle, language} = useLanguage();
  const questions = getQuestions();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const currentQuestion = questions[currentQuestionIndex];

  // Button translations
  const buttonTexts = {
    previous: language === 'ar' ? 'السابق' : 'Previous',
    next: language === 'ar' ? 'التالي' : 'Next',
    finish: language === 'ar' ? 'انهاء' : 'Finish',
  };

  const animateQuestionChange = (direction, callback) => {
    // Fade out and slide current question
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction === 'next' ? -50 : 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Execute the callback (change question)
      callback();

      // Reset animation values for next question
      slideAnim.setValue(direction === 'next' ? 50 : -50);

      // Fade in and slide in new question
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

// In your TestScreen component, modify the handleNext function:
const handleNext = () => {
  if (currentQuestionIndex < questions.length - 1) {
    setUserAnswers([...userAnswers, {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect: selectedOption === currentQuestion.correctAnswerIndex
    }]);
    animateQuestionChange('next', () => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    });
  } else {
    setUserAnswers([...userAnswers, {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect: selectedOption === currentQuestion.correctAnswerIndex
    }]);
    navigation.navigate('Results', {
      answers: userAnswers,
      questions: questions,
      title: route.params?.title
    });
  }
};

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      animateQuestionChange('prev', () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setSelectedOption(null);
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2d2d2d']}
        style={styles.gradientContainer}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-left" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={styles.title}>
            <Text style={[styles.progress, getTextStyle()]}>
              {route.params?.title ||
                (language === 'ar' ? 'اختبار القيادة' : 'Driving Test')}{' '}
              -{language === 'ar' ? ' سؤال ' : ' Question '}
              {currentQuestionIndex + 1}
              {language === 'ar' ? ' من ' : ' of '}
              {questions.length}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={[styles.category, getTextStyle()]}>
              {currentQuestion.category}
            </Text>
          </View>

          <Animated.View
            style={[
              styles.questionContainer,
              {
                opacity: fadeAnim,
                transform: [{translateX: slideAnim}],
              },
            ]}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              <Text style={[styles.questionText, getTextStyle()]}>
                {currentQuestion.question}
              </Text>

              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === index && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedOption(index)}>
                  <Text style={[styles.optionText, getTextStyle()]}>
                    {option}
                  </Text>
                  {selectedOption === index && (
                    <Icon
                      name="check-circle"
                      size={24}
                      color="#4CAF50"
                      style={styles.optionIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>

          <View style={styles.navigation}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestionIndex === 0 && styles.disabledButton,
              ]}
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0}>
              <Text style={styles.navButtonText}>{buttonTexts.previous}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={handleNext}>
              <Text style={styles.navButtonText}>
                {currentQuestionIndex === questions.length - 1
                  ? buttonTexts.finish
                  : buttonTexts.next}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  questionContainer: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  progress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 30,
    marginBottom: 5,
    alignItems: 'center',
    fontFamily: 'Raleway-Regular',
  },
  title: {
    paddingTop: 20,
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Raleway-Regular',
  },
  category: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'left',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#fff',
    lineHeight: 30,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
  },
  selectedOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
  },
  optionIcon: {
    marginLeft: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  navButton: {
    padding: 15,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 50,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TestScreen;
