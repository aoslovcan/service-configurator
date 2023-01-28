import React from 'react'
import ReactDOM from 'react-dom/client'
import './static/styles/index.scss'
import HomePage from './layouts/HomePage'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<HomePage />)

reportWebVitals()
