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
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { env } from '~/env.mjs'

const Login: NextPage = () => {
  const { register, getValues } = useForm()

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
              {...register('email')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Código</FormLabel>
            <Input
              type='text'
              placeholder="123456"
              {...register('code')}
            />
          </FormControl>
          <ButtonGroup marginTop={8}>
            <Button colorScheme="blue">Iniciar Sesión</Button>
            <Button
              onClick={() => {
                const email: string = getValues('email')
                axios.post(`${String(env.NEXT_PUBLIC_BACKEND_BASE_URL)}/auth/login/${email}/code`)
              }}
              colorScheme='red'
            >
              Quiero un código
            </Button>
          </ButtonGroup>
        </form>
      </Card>
    </Container>
  )
}

export default Login
