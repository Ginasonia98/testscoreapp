import React, { useCallback, useState } from "react";
import Table from "./components/Table";

const initialData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Mahasiswa ${index + 1}`,
  columns: ["", "", "", ""],
}));

const options = Array.from({ length: 10 }, (_, index) => String(index + 1));

const App = () => {
  const [students, setStudents] = useState(initialData);
  const [newData, setNewData] = useState(null);

  const handleInputChange = useCallback(
    (e, studentId, columnIndex) => {
      const updatedStudents = students.map((student) => {
        if (student.id === studentId) {
          const updatedColumns = [...student.columns];
          updatedColumns[columnIndex] = e;
          return { ...student, columns: updatedColumns };
        }
        return student;
      });
      setStudents(updatedStudents);
    },
    [students]
  );

  const handleStudentNameChange = useCallback(
    (e, studentId) => {
      const updatedStudents = students.map((student) => {
        if (student.id === studentId) {
          return { ...student, name: e.target.value };
        }
        return student;
      });
      setStudents(updatedStudents);
    },
    [students]
  );

  const handleDelete = useCallback(
    (studentId) => {
      const updatedStudents = students.filter(
        (student) => student.id !== studentId
      );
      setStudents(updatedStudents);
    },
    [students]
  );

  const handleSubmit = useCallback(() => {
    const newData = {};
    students.forEach((student) => {
      student.columns.forEach((column, index) => {
        const aspek = `aspek_penilaian_${index + 1}`;
        if (!newData[aspek]) {
          newData[aspek] = {};
        }
        newData[aspek][`mahasiswa_${student.id}`] = column * 1;
      });
    });
    setNewData(newData);
  }, [students]);

  const handleAddStudent = useCallback(() => {
    const newStudent = {
      id: students.length + 1,
      name: "",
      columns: ["", "", "", ""],
    };
    setStudents([...students, newStudent]);
  }, [students]);

  return (
    <div className="container m-auto min-h-screen">
      <Table
        students={students}
        handleStudentNameChange={handleStudentNameChange}
        handleInputChange={handleInputChange}
        handleDelete={handleDelete}
        options={options}
      />

      <div className="flex justify-between">
        <button
          onClick={handleAddStudent}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Tambah Mahasiswa
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </div>
      {newData && (
        <div className="mt-4">
          <h3 className="mb-3">
            Hasil data yang di<i>submit</i>:
          </h3>
          <pre>{JSON.stringify(newData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;