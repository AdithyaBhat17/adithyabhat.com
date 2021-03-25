import { ContainerProps } from '../interfaces/layout'
import { memo } from 'react'

function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      data-testid="container"
      className={`px-6 md:px-36 lg:px-48 mb-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default memo(Container)
