import { Head, Html, Main, NextScript } from 'next/document'
import { THEME_STORAGE_KEY } from '../v2/context/ThemeProviderV2'

const themeScript = `(function () {
	var theme = 'dark'
	try {
		var stored = localStorage.getItem('${THEME_STORAGE_KEY}')
		if (stored === 'light' || stored === 'dark') theme = stored
		else if (matchMedia('(prefers-color-scheme: light)').matches) theme = 'light'
	} catch (e) {}
	document.documentElement.dataset.v2Theme = theme
})()`

const Document = () => (
	<Html lang='en'>
		<Head>
			<script dangerouslySetInnerHTML={{ __html: themeScript }} />
		</Head>
		<body>
			<Main />
			<NextScript />
		</body>
	</Html>
)

export default Document
