import axios from 'axios'
const mockdata = require('../Untitled-1.json')

const URL = 'https://nameless-hollows-17095.herokuapp.com/discounts'

export const getDiscounts = async () => {
    try {
        await wait(1000);
        return JSON.parse(mockdata.discounts)
        // const result = await axios.get(URL)
        // return JSON.parse(result.data.discounts)
    } catch (error) {
        console.log(error)
    }
}

const wait = async milSeconds => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, milSeconds)
    })
}