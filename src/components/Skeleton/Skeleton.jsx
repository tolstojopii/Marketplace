import styles from './Skeleton.module.css';

function Skeleton({ width, height, borderRadius, className = '' }) {
  return(
    <div 
    className={`${styles.skeleton} ${className}`}
    style={{width, height, borderRadius}}
    aria-hidden="true" />
    
  )
}


export default Skeleton;