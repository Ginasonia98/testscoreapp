import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import ColumnInputs from "./ColumnInput";

const Table = ({
  students,
  handleStudentNameChange,
  handleInputChange,
  handleDelete,
  options,
}) => {
  return (
    <table className="w-full mb-8">
      <thead>
        <tr>
          <th className="px-4 py-2">Nama</th>
          {Array.from({ length: 4 }, (_, index) => (
            <th key={index} className="px-4 py-2">{`Aspek Penilaian ${
              index + 1
            }`}</th>
          ))}
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
                  onChange={(e) => handleStudentNameChange(e, student.id)}
                  className="w-full ml-4 focus:outline-none"
                  placeholder="Masukkan nama mahasiswa"
                />
              </div>
            </td>
            <ColumnInputs
              columns={student.columns}
              studentId={student.id}
              handleInputChange={handleInputChange}
              options={options}
            />
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
  );
};

export default Table;