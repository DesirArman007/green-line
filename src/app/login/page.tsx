import { login } from './actions'
import styles from './page.module.css'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex' }}>
            <img src="/images/logo.png" alt="GreenLine Logo" style={{ width: '100px', height: '100px', objectFit: 'contain', filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))' }} />
          </div>
        </div>
        <h1 className={styles.title}>GreenLine</h1>
        <p className={styles.subtitle}>Sign in to manage your website content</p>
        {message && <div className={styles.message}>{message}</div>}
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
          <div className={styles.buttonGroup}>
            <button formAction={login} className={`${styles.button} ${styles.loginButton}`} style={{ width: '100%' }}>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
