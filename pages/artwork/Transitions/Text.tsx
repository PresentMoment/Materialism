import React, { Children } from 'react'
import { Transition } from "react-transition-group";

import styles from '../[pid].module.css'

export default function Text(props) {
const fullImg = props.fullImg;
const safariDesktop = props.safariDesktop;

  const textStyle = {
    transition: `opacity ${safariDesktop ? 10 : 1000}ms cubic-bezier(0.47, 0, 0.75, 0.72)`,
    opacity: 1
  }

  const textTransitions = {
    entering: { opacity: 0},
    entered: { opacity: 0},
    exiting: { opacity: 1},
    exited: { opacity: 1},
  };
  return (
    <Transition in={fullImg} timeout={safariDesktop ? 10 : 1000}>
    {(state) => (
    <div 
      style={{
        ...textStyle,
        ...textTransitions[state],
      }}
      className={styles.info}
      >
      {props.children}
      </div>
            )}</Transition>
  )
}
