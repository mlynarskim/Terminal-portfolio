export type Platform = 'ios' | 'ios+android' | 'apple' | 'web' | 'python'

export interface ProjectLink {
  label: string
  url: string
  icon?: string
  primary?: boolean
  comingSoon?: boolean
}

export type BuildStatus = 'live' | 'coming-soon' | 'beta' | 'wip'

export interface Project {
  id: string
  name: string
  tagline: string
  taglinePL?: string
  description: string
  descriptionPL?: string
  tech: string[]
  color: string
  emoji: string
  platform: Platform
  links: ProjectLink[]
  screenshots?: string[]
  screenshotLayout?: 'device' | 'gallery'
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
    taglinePL: 'Przewodnik podróżnika — iOS',
    description:
      'Native iOS app that helps travelers navigate local laws, etiquette, and customs before they land. Covers 100+ countries with offline-first data. Features a built-in AI assistant that generates a personalized travel plan in minutes — just pick your destination and travel style. Beautiful SwiftUI interface designed for quick lookups on the go.',
    descriptionPL:
      'Natywna aplikacja iOS pomagająca podróżnikom poznać lokalne przepisy, etykietę i zwyczaje przed wylotem. Obejmuje ponad 100 krajów z danymi dostępnymi offline. Wbudowany asystent AI generuje spersonalizowany plan podróży w kilka minut — wystarczy wybrać cel i styl podróżowania.',
    tech: ['Swift', 'SwiftUI', 'Xcode', 'iOS', 'CoreData', 'Firebase', 'Gemini API', 'Xcode Cloud', 'XCTest'],
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
    taglinePL: 'Społecznościowe recenzje plaż — iOS i Android',
    description:
      'Cross-platform app for finding and rating beaches worldwide. Real crowd levels, water conditions, and photos from travelers who actually showed up. Built with React Native and Expo for a native feel on both iOS and Android, with live Firestore data and Google Maps integration.',
    descriptionPL:
      'Wieloplatformowa aplikacja do znajdowania i oceniania plaż na całym świecie. Aktualne obłożenie, warunki wodne i zdjęcia od podróżników. Zbudowana w React Native i Expo z danymi Firestore i integracją Google Maps.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Firestore', 'Google Maps'],
    color: '#3B82F6',
    emoji: '🏖️',
    platform: 'ios+android',
    status: 'live',
    version: '1.0',
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/pl/app/rate-that-beach/id6764400811?l=pl', icon: '🍎', primary: true },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.ratethatbeach.app', icon: '🤖' },
      { label: 'ProductHunt', url: 'https://www.producthunt.com/products/rate-that-beach?launch=rate-that-beach', icon: '🚀' },
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
    id: 'calmie',
    name: 'Calmie',
    tagline: 'Meditation, breathing and sleep · iPhone, iPad, Apple Watch and Vision Pro',
    taglinePL: 'Medytacja, oddech i sen · iPhone, iPad, Apple Watch i Vision Pro',
    description:
      'A native mindfulness app built for the Apple ecosystem, combining guided breathing, a flexible Just Sit timer, and calming sleep soundscapes. It includes five breathing techniques, private progress sync through iCloud, and a complete Apple Watch companion. Widgets, Live Activities, Dynamic Island, Siri, and Shortcuts make sessions easier to begin, while optional Apple Health integration records mindful minutes. ADHD Mode reduces decisions and provides shorter sessions, while Chronic Pain Mode offers gentler pacing and guidance. No ads, account, subscription, or third party analytics.',
    descriptionPL:
      'Natywna aplikacja mindfulness dla ekosystemu Apple, łącząca prowadzone ćwiczenia oddechowe, timer Just Sit i wyciszające dźwięki snu. Oferuje pięć technik oddechowych, prywatną synchronizację postępów przez iCloud oraz pełną aplikację na Apple Watch. Widżety, Live Activities, Dynamic Island, Siri i Skróty ułatwiają rozpoczęcie sesji, a opcjonalna integracja z Apple Health zapisuje uważne minuty. Tryb ADHD ogranicza liczbę decyzji i oferuje krótsze sesje, natomiast tryb dla osób z przewlekłym bólem zapewnia łagodniejsze tempo i wskazówki. Bez reklam, konta, subskrypcji i zewnętrznej analityki.',
    tech: ['Swift', 'SwiftUI', 'Core Data', 'CloudKit', 'WatchConnectivity', 'WidgetKit', 'ActivityKit', 'HealthKit', 'App Intents'],
    color: '#A78BFA',
    emoji: '🧘',
    platform: 'apple',
    status: 'live',
    version: '1.4',
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/pl/app/calmie/id6450792796?l=pl', icon: '🍎', primary: true },
    ],
    screenshots: [
      '/screens/calmie/app-store-iphone.jpg',
      '/screens/calmie/app-store-watch.jpg',
      '/screens/calmie/app-store-ipad.jpg',
    ],
    screenshotLayout: 'gallery',
  },
  {
    id: 'travel-rules-hub',
    name: 'Travel Rules HUB',
    tagline: 'The travel content platform — web',
    taglinePL: 'Platforma treści podróżniczych — web',
    description:
      'A full web platform built around the Travel Rules brand. Includes the app landing page, an interactive travel planner, a downloadable ebook, and a checklist — all under one roof. Designed to convert visitors into app users and product buyers.',
    descriptionPL:
      'Pełna platforma webowa wokół marki Travel Rules. Strona aplikacji, interaktywny planer podróży, ebook do pobrania i checklista — wszystko w jednym miejscu. Zaprojektowana tak, by zamieniać odwiedzających w użytkowników aplikacji.',
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
    screenshots: [
      '/screens/travel-rules-hub/screen-1.png',
      '/screens/travel-rules-hub/screen-2.png',
      '/screens/travel-rules-hub/screen-3.png',
      '/screens/travel-rules-hub/screen-4.png',
    ],
  },
  {
    id: 'solos',
    name: 'SOLOS',
    tagline: 'AI-powered movie curator — web app',
    taglinePL: 'Kurator filmowy AI — aplikacja web',
    description:
      'Solves the "what to watch tonight?" problem using Google Gemini AI. Users set their mood, film duration, and streaming platforms — SOLOS curates the perfect film pick. Includes a Watchlist, watch history, deep links to streaming platforms, and a Stripe-powered PRO tier (3 free picks, then lifetime access).',
    descriptionPL:
      'Rozwiązuje problem "co dziś obejrzeć?" używając Google Gemini AI. Użytkownik ustawia nastrój, czas trwania filmu i platformy streamingowe — SOLOS dobiera idealny film. Watchlista, historia oglądania i płatny plan PRO przez Stripe.',
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
    id: 'atlas',
    name: 'Atlas',
    tagline: 'Smart photo organizer by country & date — iOS & Android',
    taglinePL: 'Inteligentny organizer zdjęć po kraju i dacie — iOS i Android',
    description:
      'Cross-platform app that automatically sorts your photos by country and date using GPS geocoding. Travel memories organized the way they happened — browse by destination, timeline, or trip. Built with Flutter for a native feel on both iOS and Android.',
    descriptionPL:
      'Wieloplatformowa aplikacja, która automatycznie segreguje zdjęcia po kraju i dacie na podstawie danych GPS i geocodingu. Wspomnienia z podróży uporządkowane tak, jak się wydarzyły — przeglądaj po destynacji, osi czasu lub wycieczce. Zbudowana we Flutterze.',
    tech: ['Flutter', 'Dart', 'Geocoding', 'iOS', 'Android'],
    color: '#38BDF8',
    emoji: '🗺️',
    platform: 'ios+android',
    status: 'wip',
    links: [],
  },
  // Panda — tymczasowo ukryta
  // {
  //   id: 'panda',
  //   name: 'Panda',
  //   tagline: 'Dating app — iOS & Android',
  //   taglinePL: 'Aplikacja randkowa — iOS i Android',
  //   description:
  //     'A modern dating app built for genuine connections. Clean interface, smart matching, and a focus on meaningful interactions over endless swiping. Cross-platform, built with React Native and Expo.',
  //   descriptionPL:
  //     'Nowoczesna aplikacja randkowa stworzona dla prawdziwych połączeń. Przejrzysty interfejs, inteligentne dopasowywanie i nacisk na wartościowe interakcje zamiast niekończącego się swipowania. Wieloplatformowa, zbudowana w React Native i Expo.',
  //   tech: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
  //   color: '#FB7185',
  //   emoji: '🐼',
  //   platform: 'ios+android',
  //   status: 'wip',
  //   links: [
  //     { label: 'GitHub', url: 'https://github.com/mlynarskim/Panda-app', icon: '⌨️', primary: true },
  //   ],
  //   screenshotCount: 3,
  // },
  {
    id: 'locals-skateboards',
    name: 'Locals Skateboards',
    tagline: 'Skateboard brand — WordPress & WooCommerce',
    taglinePL: 'Marka skateboardowa — WordPress i WooCommerce',
    description:
      'Full e-commerce website and online store for Locals Skateboards. Built on WordPress with WooCommerce, custom graphics and brand identity design included. Fast, mobile-first, and ready to sell.',
    descriptionPL:
      'Pełna strona internetowa i sklep online dla marki Locals Skateboards. Zbudowany na WordPressie z WooCommerce, z autorską grafiką i identyfikacją wizualną. Szybki, mobile-first, gotowy do sprzedaży.',
    tech: ['WordPress', 'WooCommerce', 'Graphic Design', 'Branding', 'SEO'],
    color: '#F59E0B',
    emoji: '🛹',
    platform: 'web',
    status: 'live',
    links: [
      { label: 'localsskateboards.com', url: 'https://localsskateboards.com', icon: '🌐', primary: true },
    ],
    screenshots: [
      '/screens/locals-skateboards/screen-1.png',
    ],
  },
  {
    id: 'ksiazki-marty',
    name: 'Książki Marty',
    tagline: 'Children\'s book store — WordPress & WooCommerce',
    taglinePL: 'Sklep z książkami dla dzieci — WordPress i WooCommerce',
    description:
      'A complete website and online store for a children\'s book author. Built with WordPress, WooCommerce, and Kadence Blocks, with Autopay payments and InPost delivery integrated into a smooth purchasing journey. The responsive, approachable design helps parents and caregivers discover each title, learn about the author, and order books with confidence while strengthening a distinctive author brand.',
    descriptionPL:
      'Kompleksowa strona internetowa i sklep online dla autorki książek dla dzieci. Projekt powstał na WordPressie z wykorzystaniem WooCommerce i Kadence Blocks, z płatnościami Autopay oraz dostawą InPost zintegrowanymi w wygodnym procesie zakupowym. Przejrzysty, responsywny projekt pomaga rodzicom i opiekunom poznawać książki, odkrywać twórczość autorki i sprawnie składać zamówienia, jednocześnie wzmacniając rozpoznawalną markę autorską.',
    tech: ['WordPress', 'WooCommerce', 'Kadence Blocks', 'InPost', 'Autopay', 'Responsive Design'],
    color: '#FB7185',
    emoji: '📚',
    platform: 'web',
    status: 'live',
    links: [
      { label: 'ksiazkimarty.pl', url: 'https://www.ksiazkimarty.pl', icon: '🌐', primary: true },
    ],
    screenshots: [
      '/screens/ksiazki-marty/screen-1.png',
    ],
  },
  {
    id: 'photo-tools',
    name: 'Photo Tools',
    tagline: 'Photo & video organizer — Python desktop app',
    taglinePL: 'Organizer zdjęć i filmów — aplikacja Python',
    description:
      'A cross-platform desktop utility for bringing large photo and video libraries under control. It scans folders recursively, reads capture dates from EXIF and video metadata, and organizes files into a clear year and month structure. Its duplicate finder combines file-size grouping with MD5 hashing for exact matches, while preview mode and safe move operations protect the original collection.',
    descriptionPL:
      'Wieloplatformowe narzędzie desktopowe do porządkowania dużych bibliotek zdjęć i filmów. Rekurencyjnie skanuje katalogi, odczytuje daty wykonania z EXIF i metadanych wideo, a następnie układa pliki w przejrzystej strukturze roku i miesiąca. Moduł duplikatów łączy grupowanie według rozmiaru z hashami MD5, a tryb podglądu i bezpieczne przenoszenie chronią oryginalną kolekcję.',
    tech: ['Python', 'Tkinter', 'Pillow', 'EXIF', 'FFmpeg', 'MD5', 'PyInstaller'],
    color: '#FFD43B',
    emoji: '🖼️',
    platform: 'python',
    status: 'live',
    links: [
      { label: 'GitHub', url: 'https://github.com/mlynarskim/photo-tools', icon: '⌨️', primary: true },
    ],
    screenshots: [
      '/screens/photo-tools/screen-1.png',
    ],
  },
  {
    id: 'csv-cleaner',
    name: 'CSV Cleaner',
    tagline: 'Local CSV & XLSX cleaning workflow — Python desktop app',
    taglinePL: 'Lokalne czyszczenie CSV i XLSX — aplikacja Python',
    description:
      'A local desktop application for analyzing, cleaning, and standardizing CSV and XLSX files without sending data to a server. A guided five-step workflow detects encoding, separators, empty rows, duplicates, missing values, whitespace, date fields, and invalid email addresses before showing a preview of every change. Safe export preserves the source file and generates TXT and JSON reports for a transparent, auditable process.',
    descriptionPL:
      'Lokalna aplikacja desktopowa do analizy, czyszczenia i standaryzowania plików CSV oraz XLSX bez wysyłania danych na serwer. Pięcioetapowy proces wykrywa kodowanie, separatory, puste wiersze, duplikaty, braki danych, zbędne odstępy, pola dat i błędne adresy poczty, a następnie pokazuje podgląd zmian. Bezpieczny eksport chroni plik źródłowy i tworzy raporty TXT oraz JSON, zapewniając przejrzysty przebieg operacji.',
    tech: ['Python', 'Tkinter', 'pandas', 'openpyxl', 'chardet', 'tkinterdnd2', 'pytest', 'PyInstaller'],
    color: '#4B8BBE',
    emoji: '🧹',
    platform: 'python',
    status: 'live',
    version: '1.1.1',
    links: [
      { label: 'GitHub', url: 'https://github.com/mlynarskim/CSV-Cleaner', icon: '⌨️', primary: true },
    ],
    screenshots: [
      '/screens/csv-cleaner/screen-1.png',
      '/screens/csv-cleaner/screen-2.png',
      '/screens/csv-cleaner/screen-3.png',
    ],
  },
]

export const currentlyBuilding = [
  { project: 'Travel Rules', detail: 'v3.2.4 live on App Store', color: '#00FFB3', status: 'live' as const },
  { project: 'Rate That Beach', detail: 'v1.0 live on App Store', color: '#3B82F6', status: 'live' as const },
  { project: 'SOLOS', detail: 'in beta testing', color: '#A78BFA', status: 'beta' as const },
]
