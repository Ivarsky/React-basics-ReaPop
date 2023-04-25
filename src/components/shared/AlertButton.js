/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from './Button';

const AlertButton = props => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{props.buttonText}</Button>
      {open && (
        <div>
          <h2>{props.title}</h2>
          <p>{props.message}</p>
          <Button onClick={props.function}>{props.functionText}</Button>
          <Button onClick={handleClose}>Close</Button>
        </div>
      )}
    </div>
  );
};

export default AlertButton;
