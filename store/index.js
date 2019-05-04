import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state:{
            enteredPasscode:'',
            passcode:'qwerty123'
        },
        mutations:{},
        actions:{},
        getters:{
            passcode(state){
                return state.passcode
            }
        }
    })
}

export default createStore