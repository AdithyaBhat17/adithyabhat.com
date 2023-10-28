import PhotosPage from '@/pages/photos'
import { render } from '@testing-library/react'
import { mockProjects } from '../__mocks__/content'

describe('PhotosPage', () => {
  it('renders without crashing', () => {
    render(<PhotosPage data={mockProjects} />)
    // Add more assertions here
  })
})