import type { Paper } from '../../catalog/catalog.types'

interface PaperViewerProps {
  paper: Paper
}

export function PaperViewer({ paper }: PaperViewerProps) {
  return <div className="viewer">
    <iframe src={`${paper.pdfUrl}#view=FitH`} title={`${paper.title} PDF viewer`} />
    <p>PDF not loading? <a href={paper.pdfUrl} target="_blank" rel="noreferrer">Open it in a new tab.</a></p>
  </div>
}
