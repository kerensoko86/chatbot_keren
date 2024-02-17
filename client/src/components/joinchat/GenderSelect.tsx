import React from "react";
import Form from "react-bootstrap/Form";
import { GenderOptions } from "../../interfaces/gender";

interface GenderSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ value, onChange }) => (
  <Form.Group controlId="gender">
    <Form.Label>Choose gender</Form.Label>
    <Form.Select value={value} onChange={onChange} required>
      {Object.values(GenderOptions).map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
);

export default GenderSelect;
