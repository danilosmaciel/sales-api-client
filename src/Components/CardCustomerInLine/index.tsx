import { CalendarIcon, DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FormatToMonetary, GetAge } from "../../Utils/StringUtils";


interface CardCustomerProps{
    codigo: number
    name: string
    dateBirth: string,
    debts: number
    onClickEdit(event: React.MouseEvent): void,
    onClickShowDebts(event: React.MouseEvent): void,
    onClickDelete(event: React.MouseEvent): void,
}

export const  CardCustomerInLine = ({codigo, name, dateBirth, debts, onClickEdit, onClickDelete, onClickShowDebts}: CardCustomerProps) =>{
    return (
        <Box maxW='100%' borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor="white" p={5} alignContent="space-between" flexDirection="row">
                <Text color="black" fontSize="1.2em"> Código: #{codigo}</Text>
                <Text color="black" fontSize="1.2em"> {name}</Text>
                <Text color="black" fontSize="1.2em"> Idade: {GetAge(dateBirth)}</Text>
                <Text color="black">Débito: {FormatToMonetary(debts/100)}</Text>
                <Menu>
                <MenuButton as={Button} colorScheme='red'><HamburgerIcon mr="2"/> Opções</MenuButton>
                        <MenuList>
                            <MenuGroup title='Opções' color="black">
                            <MenuItem onClick={onClickShowDebts} color="black"><CalendarIcon mr="2"/> Ver débitos</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Ações' color="black">
                                <MenuItem onClick={onClickEdit} color="black" ><EditIcon mr="2"/>  Editar cadastro</MenuItem>
                                <MenuItem onClick={onClickDelete} color="black"><DeleteIcon mr="2"/>  Deletar </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu> 
        </Box>

    );
}