
import { useEffect, useState } from "react";
import { useCustomerApi } from "../../Hooks/UseCustomer";
import "./style.css";
import { Box, Button, Stack, useDisclosure, Text, useToast, Progress,} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { ResponseCustomer } from "../../Types/ResponseCustomer";
import { SearchBar } from "../../Components/SearchBar";
import { TableCustomer } from "../../Components/TableCustomer";
import { AlertQuestion } from "../../Components/AlertQuestion";

export const CustomersPage = () => {

    const navigate = useNavigate();
    const [filter, setFilter] = useState<string| null>(null);
    const [responseCustomer, setResponseCustomer] = useState<ResponseCustomer| null>(null);
    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure()
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize: number = 10;
    let current = 1;
    const [idForDelete, setidForDelete] = useState<number | null>(null);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const api = useCustomerApi({
        baseURL: "http://localhost:5041",
        timeout: 5000,
        headers: {'Authorization': 'Bearer '+ localStorage.getItem('authToken')}
    });

    useEffect(()=>{
        const exec = async () => loadCustomers();
        exec();
    }, []) ;

    const loadCustomers = async () =>{
        setIsLoading(true);
        const data = await api.get(current, pageSize, filter);
        if (data) {
            setResponseCustomer(data);
        }
        setIsLoading(false);
    }

    const onDelete = (id: number) => {
        setidForDelete(id);
        onOpenAlert();
    }

    const onConfirmDelete = async () => {
        onCloseAlert();

        if(idForDelete != null){
            const data = await api.delete(idForDelete);
            if (data) {
                loadCustomers();
                toast({
                    title: 'Registro excluído',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }
            setidForDelete(null);
        }
    }

    const onCancelDelete = () => {
        setidForDelete(null);
        onCloseAlert();
    }


    const onEdit = (id: number) => {
        navigate(`/custormer-data-form/${id}`);
    }

    const onCreate = () => {
        navigate(`/custormer-data-form/`);
    }

    const showDebts = (id: number) => {
        navigate(`/debts/${id}`)
    }

    const decrementPage = () => {
        if(currentPage > 1){
            setCurrentPage(page => {
                current = page - 1;
                loadCustomers();
                return current;
            });
            
        }
        
    }

    const incremntePage = () => {
        if(currentPage < Math.ceil((responseCustomer?.totalCount ?? 0) / pageSize)){
            setCurrentPage(page => {
                current = page + 1;
                loadCustomers();
                return current;
            });
        }
    }

    return (
        <div className="page-content">
            <div className="customers-list">
            <Box bg='' w='100%' p={4} color='white'>
                <Text color="black" fontSize="2em">Clientes</Text>
                <Box w='100%' mb={5}>
                    <SearchBar filter={ filter } onChangeValue={ setFilter } onClick={ loadCustomers }/>
                </Box>
                <Stack  direction="row" align="center" mt={5} mb={5}>
                    <Button leftIcon={<PlusSquareIcon />} colorScheme='teal' variant='solid' onClick={onCreate}>Cliente</Button>
                    <Stack direction="row" align="center" >
                        <Button onClick={ decrementPage }>Anterior</Button>
                        <Text color="black">  {`${ currentPage }/${Math.ceil((responseCustomer?.totalCount ?? 0) / pageSize)}`}</Text>
                    <Button onClick={ incremntePage }>Próximo</Button>
                 </Stack>
                </Stack>
               
               {
                    isLoading
                    ? <Progress size='xs' isIndeterminate colorScheme="teal"/>
                    : <TableCustomer
                        list={responseCustomer}
                        onClickDelete={onDelete}
                        onClickEdit={onEdit}
                        onClickShowDebts={(v) => showDebts(v)}
                      />
               }
                
            </Box>
            </div>
            <AlertQuestion 
                title="Atenção!" 
                message="Confirma a exclusão do cliente?" 
                textButtonCancel="Cancelar"
                textButtonConfirm="Confirmar"
                isOpen={isOpenAlert}
                onClose={onCloseAlert}
                onCancelDelete={onCancelDelete}
                onConfirmDelete={onConfirmDelete}
            />
        </div>
    )
}