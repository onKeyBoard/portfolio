import replace from 'lodash/replace'

export const normalizedContentType = (rawContentType: string): string => {
	if (!rawContentType) return 'N/A'
	const ext = rawContentType.toUpperCase()
	// Supported extensions from:
	// https://cloudinary.com/documentation/image_transformations#supported_image_formats
	// https://cloudinary.com/documentation/video_manipulation_and_delivery#supported_video_formats
	// https://cloudinary.com/documentation/audio_transformations#supported_audio_formats
	switch (ext) {
		case 'AI':
		case 'AVIF':
		case 'GIF':
		case 'PNG':
		case 'WEBP':
		case 'BMP':
		case 'BW':
		case 'DJVU':
		case 'EPS':
		case 'FBX':
		case 'FLIF':
		case 'GLB':
		case 'GLTF':
		case 'HEIF':
		case 'ICO':
		case 'INDD':
		case 'JPE':
		case 'JPG':
		case 'JPEG':
		case 'JP2':
		case 'WDP':
		case 'JXR':
		case 'HDP':
		case 'OBJ':
		case 'PLY':
		case 'PSD':
		case 'ARW':
		case 'CR2':
		case 'SVG':
		case 'TGA':
		case 'TIFF':
		case 'U3MA':
		case 'USDZ':
			return `Image (${ext})`
		case '3G2':
		case '3GP':
		case 'AVI':
		case 'FLV':
		case 'M3U8':
		case 'TS':
		case 'M2TS':
		case 'MTS':
		case 'MOV':
		case 'MKV':
		case 'MP4':
		case 'MPEG':
		case 'MPD':
		case 'MXF':
		case 'OGV':
		case 'WEBM':
		case 'WMV':
			return `Video (${ext})`
		case 'PDF':
			return `Document (${ext})`
		case 'AAC':
		case 'AIFF':
		case 'AMR':
		case 'FLAC':
		case 'M4A':
		case 'MP3':
		case 'OGG':
		case 'OPUS':
		case 'WAV':
			return `Audio (${ext})`
		default:
			return `Raw (${ext})`
	}
}

export const getFileExtension = (url: string) =>
	url.split(/[#?]/)[0].split('.').pop()!.trim()

export const isRawFile = (filename: string) => {
	return normalizedContentType(getFileExtension(filename)).includes('Raw')
}

export const isVideo = (url: string) => {
	const extension = url.split(/[#?]/)[0].split('.').pop()!.trim().toUpperCase()
	return normalizedContentType(extension) === `Video (${extension})`
}

export const getVideoThumbnail = (url: string) => {
	return replace(url, 'mp4', 'jpg')
}

export const getImageCustomWidth = (url: string, sizeInPx: number) => {
	return replace(url, 'upload', `upload/c_limit,w_${sizeInPx},h_${sizeInPx}`)
}

const isCloudinary = (url: string) =>
	url.includes('res.cloudinary.com') && url.includes('/upload/')

// Without an aspect ratio, c_limit only shrinks. c_lfill crops to it without upscaling.
export const getCloudinaryImage = (
	url: string,
	width: number,
	aspectRatio?: string
) => {
	if (!isCloudinary(url)) return url
	const crop = aspectRatio
		? `c_lfill,w_${width},ar_${aspectRatio}`
		: `c_limit,w_${width}`
	return url.replace('/upload/', `/upload/${crop}/f_auto,q_auto/`)
}

export const getCloudinarySrcSet = (
	url: string,
	widths: number[],
	aspectRatio?: string
) =>
	isCloudinary(url)
		? widths
				.map((w) => `${getCloudinaryImage(url, w, aspectRatio)} ${w}w`)
				.join(', ')
		: undefined
