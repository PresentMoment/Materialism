import React from 'react'
import { Transition } from "react-transition-group";

export default function Head(props) {

  const fullImg = props.fullImg

  const headerStyle = {
    transition: `height ${1000}ms ease-in-out`,
    height: '58px',
    overflow: 'hidden'
  };
  
  const headerTransition = {
    entering: { height: '0px',
  },
    entered: { height: '0px',
  },
    exiting: { height: '58px',
  },
    exited: { height: '58px',
  },
  };

  return (
<Transition in={fullImg} timeout={1000}>
{(state) => (
            <div
                style={{
                  ...headerStyle,
                  ...headerTransition[state],
                }}
              >{props.children}
              </div>
              )}
              </Transition>
  )
}
