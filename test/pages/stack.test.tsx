import Stack from '@/pages/stack'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const data = {
  allStacks: [
    {
      id: '25554560',
      category: 'MacOS',
      product: 'Alfred App',
      link: 'https://www.alfredapp.com/',
      logo: {
        url: 'https://www.datocms-assets.com/30465/1616587914-alfred.png',
      },
      description:
        'Alfred is an award-winning app for macOS which boosts your efficiency with hotkeys, keywords, text expansion and more.',
    },
    {
      id: '25554590',
      category: 'MacOS',
      product: 'Cleanshot X',
      link: 'https://cleanshot.com/',
      logo: {
        url: 'https://www.datocms-assets.com/30465/1616589521-cleanshotx.png',
      },
      description: 'Capture your Mac’s screen like a pro.',
    },
    {
      id: '25556550',
      category: 'MacOS',
      product: 'Flow App',
      link: 'https://flowapp.info/',
      logo: {
        url: 'https://www.datocms-assets.com/30465/1616588033-flowapp.png',
      },
      description: 'Beautiful Pomodoro timer app for Mac.',
    },
    {
      id: '25554815',
      category: 'MacOS',
      product: 'iStat Menus',
      link: 'https://bjango.com/mac/istatmenus/',
      logo: {
        url: 'https://www.datocms-assets.com/30465/1616512136-istat-menus.webp',
      },
      description: 'An advanced Mac system monitor for your menubar.',
    },
    {
      id: '25554825',
      category: 'MacOS',
      product: 'Magnet App',
      link: 'https://magnet.crowdcafe.com/',
      logo: {
        url: 'https://www.datocms-assets.com/30465/1616588574-magnet.png',
      },
      description:
        'Magnet declutters your screen by snapping windows into organized tiles.',
    },
    {
      id: '25556579',
      category: 'Productivity',
      product: 'Notion',
      link: 'https://www.notion.so/',
      logo: {
        url: 'https://www.datocms-assets.com/30465/1616588603-notion.png',
      },
      description: 'All-in-one workspace. Write, plan, and get organized.',
    },
  ],
}

const categories = ['MacOS', 'Productivity']

test('Renders all the tools based on selected categories.', async () => {
  render(<Stack data={data} categories={categories} />)

  const products = screen.getAllByRole('link')

  expect(products.length).toEqual(data.allStacks.length)

  const select = screen.getByRole('combobox')
  const options = screen.getAllByRole('option')

  // expect three categories to be available for the users -> All Categories, MacOS, Productivity
  expect(options.length).toEqual(categories.length + 1)

  fireEvent.change(select, { target: { value: 'Productivity' } })
  await waitFor(() => expect(screen.getAllByRole('link').length).toEqual(1))

  fireEvent.change(select, { target: { value: 'MacOS' } })
  await waitFor(() => expect(screen.getAllByRole('link').length).toEqual(5))
})
