import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

const enchancers = []

if(window.__REDUX_DEVTOOLS_EXTENSION__){
    enchancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

const middleware = [
    ReduxThunk,
  
]

const composedEnhacers = compose(
    applyMiddleware(...middleware),
    ...enchancers
)



export default createStore(
    reducers,
    {},
    composedEnhacers
)


  
