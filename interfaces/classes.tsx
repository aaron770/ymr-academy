interface Course {
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
interface ExerciseType {
  type: 'voice' | 'multiChoiceVoice' | 'multiChoice'
}
interface Exercise {
    // info?: {
    //   name?: string;
    //   description?: string;
    //   instructor?: {
    //     name?: string;
    //   }
    // }
    id?: string;
    stepId?: string;
    type?: string;
    language?: string;
    level?: string;
    challenge?: string;
    options?:[];
    answer?: string;
}
interface Step {
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
interface Lesson {
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