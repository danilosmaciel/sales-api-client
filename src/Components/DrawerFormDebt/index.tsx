import {Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Stack } from "@chakra-ui/react"
import { useState } from "react"

interface DrawerFormCustomerProps{
  isOpen: boolean , 
  onClose(): void , 
  callbackValue(v: number): void
}



export const DrawerFormDebt = ({ isOpen, onClose, callbackValue }: DrawerFormCustomerProps) => {

   const [newValue, setNewValue] = useState<number>(0);
   const [isError, setError] = useState<boolean | null>(null);
   
    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              Cadastro de débito
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing='24px'>
                <Box>
                <FormControl isRequired isInvalid={isError ?? false}>
                  <FormLabel htmlFor='value'>Valor</FormLabel>
                  <InputGroup>
                    <InputLeftAddon> R$</InputLeftAddon>
                    <Input id='value' 
                      type='number' 
                      placeholder='0,00' 
                      value={newValue} 
                      onChange={(v) => {
                        console.log(v.target.value)
                        setError(false);
                        setNewValue(parseInt(v.target.value) ?? null)
                      }}
                    />
                  </InputGroup>
                  {isError ?  <FormErrorMessage>O valor é necessário</FormErrorMessage> : ""}
                </FormControl>
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={onClose}> Cancelar </Button>
              <Button colorScheme='blue' onClick={() => {
                if(!newValue){
                  setError(true);
                }
                let v = newValue;
                setNewValue(0);
                callbackValue(v);
              }}>Salvar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }