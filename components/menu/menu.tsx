import React, { useState, useEffect, useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../../screens/homeScreen/home'
import LogIn from '../../screens/logInScreen/logIn'
import SignUp from '../../screens/signUp/SignUp'
import AccountScreen from '../../screens/accountScreen/account'
import { discountContext } from '../../contexts/discountsContext'

const Menu = () => {
    const Drawer = createDrawerNavigator()
    const [loggedInLocal, setLoggedInLocal] = useState<boolean>(false)
    const { loggedIn } = useContext(discountContext)
    const options = {
        drawerLabel: (): any => null,
        drawerIcon: (): any => null,
        drawerLockMode: 'locked-closed',
    }

    // When user logs in
    useEffect(() => {
        setLoggedInLocal(loggedIn)
    }, [loggedIn])

    return (
        <Drawer.Navigator initialRouteName="Search">
            <Drawer.Screen
                name="Search"
                component={Home}
                options={{ drawerLabel: 'Paieska' }}
            />
            {!loggedInLocal && (
                <Drawer.Screen
                    name="Log In"
                    component={LogIn}
                    options={{ drawerLabel: 'Prisijungimas' }}
                />
            )}
            {loggedInLocal && (
            <Drawer.Screen
                name="Account"
                component={AccountScreen}
                options={{ drawerLabel: 'Nustatymai' }}
            />
        )}
            {/* <Drawer.Screen
                name="Account"
                component={AccountScreen}
                options={{ drawerLabel: 'Account settings' }}
            /> */}

            <Drawer.Screen name="SignUp" component={SignUp} options={options} />
        </Drawer.Navigator>
    )
}

export default Menu
