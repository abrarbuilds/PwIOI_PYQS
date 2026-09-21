import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink'
import { examTypes } from '../features/catalog/catalog.types'
import '../styles/home.css'

function shortcutIcon(examType: string) {
  if (examType === 'Midsem') return '◐'
  if (examType === 'Endsem') return '★'
  return '◆'
}

export function HomePage() {
  return <>
    <section className="hero">
      <p className="eyebrow">STUDY SMARTER</p>
      <h1>Find the paper.<br /><em>Focus on the exam.</em></h1>
      <p className="lead">Browse previous-year question papers, open them instantly, and save a copy for revision.</p>
      <ButtonLink to="/papers">Browse all papers <span>→</span></ButtonLink>
    </section>
    <section className="shortcut-section">
      <div><p className="eyebrow">QUICK ACCESS</p><h2>What are you preparing for?</h2></div>
      <div className="shortcuts">
        {examTypes.map((examType) => <Link key={examType} to={`/papers?examType=${encodeURIComponent(examType)}`} className="shortcut"><span>{shortcutIcon(examType)}</span><strong>{examType}</strong><small>View papers →</small></Link>)}
      </div>
    </section>
    <section className="how">
      <p className="eyebrow">SIMPLE BY DESIGN</p><h2>From search to study in seconds.</h2>
      <div className="steps">
        <article><b>01</b><h3>Find your subject</h3><p>Use filters for branch, semester, subject, exam type, and year.</p></article>
        <article><b>02</b><h3>Open the paper</h3><p>Read the original paper in your browser—no account required.</p></article>
        <article><b>03</b><h3>Download and revise</h3><p>Keep a copy on your device so it is ready when you need it.</p></article>
      </div>
    </section>
  </>
}
