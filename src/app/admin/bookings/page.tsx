import styles from '../page.module.css';
import BookingsClient from './BookingsClient';

export default function BookingsPage() {
  return (
    <div className={styles.dashboard}>
      <BookingsClient />
    </div>
  );
}
