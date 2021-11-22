import React, { useMemo } from "react";

import { useTable } from "react-table";

const ReportTable = ({ reportData }) => {
  const column = [
    { header: "Quiz Name", accessor: "quiz_name" },
    { header: "User Name", accessor: "name" },
    { header: "Email", accessor: "user_email" },
    { header: "Correct Answers", accessor: "correct" },
    { header: "Incorrect Answers", accessor: "incorrect" },
  ];

  const columns = useMemo(() => column, []);

  const data = useMemo(() => reportData, [reportData]);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="w-10/12  my-10  ml-16 flex flex-col  ">
      <table
        {...getTableProps()}
        className="border-2 border-black w-full items-center"
      >
        <thead className="bg-gray-400 pb-20">
          {headerGroups.map((headerGroup, rowIndex) => (
            <tr key={rowIndex} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, colIndex) => (
                <th key={colIndex} {...column.getHeaderProps()}>
                  {column.render("header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                key={rowIndex}
                {...row.getRowProps()}
                className="px-10 py-2 w-full border-t-2  border-gray-400 bg-gray-100"
              >
                {row.cells.map((cell, colIndex) => {
                  return (
                    <td
                      key={colIndex}
                      {...cell.getCellProps()}
                      className="border-r-2 border-l-2 border-gray-400 text-center"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
