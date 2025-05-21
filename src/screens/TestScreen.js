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
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

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

  useEffect(() => {
    // Reset answer submission state when question changes
    setIsAnswerSubmitted(false);
    setShowCorrectAnswer(false);
  }, [currentQuestionIndex]);

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

  const handleAnswerSubmission = () => {
    if (selectedOption === null) return; // Don't proceed if no option selected

    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    setIsAnswerSubmitted(true);

    // Record the answer
    setUserAnswers([
      ...userAnswers,
      {
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect,
      },
    ]);

    if (!isCorrect) {
      // Show correct answer for 2 seconds before navigating
      setShowCorrectAnswer(true);
      setTimeout(() => {
        goToNextQuestion();
      }, 2000);
    } else {
      // Immediately go to next question if answer is correct
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      animateQuestionChange('next', () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      });
    } else {
      // If it's the last question, navigate to results
      navigation.navigate('Results', {
        answers: userAnswers,
        questions: questions,
        title: route.params?.title,
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

  const getOptionStyle = index => {
    if (!isAnswerSubmitted) {
      return selectedOption === index ? styles.selectedOption : null;
    }

    if (index === currentQuestion.correctAnswerIndex) {
      return styles.correctOption;
    }

    if (
      index === selectedOption &&
      index !== currentQuestion.correctAnswerIndex
    ) {
      return styles.wrongOption;
    }

    return null;
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
                  style={[styles.optionButton, getOptionStyle(index)]}
                  onPress={() => !isAnswerSubmitted && setSelectedOption(index)}
                  disabled={isAnswerSubmitted}>
                  <Text style={[styles.optionText, getTextStyle()]}>
                    {option}
                  </Text>
                  {selectedOption === index && !isAnswerSubmitted && (
                    <Icon
                      name="check-circle"
                      size={24}
                      color="#4CAF50"
                      style={styles.optionIcon}
                    />
                  )}
                  {isAnswerSubmitted &&
                    index === currentQuestion.correctAnswerIndex && (
                      <Icon
                        name="check-circle"
                        size={24}
                        color="#4CAF50"
                        style={styles.optionIcon}
                      />
                    )}
                  {isAnswerSubmitted &&
                    index === selectedOption &&
                    index !== currentQuestion.correctAnswerIndex && (
                      <Icon
                        name="close-circle"
                        size={24}
                        color="#FF5722"
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
                !(currentQuestionIndex === 0 || isAnswerSubmitted) &&
                  styles.navButtonGlowPrev,
              ]}
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0 || isAnswerSubmitted}>
              <Text style={styles.navButtonText}>{buttonTexts.previous}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                selectedOption !== null &&
                  !isAnswerSubmitted &&
                  styles.navButtonGlowNext,
              ]}
              onPress={handleAnswerSubmission}
              disabled={selectedOption === null || isAnswerSubmitted}>
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
    top: 5,
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  progress: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 30,
    marginBottom: 5,
    alignItems: 'center',
    fontFamily: 'Raleway-Bold',
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
    fontFamily: 'Raleway-Regular',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
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
  correctOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: 'rgba(255, 87, 34, 0.2)',
    borderColor: '#FF5722',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Raleway-Regular',
    flex: 1,
  },
  optionIcon: {
    marginLeft: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  navButton: {
    padding: 10,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 50,
    // Add these for better shadow visibility:
    overflow: 'hidden',

  },
  navButtonGlowNext: {
    shadowColor: '#4CAF50',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  navButtonGlowPrev: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
  },
});

export default TestScreen;
