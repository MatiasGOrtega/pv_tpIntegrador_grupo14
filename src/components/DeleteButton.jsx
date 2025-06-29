import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { deleteProduct } from "../app/productsSlice";
import { useAppDispatch } from "../hooks/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const DeleteButton = ({ productId }) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  }

  return (
    <>
      <Button
        variant="soft"
        color="red"
        size="3"
        onClick={handleDelete}
        style={{ cursor: 'pointer' }}
      >
        Eliminar Producto
        <svg width="23" height="23" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </Button>
      {confirmDelete && (
        <Box position="fixed" top="0" left="50%" p="20px" width="100%" height="100%" style={{
          backgroundColor: "rgba(0,0,0,0.5)", zIndex: 10000, transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <Box p="20px" style={{ backgroundColor: "white", borderRadius: "14px", maxWidth: '400px', width: '100%' }}>
            <Text size="3">¿Estás seguro de que quieres eliminar este producto?</Text>
            <Flex justify="between" mt="20px">
              <Button
                variant="soft"
                color="red"
                size="2"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  dispatch(deleteProduct(productId));
                  navigate('/products', { replace: true });
                }}
              >
                Sí, eliminar
              </Button>
              <Button
                style={{ cursor: 'pointer' }}
                variant="soft"
                color="gray"
                size="2"
                onClick={() => setConfirmDelete(false)}
              >
                Cancelar
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  )
}
