interface Course {
    description: {
      name: string;
      instructor: {
        name: string;
      }
      prerequisites: {
        courses: string[];
      }
    }
}
interface Exercise{
    info: {
      name: string;
      description: string;
      instructor: {
        name: string;
      }
    }
    type: String
    challenge: {}
    options:[]
    answer: String
}
interface Step {
    description: {

    }
    preStep: {
        sound: {}
        image:{
        }
        text: {}
    }
    setuptExercise: {
        Exercise
        format: String // todo
        Onsucess: string //todo
    }
    postStep: {
        sound: {}
        image:{
        }
        text: {}
    }

    
}
interface lesson {
    steps: [

    ]

    
}