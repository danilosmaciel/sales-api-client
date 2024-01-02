import {Table, Tbody, Td, Tfoot, Th, Thead, Tr, TableContainer, Button } from "@chakra-ui/react"
import { ResponseCustomer } from "../../Types/ResponseCustomer"
import { CalendarIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Customer } from "../../Types/Customer"
import { FormatToMonetary, GetAge } from "../../Utils/StringUtils"
import moment from "moment"


interface TableCustomerProps{
    list: ResponseCustomer | null,
    onClickEdit(id: number): void,
    onClickDelete(id: number): void,
    onClickShowDebts(id: number): void
}

export const TableCustomer = ({list, onClickEdit, onClickDelete, onClickShowDebts}:TableCustomerProps) => {

    const getTr = (c: Customer) => {
        return <Tr key={c.id}>
        <Td color="black">{c.id}</Td>
        <Td color="black">{c.fullName}</Td>
        <Td color="black">{moment(c.dateBirth).format("DD/MM/YY")}</Td>
        <Td color="black">{GetAge(c.dateBirth)}</Td>
        <Td color="black">{FormatToMonetary((c.totalAmountDebts ?? 0) /100)}</Td>
        <Td><Button color="teal" onClick={() => onClickShowDebts(c.id ?? 0)}><CalendarIcon mr="2" /> Débitos</Button> </Td>
        <Td><Button color="blue" onClick={() => onClickEdit(c.id ?? 0)}><EditIcon mr="2"/> Editar</Button> </Td>
        <Td><Button color="red" onClick={() => onClickDelete(c.id ?? 0)}><DeleteIcon mr="2"/>Deletar</Button> </Td>
    </Tr>
    }


    return <div>
        <TableContainer maxWidth="100%">
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Código</Th>
          <Th>Nome</Th>
          <Th>Data de Nasc.</Th>
          <Th>Idade</Th>
          <Th>Débito</Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
       { list
         ? list.registers.map( (c) => getTr(c))
         : <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
         </Tr>
       }
      </Tbody>
      <Tfoot>
        <Tr>
          <Th >Total de Débitos: {FormatToMonetary((list?.totalAmountDebts ?? 0) / 100)}</Th>
        </Tr>
      </Tfoot>
    </Table>
  </TableContainer>
    </div>

}