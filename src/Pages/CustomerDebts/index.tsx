
import { Box, Button, SimpleGrid, Stack, useDisclosure, useToast, Text, Progress} from '@chakra-ui/react';
import { ArrowBackIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDebtsApi } from '../../Hooks/UseDebts';
import { Debt } from '../../Types/Debt';
import { useEffect, useState } from 'react';
import { DrawerFormDebt } from '../../Components/DrawerFormDebt';
import { CardDebt } from '../../Components/CardDebt';
import "./style.css";

export const CustomerDebtsPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(true);
    const [debts, setDebts] = useState<Debt[]| null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const api = useDebtsApi(
        {
            baseURL: "http://localhost:5041",
            timeout: 5000,
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('authToken')}
        }
    );

    const { id } = params;   

    useEffect(()=>{
        const exec = async () => loadDebts();
        exec();
    }, []) ;

    const loadDebts = async () => {
        setIsLoading(true);
        const data = await api.getByCustomerId(parseInt(id!));
        if (data) {
            setDebts(data);
        }
        setIsLoading(false);
    }

    const backPage = () => navigate("/");

    const setDebtAsPaid = async (id: number) => {
        const data = await api.markAsPaid(id);
        if (!data) {
            toast({
                title: 'A atualização do débito falhou!',
                description: "Ocorreu um problema ao tentar atualizar, tente novamente mais tarde!",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
           return;
        }

        loadDebts();
        toast({
            title: 'O débito foi quitado!',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    }

    const createNewDebt = async (v: number) => {
        onClose();
        const status = await api.create({"customerId": parseInt(id!) , "value": v * 100});
        if (status) {
            toast({
                title: 'A criação do débito falhou!',
                description: "Ocorreu um problema ao tentar cria-lo, tente novamente mais tarde!",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
           return;
        }

        loadDebts();
        toast({
            title: 'O débito foi craido com sucesso!',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    }


    const openNewDebt = () => {

        if(debts == null || debts?.filter(c => c.paidAt == null).length == 0){
            onOpen();
            return;
        }

        toast({
            title: 'O cliente já possuí uma dívida em aberto, não é possível criar outra!',
            status: 'error',
            duration: 2000,
            isClosable: true,
        });
    }

    return (
        <div className="page-content">
            <div className="debts-data">
                <Stack direction="row" >
                    <Button mt={2} aria-label='Done' fontSize='20px' color="black" colorScheme="white" onClick={backPage}>
                        <ArrowBackIcon mr="2"/>  
                    </Button>
                
                    <Box bg='' w='90%'  pl="5%" pt={5} color='black'>
                        <Text color="black" fontSize="2em">Página de débitos</Text>
                        <Button mt={2} leftIcon={<PlusSquareIcon />} colorScheme='teal' variant='solid' onClick={openNewDebt}>Novo débito</Button>
                        <Box mt={5}bg='' w='100%' p={4} color='white'>
                            {
                                isLoading 
                                ? <Progress size='xs' isIndeterminate colorScheme="teal"/>
                                : <SimpleGrid spacing={4} columns={5} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                                    {   debts 
                                        ?  debts!.map( (c) => 
                                            <CardDebt 
                                                key={c.id} 
                                                value={c.value} 
                                                createDate={c.createdAt} 
                                                paidDate={c.paidAt} 
                                                onClickMarkAsPaid={ () => setDebtAsPaid(c.id!)}
                                            /> 
                                        )
                                        : <Box><Text mt={5} color="black" alignContent="center"><h3>Não há débitos cadastrados</h3></Text></Box> 
                                    }
                                </SimpleGrid>  
                            } 
                        </Box>
                    </Box>
                    <DrawerFormDebt isOpen={isOpen} onClose={onClose}  callbackValue={ createNewDebt }/>
                </Stack>
            </div>
        </div>
    );
}