import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * The CMS has no page at the root — the studio is the whole app. Without
   * this, the bare domain is a 404, which looks like a broken deployment.
   *
   * Temporary (307) rather than permanent: a 308 is cached hard by browsers
   * and would be painful to undo if the root ever gets a page of its own.
   */
  async redirects() {
    return [{ source: '/', destination: '/studio', permanent: false }]
  },
}

export default withPayload(nextConfig)
