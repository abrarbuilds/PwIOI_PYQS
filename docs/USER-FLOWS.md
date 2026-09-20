# User Flows

## Student registration and sign-in

1. Student registers using email/password or chooses Google sign-in.
2. Email/password accounts receive a verification email through Resend.
3. The student verifies the email, signs in, and reaches the catalog.
4. A forgotten-password request sends a one-time reset link.

## Browse and read a PYQ

1. Student selects branch, semester, subject, exam type, and year filters.
2. Student opens a published paper.
3. Student selects **Paper Mode**.
4. The backend verifies the student and returns a short-lived signed PDF link.
5. The original PDF opens in the viewer and can be downloaded while that link is valid.

## Practice a PYQ

1. Student opens a paper and selects **Test Mode**.
2. The system creates a new attempt or resumes the unfinished one.
3. The practice timer starts; the student may pause and resume it.
4. The student answers MCQs, writes code responses, or skips code questions.
5. Answers and elapsed time save automatically.
6. Student submits the test; MCQs are marked automatically.
7. Each code response receives NVIDIA NIM feedback and suggested marks; the student confirms or adjusts the score. The feedback is advisory because no code is executed in v1.
8. The system locks the attempt, reveals solutions, and updates the dashboard.

## Admin publishes a PYQ

1. Admin creates/selects the branch, semester, and subject.
2. Admin creates a draft paper and uploads the original PDF.
3. Admin enters the digitized questions, MCQ options, marks, answers, explanations, reference solutions, and duration.
4. Admin reviews the draft and publishes it.
5. Students can now see it in the catalog.
