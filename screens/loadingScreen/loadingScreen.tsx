import React, { useState, useContext, useEffect } from 'react'
import { View, AsyncStorage, StyleSheet, ActivityIndicator } from 'react-native'
import { validateUserJWT } from '../../services/userService'
import { discountContext } from '../../contexts/discountsContext'
import { getDiscounts } from '../../services/commonQueries'


// All values should be true by default
const isLoadingInitState = {
    isUserLogged: false,
    isDiscounts: true,
}

const LoadingScreen = ({ children }) => {
    const { dispatch, isLoading } = useContext(discountContext)
    const [isLoadingLocal, setIsLoadingLocal] = useState(isLoadingInitState)

    // Init useEffect to get required data
    useEffect(() => {
        dispatch(({
            type: "isLoading",
            value: true
        }))
        getData()
        // isUserLogged()
    }, [])

    useEffect(()=> {
        if(!isLoadingLocal.isDiscounts && !isLoadingLocal.isUserLogged) {
            dispatch(({
                type: "isLoading",
                value: false
            }))
        }
    },[isLoadingLocal])

    const getData = async () => {
        const discounts = await getDiscounts()
        dispatch({
            type: 'setDiscounts',
            value: discounts,
        })
        setIsLoadingLocal({ ...isLoadingLocal, isDiscounts: false })
    }

    const isUserLogged = async () => {
        try {
            const JWT = await AsyncStorage.getItem('JWT')
            if (JWT !== null) {
                // TODO: check response here
                const validation = await (validateUserJWT(JWT) as any)
                if (validation.JWT) {
                    await AsyncStorage.setItem('JWT', validation.JWT)
                    dispatch({
                        type: 'loggedIn',
                        value: true,
                    })
                }
            } else {
                dispatch({
                    type: 'loggedIn',
                    value: false,
                })
            }
        } catch (error) {
            console.log('ERROR getting JWT from storage')
        } finally {
            setIsLoadingLocal({ ...isLoadingLocal, isUserLogged: false })
        }
    }

    return isLoading ? ( 
        <View style={styles.loadingContainer}>
           <ActivityIndicator size={200} color="#ADD8E6" />
        </View>
    ) : (
        children
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: "center",
        justifyContent: 'center',
    },
})
