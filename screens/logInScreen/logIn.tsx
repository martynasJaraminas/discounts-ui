import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    View,
    Button,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import {discountContext} from '../../contexts/discountsContext'
import { TextInput } from 'react-native-gesture-handler'
import { login } from '../../services/userService'

const LogIn = ({ navigation }) => {
    const { dispatch } = useContext(discountContext)
    const [creds, setCreds] = useState({email: '', pw: ''});

    const handleSubmit = async () => {
        dispatch({
            type: "isLoading",
            value: true
        })
        const result = await login(creds.email, creds.pw) as any;
        if(result.ok){
            dispatch({
                type: "loggedIn",
                value: true
            })
            dispatch({
                type: "isLoading",
                value: false
            })
            navigation.navigate('Search')
        } else {
            dispatch({
                type: "isLoading",
                value: false
            })
        }
    }
    
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.inputStyles}
                    placeholder="Your email.."
                    multiline={false}
                    onChange={(e)=> setCreds({...creds, email: e.nativeEvent.text})}
                />
                <TextInput
                    style={styles.inputStyles1}
                    placeholder="Your password.."
                    multiline={false}
                    secureTextEntry={true}
                    onChange={(e)=> setCreds({...creds, pw: e.nativeEvent.text})}
                />
                <TouchableOpacity  onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.notAMember}>Not a member? Sing up!</Text>
                </TouchableOpacity>
                <Button onPress={handleSubmit} title="Log In" />
                <Text style={styles.otherWays}>Other ways to sign in:</Text>
                <View style={styles.otherWaysToJoinLogo}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'stretch',
                            paddingLeft: 5,
                        }}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            source={require('../../../discounts-ui/menu3.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'stretch',
                            paddingLeft: 5,
                        }}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            source={require('../../../discounts-ui/menu3.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'stretch',
                            paddingLeft: 5,
                        }}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            source={require('../../../discounts-ui/menu3.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.menuButton}>
                <TouchableOpacity
                    style={{ height: 50, marginTop: 10 }}
                    onPress={() => navigation.openDrawer()}
                >
                    
                    <Image
                            source={require('../../../discounts-ui/return.png')}
                            style={{ width: 40, height: 40 }}
                        />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LogIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    notAMember: {
        fontStyle: 'italic',
        color: 'blue',
        marginLeft: 'auto',
        marginTop: 10,
        marginBottom: 10,
    },
    inputStyles1: {
        textAlign: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
    },
    inputStyles: {
        textAlign: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    otherWays: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    otherWaysToJoinLogo: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    menuButton: {
        height: 100,
        backgroundColor: '#f7f7f7',
        justifyContent: 'space-around',
        alignItems: "center"
    },
})
