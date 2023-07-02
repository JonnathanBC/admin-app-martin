import {
  Container,
  Heading,
  Card
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { ClientForm } from '~/components/entities/clients/ClientForm'

const NewClient: NextPage = () => {
  return (
    <Container mt={8}>
      <Card p={4}>
        <Heading textAlign='center'>New Client</Heading>
        <ClientForm />
      </Card>
    </Container>
  )
}

export default NewClient
