import { Link, useParams } from 'react-router-dom'
import { ExternalButtonLink } from '../components/ButtonLink'
import { PaperViewer } from '../features/paper/components/PaperViewer'
import { getPaperById } from '../features/paper/paper.utils'
import '../styles/paper.css'

export function PaperDetailPage() {
  const { paperId } = useParams()
  const paper = getPaperById(paperId)

  if (!paper) {
    return <section className="not-found"><h1>Paper not found</h1><p>It may have moved or is no longer available.</p><Link className="button primary" to="/papers">Back to library</Link></section>
  }

  return <section className="detail">
    <Link className="back" to="/papers">← Back to library</Link>
    <div className="detail-head">
      <div><p className="eyebrow">{paper.branch} · SEMESTER {paper.semester}</p><h1>{paper.title}</h1><p className="subject">{paper.subject} · {paper.subjectCode}</p></div>
      <span className="exam-tag large">{paper.examType} {paper.year}</span>
    </div>
    <div className="detail-actions">
      <ExternalButtonLink href={paper.pdfUrl} target="_blank" rel="noreferrer">Open PDF <span>↗</span></ExternalButtonLink>
      <ExternalButtonLink href={paper.pdfUrl} tone="secondary" download target="_blank" rel="noreferrer">Download PDF <span>↓</span></ExternalButtonLink>
    </div>
    <PaperViewer paper={paper} />
  </section>
}
