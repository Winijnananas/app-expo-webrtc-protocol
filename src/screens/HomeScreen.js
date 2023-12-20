import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    TextInput,
    Modal,
    Alert
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { app } from '../../firebaseConfig'
import CustomAlert from '../components/CustomAlert';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
const HomeScreen = ({ navigation }) => {
    const handleContactPress = () => {
        navigation.navigate('Contact');
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [question, setQuestion] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const advertisements = [
        { id: '1', image: require('../../assets/ad1.jpg') },
        { id: '2', image: require('../../assets/ad2.jpg') },
        { id: '3', image: require('../../assets/ad3.png') },
        { id: '4', image: require('../../assets/ad1.jpg') },
        { id: '5', image: require('../../assets/ad1.jpg') },
        // Add more advertisement objects as needed
    ];

    const categories = [
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' },
        { id: '3', name: 'Category 3' },
        { id: '4', name: 'Category 4' },
        { id: '5', name: 'Category 5' },
        { id: '6', name: 'Category 6' },
        // Add more category objects as needed
    ];

    const [value, onChangeText] = React.useState('');
    const renderAdvertisement = ({ item }) => (
        <Image source={item.image} style={styles.advertisementImage} />
    );

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Ionicons name="ios-cart" size={24} color="black" style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const dismissModal = () => {
        setIsModalVisible(false);
        setQuestion('');
    };



    const handleQuestionSubmit = async () => {
        try {
            const questionData = {
                question,
                timestamp: serverTimestamp(),
            };

            const db = getFirestore(app); // ใช้ app ที่เราได้ initialize ไว้
            const questionsCollection = collection(db, 'questions');

            await addDoc(questionsCollection, questionData);
            console.log('Question submitted to Firestore!');
            Alert.alert(
                'Success!',
                'Question submitted successfully!',
                [
                  { text: 'OK', onPress: dismissModal }
                ],
                { cancelable: false }
              );
              dismissModal();
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.png')} style={styles.background}>
                <View>
                    <Image source={require('../../assets/logo-removebg-preview.png')} resizeMode="contain" style={styles.logo} />
                    <Text style={styles.tagline}>Welcome to Central Plaza Application</Text>
                </View>

                <FlatList
                    data={advertisements}
                    renderItem={renderAdvertisement}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.advertisementContainer}
                />

                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    contentContainerStyle={styles.categoryContainer}
                />

                {/* "Have a Question?" Button */}
                <TouchableOpacity onPress={toggleModal} style={styles.questionButton}>
                    <Text style={styles.questionText}>Have a Question ?</Text>
                </TouchableOpacity>
                {/* Modal for entering the question */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={dismissModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                placeholder="Enter your question"
                                onChangeText={(text) => setQuestion(text)}
                                value={question}
                                style={styles.input}
                            />
                            <TouchableOpacity onPress={handleQuestionSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>

                            {/* Dismiss button */}
                            <TouchableOpacity onPress={dismissModal} style={styles.dismissButton}>
                                <Text style={styles.dismissText}>Dismiss</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <CustomAlert
                    visible={showAlert}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                />

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center'
    },
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    tagline: {
        color: 'white',
        marginTop: 50,
        alignSelf: 'center',
        fontWeight: '300',
        fontSize: 20
    },
    advertisementContainer: {
        marginTop: 20,
        maxHeight: 150,
    },
    advertisementImage: {
        width: 400,
        height: 'auto',
        marginRight: 10,
        borderRadius: 10,
    },
    categoryContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    categoryItem: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginRight: 10,
        height: 80,
    },
    categoryText: {
        color: '#333',
        fontSize: 15
    },
    categoryIcon: {
        alignSelf: 'center'
    },
    questionButton: {
        backgroundColor: 'brown',
        width: '60%',
        borderRadius: 7,
        alignSelf: 'center',
        marginBottom: 100,
        paddingVertical: 15,
        alignItems: 'center',
    },
    questionText: {
        fontSize: 20,
        color: 'white',
    },

    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        fontSize: 16,
        paddingVertical: 10,
    },
    submitButton: {
        backgroundColor: 'brown',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
    },
    dismissButton: {
        marginTop: 10,
        alignSelf: 'center',
    },
    dismissText: {
        color: 'red',
        fontSize: 16,
    },

});

export default HomeScreen;
