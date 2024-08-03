import { Barlow_Condensed, Bellefair, Barlow } from 'next/font/google'

const barlowCondensedInit = Barlow_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--ff-sans-cond',
  fallback: ['sans-serif'],
})
const bellefairInit = Bellefair({
  weight: '400',
  subsets: ['latin'],
  variable: '--ff-serif',
  fallback: ['serif'],
})
const barlowInit = Barlow({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--ff-sans-normal',
  fallback: ['sans-serif'],
})

export const barlowCondensed = barlowCondensedInit.variable
export const bellefair = bellefairInit.variable
export const barlow = barlowInit.variable