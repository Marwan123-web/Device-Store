import React from 'react'

const Button = ({classes, label, ButtonFun, children}: {classes: string, label?: string, ButtonFun?: Function, children?: any}) => {
  const runButtonFun = () => {
    if (ButtonFun) ButtonFun()
  }
  return (
    <button
          className={classes}
          onClick={() => runButtonFun()}
    >
          {children || label}
    </button>
  )
}

export default Button