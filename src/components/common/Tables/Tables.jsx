import './Tables.css'
import { useForm } from "react-hook-form"
import { useFetch } from "../../../hooks/useFetch"
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import { deleteReq, patchAvatar, patchReq } from '../../../services/http'


export function PendingCategoriesTable({ token, api }) {
  const { data, loading, error, handleCancelRequest } = useFetch(`${api}/categories/pending`, 'GET', undefined, token)

  return (
    <section id='pending-categories'>
      <TableContainer>
        <Table colorScheme='blackAlpha' variant='striped'>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Aplicar imagen</Th>
              <Th>Operaciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <PendingCategoryRow key={item.id_category} api={api} id={item.id_category} title={item.name} token={token} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>


    </section>
  )
}

function PendingCategoryRow({ api, id, title, token }) {
  const { register, formState: { errors }, handleSubmit } = useForm()
  const toast = useToast()

  const onDelete = async () => {
    try {
      const res = await deleteReq(`${api}/categories/${id}`, undefined, token )
      toast({
        title: 'Categoría borrada',
        status: 'info',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      
    }
  }

  const onSubmit = async (data) => {
    const formData = new Object()
    formData.avatar = data.avatar[0]

    try {
      const res = await patchAvatar(`${api}/categories/pending/${id}`, data, token)
      toast({
        title: 'Categoría aprobada',
        status: 'info',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <Tr>
      <Td>{title}</Td>
      <Td>
        <form className='table-form' id={`table-form-${id}`} onSubmit={handleSubmit(onSubmit)}>
          <input multiple={false} type='file' {...register('avatar', { required: true })} />
        </form>
      </Td>
      <Td>
        <Button form={`table-form-${id}`}  colorScheme='green' type='submit'>Aprobar</Button>
        <Button onClick={onDelete} colorScheme='red'>Rechazar</Button>
      </Td>
    </Tr>
  )
}