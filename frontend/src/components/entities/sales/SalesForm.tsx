import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Spinner,
  Divider
} from '@chakra-ui/react'
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getClientById } from '~/services/clients'
import { useRouter } from 'next/router'
import axios from 'axios'
import { DevTool } from '@hookform/devtools'
import apiClient, { API_URL } from '~/services/apiClient'

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
  name: z.string().optional(),
  quantity: z.number(),
  unitPrice: z.number().optional(),
  discount: z.number().optional(),
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
export type PaymentMethods = z.infer<typeof salePaymentMethodSchema>
export type Product = z.infer<typeof saleProductSchema>

const defaultPM: PaymentMethods = {
  method: 'Sin utitlización Sist. Financiero',
  amount: 0,
  timeUnit: 'Meses',
  timeValue: 0
}

const defaultProduct: Product = {
  code: '',
  name: '',
  quantity: 0,
  total: 0
}

interface Props {
  saleId?: string
}

export function SaleForm ({ saleId }: Props) {
  const router = useRouter()
  const [startDate, setStartDate] = useState(new Date())

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    setValue,
    getValues
  } = useForm<Sale>({
    resolver: zodResolver(saleSchema),
    defaultValues: async () => {
      if (!saleId) {
        return {
          paymentMethods: [defaultPM],
          products: [defaultProduct]
        }
      }
      const { data } = await getClientById(saleId)
      return data.data
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'paymentMethods'
  })

  const {
    fields: products,
    append: addProduct,
    remove: removeProduct
  } = useFieldArray({
    control,
    name: 'products'
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
    <>
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
            onChange={(date: Date) => setValue('operationDate', date)}
            ref={register('operationDate').ref}

          />
          <FormErrorMessage>{errors.operationDate?.message}</FormErrorMessage>
        </FormControl>
        {/* products */}
        <Flex flexDir='column' mb={8}>
          <Flex justifyContent='space-between'>
            <Heading size='lg'>Productos</Heading>
            <Button
              size='xs'
              fontSize='1rem'
              lineHeight='1rem'
              py={4}
              colorScheme='blue'
              onClick={() => addProduct(defaultProduct)}
            >
              Agregar
            </Button>
          </Flex>
          <Divider mb='3' mt='2' />
          {products.map((_, index) => (
            <Flex key={index} gap={3} mb={5} alignItems='flex-end'>
              <IconButton
                disabled
                aria-label='Search database'
                icon={<SearchIcon />}
                onClick={async () => {
                  const code = getValues(`products.${index}.code`)
                  if (!code) return
                  const { data } = await apiClient.get(`/products/${code}`, { withCredentials: true })
                  const product: Product = data.data
                  if (product) {
                    setValue(`products.${index}`, {
                      code,
                      name: product.name,
                      quantity: 0,
                      total: 0
                    })
                  } else {
                    console.log('No existe un producto con ese código')
                  }
                }}
              />
              <FormControl flex={2}>
                {index === 0 && <FormLabel>Código</FormLabel>}
                <Input
                  type='text'
                  placeholder="AAAAA00"
                  {...register(`products.${index}.code`)}
                />
              </FormControl>

              <FormControl flex={5}>
                {index === 0 && <FormLabel>Denominación</FormLabel>}
                <Input
                  type='text'
                  placeholder="denominación"
                  disabled
                  {...register(`products.${index}.name`)}
                />
              </FormControl>

              <FormControl flex={2}>
                {index === 0 && <FormLabel>Cantidad</FormLabel>}
                <Flex alignItems='end' justifyContent='space-between'>
                  <Input
                    width={'65px'}
                    type='number'
                    {...register(`products.${index}.quantity`)}
                  />
                  {index > 0 && (
                    <DeleteIcon
                      mb={2}
                      color='red.500'
                      _hover={{ color: 'red.700', cursor: 'pointer' }}
                      onClick={() => removeProduct(index)}
                    >
                      X
                    </DeleteIcon>
                  )}
                </Flex>
              </FormControl>
            </Flex>
          ))}
        </Flex>

      {/* metodos de pago */}
        <Flex flexDir='column'>
          <Flex justifyContent='space-between' mb={2}>
            <Heading size='lg'>Forma de pago</Heading>
            <Button
              size='xs'
              fontSize='1rem'
              lineHeight='1rem'
              py={4}
              colorScheme='blue'
              onClick={() => append(defaultPM)}
            >
              Agregar
            </Button>
          </Flex>
          <Divider mb='3' mt='2' />
          {fields.map((field, index) => (
            <Flex key={index} gap={3} mb={5} alignItems='flex-end'>
              <FormControl
                flex={7}
                isInvalid={!!errors.paymentMethods}
              >
                {index === 0 && <FormLabel>Método</FormLabel>}
                <Select
                  {...register(`paymentMethods.${index}.method`)}
                >
                  <option>Seleccionar...</option>
                  {PAYMENT_METHOD_TYPES.map((method) => (
                    <option key={method}>{method}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.paymentMethods?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                flex={2}
                isInvalid={!!errors.paymentMethods}
                // isInvalid={Boolean(errors.paymentMethods[0]?.amount)}
              >
                {index === 0 && <FormLabel>Valor</FormLabel>}
                <Input
                  type='text'
                  placeholder="123456789"
                  {...register(`paymentMethods.${index}.amount`)}
                />
              </FormControl>

              <FormControl
                flex={2}
                isInvalid={!!errors.paymentMethods}
                // isInvalid={Boolean(errors.paymentMethods[0]?.amount)}
              >
                {index === 0 && <FormLabel>Plazo</FormLabel>}
                <Input
                  type='text'
                  placeholder="0"
                  {...register(`paymentMethods.${index}.timeValue`)}
                />
              </FormControl>

              <FormControl
                flex={4}
                isInvalid={!!errors.paymentMethods}
              >
                {index === 0 && <FormLabel>Período</FormLabel>}
                <Flex alignItems='center' justifyContent='space-between'>
                  <Select
                    width={'100px'}
                    {...register(`paymentMethods.${index}.timeUnit`)}
                  >
                    <option>Seleccionar...</option>
                    {Object.keys(TIMES_UNITS.Enum).map((unit) => (
                      <option key={unit}>{unit}</option>
                    ))}
                  </Select>
                  {index > 0 && (
                    <DeleteIcon
                      mb={2}
                      color='red.500'
                      _hover={{ color: 'red.700', cursor: 'pointer' }}
                      onClick={() => remove(index)}
                    >
                      X
                    </DeleteIcon>
                  )}
                </Flex>
                <FormErrorMessage>{errors.paymentMethods?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
          ))}
        </Flex>
        <ButtonGroup mt={4}>
          <Button type='submit' colorScheme='purple'>
            {saleId ? 'Guardar cambios' : 'Crear'}
          </Button>
          <Button onClick={() => router.back()}>Volver</Button>
        </ButtonGroup>
      </form>
      <DevTool control={control} />
    </>

  )
}
