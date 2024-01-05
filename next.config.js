/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'dist',
	reactStrictMode: false,
	optimizeFonts: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
}

module.exports = nextConfig
