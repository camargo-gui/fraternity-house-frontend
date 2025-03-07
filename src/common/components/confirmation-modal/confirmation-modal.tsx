import type { ReactElement } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingSpinner from '../loading-spinner/loading-spinner';

interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
  isLoading?: boolean;
  isConfirmation?: boolean;
}

export const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  title,
  body,
  isLoading,
  isConfirmation,
}: ConfirmationModalProps): ReactElement => {
  const handleButtonProps = (): { variant: string; content: ReactElement } => {
    const variant = isConfirmation ? 'success' : 'danger';
    const text = isConfirmation ? 'Confirmar' : 'Excluir';

    const content = isLoading ? (
      <LoadingSpinner style={{ width: '25px', height: '25px' }} />
    ) : (
      <>{text}</>
    );

    return { variant, content };
  };
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
        <Button variant={handleButtonProps().variant} onClick={onConfirm}>
          {handleButtonProps().content}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
