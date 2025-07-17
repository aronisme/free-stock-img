import '@/app/globals.css'

export const metadata = {
  title: 'Free Stock Img – Discover Free AI-generated Stock Photos',
  description: 'Download high-quality AI-generated stock images for free. Perfect for personal and commercial projects with no attribution required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favico.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  )
}
