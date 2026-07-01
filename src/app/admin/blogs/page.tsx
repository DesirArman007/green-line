import styles from '../page.module.css';
import BlogsClient from './BlogsClient';

export default function BlogsPage() {
  return (
    <div className={styles.dashboard}>
      <BlogsClient />
    </div>
  );
}
