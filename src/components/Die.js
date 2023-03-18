import React from 'react'
import '../css/Die.css'

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }

    return(
        <h2 className='box' style={styles} onClick={props.holdDieFace}>
            {props.value}
        </h2>
    )
}