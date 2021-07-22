import React from 'react'
import { Transition } from "react-transition-group";

export default function Overlay(props) {

  const fullImg = props.fullImg

  const overlayStyle = {
    transition: `opacity ${1000}ms ease-in-out, height ${1000}ms ease-in-out`,
    height: '100%',
    backgroundColor: 'black',
    opacity: 0,
    zIndex: 0,
    position: 'absolute',
    width: '100%',
    maxHeight: `${props.height}px`,
    cursor: 'pointer'
  }

  const overlayTransitions = {
    entering: { opacity: 0, height: '100%', zIndex: 99},
    entered: { opacity: 0, height: '100%', zIndex: 99},
    exiting: { opacity: 0.3, height: '42vh'},
    exited: { opacity: 0.3, height: '42vh'},
  };

  return (
<Transition in={fullImg} timeout={1000}>
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
