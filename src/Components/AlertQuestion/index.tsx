import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"


interface AlertQuestionProps {
    title: string,
    message: string,
    textButtonCancel: string,
    textButtonConfirm: string,
    isOpen: boolean , 
    onClose() : void,
    onCancelDelete(): void,
    onConfirmDelete(): void
}

export const AlertQuestion= ({isOpen, onClose, title, message, textButtonCancel, textButtonConfirm, onCancelDelete, onConfirmDelete}: AlertQuestionProps) => {
    const cancelRef = useRef<HTMLButtonElement>(null);
    return (
        <div>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {title}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {message}
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button  onClick={onCancelDelete}>
                  {textButtonCancel}
                </Button>
                <Button colorScheme='red' onClick={onConfirmDelete} ml={3}>
                  {textButtonConfirm}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    )
  }