

export const  GetAge = (dateBirth: string) => {
    try{
        
        let today = Date.now();
        let date = Date.parse(dateBirth);
        const diff = Math.abs(today - date);
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    }catch(er){
        return 0;
    }
}

export const FormatToMonetary = (value: number) =>{
    return `R\$ ${(value).toFixed(2).toString().replace(".", ",")}`;
}
