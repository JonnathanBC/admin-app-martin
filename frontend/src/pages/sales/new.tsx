import {
  Container,
  Heading,
  Card
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { SaleForm } from '~/components/entities/sales/SalesForm'

const NewSale: NextPage = () => {
  return (
    <Container mt={8}>
      <Card p={4}>
        <Heading mb={4} textAlign='center'>
          Nuevo cliente
        </Heading>
        <SaleForm />
      </Card>
    </Container>
  )
}

export default NewSale
