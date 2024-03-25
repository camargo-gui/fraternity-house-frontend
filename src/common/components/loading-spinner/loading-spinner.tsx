import { type ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = (): ReactElement => {
  return (
    <div className="d-flex justify-content-flex-start align-items-left">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default LoadingSpinner;
