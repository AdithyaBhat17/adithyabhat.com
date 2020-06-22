import { ContainerProps } from '../../interfaces/layout'

export default function Container({ children, props }: ContainerProps) {
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
