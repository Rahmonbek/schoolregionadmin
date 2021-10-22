import React, { Component } from 'react'
import style from '../css/Loader.module.css'
export default class Loader extends Component {
    render() {
        return (
            <div style={{zIndex:'34212323',background:'radial-gradient(#9b59b6, #8e44ad)'}}>
                  <div className={style.wrapper}>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.shadow}></div>
        <div className={style.shadow}></div>
        <div className={style.shadow}></div>
        <span>Kuting...</span>
    </div>
  
            </div>
        )
    }
}