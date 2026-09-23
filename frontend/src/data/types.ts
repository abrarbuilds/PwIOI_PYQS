export type ExamType = 'CT1' | 'CT2' | 'MIDSEM' | 'ENDSEM';

export interface PYQPaper {
  id: string;
  title: string;
  subject: string;
  branch: string;
  semester: number;
  year: number;
  examType: ExamType;
  cloudinaryPdfUrl: string;
}
