// Convert an array of row objects to a CSV string and trigger a download.
export function exportToCsv(filename, rows, columns) {
  if (!rows?.length) return

  const cols = columns ?? Object.keys(rows[0]).map((key) => ({ key, label: key }))
  const escape = (val) => {
    const s = val == null ? '' : String(val)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }

  const header = cols.map((c) => escape(c.label)).join(',')
  const body = rows
    .map((row) => cols.map((c) => escape(row[c.key])).join(','))
    .join('\n')
  const csv = `${header}\n${body}`

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
