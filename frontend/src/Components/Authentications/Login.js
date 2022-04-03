import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = (props) => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [show, setshow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const { setuser, setLoggedIn } = ChatState();

  const handleClick = () => setshow(!show);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setLoggedIn(true);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>E-Mail</FormLabel>
        <Input
          placeholder="Enter Your E-mail"
          value={email}
          onChange={(event) => setemail(event.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="Enter Your Password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(event) => setpassword(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={Loading}
        color="black"
      >
        Login
      </Button>
      <Button
        variant="solid"
        width="100%"
        colorScheme="red"
        onClick={() => {
          setemail("guest@example.com");
          setpassword("123456");
        }}
        color="black"
      >
        Get Guest Users Credentials
      </Button>
    </VStack>
  );
};

export default Login;
