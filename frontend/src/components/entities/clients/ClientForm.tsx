import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spinner
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getClientById } from '~/services/clients'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '~/services/apiClient'

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

export type Client = z.infer<typeof schema>

interface Props {
  clientId?: string
}

export function ClientForm ({ clientId }: Props) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset
  } = useForm<Client>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      if (!clientId) return
      const { data } = await getClientById(clientId)
      return data.data
    }
  })

  const onSubmit = async (data: Client) => {
    const PARAMS = clientId ? `/${clientId}` : ''
    await axios(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${API_URL}/clients${PARAMS}`,
      {
        method: clientId ? 'PUT' : 'POST',
        data,
        withCredentials: true
      }
    )
    reset()
    router.push('/clients')
  }

  if (isLoading) {
    return (
      <Box textAlign='center' mt={5}>
        <Spinner size='lg' />
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <ButtonGroup mt={4}>
        <Button type='submit' colorScheme='purple'>
          {clientId ? 'Guardar cambios' : 'Crear'}
        </Button>
        <Button onClick={() => router.back()}>Volver</Button>
      </ButtonGroup>
    </form>
  )
}
