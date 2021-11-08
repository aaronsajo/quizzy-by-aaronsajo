import React, { useMemo, useState } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Button, Typography, Modal } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

import quizzesApi from "apis/quizzes";

import { COLUMNS } from "../columns";

export const Table = ({ quizData, fetchQuizzes }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => quizData, [quizData]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  const deleteQuiz = async () => {
    try {
      await quizzesApi.destroy(deleteId);
      fetchQuizzes();
      setShowModal(false);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <table
        className="w-11/12 border-2 border-black  mt-4 flex flex-col items-center"
        {...getTableProps()}
      >
        <thead className="w-full flex pl-10  py-2  ">
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <th key={j} {...column.getHeaderProps()}>
                  {" "}
                  {column.render("Header")}{" "}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="w-full flex flex-col " {...getTableBodyProps()}>
          {rows.map((row, l) => {
            prepareRow(row);
            return (
              <tr
                key={l}
                className="px-10 py-2 w-full border-t-2 border-gray-400 bg-gray-100"
                {...row.getRowProps()}
              >
                {row.cells.map((cell, k) => (
                  <td
                    key={k}
                    className="flex justify-between"
                    {...cell.getCellProps()}
                  >
                    <div>
                      <Typography>{cell.render("Cell")}</Typography>
                    </div>
                    <div>
                      <Button
                        style="secondary"
                        className=" mr-5 "
                        icon={Edit}
                        label="Edit"
                        to={`/quiz/edit/${row.original.id}`}
                      />
                      <Button
                        style="danger"
                        icon={Delete}
                        label="Delete"
                        onClick={() => {
                          setShowModal(true);
                          setDeleteId(row.original.id);
                        }}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Typography style="h2">Confirm Delete</Typography>
        </Modal.Header>

        <Modal.Footer className="space-x-2">
          <Button
            style="danger"
            label="Delete"
            onClick={() => deleteQuiz()}
            size="large"
          />
          <Button
            style="secondary"
            label="Cancel"
            onClick={() => setShowModal(false)}
            size="large"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
