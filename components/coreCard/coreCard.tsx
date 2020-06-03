import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Button,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import { Card, Image } from 'react-native-elements'
import { discountContext } from '../../contexts/discountsContext'
import { updateUserSubscription } from '../../services/userService'

const CoreCard = props => {
    const { loggedIn } = useContext(discountContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSub, setIsSub] = useState<boolean>(false)

    const card = props.card
    const navigation = props.navigation
    card.currentPrice = card.currentPrice
        ? card.currentPrice.replace(/\r?\n|\r|€/g, '').replace(' ', '.')
        : undefined

    card.priceBefore = card.priceBefore
        ? card.priceBefore.replace(/\r?\n|\r|€/g, '')
        : undefined

    if (!Array.isArray(card['info-tag'])) {
        card['info-tag'] = card['info-tag'].split(' ')
    }

    const onSubscribeHandler = async card => {
            setIsLoading(true)
            if(!isSub){
                // TODO: what happens if unsuccessfully call
                const result = await updateUserSubscription(card, true)
                setIsSub(true)
            }else{
                const result = await updateUserSubscription(card, false)
                setIsSub(false)
            }
            setIsLoading(false)
    }

    // TODO: make check if discount is subscribed or not

    const returnStart = (card) => {
        return (
            <TouchableOpacity
                style={{ height: 50 }}
                onPress={() => onSubscribeHandler(card)}
            >
                {!isSub ? 
                <Image
                    source={require('../../emptyStar.png')}
                    style={{ width: 35, height: 35 }}
                /> : 
                <Image
                    source={require('../../filledStar.png')}
                    style={{ width: 35, height: 35 }}
                />
                }
            </TouchableOpacity>
        )
    }

    const euroSign = '€'
    return (
        <Card title={card.title} titleStyle={{paddingRight: 35}} containerStyle={styles.card}>
            <View style={styles.subscribe}>
                {!isLoading && (
                    returnStart(card)
                )}
                {isLoading && (
                    <ActivityIndicator size="large" color="#0000FF" />
                )}
            </View>
            <View style={styles.bodyContainer}>
                {card.currentPrice && (
                    <Text style={{ marginBottom: 5 }}>
                        Kaina su nuolaida: {card.currentPrice} {euroSign}
                    </Text>
                )}
                {card.priceBefore && (
                    <Text style={{ marginBottom: 5, marginLeft: 2 }}>
                        Kaina be nuolaidos: {card.priceBefore} {euroSign}
                    </Text>
                )}
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../../shopCart.png')}
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Text style={{ marginTop: 10 }}>Su kortele</Text>
                    {card.discountCard ? (
                        <Image
                            style={{ width: 10, height: 10 }}
                            source={require('../../tick.png')}
                        />
                    ) : (
                        <Image
                            style={{ width: 10, height: 10 }}
                            source={require('../../notTick.png')}
                        />
                    )}
                </View>
                {card.discountPercentOnly && (
                    <View style={styles.footerItem}>
                        <Text style={{ marginTop: 10 }}>Nuoldaida</Text>
                        <Text style={styles.discountPercent}>
                            {card.discountPercentOnly}{' '}
                        </Text>
                    </View>
                )}
                {card['info-tag'] && (
                    <View style={styles.footerItem}>
                        <Text style={{ marginTop: 10 }}>
                            {card['info-tag'][0]} {card['info-tag'][1]}
                        </Text>
                        <Text style={{ marginTop: 1, fontWeight: 'bold' }}>
                            {card['info-tag'][2]} - {card['info-tag'][4]}
                        </Text>
                    </View>
                )}
            </View>
        </Card>
    )
}

export default CoreCard

const styles = StyleSheet.create({
    subscribe: {
        position: 'absolute',
        right: 0,
    },
    bodyContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    footer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerItem: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    discountPercent: {
        fontWeight: 'bold',
    },
})
