import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import discountProvider from './contexts/discountsContext'
import FlashMessage from 'react-native-flash-message'
import Menu from './components/menu/menu'
import LoadingScreen from './screens/loadingScreen/loadingScreen'

export default function App() {
    return (
        <discountProvider.discountProvider>
            <LoadingScreen>
                <NavigationContainer>
                    <Menu />
                </NavigationContainer>
                <FlashMessage position="top" />
            </LoadingScreen>
        </discountProvider.discountProvider>
    )
}
