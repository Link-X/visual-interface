import React, { useState } from 'react'
import Engine from '@visual-interface/engine/dist/esm/index'
import '@visual-interface/engine/dist/style/index.css'

console.log(Engine)
const Home = () => {
    return (
        <div>
            <Engine />
        </div>
    )
}

export default Home
