export interface Quiz {
  quizType: string;
  quizTopic: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  type: string;
  title: string;
  answers: string[];
  correctAnswers: number[];
  sequence: number | null;
  timer: number | null;
}
