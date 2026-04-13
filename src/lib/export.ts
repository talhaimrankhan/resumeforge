import { toPng } from 'html-to-image'

export async function exportAsPDF(elementId = 'resume-preview'): Promise<void> {
  const el = document.getElementById(elementId)
  if (!el) throw new Error(`Element #${elementId} not found`)

  // Collect all stylesheets from the current document
  const styles = Array.from(document.styleSheets)
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n')
      } catch {
        // Cross-origin stylesheet — skip
        return ''
      }
    })
    .join('\n')

  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to export as PDF.')
    return
  }

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @page { margin: 0; size: A4 portrait; }
    html, body { margin: 0; padding: 0; background: #fff; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    ${styles}
  </style>
</head>
<body>
  ${el.outerHTML}
</body>
</html>`)
  printWindow.document.close()

  // Wait for fonts + images, then print
  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
    printWindow.onafterprint = () => printWindow.close()
  }
}

export async function exportAsPNG(elementId = 'resume-preview'): Promise<void> {
  const el = document.getElementById(elementId)
  if (!el) throw new Error(`Element #${elementId} not found`)

  await document.fonts.ready

  const dataUrl = await toPng(el, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  })

  const a = document.createElement('a')
  a.download = 'resume.png'
  a.href = dataUrl
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
