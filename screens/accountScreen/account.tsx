import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Button,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'
import { discountContext } from '../../contexts/discountsContext'

const userDataFromJWT = {
    userName: 'Dummy@Dummy.com',
    subscriptions: ['Milk', 'Beer'],
}

const AccountScreen = ({ navigation }) => {
    const { dispatch, JWT } = useContext(discountContext)

    // TODO: make parsing from JWT
    // const userDataFromJWT =

    const [userData, setUserData] = useState(userDataFromJWT as any)

    // useEffect(()=>{
    //     if(JWT == null){
    //         getJWT()
    //     }
    // }, [])

    const changePassword = () => {
        console.log('password change')
    }

    const changeSubscriptions = () => {
        console.log('changeSubscriptions')
    }

    const changeEmail = () => {
        console.log('changeEmail')
    }

    return (
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
})
