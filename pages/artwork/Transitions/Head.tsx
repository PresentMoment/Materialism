import React from 'react'
import { Transition } from "react-transition-group";

export default function Head(props) {

  const fullImg = props.fullImg

  const headerStyle = {
    transition: `height ${1000}ms cubic-bezier(0.47, 0, 0.75, 0.72)`,
    height: '63px',
    overflow: 'hidden'
  };
  
  const headerTransition = {
    entering: { height: '0px',
  },
    entered: { height: '0px',
  },
    exiting: { height: '63px',
  },
    exited: { height: '63px',
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
