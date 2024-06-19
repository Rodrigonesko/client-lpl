import { Button, Dialog, DialogContent, DialogTitle, DialogActions, FormControl, FormLabel, Select, MenuItem, Box, TextField, Grid, Divider, Chip } from "@mui/material"
import { useEffect, useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import { Add } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { arrNfProps, arrPedidoProps, arrApoliceProps, arrEventoProps, arrPrestadorProps } from "./arrPedidoProps"
import { adicionarPedido, createPedido, createPrestador, getPrestadorByCpfCnpj } from "../../../../_services/rsdBradesco.service"

const ModalCriarPedido = ({
    segurados,
    pacote,
    setPedidos
}) => {

    const { register, handleSubmit, setValue, watch } = useForm()
    const cpfCnpj = watch('prestador.cpfCnpj')

    const [open, setOpen] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const onSubmit = async (data) => {
        // console.log(pacote);
        try {
            let prestador = await getPrestadorByCpfCnpj(data.prestador.cpfCnpj)
            console.log(prestador);
            if (prestador) {
                data.prestador = prestador._id
            } else {
                prestador = await createPrestador(data.prestador)
                console.log(prestador);
                data.prestador = prestador._id
            }
            console.log(data);
            const pedido = await createPedido({ ...data, pacote: pacote._id })
            await adicionarPedido(pacote._id, {
                pedido: pedido._id
            })
            setPedidos([...pacote.pedidos, pedido])
            setMessage('Pedido criado com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setOpen(false)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao criar pedido')
            setSeverity('error')
            setOpenToast(true)
        }


    }

    const buscaDadosPrestador = async (cpfCnpj) => {
        try {
            const data = await getPrestadorByCpfCnpj(cpfCnpj)
            if (data) {
                setValue('prestador.nome', data.nome)
                setValue('prestador.cpfCnpj', data.cpfCnpj)
                setValue('prestador.uf', data.uf)
            }
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (cpfCnpj) {
            buscaDadosPrestador(cpfCnpj)
        }
    }, [cpfCnpj]);

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                endIcon={<Add />}
                size="small"
            >
                Novo Pedido
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    Criar Pedido
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <FormControl fullWidth>
                            <FormLabel>Segurado</FormLabel>
                            <Select
                                {...register('segurado')}
                                fullWidth
                            >
                                {
                                    segurados.map(segurado => (
                                        <MenuItem
                                            key={segurado._id}
                                            value={segurado._id}
                                        >
                                            {segurado?.nome}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Divider
                            sx={{
                                color: 'primary.main',
                                m: 2
                            }}
                        >
                            <Chip
                                label="Prestador"
                                color="primary"
                                size="small"
                            />
                        </Divider>
                        <Grid container spacing={2}>
                            {
                                arrPrestadorProps.map((item, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        key={index}
                                    >
                                        <TextField
                                            {...register(item.name)}
                                            fullWidth
                                            label={item.label}
                                            size="small"
                                            type={item.type}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Divider
                            sx={{
                                color: 'primary.main',
                                m: 2
                            }}
                        >
                            <Chip
                                label="Pedido"
                                color="primary"
                                size="small"
                            />
                        </Divider>
                        <Grid container spacing={2} mt={2}>
                            {
                                arrPedidoProps.map((item, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        key={index}
                                    >
                                        <TextField
                                            {...register(item.name)}
                                            fullWidth
                                            label={item.label}
                                            size="small"
                                            type={item.type}
                                            InputLabelProps={{
                                                shrink: item.type === 'date' ? true : undefined
                                            }}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Divider
                            sx={{
                                color: 'primary.main',
                                m: 2
                            }}

                        >
                            <Chip
                                label="Nota Fiscal"
                                color="primary"
                                size="small"
                            />
                        </Divider>
                        <Grid container spacing={2}>
                            {
                                arrNfProps.map((item, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        key={index}
                                    >
                                        <TextField
                                            {...register(item.name)}
                                            fullWidth
                                            label={item.label}
                                            size="small"
                                            type={item.type}
                                            InputLabelProps={{
                                                shrink: item.type === 'date' ? true : undefined
                                            }}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Divider
                            sx={{
                                color: 'primary.main',
                                m: 2
                            }}
                        >
                            <Chip
                                label="Apolice"
                                color="primary"
                                size="small"
                            />
                        </Divider>
                        <Grid container spacing={2}>
                            {
                                arrApoliceProps.map((item, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        key={index}
                                    >
                                        <TextField
                                            {...register(item.name)}
                                            fullWidth
                                            label={item.label}
                                            size="small"
                                            type={item.type}
                                            InputLabelProps={{
                                                shrink: item.type === 'date' ? true : undefined
                                            }}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Divider
                            sx={{
                                color: 'primary.main',
                                m: 2
                            }}
                        >
                            <Chip
                                label="Evento"
                                color="primary"
                                size="small"
                            />
                        </Divider>
                        <Grid container spacing={2}>
                            {
                                arrEventoProps.map((item, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        key={index}
                                    >
                                        <TextField
                                            {...register(item.name)}
                                            fullWidth
                                            label={item.label}
                                            size="small"
                                            type={item.type}
                                            InputLabelProps={{
                                                shrink: item.type === 'date' ? true : undefined
                                            }}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            handleSubmit(onSubmit)()
                        }}
                        color="primary"
                        variant="contained"
                    >
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </>
    )
}

export default ModalCriarPedido