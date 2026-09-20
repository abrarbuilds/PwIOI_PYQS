export type ExamType = 'CT-1' | 'CT-2' | 'Midsem' | 'Endsem'

export interface Paper {
  id: string
  title: string
  branch: string
  semester: number
  subject: string
  subjectCode: string
  examType: ExamType
  year: number
  pdfUrl: string
  pages?: number
}

export interface CatalogFilters {
  branch: string
  semester: string
  subject: string
  examType: string
  year: string
  query: string
}

export const examTypes: ExamType[] = ['CT-1', 'CT-2', 'Midsem', 'Endsem']
