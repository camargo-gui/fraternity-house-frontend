import { type ReactElement } from 'react';
import { ViewModal } from '../../../common/components/view-modal/view-modal';
import { AccompanimentStatusScreen } from '../accompaniment-status-screen/accompaniment-status-screen';
import { type AccompanimentStatusEnum } from '../../entities/accompaniment-status';

interface Props {
  showStatusModal: boolean;
  setShowStatusModal: (show: boolean) => void;
  setAccompanimentStatus: (status: AccompanimentStatusEnum) => Promise<void>;
}

export const AccompanimentStatusModal = ({
  showStatusModal,
  setShowStatusModal,
  setAccompanimentStatus,
}: Props): ReactElement => {
  return (
    <ViewModal
      title="Defina o status do acompanhamento para este morador"
      show={showStatusModal}
      onHide={() => {
        setShowStatusModal(false);
      }}
      children={
        <AccompanimentStatusScreen
          setAccompanimentStatus={setAccompanimentStatus}
        />
      }
      size="lg"
    />
  );
};
