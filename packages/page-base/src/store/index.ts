import { createContext, useContext } from 'react'

import DesignStore from './design'

const context = createContext({
    designStore: new DesignStore()
})

export const useStores = () => useContext(context)
