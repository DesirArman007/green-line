import styles from '../page.module.css';
import ContactEnquiriesClient from './ContactEnquiriesClient';

export default function ContactEnquiriesPage() {
  return (
    <div className={styles.dashboard}>
      <ContactEnquiriesClient />
    </div>
  );
}
