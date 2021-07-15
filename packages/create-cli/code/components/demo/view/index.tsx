/* eslint-disable */
import React from 'react'

import { Input } from 'antd'

import './index.less'

const FormInput = (props) => {
    const { data } = props
    return (
        <div className="form-item">
            <div className="item-main">
                <Input placeholder="请输入" />
            </div>
        </div>
    )
}

export default FormInput

/* eslint-disable no-new */
