import type { ChangeEvent } from 'react'
import { examTypes, type CatalogFilters, type Paper } from '../catalog.types'
import { uniqueSortedValues } from '../catalog.utils'

interface CatalogFilterBarProps {
  filters: CatalogFilters
  onClear: () => void
  onFilterChange: (key: keyof CatalogFilters, value: string) => void
  papers: Paper[]
}

interface FilterSelectProps {
  label: string
  onChange: (value: string) => void
  value: string
  values: (string | number)[]
}

function FilterSelect({ label, onChange, value, values }: FilterSelectProps) {
  return <label>
    {label}
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">All {label.toLowerCase()}s</option>
      {values.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
}

export function CatalogFilterBar({ filters, onClear, onFilterChange, papers }: CatalogFilterBarProps) {
  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => onFilterChange('query', event.target.value)

  return <aside className="filters" aria-label="Paper filters">
    <div className="filter-title"><h2>Filters</h2><button onClick={onClear}>Clear all</button></div>
    <label>Search<input value={filters.query} onChange={updateQuery} placeholder="Subject or code" /></label>
    <FilterSelect label="Branch" value={filters.branch} values={uniqueSortedValues(papers, (paper) => paper.branch)} onChange={(value) => onFilterChange('branch', value)} />
    <FilterSelect label="Semester" value={filters.semester} values={uniqueSortedValues(papers, (paper) => paper.semester)} onChange={(value) => onFilterChange('semester', value)} />
    <FilterSelect label="Subject" value={filters.subject} values={uniqueSortedValues(papers, (paper) => paper.subject)} onChange={(value) => onFilterChange('subject', value)} />
    <FilterSelect label="Exam type" value={filters.examType} values={examTypes} onChange={(value) => onFilterChange('examType', value)} />
    <FilterSelect label="Year" value={filters.year} values={uniqueSortedValues(papers, (paper) => paper.year).reverse()} onChange={(value) => onFilterChange('year', value)} />
  </aside>
}
