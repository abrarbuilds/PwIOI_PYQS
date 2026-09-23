import { Paper } from '../features/catalog/catalog.types';

export const papers: Paper[] = [
  // Semester 1
  ...expandSubject('Programming Principles and Practice with C and C++', '101CPP', 'CSE', 1, 2025),
  ...expandSubject('Computer Organization and Architecture', '103COA', 'CSE', 1, 2025),
  ...expandSubject('OJT / Frontend Developer (HTML, CSS, JS)', '106OFD', 'CSE', 1, 2025),
  ...expandSubject('Mathematics for Computer Science', '102MCS', 'CSE', 1, 2025),

  // Semester 2
  ...expandSubject('Database Management System (SQL, NOSQL)', 'DBMS204', 'CSE', 2, 2026),
  ...expandSubject('English Communication - Advanced', 'ECA205', 'CSE', 2, 2026),
  ...expandSubject('Object Oriented Programming using Java', 'OOPS201', 'CSE', 2, 2026),
  ...expandSubject('Mathematics for Data Science', 'MDS203', 'CSE', 2, 2026),
  ...expandSubject('OJT / Javascript Web Developer (Advance JS)', 'ADVJS206', 'CSE', 2, 2026),
  ...expandSubject('Data Structures and Algorithms (DSA-1)', 'DSA202', 'CSE', 2, 2026),

  // Semester 3
  ...expandSubject('Advance Data Structures and Algorithms', '301ADS', 'CSE', 3, 2026),
  ...expandSubject('Operating System', '302OPS', 'CSE', 3, 2026),
  ...expandSubject('Python for Data Science', '303PDS', 'CSE', 3, 2026),
  ...expandSubject('Essential Language Skills', '304ELS', 'CSE', 3, 2026),
  ...expandSubject('Data Visualization using Excel and Powerbi', '304VEP', 'CSE', 3, 2026),
  ...expandSubject('OJT / Java Web Developer (Spring Boot)', '306JWD', 'CSE', 3, 2026),
];

function expandSubject(subject: string, subjectCode: string, branch: string, semester: number, year: number): Paper[] {
  return ['CT-1', 'CT-2', 'Midsem', 'Endsem'].map((examType, index) => ({
    id: `${subjectCode}-${examType}`,
    title: `${subject} ${examType}`,
    subject,
    subjectCode,
    branch,
    semester,
    year,
    examType: examType as any,
    pdfUrl: `https://res.cloudinary.com/placeholder/pdf/${subjectCode.toLowerCase()}-${examType.toLowerCase()}.pdf`,
  }));
}
