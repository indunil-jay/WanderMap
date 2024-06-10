import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/Auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("test@example.com");
  const [password, setPassword] = useState<string>("1234");
  const { login, isAuthenicated } = useAuth();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  useEffect(() => {
    if (isAuthenicated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenicated, navigate]);

  return (
    <div className="h-screen w-screen bg-dark-1 p-4 lg:p-[2rem] ">
      <Navigation withLoginButton={false} />

      <div className="mx-auto h-[calc(100%-32px)] lg:h-[calc(100%-4rem)] flex items-center justify-center">
        <form
          className="bg-dark-3 w-[40rem] p-[2rem] rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 ">
            <Input
              id="email"
              type="email"
              placeholderText="test@example.com"
              value={email}
              handleChange={handleEmail}
            >
              Enter Your Email
            </Input>
            <Input
              id="password"
              type="password"
              placeholderText="● ● ● ●"
              value={password}
              handleChange={handlePassword}
            >
              Password
            </Input>
            <div className="flex justify-between items-center mt-10">
              <Button
                fill={false}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  navigate(-1);
                }}
              >
                &larr;Back
              </Button>
              <Button>Login</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
