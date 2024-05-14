import Head from '@/components/header'
import { PhotoDialog } from '@/components/PhotoDialog'
import { fetchGalleryAPI } from '@/lib/datocms'
import { fadeInUp, stagger } from '@/utils/motion'
import { motion } from 'framer-motion'
import { GALLERY_PHOTOS } from 'graphql/queries/photos'
import useResizeObserver from 'hooks/useResizeObserver'
import { useMemo, useState } from 'react'
import { Image } from 'react-datocms'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 4,
  1100: 2,
  700: 2,
}

export default function PhotosPage({ data }) {
  const photos = useMemo(() => {
    const allPhotos =
      data.allPlaces?.map((place) => {
        const photos =
          place.photos?.map((photo) => {
            const data = {
              ...place,
              photo,
            }
            delete data.photos
            return data
          }) ?? []
        return photos
      }) ?? []
    return allPhotos
      .flat()
      .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
  }, [data])

  return (
    <motion.div
      initial="initial"
      exit={{ opacity: 0 }}
      animate="animate"
      className="px-6 md:px-16"
    >
      <Head title="Photos | Adithya NR" />
      <motion.div variants={stagger}>
        {/* @ts-ignore */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {photos?.map((item) => {
            return (
              <ImageCard key={item.photo.responsiveImage.src} item={item} />
            )
          })}
        </Masonry>
      </motion.div>
    </motion.div>
  )
}

function ImageCard({ item }) {
  const [details, setDetails] = useState(false)

  const [open, setOpen] = useState(false)

  const { width } = useResizeObserver()

  const showDetails = () => {
    if (width > 600) setDetails(true)
  }

  const hideDetails = () => {
    setDetails(false)
  }

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <motion.div
        onMouseOver={showDetails}
        onMouseLeave={hideDetails}
        onClick={openDialog}
        variants={fadeInUp}
        key={item.photo.responsiveImage.src}
        className="relative cursor-[zoom-in]"
      >
        <Image data={item.photo.responsiveImage} />
        {details ? (
          <motion.div
            variants={stagger}
            className="w-full / absolute bottom-0 left-0 / z-10 / text-center uppercase text-white bg-gray-900 bg-opacity-25 / py-2"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-black text-4xl passion-one"
            >
              {item.city}
            </motion.h1>
            <motion.p variants={fadeInUp} className="passion-one">
              {item.district}, {item.state}
            </motion.p>
          </motion.div>
        ) : null}
      </motion.div>
      <PhotoDialog
        open={open}
        title={item.city}
        description={<PlaceDescription item={item} />}
        image={item.photo.responsiveImage}
        close={closeDialog}
      />
    </>
  )
}

function PlaceDescription({ item }) {
  return (
    <>
      <motion.div variants={fadeInUp} className="flex items-center gap-2">
        <span aria-label='district and city'>🌆</span>
        <span>{item.district}, {item.state}</span>
      </motion.div>
      <motion.div variants={fadeInUp} className="flex items-center gap-2">
        <span>🗓️</span>
        <span>{Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
        }).format(new Date(item.date))}</span>
      </motion.div>
      <motion.div variants={fadeInUp} className='flex items-center gap-2'>
        <span aria-label='Nearest airport'>✈️</span>
        <span>{item.distance}</span>
      </motion.div>
      <motion.div variants={fadeInUp} className='flex items-center gap-2'>
        <span aria-label='Shot on'>📸</span>
        <span className="passion-one">{item.camera}</span>
      </motion.div>
      <motion.div variants={fadeInUp} className="flex items-start gap-2">
        <span>🗺️</span>
        <a href={item.location} target="_blank" rel="noopener noreferrer" className='left outline-none'>
          {item.location}
        </a>
      </motion.div>
    </>
  )
}

export async function getStaticProps() {
  const allPlaces = await fetchGalleryAPI(GALLERY_PHOTOS)
  return {
    props: { data: allPlaces, type: 'allPlaces' },
  }
}
