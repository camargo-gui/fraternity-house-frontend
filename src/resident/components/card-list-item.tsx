/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, type ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import { FaPen, FaTrash } from 'react-icons/fa';
import { type ResidentDTO } from '../dto/resident-dto';
import { ActionButton, Div, DivCardIcons } from './card-list-item.styles';
import { formatCpf } from '../../utils/format-special-characters';
import { ConfirmationModal } from '../../common/components/confirmation-modal/confirmation-modal';

interface Props {
  residents?: ResidentDTO[];
  onEdit: (cpf: string) => void;
  onDelete: (cpf: string) => Promise<void>;
}

export const CardListItem = ({
  residents,
  onEdit,
  onDelete,
}: Props): ReactElement => {
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const [document, setDocument] = useState<string>('');
  const openModal = (cpf: string): void => {
    setDocument(cpf);
    setShowConfirmationModal(true);
  };

  const renderDeleteModal = (): ReactElement => {
    return (
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => {
          setShowConfirmationModal(false);
        }}
        onConfirm={async () => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          await onDelete(document);
        }}
        title="Confirmar Exclusão"
        body="Tem certeza de que deseja excluir este morador?"
      />
    );
  };

  return (
    <Div>
      {residents?.map((resident) => (
        <Card
          key={resident.cpf}
          style={{
            width: '18%',
            minWidth: '200px',
            marginBottom: '20px',
            marginRight: '10px',
            marginLeft: '10px',
          }}
        >
          <Card.Img
            style={{ objectFit: 'cover' }}
            variant="top"
            src={
              resident.url_image != null && resident.url_image !== ''
                ? resident.url_image
                : require('../../assets/images/profile.jpg')
            }
            height="225px"
          />
          <Card.Body
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Card.Title>{resident.name}</Card.Title>
              <Card.Text>CPF: {formatCpf(resident.cpf)}</Card.Text>
            </div>
            <DivCardIcons>
              <ActionButton
                onClick={() => {
                  openModal(resident.cpf);
                }}
                leadingIcon={<FaTrash color="red" />}
              />
              <ActionButton
                onClick={() => {
                  onEdit(resident.cpf);
                }}
                leadingIcon={<FaPen color="#2a1aa5" />}
              />
            </DivCardIcons>
          </Card.Body>
          {renderDeleteModal()}
        </Card>
      ))}
    </Div>
  );
};
