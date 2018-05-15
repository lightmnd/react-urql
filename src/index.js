import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { Provider, Client, subscriptionExchange } from 'urql'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { AUTH_TOKEN } from './constants'

import './styles/index.css'

// Initialise a websocket client
const subscriptionClient = new SubscriptionClient('ws://localhost:4000')

// Bridge that accepts subscription operations from urql and connects them to
// the subscription client
const createSubscription = (operation, observer) =>
  subscriptionClient.request(operation).subscribe({
    next: observer.next,
    error: observer.error
  })

// Set the Authorization header on the fetchOptions if a token is available
const authExchange = exchange => operation => {
  const token = localStorage.getItem(AUTH_TOKEN)
  if (token) {
    operation.context.fetchOptions.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  return exchange(operation)
}

// urql's client
// The `transformExchange` applies the bridge as described above
const client = new Client({
  url: 'http://localhost:4000',
  transformExchange: exchange =>
    authExchange(subscriptionExchange(createSubscription, exchange))
})

ReactDOM.render(
  <BrowserRouter>
    <Provider client={client}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)

registerServiceWorker()
