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


const mockPhotos = {
  "allPlaces": [
    {
      "id": "1cF4astMRG6moPR7tKTrkQ",
      "city": "Belur & Halebeedu",
      "distance": "232km from Bangalore Airport",
      "state": "Karnataka",
      "location": "https://maps.app.goo.gl/YFDQYeyssUqnBCDu5",
      "camera": "Pixel 7",
      "date": "2023-10-20",
      "district": "Hassan",
      "photos": [
        {
          "alt": null,
          "blurhash": "LwKc|d^jxtt7~VxZf+kC?HR+R*j[",
          "url": "https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?dpr=0.25&fit=clip 941w,https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?dpr=0.5&fit=clip 1882w,https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?dpr=0.75&fit=clip 2823w,https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?fit=clip 3764w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?dpr=0.25&fit=clip&fm=webp 941w,https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?dpr=0.5&fit=clip&fm=webp 1882w,https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?dpr=0.75&fit=clip&fm=webp 2823w,https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?fit=clip&fm=webp 3764w",
            "sizes": "(max-width: 3764px) 100vw, 3764px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLChYLDhgQFRUNDh0dFREVGSIdHRYVFhUdHzclGh0oHRUWJDUlKC0vMjIyHSI4PTcwPCsxMi8BCgsLDg0OHBAQHDsoIh0vLy81NTs7OzsvLy8vLy8vLy8vLzsvLy8vLy8vLy8vLy81Ly8vLy8vLy8vLy8vLy8vL//AABEIAA4AGAMBIgACEQEDEQH/xAAYAAEAAwEAAAAAAAAAAAAAAAAGAQQHAP/EACAQAAEEAgEFAAAAAAAAAAAAAAMAAQIGBAUSERMjMZH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEA//EABkRAQACAwAAAAAAAAAAAAAAAAEAAhESIf/aAAwDAQACEQMRAD8A0fIsOrFF3c0fqI5121o8p+JGVbaV2MRS87+kNlVxlyJPIzolKMYoHInyL5ryE6c2UoMWrCjlO3ddckYZPaf/2Q==",
            "src": "https://www.datocms-assets.com/109344/1698250236-pxl_20231020_113240694-3.jpg?fit=clip",
            "width": 3764,
            "height": 2120,
            "aspectRatio": 1.7754716981132075
          }
        },
        {
          "alt": null,
          "blurhash": "LYFF$|8_%L%2?wD%t7WBNyxuM{WA",
          "url": "https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?dpr=0.25&fit=clip 768w,https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?dpr=0.5&fit=clip 1536w,https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?dpr=0.75&fit=clip 2304w,https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?fit=clip 3072w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?dpr=0.25&fit=clip&fm=webp 768w,https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?dpr=0.5&fit=clip&fm=webp 1536w,https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?dpr=0.75&fit=clip&fm=webp 2304w,https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?fit=clip&fm=webp 3072w",
            "sizes": "(max-width: 3072px) 100vw, 3072px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgVEAsLDhgQFRcNDhUPFg0YHh8ZGBYbIhUaHysjGh0oKSEWJDUxKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHBANFy8oIigvOy84Ly8vLy8vLy87Oy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABYAGAMBIgACEQEDEQH/xAAYAAEAAwEAAAAAAAAAAAAAAAAABQYHAf/EACAQAAAGAQUBAAAAAAAAAAAAAAABAgMEBSIGEiExQRH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAwH/xAAaEQEBAAIDAAAAAAAAAAAAAAAAAgExEhMh/9oADAMBAAIRAxEAPwCuzbuXAnFiJys1NOkPI+JFa1S6abBOPolKeUbDSHNnQM0VQ1WFJnSYqcfAFardaqZSSNvQB8k+tkWprR1yxLjrkTlVPUuAkzT4ACeNLVn11FgpLx4gADRf/9k=",
            "src": "https://www.datocms-assets.com/109344/1698250144-pxl_20231020_094733924.jpg?fit=clip",
            "width": 3072,
            "height": 2719,
            "aspectRatio": 1.1298271423317396
          }
        },
        {
          "alt": null,
          "blurhash": "L271vGI:4.?H~WI:R+xa%gM{tQxu",
          "url": "https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?dpr=0.25&fit=clip 768w,https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?dpr=0.5&fit=clip 1536w,https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?dpr=0.75&fit=clip 2304w,https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?fit=clip 3072w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?dpr=0.25&fit=clip&fm=webp 768w,https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?dpr=0.5&fit=clip&fm=webp 1536w,https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?dpr=0.75&fit=clip&fm=webp 2304w,https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?fit=clip&fm=webp 3072w",
            "sizes": "(max-width: 3072px) 100vw, 3072px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgFCgoFBQwFBQUFBREJCgUMFxMZGBYTFhUaHysjGh0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLBQUFEAUFEC8cFhwvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABgAEgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIkBSQAAAAAH/9k=",
            "src": "https://www.datocms-assets.com/109344/1698250223-pxl_20231020_112633358.jpg?fit=clip",
            "width": 3072,
            "height": 4080,
            "aspectRatio": 0.7529411764705882
          }
        },
        {
          "alt": null,
          "blurhash": "L584b.NyIUw]yXS5xDIV0#Nb%1E1",
          "url": "https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?dpr=0.25&fit=clip 1020w,https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?dpr=0.5&fit=clip 2040w,https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?dpr=0.75&fit=clip 3060w,https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?fit=clip 4080w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?dpr=0.25&fit=clip&fm=webp 1020w,https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?dpr=0.5&fit=clip&fm=webp 2040w,https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?dpr=0.75&fit=clip&fm=webp 3060w,https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?fit=clip&fm=webp 4080w",
            "sizes": "(max-width: 4080px) 100vw, 4080px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBhYICAgLFg8LFQ4QDQ0SDhINDw0YFxMZGBYVFiEeHysjHR0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OEA0OFS8cFhwvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABMAGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAABAEFBv/EACAQAAEEAgEFAAAAAAAAAAAAAAABAwQRAhIxBRMUISL/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABgRAQEBAQEAAAAAAAAAAAAAAAEAEgMC/9oADAMBAAIRAxEAPwDDxWnFcuhnJHHctKIiTmsVpaGY0trybWgfbScyqcW3IcrZUAd6rJZcd+aAnbVgqJtV7vI03ku/JICwSzmSrI9qAAE3/9k=",
            "src": "https://www.datocms-assets.com/109344/1698250210-pxl_20231020_112515924.jpg?fit=clip",
            "width": 4080,
            "height": 3072,
            "aspectRatio": 1.328125
          }
        },
        {
          "alt": null,
          "blurhash": "L8AJ.vk?D%nh%MogM|Rj01n#RkWB",
          "url": "https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?dpr=0.25&fit=clip 257w,https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?dpr=0.5&fit=clip 514w,https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?dpr=0.75&fit=clip 771w,https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?fit=clip 1029w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?dpr=0.25&fit=clip&fm=webp 257w,https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?dpr=0.5&fit=clip&fm=webp 514w,https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?dpr=0.75&fit=clip&fm=webp 771w,https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?fit=clip&fm=webp 1029w",
            "sizes": "(max-width: 1029px) 100vw, 1029px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgTFgoLDhgQDhYVEhUVFhEkKh0ZHSYVGhUdHysjHR0oIhUWJDUlKC0vMjIyHSI4PTcwPCsxMi8BCgsLDg0OHBAOFS8cFhwvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABkADAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAFBgIDBP/EAB8QAAEEAgIDAAAAAAAAAAAAAAEAAgMFESEEFAYyNP/EABUBAQEAAAAAAAAAAAAAAAAAAAIB/8QAFREBAQAAAAAAAAAAAAAAAAAAAgD/2gAMAwEAAhEDEQA/AFeqomRV7hnaGzUOZXFMXBZN1SMqJifnaCmIVwL49Yqp/kJDjtBuD8xWWT3KqoL/2Q==",
            "src": "https://www.datocms-assets.com/109344/1698250202-pxl_20231020_112417038.jpg?fit=clip",
            "width": 1029,
            "height": 2071,
            "aspectRatio": 0.496861419604056
          }
        },
        {
          "alt": null,
          "blurhash": "LhFilg-:e-xu_4%2j?ofW?ofj[a}",
          "url": "https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?dpr=0.25&fit=clip 597w,https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?dpr=0.5&fit=clip 1194w,https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?dpr=0.75&fit=clip 1791w,https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?fit=clip 2388w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?dpr=0.25&fit=clip&fm=webp 597w,https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?dpr=0.5&fit=clip&fm=webp 1194w,https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?dpr=0.75&fit=clip&fm=webp 1791w,https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?fit=clip&fm=webp 2388w",
            "sizes": "(max-width: 2388px) 100vw, 2388px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgUDhQQDiMQDw0QDxIPFQ0NFxUZGBYVFhYmHy0lGh0oHRUWJTUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0NFRAQHC8cFh0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABgAFAMBIgACEQEDEQH/xAAZAAEAAgMAAAAAAAAAAAAAAAAABAUCAwb/xAAfEAABBAICAwAAAAAAAAAAAAABAAIDBAURBhIHIUH/xAAWAQEBAQAAAAAAAAAAAAAAAAADAgH/xAAZEQACAwEAAAAAAAAAAAAAAAAAAQIREwP/2gAMAwEAAhEDEQA/AO8tRbbrSqbVFojJIVHkPKNCJ49LG15Fx89DsB8VwmHPmmYy42J0hKKgPOqhJKJdAciJlOM05WhwWo8eqx0NbREaQjbITMDT6oiKqMs//9k=",
            "src": "https://www.datocms-assets.com/109344/1698250193-pxl_20231020_112231257.jpg?fit=clip",
            "width": 2388,
            "height": 2838,
            "aspectRatio": 0.8414376321353065
          }
        },
        {
          "alt": null,
          "blurhash": "LuDdCkoft6flt:j?oeogtnkCadWB",
          "url": "https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?dpr=0.25&fit=clip 904w,https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?dpr=0.5&fit=clip 1808w,https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?dpr=0.75&fit=clip 2712w,https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?fit=clip 3617w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?dpr=0.25&fit=clip&fm=webp 904w,https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?dpr=0.5&fit=clip&fm=webp 1808w,https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?dpr=0.75&fit=clip&fm=webp 2712w,https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?fit=clip&fm=webp 3617w",
            "sizes": "(max-width: 3617px) 100vw, 3617px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBhEICAgLFAoPGhgQDQ0NGR0NFg0OFxUZGBYVFhUmHysjGh0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLBQ0OHQ0NHS8cFigvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABEAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABQYE/8QAHhAAAQQCAwEAAAAAAAAAAAAAAAECAwQFERIyMyL/xAAXAQEBAQEAAAAAAAAAAAAAAAADBAIA/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAQUAf/aAAwDAQACEQMRAD8ApJYpsbvmhxz5Wmr+KuQi1qNl8f05TlnxqpJtzlKddQcc7Yx2Ma6DavQGXbS3DpJFAfbKmcc61W8Sdd7gBLuEfmAAeuf/2Q==",
            "src": "https://www.datocms-assets.com/109344/1698250182-pxl_20231020_095101203-2.jpg?fit=clip",
            "width": 3617,
            "height": 2472,
            "aspectRatio": 1.463187702265372
          }
        },
        {
          "alt": null,
          "blurhash": "LJD]C}V=E0%2E:$wsQa~0+s7wtWB",
          "url": "https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?dpr=0.25&fit=clip 768w,https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?dpr=0.5&fit=clip 1536w,https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?dpr=0.75&fit=clip 2304w,https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?fit=clip 3072w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?dpr=0.25&fit=clip&fm=webp 768w,https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?dpr=0.5&fit=clip&fm=webp 1536w,https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?dpr=0.75&fit=clip&fm=webp 2304w,https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?fit=clip&fm=webp 3072w",
            "sizes": "(max-width: 3072px) 100vw, 3072px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoTCAgLChYNDg0NDQ4VDhENDQ0NFxQZGBYfFiEmHysjHR0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OGhAQHDsdFigvLy8vLzU7Oy8vLy8vLy8vLy8vLy81Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABgAEgMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAABAIFBgH/xAAfEAABAwQDAQAAAAAAAAAAAAAAAQIDBBQxMhETIRL/xAAYAQACAwAAAAAAAAAAAAAAAAABBAIDBf/EABsRAAICAwEAAAAAAAAAAAAAAAABAhUDBBIR/9oADAMBAAIRAxEAPwDNsofhSc1Ijo8FvE2J6+jMtNAsWUDh3HEGXSUjJWSAX1rDzlAG7AXrxWnc9+FG3xzdeygBmcofU2J9c3Ox0AI+Is6Z/9k=",
            "src": "https://www.datocms-assets.com/109344/1698250167-pxl_20231020_095043101.jpg?fit=clip",
            "width": 3072,
            "height": 4080,
            "aspectRatio": 0.7529411764705882
          }
        },
        {
          "alt": null,
          "blurhash": "LVEoY,9GNdjE~pE1t6V@tRNGoJfk",
          "url": "https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?dpr=0.25&fit=clip 768w,https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?dpr=0.5&fit=clip 1536w,https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?dpr=0.75&fit=clip 2304w,https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?fit=clip 3072w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?dpr=0.25&fit=clip&fm=webp 768w,https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?dpr=0.5&fit=clip&fm=webp 1536w,https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?dpr=0.75&fit=clip&fm=webp 2304w,https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?fit=clip&fm=webp 3072w",
            "sizes": "(max-width: 3072px) 100vw, 3072px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBhMICAgLEgoVFg4VDg0NDhcNDQ4NFxUdGCIVFhUaHysjGh0oHSEWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg4OFw4NHC8dFhwvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABQAGAMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAABQYBB//EACAQAAEEAQQDAAAAAAAAAAAAAAABAgMEBREhMpESEyL/xAAWAQEBAQAAAAAAAAAAAAAAAAADAgH/xAAXEQEBAQEAAAAAAAAAAAAAAAABAAID/9oADAMBAAIRAxEAPwBVRo4tr+aFHSZiok3chzSrdYkvNex9XtwvborwNrLzyV5Siwk1j6egEPFahhm19q9mki1uSiKLEWXceQMb5AAu4Odk7UR4ABhU3//Z",
            "src": "https://www.datocms-assets.com/109344/1698250156-pxl_20231020_094853801-2.jpg?fit=clip",
            "width": 3072,
            "height": 2464,
            "aspectRatio": 1.2467532467532467
          }
        }
      ],
      "_status": "published",
      "_firstPublishedAt": "2023-10-27T17:02:26+01:00"
    },
    {
      "id": "kcPKMd88RlSc11wBNiDzcg",
      "city": "Shettihalli",
      "distance": "213km from Bangalore Airport",
      "state": "Karnataka",
      "location": "https://maps.app.goo.gl/Who6AFY8zhp8uJ4z7",
      "camera": "Pixel 7",
      "date": "2023-10-22",
      "district": "Hassan",
      "photos": [
        {
          "alt": null,
          "blurhash": "LMDThdL}R-%$PXrCROoz-5X9ITMw",
          "url": "https://www.datocms-assets.com/109344/1698250627-img_1451.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?dpr=0.25&fit=clip 1016w,https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?dpr=0.5&fit=clip 2032w,https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?dpr=0.75&fit=clip 3048w,https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?fit=clip 4064w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?dpr=0.25&fit=clip&fm=webp 1016w,https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?dpr=0.5&fit=clip&fm=webp 2032w,https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?dpr=0.75&fit=clip&fm=webp 3048w,https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?fit=clip&fm=webp 4064w",
            "sizes": "(max-width: 4064px) 100vw, 4064px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLChEXDhMVDRUZDh0VDRUNFxgdGBYfFiEmHysjGh0oHSEWJDUlKC0vMjIyHSI4PTcwPCsxMi8BCgsLDg0OHA0RHDscFiUvLy8vLy8vLy8vLy8vLzUvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABMAGAMBIgACEQEDEQH/xAAYAAEBAAMAAAAAAAAAAAAAAAAABQIEBv/EACMQAAEDAwMFAQAAAAAAAAAAAAEAAwQCBaERIjESExQhMgb/xAAYAQADAQEAAAAAAAAAAAAAAAAEBQYCAf/EABsRAAICAwEAAAAAAAAAAAAAAAACAUEEETED/9oADAMBAAIRAxEAPwDmZl6nxJw1oKv2S/TX3htKi/oJlLtxApawqdkl9isEtYWUdIk46PMFeRKmVy9ekosDdjVL9N4RMl9k0KHx32SZ7LZuY1oHKsRWWgRsHCIpyypo2GGW/L+AiIi14At0/9k=",
            "src": "https://www.datocms-assets.com/109344/1698250627-img_1451.jpg?fit=clip",
            "width": 4064,
            "height": 3056,
            "aspectRatio": 1.3298429319371727
          }
        }
      ],
      "_status": "published",
      "_firstPublishedAt": "2023-10-27T17:02:26+01:00"
    },
    {
      "id": "FCtBlzxRSyichH2qxnqW8A",
      "city": "Chitradurga",
      "distance": "216km from Bangalore Airport",
      "state": "Karnataka",
      "location": "https://maps.app.goo.gl/onMonZ1XzPsFgrn19",
      "camera": "Pixel 7",
      "date": "2023-09-16",
      "district": "Chitradurga",
      "photos": [
        {
          "alt": null,
          "blurhash": "LoEDVOt7WEt7%%kCRkkC-:kARjfP",
          "url": "https://www.datocms-assets.com/109344/1698250347-img_1389.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?dpr=0.25&fit=clip 756w,https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?dpr=0.5&fit=clip 1512w,https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?dpr=0.75&fit=clip 2268w,https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?fit=clip 3024w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?dpr=0.25&fit=clip&fm=webp 756w,https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?dpr=0.5&fit=clip&fm=webp 1512w,https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?dpr=0.75&fit=clip&fm=webp 2268w,https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?fit=clip&fm=webp 3024w",
            "sizes": "(max-width: 3024px) 100vw, 3024px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoOCAgLDg0WDg0PDQ0SGhENFg0YFxUZGCIfIiEmHysjGh0oHRUiJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHA0RHDscFhwvNS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABgAEgMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAABgEEBQP/xAAiEAACAgEDBAMAAAAAAAAAAAAAAQIDBAURIRMiQVESFRb/xAAYAQACAwAAAAAAAAAAAAAAAAACBAMFBv/EABsRAAIDAAMAAAAAAAAAAAAAAAACARESAxMU/9oADAMBAAIRAxEAPwBjWfGuHMkRPO6lL2YlZ2oZKj2tlSrXciqD+W403OuhLM0Njvs3YCj+itAl9Cg1JpujqLlFazToz8ABmHdtFtiKOX0i9EgAXYwOIP/Z",
            "src": "https://www.datocms-assets.com/109344/1698250347-img_1389.jpg?fit=clip",
            "width": 3024,
            "height": 4032,
            "aspectRatio": 0.75
          }
        },
        {
          "alt": null,
          "blurhash": "LZBXG@xtfmbJN+W=oyogSRxue.R*",
          "url": "https://www.datocms-assets.com/109344/1698250362-img_1393.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?dpr=0.25&fit=clip 655w,https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?dpr=0.5&fit=clip 1311w,https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?dpr=0.75&fit=clip 1966w,https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?fit=clip 2622w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?dpr=0.25&fit=clip&fm=webp 655w,https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?dpr=0.5&fit=clip&fm=webp 1311w,https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?dpr=0.75&fit=clip&fm=webp 1966w,https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?fit=clip&fm=webp 2622w",
            "sizes": "(max-width: 2622px) 100vw, 2622px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLFQoQDhgcDw0TDhEWDhUYFxYfHRYfFhUdHysjGh0oHRUiJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OEBAOHDsoFigvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABkAEAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAFBgIDBP/EAB8QAAIDAAEFAQAAAAAAAAAAAAEDAAIEIRETIjI0Bf/EABYBAQEBAAAAAAAAAAAAAAAAAAUGBP/EABsRAAIBBQAAAAAAAAAAAAAAAAABAgQFESFB/9oADAMBAAIRAxEAPwAO/LoVj8YOK9xRxUwo22wo5Emi7ux0NZvjd8MOdEW0RvZmJNDMZdrQDW1I45/jMXv0PcyV6Iyej//Z",
            "src": "https://www.datocms-assets.com/109344/1698250362-img_1393.jpg?fit=clip",
            "width": 2622,
            "height": 4032,
            "aspectRatio": 0.6502976190476191
          }
        },
        {
          "alt": null,
          "blurhash": "L.E|n_ofoxof.At6WEofxwoeayj[",
          "url": "https://www.datocms-assets.com/109344/1698250392-img_1415.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?dpr=0.25&fit=clip 320w,https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?dpr=0.5&fit=clip 640w,https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?dpr=0.75&fit=clip 960w,https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?fit=clip 1280w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?dpr=0.25&fit=clip&fm=webp 320w,https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?dpr=0.5&fit=clip&fm=webp 640w,https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?dpr=0.75&fit=clip&fm=webp 960w,https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?fit=clip&fm=webp 1280w",
            "sizes": "(max-width: 1280px) 100vw, 1280px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLDxINDhIUFQ0QDh0NEBENFx8ZGBYfFiEaICsjGh0oHSEWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHBAQHC8cFh0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABMAGAMBIgACEQEDEQH/xAAZAAADAAMAAAAAAAAAAAAAAAAABQYBBAf/xAAhEAABBAEEAwEAAAAAAAAAAAABAAIDBFEREyExFDOBBf/EABcBAAMBAAAAAAAAAAAAAAAAAAIDBAD/xAAcEQABAwUAAAAAAAAAAAAAAAAAAQIxAwQRExT/2gAMAwEAAhEDEQA/ALV92q+XUvCVWrFGW4GmQd5Us21M8Eh5U9NZtD9P2HvK1K8dgk0op1h7KLYgdwIUKLE8kTRunrKEp167IPOhq03HQ8pRcJ8/6sIUtOClBlA92g5KEISXSEf/2Q==",
            "src": "https://www.datocms-assets.com/109344/1698250392-img_1415.jpg?fit=clip",
            "width": 1280,
            "height": 964,
            "aspectRatio": 1.3278008298755186
          }
        }
      ],
      "_status": "published",
      "_firstPublishedAt": "2023-10-27T17:02:26+01:00"
    },
    {
      "id": "lYSe7DUqRkahBWlY8aT58A",
      "city": "Patla Betta",
      "distance": "136km from Mangalore Airport",
      "state": "Karnataka",
      "location": "https://maps.app.goo.gl/J72YjqXex5pTgSzS6",
      "camera": "Pixel 7",
      "date": "2023-10-21",
      "district": "Dakshina Kannada",
      "photos": [
        {
          "alt": null,
          "blurhash": "L;Ezl@WVRjfi.Ta#Rjj[ocayWBj[",
          "url": "https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?dpr=0.25&fit=clip 1020w,https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?dpr=0.5&fit=clip 2040w,https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?dpr=0.75&fit=clip 3060w,https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?fit=clip 4080w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?dpr=0.25&fit=clip&fm=webp 1020w,https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?dpr=0.5&fit=clip&fm=webp 2040w,https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?dpr=0.75&fit=clip&fm=webp 3060w,https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?fit=clip&fm=webp 4080w",
            "sizes": "(max-width: 4080px) 100vw, 4080px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLEBEXDhANDg8RDhUVDREYFxUZGBYVFhUaHysjGh0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHA0NHDscFhwvLy8vLy87Ly8vLy8vNS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABMAGAMBIgACEQEDEQH/xAAbAAACAQUAAAAAAAAAAAAAAAAABgUBAgMEB//EACAQAAEEAQQDAAAAAAAAAAAAAAABAgMEEQYSITITFkH/xAAZAQACAwEAAAAAAAAAAAAAAAADBAECBgD/xAAdEQABAwUBAAAAAAAAAAAAAAAAARFRAwQSFCEC/9oADAMBAAIRAxEAPwBjp5a/GSUY90bVVF+HMW6qstl4RTN7raztwoXapSIYqPVOed99cAI9LW8lezue0qXS5pScykXHGxZOqF7YY/N0QqBknDmleiYkvDUAAGPK8IP/2Q==",
            "src": "https://www.datocms-assets.com/109344/1698250435-pxl_20231022_072307130.jpg?fit=clip",
            "width": 4080,
            "height": 3072,
            "aspectRatio": 1.328125
          }
        },
        {
          "alt": null,
          "blurhash": null,
          "url": "https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?dpr=0.25&fit=clip 768w,https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?dpr=0.5&fit=clip 1536w,https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?dpr=0.75&fit=clip 2304w,https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?fit=clip 3072w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?dpr=0.25&fit=clip&fm=webp 768w,https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?dpr=0.5&fit=clip&fm=webp 1536w,https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?dpr=0.75&fit=clip&fm=webp 2304w,https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?fit=clip&fm=webp 3072w",
            "sizes": "(max-width: 3072px) 100vw, 3072px",
            "alt": null,
            "title": null,
            "base64": null,
            "src": "https://www.datocms-assets.com/109344/1698250446-pxl_20231022_073634947.jpg?fit=clip",
            "width": 3072,
            "height": 4080,
            "aspectRatio": 0.7529411764705882
          }
        },
        {
          "alt": null,
          "blurhash": "L~Ca=0t7fkkC.Aoffkj[xvoLazj@",
          "url": "https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg",
          "responsiveImage": {
            "srcSet": "https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?dpr=0.25&fit=clip 1020w,https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?dpr=0.5&fit=clip 2040w,https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?dpr=0.75&fit=clip 3060w,https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?fit=clip 4080w",
            "webpSrcSet": "https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?dpr=0.25&fit=clip&fm=webp 1020w,https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?dpr=0.5&fit=clip&fm=webp 2040w,https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?dpr=0.75&fit=clip&fm=webp 3060w,https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?fit=clip&fm=webp 4080w",
            "sizes": "(max-width: 4080px) 100vw, 4080px",
            "alt": null,
            "title": null,
            "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLExMWDhQQDRcNDh0PFhEWFx8ZGBYeIhoaHzcjGh0oKSEWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHRAQHDcpIig7LzY8LzUvLzs2Mi8vLy8vLy8vLy81LzUvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABMAGAMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABQcDBAYC/8QAIxAAAQQBAwQDAAAAAAAAAAAAAQACAwQFERKRBhMzURUiMf/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBAYB/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEwQUQf/aAAwDAQACEQMRAD8A7ODIsiI3OC8Za7WniaTIOVUc3VN+aDcwOUTP1LlZPrucn7UWyCtl3i1UFADuDlFTHzeUFQalyI1lwBrZL4uCJ1Q6sCwSV4e942/vpEWa6WG7ZgiFMaMCIicjh//Z",
            "src": "https://www.datocms-assets.com/109344/1698250590-pxl_20231022_075320155.jpg?fit=clip",
            "width": 4080,
            "height": 3072,
            "aspectRatio": 1.328125
          }
        }
      ],
      "_status": "published",
      "_firstPublishedAt": "2023-10-27T17:02:26+01:00"
    }
  ],
}

module.exports = {
  mockArticles,
  mockArticle,
  mockProjects,
  mockProject,
  mockPhotos
}
