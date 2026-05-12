export type Platform = 'ios' | 'ios+android' | 'web'

export interface ProjectLink {
  label: string
  url: string
  icon?: string
  primary?: boolean
}

export type BuildStatus = 'live' | 'coming-soon' | 'beta' | 'wip'

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  tech: string[]
  color: string
  emoji: string
  platform: Platform
  links: ProjectLink[]
  screenshots?: string[]
  screenshotCount?: number
  status?: BuildStatus
  version?: string
  socialLinks?: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: 'travel-rules',
    name: 'Travel Rules',
    tagline: 'The traveler\'s rule book — iOS',
    description:
      'Native iOS app that helps travelers navigate local laws, etiquette, and customs before they land. Covers 100+ countries with offline-first data. Features a built-in AI assistant that generates a personalized travel plan in minutes — just pick your destination and travel style. Beautiful SwiftUI interface designed for quick lookups on the go.',
    tech: ['Swift', 'SwiftUI', 'Xcode', 'iOS', 'CoreData'],
    color: '#00FFB3',
    emoji: '✈️',
    platform: 'ios',
    status: 'live',
    version: '3.2.4',
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/pl/app/travel-rules/id6451070215?l=pl', icon: '🍎', primary: true },
      { label: 'Landing page', url: 'https://travelrules.eu/app', icon: '🌐' },
      { label: 'Website', url: 'https://www.travelrules.eu', icon: '🔗' },
    ],
    socialLinks: [
      { label: 'TikTok', url: 'https://www.tiktok.com/@travelrules.app', icon: '🎵' },
      { label: 'Instagram', url: 'https://www.instagram.com/travelrules.app/', icon: '📸' },
      { label: 'YouTube', url: 'https://youtube.com/@travelrulesapp', icon: '▶️' },
      { label: 'ProductHunt', url: 'https://www.producthunt.com/products/travel-rules', icon: '🚀' },
      { label: 'Threads', url: 'https://www.threads.com/@travelrules.app', icon: '🧵' },
    ],
    screenshots: [
      '/screens/travel-rules/screen-1.png',
      '/screens/travel-rules/screen-2.png',
      '/screens/travel-rules/screen-3.png',
      '/screens/travel-rules/screen-4.png',
      '/screens/travel-rules/screen-5.png',
      '/screens/travel-rules/screen-6.png',
    ],
  },
  {
    id: 'rate-that-beach',
    name: 'Rate That Beach',
    tagline: 'Community beach reviews — iOS & Android',
    description:
      'Cross-platform app for finding and rating beaches worldwide. Real crowd levels, water conditions, and photos from travelers who actually showed up. Built with React Native and Expo for a native feel on both iOS and Android, with live Firestore data and Google Maps integration.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Firestore', 'Google Maps'],
    color: '#3B82F6',
    emoji: '🏖️',
    platform: 'ios+android',
    status: 'live',
    version: '1.0',
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/pl/app/rate-that-beach/id6764400811?l=pl', icon: '🍎', primary: true },
    ],
    screenshots: [
      '/screens/rate-that-beach/screen-1.png',
      '/screens/rate-that-beach/screen-2.png',
      '/screens/rate-that-beach/screen-3.png',
      '/screens/rate-that-beach/screen-4.png',
      '/screens/rate-that-beach/screen-5.png',
    ],
  },
  {
    id: 'solos',
    name: 'SOLOS',
    tagline: 'AI-powered movie curator — web app',
    description:
      'Solves the "what to watch tonight?" problem using Google Gemini AI. Users set their mood, number of viewers, and streaming platforms — SOLOS curates the perfect film pick and explains why it fits. Includes a Watchlist, watch history, deep links to streaming platforms, and a Stripe-powered PRO tier (3 free picks, then lifetime access).',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Gemini AI', 'Firebase', 'Express', 'Stripe'],
    color: '#A78BFA',
    emoji: '🎬',
    platform: 'web',
    status: 'beta',
    links: [],
    screenshots: [
      '/screens/solos/screen-1.png',
      '/screens/solos/screen-2.png',
      '/screens/solos/screen-3.png',
      '/screens/solos/screen-4.png',
    ],
  },
  {
    id: 'travel-rules-hub',
    name: 'Travel Rules HUB',
    tagline: 'The travel content platform — web',
    description:
      'A full web platform built around the Travel Rules brand. Includes the app landing page, an interactive travel planner, a downloadable ebook, and a checklist — all under one roof. Designed to convert visitors into app users and product buyers.',
    tech: ['Web', 'TypeScript', 'React', 'Tailwind CSS'],
    color: '#F59E0B',
    emoji: '🌐',
    platform: 'web',
    status: 'live',
    links: [
      { label: 'travelrules.eu', url: 'https://www.travelrules.eu', icon: '🌐', primary: true },
      { label: 'App landing', url: 'https://travelrules.eu/app', icon: '📱' },
      { label: 'Planner', url: 'https://travelrules.eu/planer', icon: '📋' },
      { label: 'Ebook', url: 'https://travelrules.eu/ebook', icon: '📖' },
    ],
    screenshotCount: 3,
  },
  {
    id: 'panda',
    name: 'Panda',
    tagline: 'Dating app — iOS & Android',
    description:
      'A modern dating app built for genuine connections. Clean interface, smart matching, and a focus on meaningful interactions over endless swiping. Cross-platform, built with React Native and Expo.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
    color: '#FB7185',
    emoji: '🐼',
    platform: 'ios+android',
    status: 'wip',
    links: [
      { label: 'GitHub', url: 'https://github.com/mlynarskim/Panda-app', icon: '⌨️', primary: true },
    ],
    screenshotCount: 3,
  },
]

export const currentlyBuilding = [
  { project: 'Travel Rules', detail: 'v3.2.4 live on App Store', color: '#00FFB3', status: 'live' as const },
  { project: 'Rate That Beach', detail: 'v1.0 live on App Store', color: '#3B82F6', status: 'live' as const },
  { project: 'SOLOS', detail: 'in beta testing', color: '#A78BFA', status: 'beta' as const },
]
