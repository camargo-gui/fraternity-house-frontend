import { type ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({
  style,
}: {
  style?: Record<string, string>;
}): ReactElement => {
  return (
    <div className="d-flex justify-content-flex-start align-items-left">
      <Spinner animation="border" role="status" style={style}></Spinner>
    </div>
  );
};

export default LoadingSpinner;
