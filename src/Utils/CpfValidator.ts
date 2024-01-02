
export const CpfIsValid = (cpf: string) : boolean  => {

    let cpfAux = cpf.replace(/[^\d]+/g, '');

    if (cpfAux.length !== 11 || !!cpfAux.match(/(\d)\1{10}/)) 
        return false;

    let cpfNumbers = cpf.split('').map(el => +el);

    return checkRest(cpfNumbers, 10) === cpfNumbers[9] && checkRest(cpfNumbers, 11) === cpfNumbers[10];
}

const checkRest = (cpf: number[], count : number) => {

   return (cpf
        .slice(0, count-12)
        .reduce( (soma, el, index) => (soma + el * (count-index)), 0 )*10) % 11 % 10;
}