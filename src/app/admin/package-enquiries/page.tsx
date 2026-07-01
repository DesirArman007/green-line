import styles from '../page.module.css';
import PackageEnquiriesClient from './PackageEnquiriesClient';

export default function PackageEnquiriesPage() {
  return (
    <div className={styles.dashboard}>
      <PackageEnquiriesClient />
    </div>
  );
}
