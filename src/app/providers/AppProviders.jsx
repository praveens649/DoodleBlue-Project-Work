import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../../store/store'
import { ThemeProvider } from '../../components/theme/ThemeProvider'

export function AppProviders({ children }) {
  return <ThemeProvider><Provider store={store}><PersistGate loading={null} persistor={persistor}>{children}</PersistGate></Provider></ThemeProvider>
}
