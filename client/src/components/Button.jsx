import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Button = styled.div`
  border-radius: 100px;
  color: white;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 16px 26px;
  box-shadow: 1px 20px 35px 0px rgba(128, 0, 128, 0.4); /* Purple shadow */
  border: 1px solid ${({ theme }) => "purple"};
  
  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ type }) =>
    type === "secondary"
      ? `
  background: #c8a2c8; /* Lighter purple for secondary */
  border: 1px solid #c8a2c8;
  `
      : `
  background: purple; /* Default purple */
`}

  ${({ isDisabled }) =>
    isDisabled &&
    `
  opacity: 0.8;
  cursor: not-allowed;
  `}

  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
  cursor: not-allowed;
`}

  ${({ flex }) =>
    flex &&
    `
    flex: 1;
`}

  ${({ small }) =>
    small &&
    `
padding: 10px 28px;
`}

  ${({ outlined }) =>
    outlined &&
    `
background: transparent;
color: purple;
border: 1px solid purple;
  box-shadow: none;
`}

  ${({ full }) =>
    full &&
    `
  width: 100%;`}
`;

const CustomButton = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <Button
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
      small={small}
      outlined={outlined}
      full={full}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </Button>
  );
};

export default CustomButton;
