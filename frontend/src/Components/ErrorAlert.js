
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react';
import Button from "./Button";
export default function ErrorAlert({handleCloseErrorModal}) {
    return (
        <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            >
            <AlertIcon boxSize='40px' mr={0} color="#950101"/>
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Ooops!
            </AlertTitle>
            <AlertDescription maxWidth='sm' style={{marginBottom: "1rem", marginTop: "1rem"}}>
                There was an error :
            </AlertDescription>
            <Button 
            name="Close" color="#ffffff"
            bgColor='#950101'
            border='none'
            backdropfilter='none'
            onClick={handleCloseErrorModal}
            />
        </Alert>
    );
}