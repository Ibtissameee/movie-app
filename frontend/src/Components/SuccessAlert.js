
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react';
import Button from "./Button";
export default function SuccessAlert({handleCloseModal, type}) {
    return (
        <Alert
            status={type==='success' ? 'success': 'error'}
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            >
            <AlertIcon boxSize='40px' mr={0} style={{color: type === 'success' ? 'green' : '#950101'}}/>
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                {type==='success' ? "Success!" : "Error"}
            </AlertTitle>
            <AlertDescription maxWidth='sm' style={{marginBottom: "1rem", marginTop: "1rem"}}>
                {type==='success' ? "Congratulations , your account has been successfully created.": "There was an error :"}
            </AlertDescription>
            <Button 
            name={type==='success'? "Continue" : "Close"} color="#ffffff"
            bgColor={type==='success' ? 'none' : '#950101'}
            border={type==='success' ? '1px solid #ffffff' : 'none'} 
            backdropfilter={type==='success' ? 'blur(20px);' : 'none'}
            onClick={handleCloseModal}
            />
        </Alert>
    );
}