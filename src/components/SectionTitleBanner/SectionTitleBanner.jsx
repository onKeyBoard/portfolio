import styles from './SectionTitleBanner.module.scss'
import SectionTitle from '../SectionTitle/SectionTitle'

const SectionTitleBanner = ({ text }) => {
	return (
		<div className={styles['wrapper']}>
			<div className={styles['headline']}>
				<SectionTitle text={text} />
			</div>
		</div>
	)
}

export default SectionTitleBanner
