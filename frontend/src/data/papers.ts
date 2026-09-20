import type { Paper } from '../features/catalog/catalog.types'

// Replace these sample records with the final Cloudinary raw-PDF URLs before launch.
// No Cloudinary credentials belong in this file or in the browser.
export const papers: Paper[] = [
  {
    id: 'cse-3-data-structures-midsem-2025',
    title: 'Data Structures Midsem Examination 2025',
    branch: 'CSE', semester: 3, subject: 'Data Structures', subjectCode: 'CS201',
    examType: 'Midsem', year: 2025, pages: 4,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'cse-3-dbms-ct1-2025',
    title: 'DBMS CT-1 2025',
    branch: 'CSE', semester: 3, subject: 'DBMS', subjectCode: 'CS202',
    examType: 'CT-1', year: 2025, pages: 2,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'cse-3-os-endsem-2024',
    title: 'Operating Systems Endsem Examination 2024',
    branch: 'CSE', semester: 3, subject: 'Operating Systems', subjectCode: 'CS203',
    examType: 'Endsem', year: 2024, pages: 6,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'ece-3-networks-ct2-2025',
    title: 'Computer Networks CT-2 2025',
    branch: 'ECE', semester: 3, subject: 'Computer Networks', subjectCode: 'EC205',
    examType: 'CT-2', year: 2025, pages: 2,
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
]
