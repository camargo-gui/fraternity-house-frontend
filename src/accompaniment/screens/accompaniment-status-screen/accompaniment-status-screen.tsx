import { type ReactElement } from 'react';
import {
  Container,
  EmojiButton,
  Emoji,
  Description,
} from './accompaniment-status-screen.styles';
import { noop } from 'lodash';
import { AccompanimentStatusEnum } from '../../entities/accompaniment-status';

interface Props {
  setAccompanimentStatus: (status: AccompanimentStatusEnum) => Promise<void>;
}

export const AccompanimentStatusScreen = ({
  setAccompanimentStatus,
}: Props): ReactElement => {
  return (
    <Container>
      <EmojiButton
        onClick={() => {
          void setAccompanimentStatus(AccompanimentStatusEnum.Bad).catch(noop);
        }}
      >
        <Emoji>😔</Emoji>
        <Description>Ruim</Description>
      </EmojiButton>
      <EmojiButton
        onClick={() => {
          void setAccompanimentStatus(AccompanimentStatusEnum.Good).catch(noop);
        }}
      >
        <Emoji>😐</Emoji>
        <Description>Bom</Description>
      </EmojiButton>
      <EmojiButton
        onClick={() => {
          void setAccompanimentStatus(AccompanimentStatusEnum.VeryGood).catch(
            noop,
          );
        }}
      >
        <Emoji>😁</Emoji>
        <Description>Muito Bom</Description>
      </EmojiButton>
    </Container>
  );
};
