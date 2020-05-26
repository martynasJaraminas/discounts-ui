import React, { useState, useContext, useEffect, Fragment } from 'react'
import {
    StyleSheet,
    View,
    Button,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Modal,
    TouchableHighlight,
    TextInput,
} from 'react-native'
import { discountContext } from '../../contexts/discountsContext'
var jwtDecode = require('jwt-decode')

const AccountScreen = ({ navigation }) => {
    const { dispatch } = useContext(discountContext)
    const [modalOpen, setModalOpen] = useState({ open: false } as any)

    // TODO: implement changing email and etc.

    const getJWT = async () => {
        const userDataFromJWT = await AsyncStorage.getItem('JWT')
        const user = jwtDecode(userDataFromJWT)

        setUserData({
            userName: user.email,
            subscriptions: ['Milk', 'Beer'],
        })
    }

    const [userData, setUserData] = useState({} as any)

    useEffect(() => {
        getJWT()
    }, [])

    const changePassword = () => {
        console.log('password change')
        setModalOpen({ open: true, name: 'password' })
    }

    const changeSubscriptions = () => {
        console.log('changeSubscriptions')
        setModalOpen({ open: true, name: 'subscriptions' })
    }

    const changeEmail = () => {
        console.log('changeEmail')
        setModalOpen({ open: true, name: 'email' })
    }

    const onChangeText = (type, text) => {
        console.log('update', text)
    }

    const getWhatToRender = () => {
        switch (modalOpen.name) {
            case 'password':
                return (
                    <TextInput
                        style={styles.inputStyles}
                        placeholder="P@ssw0rd"
                        multiline={false}
                        maxLength={36}
                        onChangeText={(text) => onChangeText('password', text)}
                        secureTextEntry={true}
                    />
                )
            case 'email':
                return (
                    <TextInput
                        style={styles.inputStyles}
                        placeholder="my@email.com"
                        multiline={false}
                        maxLength={36}
                        onChangeText={(text) => onChangeText('email', text)}
                    />
                )
            case 'subscriptions':
                return (
                    <TouchableHighlight
                        style={{
                            ...styles.openButton,
                            backgroundColor: 'white',
                        }}
                        onPress={() => {
                            onChangeText('subscriptions', [])
                        }}
                    >
                        <Text style={{ ...styles.textStyle, color: 'black' }}>
                            Clear subscriptions
                        </Text>
                    </TouchableHighlight>
                )
        }
    }

    return (
        <Fragment>
            {!modalOpen.open ? (
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Image
                            style={styles.image}
                            source={require('../../account.png')}
                        />
                        <View style={styles.menuContainer}>
                            <Text>{userData.userName}</Text>
                            <TouchableOpacity
                                style={{ height: 50 }}
                                onPress={changeEmail}
                            >
                                <Text>Change email</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: 50 }}
                                onPress={changeSubscriptions}
                            >
                                <Text>Change subscriptions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={changePassword}>
                                <Text>Change password</Text>
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
            ) : (
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalOpen.open}
                        onRequestClose={() => {
                            setModalOpen({ open: !modalOpen.open })
                        }}
                    >
                        {getWhatToRender()}
                        <TouchableHighlight
                            style={{
                                ...styles.openButton,
                                backgroundColor: '#2196F3',
                            }}
                            onPress={() => {
                                setModalOpen({ open: !modalOpen.open })
                            }}
                        >
                            <Text style={styles.textStyle}>Save</Text>
                        </TouchableHighlight>
                    </Modal>
                </View>
            )}
        </Fragment>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    menuContainer: {
        top: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        top: 50,
        position: 'absolute',
    },
    menuButton: {
        height: 80,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    inputStyles: {
        textAlign: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
})
