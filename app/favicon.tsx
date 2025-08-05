import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 16,
  height: 16,
}
export const contentType = 'image/x-icon'

// Image generation
export default function Favicon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 10,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'system-ui',
          borderRadius: '2px',
        }}
      >
        G
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}