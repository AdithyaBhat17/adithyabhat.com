/* eslint-disable @typescript-eslint/camelcase */
export const GA_TRACKING_ID = 'UA-116709139-1'

export const pageview = (url: string) => {
  ;(window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: number | string
}) => {
  ;(window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
