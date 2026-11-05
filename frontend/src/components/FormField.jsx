import styles from './FormField.module.css'

export default function FormField({ label, ...inputProps }) {
  return (
    <label className={styles.label}>
      {label}
      <input className="input" {...inputProps} />
    </label>
  )
}