import { Link } from 'react-router-dom'
import type { Paper } from '../catalog.types'

interface PaperCardProps {
  paper: Paper
}

export function PaperCard({ paper }: PaperCardProps) {
  return <article className="paper-card">
    <div className="card-top"><span className="exam-tag">{paper.examType}</span><span className="year">{paper.year}</span></div>
    <h3>{paper.title}</h3>
    <p className="subject">{paper.subject} <span>·</span> {paper.subjectCode}</p>
    <p className="meta">{paper.branch} · Semester {paper.semester}{paper.pages ? ` · ${paper.pages} pages` : ''}</p>
    <div className="card-actions">
      <Link to={`/papers/${paper.id}`}>View paper <span>→</span></Link>
      <a href={paper.pdfUrl} download target="_blank" rel="noreferrer">Download <span>↓</span></a>
    </div>
  </article>
}
