/**
 * Export data to a downloadable CSV file.
 * @param {string} filename - Name without extension
 * @param {Array<object>} rows - Data rows
 * @param {Array<{key:string, label:string}>} columns - Column definitions
 */
export function exportToCsv(filename, rows, columns) {
  if (!rows?.length || !columns?.length) return

  const header = columns.map((c) => `"${c.label}"`).join(',')
  const body = rows
    .map((row) =>
      columns
        .map((c) => {
          const val = String(row[c.key] ?? '').replace(/"/g, '""')
          return `"${val}"`
        })
        .join(',')
    )
    .join('\n')

  const csv = `${header}\n${body}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
