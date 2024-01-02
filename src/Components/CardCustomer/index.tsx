import { CalendarIcon, DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FormatToMonetary } from "../../Utils/StringUtils";


interface CardCustomerProps{
    name: string
    debts: number
    onClickEdit(event: React.MouseEvent): void,
    onClickShowDebts(event: React.MouseEvent): void,
    onClickDelete(event: React.MouseEvent): void,
}

export const  CardCustomer = ({name, debts, onClickEdit, onClickDelete, onClickShowDebts}: CardCustomerProps) =>{
    return (
        <Card>
          <CardHeader>
            <Heading size='md'> {name}</Heading>
          </CardHeader>
          <CardBody>
            <Text>Valor dívida em aberto:</Text>
            <Text>{FormatToMonetary(debts/100)}</Text>
          </CardBody>
          <CardFooter alignItems="right">
            <Menu>
            <MenuButton as={Button} colorScheme='red'><HamburgerIcon mr="2"/> Opções</MenuButton>
                    <MenuList>
                        <MenuGroup title='Opções'>
                          <MenuItem onClick={onClickShowDebts}><CalendarIcon mr="2"/> Ver débitos</MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title='Ações'>
                            <MenuItem onClick={onClickEdit} ><EditIcon mr="2"/>  Editar cadastro</MenuItem>
                            <MenuItem onClick={onClickDelete}><DeleteIcon mr="2"/>  Deletar </MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu> 
          </CardFooter>
        </Card>
    );
}

/*
 <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue' onClick={onClick}> Editar </Button>
                <Button variant='solid' colorScheme='red'> Débitos</Button>
            </ButtonGroup>
*/