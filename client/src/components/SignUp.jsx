import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

// Password strength meter colors
const strengthColor = {
  0: "#d32f2f", // Weak
  1: "#f57c00", // Fair
  2: "#fbc02d", // Good
  3: "#388e3c", // Strong
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: purple;
  text-align: center;
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -20px;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const StrengthMeterWrapper = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const StrengthBar = styled.div`
  height: 100%;
  width: ${({ strength }) => (strength / 3) * 100}%;
  background-color: ${({ strength }) => strengthColor[strength]};
  transition: width 0.3s ease;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Success message state

  // Password strength meter logic
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength++; // Minimum length check
    if (/[A-Z]/.test(password)) strength++; // Uppercase check
    if (/\d/.test(password) && /[!@#$%^&*]/.test(password)) strength++; // Numbers and special characters check
    return strength;
  };

  const validateInputs = () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignUp = async () => {
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success message
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          setSuccess("Account Created Successfully!"); // Set success message
          setLoading(false);
          setButtonDisabled(false);
          setTimeout(() => window.location.reload(), 2000); // Refresh page after 2 seconds
        })
        .catch((err) => {
          setError(err.response?.data?.message || "An error occurred during signup");
          setLoading(false);
          setButtonDisabled(false);
        });
    } else {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(getPasswordStrength(value));
  };

  return (
    <Container>
      <div>
        <Title>Create New FITPRO Account</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>} {/* Success Message */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Full name"
          placeholder="Enter your full name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={handlePasswordChange}
        />
        {/* Password Strength Meter */}
        <StrengthMeterWrapper>
          <StrengthBar strength={passwordStrength} />
        </StrengthMeterWrapper>
        <Button
          text="Sign Up"
          onClick={handelSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
