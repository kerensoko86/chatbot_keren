import React from "react";
import Form from "react-bootstrap/Form";

interface UsernameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ value, onChange }) => (
  <Form.Group controlId="username">
    <Form.Label>Enter your name</Form.Label>
    <Form.Control
      type="text"
      placeholder="Your Name"
      value={value}
      onChange={onChange}
      required
    />
  </Form.Group>
);

export default UsernameInput;
