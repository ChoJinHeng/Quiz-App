import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-questions-answers-template',
  templateUrl: './questions-answers-template.component.html',
  styleUrls: ['./questions-answers-template.component.scss'],
})
export class QuestionsAnswersTemplateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  valueId = signal(1);
  questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      choices: [
        { index: 1, answer: 'Paris' },
        { index: 2, answer: 'London' },
        { index: 3, answer: 'Berlin' },
        { index: 4, answer: 'Madrid' },
      ],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      choices: [
        { index: 1, answer: 'Saturn' },
        { index: 2, answer: 'Mars' },
        { index: 3, answer: 'Jupiter' },
        { index: 4, answer: 'Neptune' },
      ],
      correctAnswer: 'Mars',
    },
    {
      id: 3,
      question: 'What is 5 + 7?',
      choices: [
        { index: 1, answer: '11' },
        { index: 2, answer: '12' },
        { index: 3, answer: '13' },
        { index: 4, answer: '14' },
      ],
      correctAnswer: '12',
    },
    {
      id: 4,
      question: 'Who wrote "Romeo and Juliet"?',
      choices: [
        { index: 1, answer: 'William Shakespeare' },
        { index: 2, answer: 'Leo Tolstoy' },
        { index: 3, answer: 'Jane Austen' },
        { index: 4, answer: 'Charles Dickens' },
      ],
      correctAnswer: 'William Shakespeare',
    },
    {
      id: 5,
      question: 'Which gas do humans need to breathe in order to survive?',
      choices: [
        { index: 1, answer: 'Oxygen' },
        { index: 2, answer: 'Carbon Dioxide' },
        { index: 3, answer: 'Helium' },
        { index: 4, answer: 'Nitrogen' },
      ],
      correctAnswer: 'Oxygen',
    },
  ];
}
