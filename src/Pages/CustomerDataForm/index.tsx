import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { useCustomerApi } from "../../Hooks/UseCustomer";
import { Customer } from "../../Types/Customer";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { CpfIsValid } from "../../Utils/CpfValidator";

export const CustomerDataForm = () => {
    const navigate = useNavigate();
    const api = useCustomerApi({
        baseURL: "http://localhost:5041",
        timeout: 5000,
        headers: {'Authorization': 'Bearer '+ localStorage.getItem('authToken')}
    }
    );
    const params = useParams();
    const toast = useToast();

    const { id } = params;


    const {
        handleSubmit,
        register,
        setValue,
        formState: { isSubmitting },
    } = useForm({ mode: 'onBlur' });

    
    useEffect(()=>{
        if(id){
            const exec = async () => loadCustomerInfo();
            exec();
        }
    }, []) ;

    const loadCustomerInfo = async () => {
        const data = await api.getById(parseInt(id!));
        if (data) {
            data as Customer
            setValue("fullName", data.fullName);
            setValue("email", data.email);
            setValue("bornDate", data.bornDate);
            setValue("cpf", data.cpf);
        }
    }

    const onSubmit =  async (values:any) => {
        values as Customer

        console.log("veio onsubimit")
        if(!CpfIsValid(values.cpf)){
            toast({
                title: `Problema com o Cpf`,
                description: `O cpf ${values.cpf} é inválido, verifique e tente novamentet`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
           return;
        }

        const apiResponse = await (id != null ? api.update(parseInt(id!), values) : api.create(values));
        proccessApiResponse(apiResponse);
    }
    
    const proccessApiResponse = (apiResponse: boolean) => {
    
        if (!apiResponse) {
            toast({
                title: `A ${id ? "atualização" : "criação"} do cliente falhou!`,
                description: `Ocorreu um problema ao tentar ${id ? "atualizar" : "criar"} o cliente, tente novamente mais tarde!`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
           return;
        }
    
        toast({
            title: `O cliente foi ${id ? "atualizado" : "criado"}!`,
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    
        onClose();
    }

    const onClose = () => {
        navigate("/");
    }

    return (
        <div className="page-content">
            <div className="customers-form-data">
                <Stack direction="row">
                <Button mt={2} aria-label='Done' fontSize='20px' color="black" colorScheme="white" onClick={onClose}>
                    <ArrowBackIcon mr="2"/>
                </Button>
                <Box bg='' w='90%'  pl="5%" pt={5} color='black'>
                    <Text color="black" fontSize="2em">{id ? "Edição" : "Cadastro "}de Cliente</Text>
                    <Stack spacing='24px' pt={10}>
                    <Box>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='fullname'>Nome completo (requerido)</FormLabel>
                                    <Input
                                        //  ref={firstField}
                                        id='fullname'
                                        placeholder='Nome'
                                        required={true}
                                        {...register('fullName', {
                                            required:  'O campo nome é requerido',
                                            minLength: { value: 4, message: 'O tamanho precisa ser maior que 4' },
                                        })}
                                    />
                                
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='document'>Cpf (requerido e somente números)</FormLabel>
                                    <Input
                                        //  ref={firstField}
                                        id='document'
                                        placeholder='Cpf'
                                        type="number"
                                    
                                        required={true}
                                        {...register('cpf', {
                                            required: 'O campo Cpf é requirido',
                                            minLength: { value: 11, message: 'O tamanho precisa ser 11' },
                                            pattern: RegExp("[0-9]{11}")
                                            
                                        })}
                                    />
                                    <FormErrorMessage>O cpf precisa ter 11 números e </FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='bornDate'>Data de Nascimento (requerido)</FormLabel>
                                    <Input
                                    //  ref={firstField}
                                        id='bornDate'
                                        placeholder='Data'
                                        type="date"
                                        required={true}
                                        {...register('bornDate', {
                                            required: 'O campo data de nascimento é requirido',
                                            minLength: { value: 4, message: 'O tamanho precisa ser maior que 4' },
                                            valueAsDate: true
                                        })}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl>
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <Input
                                    //  ref={firstField}
                                        id='email'

                                        placeholder='email'
                                        {...register('email', {
                                            minLength: { value: 4, message: 'O tamanho precisa ser maior que 4'},
                                        })}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                          
                            </Box>
                            <Stack direction="row" mt={5}>
                                <Button variant='outline' mr={3} onClick={onClose}> Cancelar </Button>
                                <Button colorScheme='teal' isLoading={isSubmitting} type='submit' onClick={() => handleSubmit(onSubmit)()} >Entrar</Button>
                            </Stack>
                    </Stack>
                </Box>
                </Stack>
            </div>           
        </div>
    );
}


