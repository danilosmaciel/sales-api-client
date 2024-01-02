import { Search2Icon, SearchIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"


interface SearchBarProps {
    filter: string | null,
    onChangeValue(v: string): void
    onClick(): void
}

export const SearchBar = ({filter, onChangeValue, onClick}: SearchBarProps) => {
    return <InputGroup size='md' mt={2} >
                <InputLeftElement  pointerEvents="none"  children={<Search2Icon color="gray.600" />} />
                    <Input
                        pr='4.0rem'
                        type={'text'}
                        placeholder='Pequisa'
                        htmlSize={1}
                        colorScheme="white"
                        color="black"
                        backgroundColor="white"
                        value={filter ?? ""}
                        onChange={(v) => onChangeValue(v.target.value)}
                    />
                <InputRightElement width='4.0rem' p={0} border="none" mr={1}> 
                    <Button variant="ghost" size="sm" p={3} borderLeftRadius={4} borderRightRadius={4} border="1px solid #949494" onClick={ onClick }>
                        Procurar
                    </Button>
                </InputRightElement>
            </InputGroup>
}