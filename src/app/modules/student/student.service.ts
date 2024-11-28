import students from './student.model';

const getaAllStudentDB = async () => {
  const result = await students.find({});
  return result;
};
const singleStudentFromDB = async (studentId: string) => {
  const result = await students.findOne({ id: studentId });
  return result;
};
const deleteStudentFromDB = async (studentId: string) => {
  console.log(studentId);
  const result = await students.updateOne(
    { id: studentId },
    { isDeleted: true }
  );
  return result;
};

export const studentServices = {
  getaAllStudentDB,
  deleteStudentFromDB,
  singleStudentFromDB,
};
