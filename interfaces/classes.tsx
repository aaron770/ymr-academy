export interface Course {
    description?: {
      name?: string;
      instructor?: {
        name?: string;
      }
      prerequisites?: {
        courses?: string[];
      }
    }
}
export const excerciseTypes = [{label: 'Hebrew Vowel', value: 'hebrewVowel'}, {label: 'Hebrew Letter', value: 'hebrewLetter'}, {label: 'Hebrew Word', value: 'hebrew word'}, {label: 'Type in text', value: 'text'}, , {label: 'Multiple choise', value: 'multiChoice'}]
interface ExerciseType {
  type: typeof excerciseTypes[number]['value']
}
export interface Exercise {
    // info?: {
    //   name?: string;
    //   description?: string;
    //   instructor?: {
    //     name?: string;
    //   }
    // }
    preStep?: Text;
    description?: string;
    id?: string;
    stepId?: string;
    type?: string;
    language?: string;
    level?: string;
    challenge?: string | Array<string>;
    options?:[];
    answer?: string;
    postStep?: Text;

}
export interface Step {
    description?: string;
    id?: string
    preStep?: {
        sound?: string;
        image?: string;
        text?: string;
    }
    exercises?: Array<Exercise>;
    postStep?: {
      sound?: string;
      image?: string;
      text?: string;
    }
}
export interface Lesson {
  info?: {
    name?: string;
    description?: string;
    language?: string;
    level?: string
    subject?: string;
    instructor?: {
      name?: string;
      id?: string;
    }
  }
    steps?: Array<Step>

    
}