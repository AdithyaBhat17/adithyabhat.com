const mockArticles = {
  allArticles: [
    {
      date: '2018-09-09',
      tags: 'React.js',
      slug: 'a-beginner-s-guide-to-understanding-react-s-context-api',
      thumbnail: {
        alt: 'Workstation setup',
        blurhash: 'L9E.YQ?$RQ9F%6Eb_3?cIj?an-9Z',
        title: 'React Context API',
        responsiveImage: {
          srcSet:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.25&fit=crop 142w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.5&fit=crop 284w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.75&fit=crop 426w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop 569w',
          webpSrcSet:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.25&fit=crop&fm=webp 142w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.5&fit=crop&fm=webp 284w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.75&fit=crop&fm=webp 426w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop&fm=webp 569w',
          sizes: '(max-width: 569px) 100vw, 569px',
          src:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop',
          width: 569,
          height: 427,
          aspectRatio: 1.3333333333333333,
          alt: 'Workstation setup',
          title: 'React Context API',
          base64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLFBILDhUNGRUSDh0PEQ8NFx8aGBYVKhUaLisjIh0oHSEiJDUlKC0vMjIyGSU4PTcwPCsxMi8BCgsLDg0OHBAQHC8oGh07Oy8vLy8vLy8vLy8vOzAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABIAGAMBIgACEQEDEQH/xAAaAAACAgMAAAAAAAAAAAAAAAAABAEDAgUG/8QAIRAAAgEEAAcAAAAAAAAAAAAAAAECAwQFERIjMTM0UXH/xAAXAQEBAQEAAAAAAAAAAAAAAAADBAUC/8QAGREAAgMBAAAAAAAAAAAAAAAAAAECETES/9oADAMBAAIRAxEAPwC6U1oQuKLqjFrz1syutUI7YkOU7EEaVtwMClZOnKfCmiStNCWbHDdtEZ3x5fAAy4YcPThbOUnkaicn19kABasFZ//Z',
        },
      },
      title: 'A beginner’s guide to understanding React’s context API',
    },
    {
      date: '2018-08-11',
      tags: 'Miscellaneous ',
      slug: 'the-most-underrated-skill-for-a-developer-communication',
      thumbnail: {
        alt: 'Workstation setup',
        blurhash: 'L9E.YQ?$RQ9F%6Eb_3?cIj?an-9Z',
        title: 'React Context API',
        responsiveImage: {
          srcSet:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.25&fit=crop 142w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.5&fit=crop 284w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.75&fit=crop 426w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop 569w',
          webpSrcSet:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.25&fit=crop&fm=webp 142w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.5&fit=crop&fm=webp 284w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.75&fit=crop&fm=webp 426w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop&fm=webp 569w',
          sizes: '(max-width: 569px) 100vw, 569px',
          src:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop',
          width: 569,
          height: 427,
          aspectRatio: 1.3333333333333333,
          alt: 'Workstation setup',
          title: 'React Context API',
          base64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLFBILDhUNGRUSDh0PEQ8NFx8aGBYVKhUaLisjIh0oHSEiJDUlKC0vMjIyGSU4PTcwPCsxMi8BCgsLDg0OHBAQHC8oGh07Oy8vLy8vLy8vLy8vOzAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABIAGAMBIgACEQEDEQH/xAAaAAACAgMAAAAAAAAAAAAAAAAABAEDAgUG/8QAIRAAAgEEAAcAAAAAAAAAAAAAAAECAwQFERIjMTM0UXH/xAAXAQEBAQEAAAAAAAAAAAAAAAADBAUC/8QAGREAAgMBAAAAAAAAAAAAAAAAAAECETES/9oADAMBAAIRAxEAPwC6U1oQuKLqjFrz1syutUI7YkOU7EEaVtwMClZOnKfCmiStNCWbHDdtEZ3x5fAAy4YcPThbOUnkaicn19kABasFZ//Z',
        },
      },
      title: 'The most underrated skill for a developer: Communication',
    },
    {
      date: '2020-08-20',
      tags: 'Unit testing',
      slug: 'generate-code-coverage-reports-for-your-unit-tests-using-jest',
      thumbnail: {
        alt: 'Workstation setup',
        blurhash: 'L9E.YQ?$RQ9F%6Eb_3?cIj?an-9Z',
        title: 'React Context API',
        responsiveImage: {
          srcSet:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.25&fit=crop 142w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.5&fit=crop 284w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.75&fit=crop 426w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop 569w',
          webpSrcSet:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.25&fit=crop&fm=webp 142w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.5&fit=crop&fm=webp 284w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&dpr=0.75&fit=crop&fm=webp 426w,https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop&fm=webp 569w',
          sizes: '(max-width: 569px) 100vw, 569px',
          src:
            'https://www.datocms-assets.com/30465/1604228316-oskar-yildiz-gy08fxem2l4-unsplash.jpg?ar=4%3A3&auto=format&fit=crop',
          width: 569,
          height: 427,
          aspectRatio: 1.3333333333333333,
          alt: 'Workstation setup',
          title: 'React Context API',
          base64:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLFBILDhUNGRUSDh0PEQ8NFx8aGBYVKhUaLisjIh0oHSEiJDUlKC0vMjIyGSU4PTcwPCsxMi8BCgsLDg0OHBAQHC8oGh07Oy8vLy8vLy8vLy8vOzAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABIAGAMBIgACEQEDEQH/xAAaAAACAgMAAAAAAAAAAAAAAAAABAEDAgUG/8QAIRAAAgEEAAcAAAAAAAAAAAAAAAECAwQFERIjMTM0UXH/xAAXAQEBAQEAAAAAAAAAAAAAAAADBAUC/8QAGREAAgMBAAAAAAAAAAAAAAAAAAECETES/9oADAMBAAIRAxEAPwC6U1oQuKLqjFrz1syutUI7YkOU7EEaVtwMClZOnKfCmiStNCWbHDdtEZ3x5fAAy4YcPThbOUnkaicn19kABasFZ//Z',
        },
      },
      title: 'Generate code coverage reports for your unit tests using Jest ',
    },
  ],
}

const mockArticle = {
  id: '12313',
  title: 'Intro to JavaScript',
  content: 'Blog contents',
  date: '2020-08-20',
  slug: 'intro-to-javascript',
  seo: [],
}

const mockProject = {
  id: '12313',
  title: 'Homero',
  caseStudy: 'Homero case study',
  date: '2020-08-20',
  slug: 'homero',
  seo: [],
  link: 'heyhomero.com',
}

const mockProjects = {
  allProjects: mockArticles.allArticles.map((article) => ({
    ...article,
    id: Math.random().toString(),
    caseStudy: 'abc',
    link: 'abc',
  })),
}

module.exports = {
  mockArticles,
  mockArticle,
  mockProjects,
  mockProject,
}
