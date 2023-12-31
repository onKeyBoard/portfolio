import styles from './ContentExtras.module.scss'
import ProjectShowcase from '../ProjectShowcase/ProjectShowcase'
import SectionTitle from '../SectionTitle/SectionTitle'

const ContentExtras = () => {
	return (
		<div className={styles['content-extras']}>
			{/* <SectionTitle text='Projects' /> */}
			<ProjectShowcase category='Personal' />
		</div>
	)
}

export default ContentExtras
