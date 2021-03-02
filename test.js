function getSum(array) {
  return array.reduce((sum, number) => sum + number);
}

function getAvg(array) {
  return getSum(array) / array.length;
}

function getLetterGrade(gradePct) {
  const grades = [
    [93, 'A'], [85, 'B'], [77, 'C'], [69, 'D'], [60, 'E'], [0, 'F'],
  ];

  return grades.find((grade) => grade[0] <= gradePct)[1];
}

function transpose(array) {
  return array[0].map((_, index) => array.map(([...row]) => row[index]));
}

function getStudentGrades(scoreObj) {
  const EXAM_WEIGHT = 0.65;
  const EXERCISE_WEIGHT = 0.35;

  const scores = scoreObj.map((score) => {
    const examAvg = getAvg(score.exams) * EXAM_WEIGHT;
    const exerciseSum = getSum(score.exercises) * EXERCISE_WEIGHT;

    return Math.round(examAvg + exerciseSum);
  });

  return scores.map((score) => `${score} (${getLetterGrade(score)})`);
}

function getExamSummary(examData) {
  return transpose(examData).map((exam) => ({
    average: parseFloat((getAvg(exam)).toFixed(1)),
    minimum: Math.min(...exam),
    maximum: Math.max(...exam),
  }));
}

function generateClassRecordSummary(studentList) {
  const students = Object.keys(studentList);
  const scoreData = students.map((student) => studentList[student].scores);

  const examData = scoreData.map((score) => score.exams);

  return {
    studentGrades: getStudentGrades(scoreData),
    exams: getExamSummary(examData),
  };
}

const studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

console.log(generateClassRecordSummary(studentScores));

/* returns:
{
  studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
  exams: [
    { average: 75.6, minimum: 50, maximum: 100 },
    { average: 86.4, minimum: 70, maximum: 100 },
    { average: 87.6, minimum: 60, maximum: 100 },
    { average: 91.8, minimum: 80, maximum: 100 },
  ],
}
*/
