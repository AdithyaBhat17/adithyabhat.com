import { fadeInDown, fadeInRight, fadeInUp, stagger, staggerFast } from '@/utils/motion'
import { Dialog, Transition } from '@headlessui/react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import useResizeObserver from 'hooks/useResizeObserver'
import { Fragment } from 'react'

export function PhotoDialog({ open, title, description, close, image }) {

    const {width} = useResizeObserver();

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[100vw] h-[100dvh] transform overflow-y-auto bg-white text-left align-middle shadow-xl transition-all">
                <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center h-full gap-y-4">
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="col-span-1 overflow-hidden sm:col-span-1 lg:col-span-3 h-full items-center bg-gray-50 p-6">
                    <motion.figure variants={width < 600 ? fadeInDown : fadeInRight} className="w-full h-full my-auto flex flex-col items-center">
                      <img
                        src={image.src}
                        alt={title}
                        className="object-contain w-full h-full md:h-[94dvh] cursor-[zoom-in]"
                        onClick={() => {
                          window.open(
                            image.src,
                            '_blank',
                            'noopener noreferrer'
                          )
                        }}
                      />
                    </motion.figure>
                  </motion.div>
                  <div className="flex flex-col justify-center items-center w-full col-span-1">
                    <button
                      className="text-blackA8 bg-white focus:shadow-2xl hover:bg-blackA3 absolute top-[10px] right-[10px] inline-flex h-[48px] w-[48px] appearance-none items-center justify-center rounded-full p-2 focus:outline-none"
                      aria-label="Close"
                      onClick={close}
                    >
                      <Cross2Icon className="w-8 h-8 font-semibold" />
                    </button>
                    <motion.div variants={staggerFast} className="flex flex-col gap-2 relative">
                      <motion.h1 variants={fadeInUp} className="font-black text-5xl ml-0 passion-one">
                        {title}
                      </motion.h1>
                      <motion.div variants={staggerFast} className="passion-one flex flex-col gap-1 p-0">{description}</motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
