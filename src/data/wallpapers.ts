export type WallpaperId =
  | 'terminal'
  | 'deep-space'
  | 'matrix'
  | 'synthwave'
  | 'midnight'
  | 'aurora'
  | 'ember'
  | 'storm'

export interface Wallpaper {
  id: WallpaperId
  label: string
  emoji: string
  /** CSS background value applied to the root */
  background: string
  /** Optional tinted grid overlay color (rgba) */
  gridColor?: string
}

export const wallpapers: Wallpaper[] = [
  {
    id: 'terminal',
    label: 'Terminal',
    emoji: '🖤',
    background: '#0B0B0F',
  },
  {
    id: 'deep-space',
    label: 'Deep Space',
    emoji: '🌌',
    background: 'radial-gradient(ellipse at 60% 0%, #1B0F3A 0%, #0B0B0F 65%)',
  },
  {
    id: 'matrix',
    label: 'Matrix',
    emoji: '🟩',
    background: '#050D06',
    gridColor: 'rgba(0,200,60,0.07)',
  },
  {
    id: 'synthwave',
    label: 'Synthwave',
    emoji: '🌆',
    background: 'linear-gradient(180deg, #0B0B0F 0%, #150825 55%, #1E0538 100%)',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    emoji: '🔵',
    background: 'radial-gradient(ellipse at 80% 100%, #071535 0%, #040B20 100%)',
  },
  {
    id: 'aurora',
    label: 'Aurora',
    emoji: '🌿',
    background: 'radial-gradient(ellipse at 20% 100%, #042A1A 0%, #0B0B0F 65%)',
  },
  {
    id: 'ember',
    label: 'Ember',
    emoji: '🔥',
    background: 'radial-gradient(ellipse at 50% 100%, #2A0C02 0%, #0B0B0F 60%)',
  },
  {
    id: 'storm',
    label: 'Storm',
    emoji: '⚡',
    background: 'linear-gradient(135deg, #0D0D1A 0%, #0B0E1F 100%)',
  },
]

export const DEFAULT_WALLPAPER: WallpaperId = 'terminal'

export function getWallpaper(id: WallpaperId): Wallpaper {
  return wallpapers.find((w) => w.id === id) ?? wallpapers[0]
}
