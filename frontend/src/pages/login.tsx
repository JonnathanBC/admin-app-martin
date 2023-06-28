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
import { useRouter } from 'next/router'
import { generateCode, login } from 'services/login'

const Login: NextPage = () => {
  const { register, getValues } = useForm()
  const router = useRouter()

  const handleLogin = (email: string, code: string) => {
    login(email, code)
      .then(() => router.push('/'))
      .catch((err) => console.error(err))
  }

  const handleGenerateCode = (email: string) => {
    generateCode(email)
  }

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
            <Button
              colorScheme="blue"
              onClick={() => {
                const { email, code } = getValues()
                handleLogin(email, code)
              }}
              >
                Iniciar Sesión
              </Button>
            <Button
              onClick={() => {
                const email: string = getValues('email')
                handleGenerateCode(email)
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
