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
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getClientById } from '~/services/clients'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '~/services/apiClient'
import 'react-datepicker/dist/react-datepicker.css'

const PAYMENT_METHOD_TYPES = [
  'Sin utitlización Sist. Financiero',
  'Compensación de deudas',
  'Tarjeta de débito',
  'Tarjeta de crédito',
  'Dinero electrónico',
  'Otros con utitlización del sistema financiero',
  'Endoso de títulos'
] as const

const TIMES_UNITS = z.enum(['Días', 'Meses', 'Años'])

// interface de TS pero con zod, para que no de error en el tipado no compatible.
const saleProductSchema = z.object({
  code: z.string(),
  name: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  discount: z.number(),
  total: z.number() // quantity * unitPrice
})

const salePaymentMethodSchema = z.object({
  method: z.enum(PAYMENT_METHOD_TYPES),
  amount: z.number(),
  timeUnit: TIMES_UNITS,
  timeValue: z.number()
})

const saleSchema = z.object({
  operationDate: z.date(),
  products: z.array(saleProductSchema),
  totalAmount: z.number().nonnegative(),
  client: z.string(),
  clientDocument: z.string(),
  paymentMethods: z.array(salePaymentMethodSchema)
})

export type Sale = z.infer<typeof saleSchema>

interface Props {
  saleId?: string
}

export function SaleForm ({ saleId }: Props) {
  const router = useRouter()
  const [startDate, setStartDate] = useState(new Date())
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset
  } = useForm<Sale>({
    resolver: zodResolver(saleSchema),
    defaultValues: async () => {
      if (!saleId) return
      const { data } = await getClientById(saleId)
      return data.data
    }
  })

  const onSubmit = async (data: Sale) => {
    const PARAMS = saleId ? `/${saleId}` : ''
    await axios(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${API_URL}/sales${PARAMS}`,
      {
        method: saleId ? 'PUT' : 'POST',
        data,
        withCredentials: true
      }
    )
    reset()
    router.push('/')
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
      <FormControl marginBottom={4} isInvalid={!!errors.clientDocument}>
        <FormLabel>Documento del cliente</FormLabel>
        <Input
          type='text'
          placeholder="Nombre"
          {...register('clientDocument')}
        />
        <FormErrorMessage>{errors.clientDocument?.message}</FormErrorMessage>
      </FormControl>

      <FormControl marginBottom={4} isInvalid={!!errors.operationDate}>
        <FormLabel>Fecha operación</FormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
        />
        <FormErrorMessage>{errors.operationDate?.message}</FormErrorMessage>
      </FormControl>

      <Flex gap={3}>
        <FormControl
          flex={7}
          marginBottom={4}
          isInvalid={!!errors.paymentMethods}
        >
          <FormLabel>Método de pago</FormLabel>
          <Select
            {...register('paymentMethods.0.method')}
          >
            <option>Seleccionar...</option>
            {PAYMENT_METHOD_TYPES.map((method) => (
              <option key={method}>{method}</option>
            ))}
          </Select>
          <FormErrorMessage>{errors.paymentMethods?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          flex={6}
          marginBottom={4}
          isInvalid={!!errors.paymentMethods}
          // isInvalid={Boolean(errors.paymentMethods[0]?.amount)}
        >
          <FormLabel>Valor</FormLabel>
          <Input
            type='text'
            placeholder="123456789"
            {...register('paymentMethods.0.amount')}
          />
        </FormControl>

        <FormControl
          flex={6}
          marginBottom={4}
          isInvalid={!!errors.paymentMethods}
          // isInvalid={Boolean(errors.paymentMethods[0]?.amount)}
        >
          <FormLabel>Plazo</FormLabel>
          <Input
            type='text'
            placeholder="123456789"
            {...register('paymentMethods.0.timeValue')}
          />
        </FormControl>

        <FormControl
          flex={7}
          marginBottom={4}
          isInvalid={!!errors.paymentMethods}
        >
          <FormLabel>Método de pago</FormLabel>
          <Select
            {...register('paymentMethods.0.method')}
          >
            <option>Seleccionar...</option>
            {Object.keys(TIMES_UNITS.Enum).map((unit) => (
              <option key={unit}>{unit}</option>
            ))}
          </Select>
          <FormErrorMessage>{errors.paymentMethods?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
      <ButtonGroup mt={4}>
        <Button type='submit' colorScheme='purple'>
          {saleId ? 'Guardar cambios' : 'Crear'}
        </Button>
        <Button onClick={() => router.back()}>Volver</Button>
      </ButtonGroup>
    </form>
  )
}
