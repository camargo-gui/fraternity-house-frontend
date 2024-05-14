/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMemo, useState, type ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import { FaBookOpen, FaPen, FaTrash } from 'react-icons/fa';
import { type Resident } from '../../entities/resident';
import { ActionButton, Div, DivCardIcons } from './card-list-item.styles';
import { formatCpf } from '../../../utils/format-special-characters';
import { ConfirmationModal } from '../../../common/components/confirmation-modal/confirmation-modal';
import { Alert } from 'react-bootstrap';

interface Props {
  residents?: Resident[];
  onEdit: (cpf: string) => void;
  onDelete: (cpf: string) => Promise<void>;
  onScreening: (id: string) => void;
}

export const CardListItem = ({
  residents,
  onEdit,
  onDelete,
  onScreening,
}: Props): ReactElement => {
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const [document, setDocument] = useState<string>('');
  const openModal = (cpf: string): void => {
    setDocument(cpf);
    setShowConfirmationModal(true);
  };

  const role = useMemo(() => {
    return localStorage.getItem('role');
  }, []);

  const shouldCanDelete = useMemo(() => {
    return role === 'Administrador';
  }, [role]);

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
      {residents?.length === 0 ? (
        <Alert variant="info" style={{ width: '100%' }}>
          Nenhum item cadastrado
        </Alert>
      ) : (
        residents?.map((resident) => (
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
                  : require('../../../assets/images/profile.jpg')
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
                {shouldCanDelete && (
                  <ActionButton
                    onClick={() => {
                      openModal(resident.cpf);
                    }}
                    leadingIcon={<FaTrash color="red" />}
                  />
                )}
                <ActionButton
                  onClick={() => {
                    onEdit(resident.cpf);
                  }}
                  leadingIcon={<FaPen color="#2a1aa5" />}
                />
                <ActionButton
                  onClick={() => {
                    onScreening(String(resident.id) ?? 0);
                  }}
                  leadingIcon={<FaBookOpen color="orange" />}
                />
              </DivCardIcons>
            </Card.Body>
            {renderDeleteModal()}
          </Card>
        ))
      )}
    </Div>
  );
};
