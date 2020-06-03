import React, { useEffect, useContext } from 'react'
import {
    StyleSheet,
    View,
    Button,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import { useForm } from 'react-hook-form'
import { showMessage } from 'react-native-flash-message'
import { signUp } from '../../services/userService'
import { discountContext } from '../../contexts/discountsContext'

const SignUp = ({ navigation }) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const { register, handleSubmit, setValue, errors, setError } = useForm()
    const { dispatch } = useContext(discountContext)
    
    useEffect(() => {
        register('email', {required: true, pattern: emailRegex })
        register('password1', { required: true})
        register('password2', { required: true})
        register('phone')

    }, [register])

    const submitHandler = async (data) => {

        if(data['password1'] != data['password2']){
            setError('password1', "notMatch", "please choose a different username")
            setError('password2', "notMatch", "please choose a different username")
            showError("Slaptazodziai nesutampa!")
            return;
        }else{
            dispatch({
                type: "isLoading",
                value: true
            })
            const phone = data['phone']? data['phone']: ""
            const signUpRes: any = await signUp(data['email'] , data['password1'], phone );
            if(signUpRes.status != 200){
                dispatch({
                    type: "isLoading",
                    value: false
                })
                showError("Narys tokiu elektoriniu pastu jau egzistuoja")

            } else {

                dispatch({
                    type: "setJWT", 
                    value: signUpRes.headers.authorization.split(' ')[1]
                })

                dispatch({
                    type: "loggedIn", 
                    value: true
                })
                dispatch({
                    type: "isLoading",
                    value: false
                })
                navigation.navigate("Search");
            }
        }
    }

    const showError = (message: string) => {
        showMessage({
            message: message,
            type: 'danger',
            duration: 3000,
        })
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.inputTitle}>
                    <Text>Jusu elektroninis pastas</Text>
                    {errors.email && errors.email.type == 'pattern' && (
                        <Text style={styles.errorText}>Netinkamas elektroninis pastas</Text>
                    )}
                    {errors.email && errors.email.type == 'required' && (
                        <Text style={styles.errorText}>Butinas elektroninis pastas</Text>
                    )}
                </View>
                <TextInput
                    style={styles.inputStyles}
                    placeholder="my@email.com"
                    multiline={false}
                    maxLength={36}
                    onChangeText={text => setValue('email', text)}
                />
                <View style={styles.inputTitle}>
                    <Text>Jusu slaptazodis</Text>
                    {errors.password1 && errors.password1.type == 'min' && (
                        <Text style={styles.errorText}>Slaptazodis per trumpas</Text>
                    )}
                    {errors.password1 && errors.password1.type == 'required' && (
                        <Text style={styles.errorText}>Slaptazodis yra privalomas</Text>
                    )}
                     {errors.password1 && errors.password1.type == 'notMatch' && (
                        <Text style={styles.errorText}>Slaptazodziai nera vienodi</Text>
                    )}
                </View>
                <TextInput
                    style={styles.inputStyles}
                    placeholder="Slaptazodis"
                    multiline={false}
                    maxLength={36}
                    onChangeText={text => setValue('password1', text)}
                    secureTextEntry={true}
                />
                <View style={styles.inputTitle}>
                    <Text>Pakartokite slaptazodi</Text>
                    {errors.password2 && errors.password2.type == 'min' && (
                        <Text style={styles.errorText}>Slaptazodis per trumpas</Text>
                    )}
                    {errors.password2 && errors.password2.type == 'required' && (
                        <Text style={styles.errorText}>Slaptazodis yra privalomas</Text>
                    )}
                      {errors.password2 && errors.password2.type == 'notMatch' && (
                        <Text style={styles.errorText}>Slaptazodziai nera vienodi</Text>
                    )}
                </View>
                <TextInput
                    style={styles.inputStyles}
                    placeholder="Pakartokite slaptazodi"
                    multiline={false}
                    maxLength={36}
                    onChangeText={text => setValue('password2', text)}
                    secureTextEntry={true}
                />
                <Text>Telefono numeris</Text>
                <TextInput
                    style={styles.inputStyles}
                    placeholder="
                    +37066666666"
                    multiline={false}
                    maxLength={12}
                    onChangeText={text => setValue('phone', text)}
                />
                <Button
                    onPress={handleSubmit(submitHandler)}
                    title="Register"
                />
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

export default SignUp

const styles = StyleSheet.create({
    menuButton: {
        height: 100,
        backgroundColor: '#f7f7f7',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inputTitle: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    inputStyles: {
        textAlign: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        paddingLeft: 5,
        fontStyle: 'italic',
        color: 'red',
    },
})
