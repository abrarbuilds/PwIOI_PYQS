import type { CatalogFilters, Paper } from './catalog.types'

export function filterPapers(papers: Paper[], filters: CatalogFilters) {
  const query = filters.query.trim().toLowerCase()

  return papers.filter((paper) => {
    const matchesQuery = !query || `${paper.title} ${paper.subject} ${paper.subjectCode}`.toLowerCase().includes(query)

    return (!filters.branch || paper.branch === filters.branch)
      && (!filters.semester || String(paper.semester) === filters.semester)
      && (!filters.subject || paper.subject === filters.subject)
      && (!filters.examType || paper.examType === filters.examType)
      && (!filters.year || String(paper.year) === filters.year)
      && matchesQuery
  })
}

export function uniqueSortedValues(papers: Paper[], getValue: (paper: Paper) => string | number) {
  return [...new Set(papers.map(getValue))].sort((left, right) => String(left).localeCompare(String(right), undefined, { numeric: true }))
}
