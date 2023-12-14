/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'dist',
	reactStrictMode: false,
	output: 'export',
	optimizeFonts: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
}

module.exports = nextConfig
