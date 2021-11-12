import React from "react";

import { Button, Typography, Modal } from "@bigbinary/neetoui/v2";

export const DeleteModal = ({ showModal, setShowModal, deleteQuiz }) => {
  return (
    <div>
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
