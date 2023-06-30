import {
  Container,
  Heading,
  Card,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Button,
  Flex
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '~/services/clients'
import { useRouter } from 'next/router'

const DOC_TYPES = [
  'RUC',
  'Cédula',
  'Pasaporte',
  'Identificación exterior'
] as const

const schema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email('Email inválido'),
  documentType: z.enum(DOC_TYPES),
  documentValue: z.string().min(10)
})

type FieldValues = z.infer<typeof schema>

const NewClient: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    resolver: zodResolver(schema)
  })

  const handleOnSubmit = async () => {
    const data = getValues()
    await createClient(data)
    reset()
    router.push('/clients')
  }

  return (
    <Container marginTop={8}>
      <Card padding={4}>
        <Heading textAlign='center'>New Client</Heading>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <FormControl marginBottom={4} isInvalid={Boolean(errors.firstname)}>
            <FormLabel>Nombre</FormLabel>
            <Input
              type='text'
              placeholder="Nombre"
              {...register('firstname')}
            />
            <FormErrorMessage>{errors.firstname?.message}</FormErrorMessage>
          </FormControl>

          <FormControl marginBottom={4} isInvalid={Boolean(errors.lastname)}>
            <FormLabel>Apelliido</FormLabel>
            <Input
              type='text'
              placeholder="Apellido"
              {...register('lastname')}
            />
            <FormErrorMessage>{errors.lastname?.message}</FormErrorMessage>
          </FormControl>

          <FormControl marginBottom={4} isInvalid={Boolean(errors.email)}>
            <FormLabel>Email</FormLabel>
            <Input
              type='text'
              placeholder="example@gmail.com"
              {...register('email')}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <Flex gap={3}>
            <FormControl
              flex={7}
              marginBottom={4}
              isInvalid={Boolean(errors.documentType)}
            >
              <FormLabel>Tipo de Documento</FormLabel>
              <Select
                {...register('documentType')}
              >
                <option>Seleccionar...</option>
                {DOC_TYPES.map((docType) => (
                  <option key={docType}>{docType}</option>
                ))}
              </Select>
              <FormErrorMessage>{errors.documentType?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              flex={6}
              marginBottom={4}
              isInvalid={Boolean(errors.documentValue)}
            >
              <FormLabel>Número de Documento</FormLabel>
              <Input
                type='text'
                placeholder="123456789"
                {...register('documentValue')}
              />
              <FormErrorMessage>{errors.documentValue?.message}</FormErrorMessage>
            </FormControl>
          </Flex>
          <Button type='submit' colorScheme='purple'>Crear</Button>
        </form>
      </Card>
    </Container>
  )
}

export default NewClient
