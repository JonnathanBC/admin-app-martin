import { type NextPage } from 'next'
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { generateCode, login } from 'services/login'

const schema = z.object({
  email: z.string().email('Email inválido'),
  code: z.string().length(6, 'El código debe de tener 6 caracteres')
})

type FieldValues = z.infer<typeof schema>

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'jonnabcl56@gmail.com'
    }
  })

  const router = useRouter()

  const handleOnSubmit = () => {
    const { email, code } = getValues()

    login(email, code)
      .then(() => router.push('/'))
      .catch((err) => console.error(err))
  }

  const handleGenerateCode = (email: string) => {
    generateCode(email)
  }

  return (
    <Container mt={10}>
      <Heading textAlign="center">Iniciar Sesión</Heading>
      <Card p={3}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <FormControl marginBottom={4} isInvalid={Boolean(errors.email)}>
            <FormLabel>Email address</FormLabel>
            <Input
              type='text'
              placeholder="example@gmail.com"
              {...register('email')}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.code)}>
            <FormLabel>Código</FormLabel>
            <Input
              type='number'
              placeholder="123456"
              {...register('code')}
            />
            <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
          </FormControl>
          <ButtonGroup mt={8}>
            <Button
              colorScheme="blue"
              type='submit'
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
