import React, { Component } from "react";
import style from "../css/Loader.module.css";
export default class Loader extends Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          zIndex: "34212323",
          background: "#001529",
          width: "100vw",
          height: "100vh",
        }}
      >
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
    );
  }
}
