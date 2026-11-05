import { Outfit, Open_Sans } from 'next/font/google'

export const outfit = Outfit({
	subsets: ['latin'],
	weight: ['500', '600', '700'],
	variable: '--font-outfit',
	display: 'swap',
})

export const openSans = Open_Sans({
	subsets: ['latin'],
	weight: ['400', '600'],
	variable: '--font-open-sans',
	display: 'swap',
})
