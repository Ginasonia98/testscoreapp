import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import DropdownInput from "./DropdownInput";

const initialData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Mahasiswa ${index + 1}`,
  column2: "",
  column3: "",
  column4: "",
  column5: "",
}));

const options = Array.from({ length: 10 }, (_, index) => String(index + 1));

const App = () => {
  const [students, setStudents] = useState(initialData);
  const [newData, setNewData] = useState(null);

  const handleInputChange = (e, studentId, columnName) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return { ...student, [columnName]: e };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleStudentName = (e, studentId) => {
    const filteredStudents = students.map((student) => {
      if (student.id === studentId) {
        return { ...student, name: e.target.value };
      }
      return student;
    });
    setStudents(filteredStudents);
  };

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudents);
  };

  const handleSubmit = () => {
    const newData = {};
    students.forEach((student) => {
      for (let i = 2; i <= 5; i++) {
        const aspek = `aspek_penilaian_${i - 1}`;
        if (!newData[aspek]) {
          newData[aspek] = {};
        }
        newData[aspek][`mahasiswa_${student.id}`] = student[`column${i}`] * 1;
      }
    });
    setNewData(newData);
  };

  const handleAddStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
    };
    setStudents([...students, newStudent]);
  };

  return (
    <div className="container m-auto min-h-screen">
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Aspek Penilaian 1</th>
            <th className="px-4 py-2">Aspek Penilaian 2</th>
            <th className="px-4 py-2">Aspek Penilaian 3</th>
            <th className="px-4 py-2">Aspek Penilaian 4</th>
            <th className="px-4 py-2">Hapus</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">
                <div className="flex items-center">
                  <FaRegUserCircle />
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => handleStudentName(e, student.id)}
                    className="w-full ml-4 focus:outline-none"
                    placeholder="Masukkan nama mahasiswa"
                  />
                </div>
              </td>
              <td className="border px-4 py-2">
                <DropdownInput
                  value={student.column2}
                  onChange={(value) =>
                    handleInputChange(value, student.id, "column2")
                  }
                  options={options}
                />
              </td>
              <td className="border px-4 py-2">
                <DropdownInput
                  value={student.column3}
                  onChange={(value) =>
                    handleInputChange(value, student.id, "column3")
                  }
                  options={options}
                />
              </td>
              <td className="border px-4 py-2">
                <DropdownInput
                  value={student.column4}
                  onChange={(value) =>
                    handleInputChange(value, student.id, "column4")
                  }
                  options={options}
                />
              </td>
              <td className="border px-4 py-2">
                <DropdownInput
                  value={student.column5}
                  onChange={(value) =>
                    handleInputChange(value, student.id, "column5")
                  }
                  options={options}
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-red-600"
                >
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between">
        <button
          onClick={handleAddStudent}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
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