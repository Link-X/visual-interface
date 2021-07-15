/* eslint-disable */
import React from 'react'

import { Input, Switch, Select } from 'antd'

import useDesignState from 'visual-interface-poject/src/component/Hooks/design-state'

const { Option } = Select

const EditInput = (props) => {
    const { onChangeKeyArr } = useDesignState(props)
    console.log('design')
    return (
        <div className="edit-input">
            <div className="edit-box_item eidt-box_title">
                <div className="box-item_label">题目名称:</div>
                <Input.TextArea
                    placeholder="请输入题目名称"
                    allowClear
                    disabled={props.disablePage}
                    value={props.data.fieldDesc}
                    onChange={(e) => {
                        onChangeKeyArr(['fieldDesc'], e.target.value)
                    }}
                />
            </div>
            <div className="edit-box_item">
                <div className="box-item_label">是否必填:</div>
                <Switch
                    checked={props.data.fieldRequired}
                    disabled={props.disablePage}
                    onChange={(e) => {
                        onChangeKeyArr(['fieldRequired'], e)
                    }}
                ></Switch>
            </div>
            <div className="edit-box_item">
                <div className="box-item_label">输入类型</div>
                <Select
                    disabled={props.disablePage}
                    defaultValue={props.data.fieldOption.type}
                    onChange={(e) => {
                        onChangeKeyArr(['fieldOption', 'type'], e)
                    }}
                >
                    <Option value="any">无限制</Option>
                    <Option value="number">数字</Option>
                    <Option value="english">英文</Option>
                    <Option value="chinese">中文</Option>
                </Select>
            </div>
        </div>
    )
}

export default EditInput
/* eslint-disable no-new */
