import {  useContext } from "react";
import { AuthContext } from "../../Contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Center, FormControl, FormLabel, Input, Stack, Text, useToast } from "@chakra-ui/react";

import "./style.css";
import { useForm } from "react-hook-form";
import { Login } from "../../Types/Login";



export const LoginPage = () => {
    const toast = useToast()
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (values:any) => {
        values as Login
       
        if (values.login && values.password) {
            const isLogged = await auth.signin(values.login, values.password);
             if (!isLogged) {
                toast({
                    title: 'A autenticação falhou!',
                    description: "Erro ao tentar entrar no sistema, verifique os dados de entrada e tente novamente!",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
                return;
            } 
            navigate('/');
        }
    }

    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm({ mode: 'onBlur' });

    return (
        <section className="section-form-login">
            <Box mt={10}>
            <form onSubmit={(e) => onSubmit(e)}>
                <Stack direction={"column"}>
                    <Text fontSize={20}>Entre com suas credenciais</Text>
                    <Box>
                        <FormControl isRequired>
                        <FormLabel htmlFor='login'>Usuario</FormLabel>
                        <Input
                            id='login'
                            placeholder='login'
                            required={true}
                            {...register('login', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />          
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl isRequired>
                        <FormLabel htmlFor='password'>Senha</FormLabel>
                        <Input
                            id='password'
                            placeholder='Senha'
                            type="password"
                            required={true}
                            {...register('password', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />          
                        </FormControl>
                    </Box>
                    <Button mt={5} colorScheme='teal' isLoading={isSubmitting} type='submit' onClick={() => handleSubmit(onSubmit)()} >Salvar</Button>
                </Stack>
            </form>
            </Box>
        </section>
    )
}
