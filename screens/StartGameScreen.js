
import {
    TextInput,
    View,
    StyleSheet,
    Alert,
    Text,
    Dimensions,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView,


} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
    const [enterdNumber, setEnterdNumber] = useState('');

    const { width, height } = useWindowDimensions();


    function numberInputHandler(enterdText) {
        setEnterdNumber(enterdText);
    }

    function resetInputHandler() {
        setEnterdNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enterdNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            //Show alert
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }],
            );

            return;
        }
        onPickNumber(chosenNumber);
    }



    const marginTopDistance = height < 400 ? 30 : 100;

    return<ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>

        <Title>Guess My Number</Title>
        <Card>

            <InstructionText >Enter a Number</InstructionText>
            <TextInput style={styles.numberInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={numberInputHandler}
                value={enterdNumber}
            />

            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>



        </Card>
    </View>
    </KeyboardAvoidingView>
    </ScrollView> 
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
    screen:{
        flex:1,
    },

    rootContainer: {
        flex: 1,
        // marginTop: deviceHeight < 400 ? 30 : 10 , 
        alignItems: 'center',
    },

    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        //android shadow
        elevation: 4,
        //Ios shadow
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },


    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',

    },

    buttonsContainer: {
        flexDirection: 'row',
    },

    buttonContainer: {
        flex: 1,
    }
});