import { memo } from 'react'

function PreviewBanner() {
  return (
    <div className="bg-red-500 text-white p-5 my-5 fixed bottom-2 right-2 w-auto rounded-md z-10">
      <p>
        This page is in preview mode. <br />
        <a href="/api/exit-preview" className="underline text-white">
          Click here
        </a>{' '}
        to exit preview mode.
      </p>
    </div>
  )
}

export default memo(PreviewBanner)
