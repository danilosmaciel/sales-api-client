
import { Button } from "@chakra-ui/react"
import "./style.css"

interface bannerProps {
    title: string,
    isLogged: boolean,
    onClickLogout(event: React.MouseEvent): void,
}  


export const Banner = ({title, onClickLogout, isLogged} : bannerProps)=> {
    return (
        <div className="banner">
            <span className="banner-title">{title}</span>
            <section className="banner-login-info">
            {
             isLogged 
                ? <Button onClick={onClickLogout}>Sair</Button> 
                : ""
            } 
            </section>
        </div>
    )
}
