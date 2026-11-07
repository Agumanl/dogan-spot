// lib/fonts.ts
import { Inter, Playfair_Display } from 'next/font/google'

export const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
export const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })