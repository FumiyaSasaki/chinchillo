import React from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const GameView = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Form.Text id="passwordHelpBlock">
        game Start
      </Form.Text>
    </div>
  );
}
