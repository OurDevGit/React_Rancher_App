import React from 'react'
import { Image } from 'antd';

import './style.scss'
const CustomButton = (props) =>{
    return (
            <div className="customButton" onClick={props.onClick}>
                <Image 
                    width={props.imgWidth}
                    src={props.imageUrl}
                    className="left-image"
                />
                <label className="right-label">
                    <p>{props.label}</p>
                    {props.description ? 
                    <p>{props.description}</p>
                    : null
                    }
                    
                </label>
            </div>
    )
}
export default CustomButton;