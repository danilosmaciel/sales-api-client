import { Customer } from "./Customer"


export type ResponseCustomer = {
    totalCount: number,
    totalAmountDebts: number
    registers: Customer[]
}

