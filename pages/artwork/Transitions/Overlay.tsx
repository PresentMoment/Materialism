import React from 'react'
import { Transition } from "react-transition-group";

export default function Overlay(props) {

  const fullImg = props.fullImg;
  const safariDesktop = props.safariDesktop;

  const overlayStyle = {
    transition: `height ${safariDesktop ? 10 : 1000}ms cubic-bezier(0.47, 0, 0.75, 0.72), opacity ${safariDesktop ? 10 : 1000}ms ease`,
    height: '100%',
    backgroundColor: 'black',
    opacity: 0,
    zIndex: 0,
    position: 'absolute',
    width: '100%',
    maxHeight: `${props.height}px`,
    cursor: 'pointer',
  }

  const overlayTransitions = {
    entering: { opacity: 0, height: '100vh', zIndex: 99},
    entered: { opacity: 0, height: '100vh', zIndex: 99},
    exiting: { opacity: 0.3, height: '42vh'},
    exited: { opacity: 0.3, height: '42vh'},
  };

  return (
<Transition in={fullImg} timeout={safariDesktop ? 10 : 1000}>
{(state) => (
            <div
                style={{
                  ...overlayStyle,
                  ...overlayTransitions[state],
                }}
                onClick={props.handleDivClick}
              />
              )}
              </Transition>
  )
}
