import React from 'react';
import styles from './DataTable.module.css';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading
}: DataTableProps<T>) {
  if (isLoading) {
    return <div className={styles.loading}>Loading data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className={styles.empty}>No records found.</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th className={styles.actionsHeader}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className={styles.actionsCell}>
                  <div className={styles.actionsWrapper}>
                    {onEdit && (
                      <button className={styles.editBtn} onClick={() => onEdit(row)}>
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button className={styles.deleteBtn} onClick={() => onDelete(row)}>
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
