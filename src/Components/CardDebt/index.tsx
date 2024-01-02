import { CheckCircleIcon} from "@chakra-ui/icons";
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import { FormatToMonetary } from "../../Utils/StringUtils";
import moment from "moment";


interface CardDebtProps{
    value: number
    createDate: string
    paidDate: string | null | undefined
    onClickMarkAsPaid(event: React.MouseEvent): void,
}

export const  CardDebt = ({value, createDate, paidDate, onClickMarkAsPaid}: CardDebtProps) =>{
    return (
        <Card padding="10px">
          <CardHeader>
            <Heading size='md'> {FormatToMonetary(value/100)}</Heading>
          </CardHeader>
          <CardBody>
            <Text>Data da criação:</Text>
            <Text>{moment(createDate).format("DD/MM/YY")}</Text>
          </CardBody>
          <CardFooter alignItems="right">
            {
              paidDate 
                ? <Text>Pago em: {moment(paidDate).format("DD/MM/YY HH:mm")}</Text>
                : <Button  onClick={onClickMarkAsPaid} colorScheme="green"> <CheckCircleIcon mr={2} />  Marcar como pago! </Button>
            }
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