import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import {discountContext} from '../../contexts/discountsContext'
import CoreCard from '../coreCard/coreCard'
import Fuse from 'fuse.js'
import useHandleScroll from '../../utils/useHandleScroll';

const MainBody = (props) => {
    const { discounts, dispatch } = useContext(discountContext)
    const [localDiscounts, setLocalDiscounts] = useState(discounts)
    const { handleScroll, showButton } = useHandleScroll();

    const scroll = React.createRef<ScrollView>()

    const options = {
        keys: ['title'],
        tokenize: true,
      matchAllTokens: true,
      threshold: 0.3
    }
    let fuse = new Fuse(discounts, options);

    const discountSearch = props.discountSearch

    useEffect(() => {
        setLocalDiscounts(discounts)
    }, [discounts])

    useEffect(()=> {
        if(discountSearch != "")
        {    setLocalDiscounts(fuse.search(discountSearch));
            scroll.current.scrollTo({y: 0, animated: true});}
        else {
            setLocalDiscounts(discounts);
        }
    }, [discountSearch])

// TODO lazy loading?
    const handleScrollLocal = (event) => {
       if(!showButton){
        dispatch({
            type: 'hideSearch',
            value: true
        })
       } else if(showButton) {
        dispatch({
            type: 'hideSearch',
            value: false
        })
       }

    }

    return (
        <View >
            {discounts.length > 0 && (
                <ScrollView onScrollEndDrag={(e) => {handleScrollLocal(e), handleScroll(e)}}
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    ref={scroll}
                    bounces={false}
                >
                    {localDiscounts.map((card, key) => {
                        if (key < 20) {
                            return <CoreCard card={card} key={key} navigation={props.navigation} />
                        }
                    })}
                </ScrollView>
            )}
        </View>
    )
}

export default MainBody
// flex : 1 supisa scrollView
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        marginTop: 20,
    },
})
