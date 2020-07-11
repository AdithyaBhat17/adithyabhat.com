import { ContainerProps } from '../interfaces/layout'
import { memo } from 'react'

function Container({ children, props }: ContainerProps) {
  return (
    <div
      data-testid="container"
      {...props}
      className="px-6 md:px-36 lg:px-48 mb-6"
    >
      {children}
    </div>
  )
}

export default memo(Container)
