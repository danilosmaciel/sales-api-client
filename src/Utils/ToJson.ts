import moment from "moment";
import { Customer } from "../Types/Customer";
import { NewDebt } from "../Types/NewDebt";


export const customerToJson = (c: Customer) =>{
    return {
        "fullname":`${c.fullName}`,
        "cpf": `${c.cpf}`,
        "dateBirth": `${moment(c.dateBirth).format('YYYY-MM-DD')}`,
        "email": c.email ? `${c.email}`: null 
    };
}


export const debtToJson = (debt: NewDebt) =>{
    return {"customerId":debt.customerId,"value":debt.value};
}
