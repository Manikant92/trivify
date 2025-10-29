import { Question } from '../types/game.js';

export class QuestionBank {
  private questions: Question[] = [
    // Easy Questions (15s)
    {
      id: 'easy_1',
      question: 'What does "TIL" stand for on Reddit?',
      options: ['Today I Learned', 'This Is Life', 'Time Is Limited', 'Take It Literally'],
      correctAnswer: 'Today I Learned',
      category: 'Reddit',
      difficulty: 'easy',
      timeLimit: 15
    },
    {
      id: 'easy_2',
      question: 'What does "AMA" mean on Reddit?',
      options: ['Ask Me Anything', 'Always My Answer', 'All My Answers', 'Any More Answers'],
      correctAnswer: 'Ask Me Anything',
      category: 'Reddit',
      difficulty: 'easy',
      timeLimit: 15
    },
    {
      id: 'easy_3',
      question: 'What does "OP" stand for in Reddit comments?',
      options: ['Original Poster', 'Open Post', 'Other Person', 'Official Post'],
      correctAnswer: 'Original Poster',
      category: 'Reddit',
      difficulty: 'easy',
      timeLimit: 15
    },
    {
      id: 'easy_4',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
      category: 'Science',
      difficulty: 'easy',
      timeLimit: 15
    },
    {
      id: 'easy_5',
      question: 'How many sides does a triangle have?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
      category: 'General',
      difficulty: 'easy',
      timeLimit: 10
    },

    // Medium Questions (20s)
    {
      id: 'medium_1',
      question: 'What year was Reddit founded?',
      options: ['2003', '2005', '2007', '2009'],
      correctAnswer: '2005',
      category: 'Reddit',
      difficulty: 'medium',
      timeLimit: 20
    },
    {
      id: 'medium_2',
      question: 'Which element has the chemical symbol "Au"?',
      options: ['Silver', 'Gold', 'Aluminum', 'Argon'],
      correctAnswer: 'Gold',
      category: 'Science',
      difficulty: 'medium',
      timeLimit: 20
    },
    {
      id: 'medium_3',
      question: 'What is the maximum character limit for a Reddit post title?',
      options: ['200', '250', '300', '350'],
      correctAnswer: '300',
      category: 'Reddit',
      difficulty: 'medium',
      timeLimit: 25
    },
    {
      id: 'medium_4',
      question: 'In which year did World War II end?',
      options: ['1944', '1945', '1946', '1947'],
      correctAnswer: '1945',
      category: 'History',
      difficulty: 'medium',
      timeLimit: 20
    },
    {
      id: 'medium_5',
      question: 'What is the square root of 144?',
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
      category: 'General',
      difficulty: 'medium',
      timeLimit: 15
    },

    // Hard Questions (30s+)
    {
      id: 'hard_1',
      question: 'Who were the original founders of Reddit?',
      options: ['Steve Huffman & Alexis Ohanian', 'Mark Zuckerberg & Eduardo Saverin', 'Larry Page & Sergey Brin', 'Jack Dorsey & Biz Stone'],
      correctAnswer: 'Steve Huffman & Alexis Ohanian',
      category: 'Reddit',
      difficulty: 'hard',
      timeLimit: 30
    },
    {
      id: 'hard_2',
      question: 'What is the name of the Reddit mascot?',
      options: ['Snoop', 'Snoo', 'Reddy', 'Karma'],
      correctAnswer: 'Snoo',
      category: 'Reddit',
      difficulty: 'hard',
      timeLimit: 25
    },
    {
      id: 'hard_3',
      question: 'Which programming language is primarily used for Reddit\'s backend?',
      options: ['JavaScript', 'Python', 'Java', 'C++'],
      correctAnswer: 'Python',
      category: 'Technology',
      difficulty: 'hard',
      timeLimit: 25
    },
    {
      id: 'hard_4',
      question: 'In quantum physics, what is Heisenberg\'s Uncertainty Principle?',
      options: ['Energy cannot be created or destroyed', 'You cannot know both position and momentum simultaneously', 'Light behaves as both wave and particle', 'Time is relative to the observer'],
      correctAnswer: 'You cannot know both position and momentum simultaneously',
      category: 'Science',
      difficulty: 'hard',
      timeLimit: 35
    },
    {
      id: 'hard_5',
      question: 'What does "brigading" mean on Reddit?',
      options: ['Creating multiple accounts', 'Coordinated voting manipulation', 'Posting spam content', 'Using bots for comments'],
      correctAnswer: 'Coordinated voting manipulation',
      category: 'Reddit',
      difficulty: 'hard',
      timeLimit: 30
    }
  ];

  getRandomQuestion(difficulty: 'easy' | 'medium' | 'hard'): Question {
    const filteredQuestions = this.questions.filter(q => q.difficulty === difficulty);
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  }

  getQuestionById(id: string): Question | undefined {
    return this.questions.find(q => q.id === id);
  }

  getAllQuestions(): Question[] {
    return [...this.questions];
  }

  getQuestionsByCategory(category: string): Question[] {
    return this.questions.filter(q => q.category === category);
  }
}