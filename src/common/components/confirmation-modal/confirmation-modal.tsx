import type { ReactElement } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';

interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
  isLoading?: boolean;
}

export const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  title,
  body,
  isLoading,
}: ConfirmationModalProps): ReactElement => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {'Cancelar'}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {isLoading ?? false ? <Spinner /> : 'Excluir'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
