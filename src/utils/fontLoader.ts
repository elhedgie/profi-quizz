const loadedFamilies = new Set<string>()

function mapYearToGoogleCss(year: number): string | null {
  switch (year) {
    case 2025:
      return 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap'
    case 2016:
      return 'https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap'
    case 2009:
      return 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap'
    case 1995:
      return 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap'
    case 1986:
      return 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
    case 1984:
      return 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400&display=swap'
    case 1980:
      return 'https://fonts.googleapis.com/css2?family=VT323&display=swap'
    case 1971:
      return 'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400&display=swap'
    case 1947:
      return 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@600&display=swap'
    case 1830:
      return 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400&display=swap'
    default:
      return null
  }
}

export async function ensureYearFontLoaded(year: number): Promise<void> {
  const href = mapYearToGoogleCss(year)
  if (!href) return
  if (loadedFamilies.has(href)) return
  const key = `gfont-${href}`
  if (document.querySelector(`link[data-k="${CSS.escape(key)}"]`)) {
    loadedFamilies.add(href)
    return
  }
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.setAttribute('data-k', key)
  document.head.appendChild(link)
  loadedFamilies.add(href)
}
