import styled, { css } from "styled-components";

// Container for the whole join form
export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Styling for individual form items
export const Items = styled.div`
  margin-bottom: 15px;

  ${(props) =>
    props.variant === "item2" &&
    `
      display: flex;
      flex-direction: column;
    `}

  ${(props) =>
    props.variant === "hint" &&
    `
      font-size: 12px;
      color: #777;
    `}
`;

// Input component for form fields
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Button component for the submit button
export const Button = styled.button`
  padding: 12px;
  background-color: ${(props) => (props.enabled ? "#007bff" : "#ccc")};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${(props) => (props.enabled ? "pointer" : "not-allowed")};
  width: 100%;

  &:hover {
    background-color: ${(props) => (props.enabled ? "#0056b3" : "#ccc")};
  }
`;
