import { Modal, Button } from 'react-bootstrap';
import type { ReactNode, ReactElement } from 'react';
import './view-modal.css';
import LoadingSpinner from '../loading-spinner/loading-spinner';

interface ViewModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const ViewModal = ({
  show,
  onHide,
  title,
  children,
  size,
  isLoading,
}: ViewModalProps): ReactElement => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      dialogClassName={size === undefined ? 'modal-xxl' : ''}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{isLoading ? <LoadingSpinner /> : children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
};
