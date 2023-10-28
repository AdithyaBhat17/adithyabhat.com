import PhotosPage from '@/pages/photos'
import { render } from '@testing-library/react'
import { mockProjects } from 'test/__mocks__/content'

// Mock the fetchGalleryAPI function
jest.mock('../lib/datocms', () => ({
  fetchGalleryAPI: jest.fn().mockResolvedValue({ /* mock data here */ }),
}))

describe('PhotosPage', () => {
  it('renders without crashing', () => {
    render(<PhotosPage data={mockProjects} />)
    // Add more assertions here
  })
})