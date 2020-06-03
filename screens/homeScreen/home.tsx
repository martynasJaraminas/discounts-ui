import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native'
import MainBody from '../../components/mainBody/mainBody'


const Home = ({navigation}) => {
    const [discountSearchName, setDiscountSearchName] = useState<string>('')
    const [searching, setSearching] = useState<boolean>(false)


    const onChangeText = async text => {
        if (!searching) {
            setDiscountSearchName(text)
            return
        } else {
            clearSearch()
            return
        }
    }

    const clearSearch = async () => {
        await wait(500)
        setSearching(false)
    }

    const wait = async milSeconds => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, milSeconds)
        })
    }

    return (
        <View style={styles.outerContainer}>
                <View style={styles.container}>
                    <TextInput
                        onChangeText={text => onChangeText(text)}
                        placeholder="Pieskos laukelis..."
                        style={styles.searchBox}
                        multiline={false}
                        // value={discountSearchName}
                    />
                    <TouchableOpacity style={{justifyContent: "center", alignItems: "stretch", paddingLeft: 5}} onPress={()=> navigation.openDrawer()}>
                        <Image source={require("../../../discounts-ui/menu3.png")} style={{width: 30, height:30}}/>
                    </TouchableOpacity>
                </View>
            <MainBody discountSearch={discountSearchName} navigation={navigation}/>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        top: 30,
        backgroundColor: '#f7f7f7',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchBox: {
        textAlign: 'center',
        height: 30,
        width: '85%',
        backgroundColor: '#ffffff',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    outerContainer: {
        flex: 2,
    },
})
