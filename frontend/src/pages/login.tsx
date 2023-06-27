import { type NextPage } from 'next'
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input
} from '@chakra-ui/react'

const Login: NextPage = () => {
  return (
    <Container marginTop={10}>
      <Heading textAlign="center">Iniciar Sesión</Heading>
      <Card padding={3}>
        <form>
          <FormControl marginBottom={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type='text'
              placeholder="example@gmail.com"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Código</FormLabel>
            <Input
              type='text'
              placeholder="123456"
            />
          </FormControl>
          <ButtonGroup marginTop={8}>
            <Button colorScheme="blue">Iniciar Sesión</Button>
            <Button colorScheme="red">Quiero un código</Button>
          </ButtonGroup>
        </form>
      </Card>
    </Container>
  )
}

export default Login
