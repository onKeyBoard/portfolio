import React, { useContext } from 'react'
import ThemeProviderV2, {
	ThemeContextV2,
} from '../../context/ThemeProviderV2'
import { outfit, openSans } from '../../styles/fonts'

interface V2RootProps {
	children: React.ReactNode
	panelScroll?: boolean
}

const V2Root = ({ children, panelScroll }: V2RootProps) => {
	const { theme } = useContext(ThemeContextV2)

	return (
		<div
			data-v2-theme={theme}
			className={[
				'v2-root',
				panelScroll && 'v2-root--paged',
				outfit.variable,
				openSans.variable,
			]
				.filter(Boolean)
				.join(' ')}
		>
			{children}
		</div>
	)
}

interface V2PageShellProps {
	children: React.ReactNode
	panelScroll?: boolean
}

const V2PageShell = ({ children, panelScroll }: V2PageShellProps) => (
	<ThemeProviderV2>
		<V2Root panelScroll={panelScroll}>{children}</V2Root>
	</ThemeProviderV2>
)

export default V2PageShell
