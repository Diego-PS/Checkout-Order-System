import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useOrder } from '@hooks'
import { Fragment, useEffect, useState } from 'react'
import { ItemInOrder } from '@entities'
import { api } from '@api'
import { Box, Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type PlaceOrderFormData = {
  name: string
}

const schema: yup.ObjectSchema<PlaceOrderFormData> = yup.object({
  name: yup
    .string()
    .min(6, 'Please enter your full name')
    .max(100, 'Character limit exceeded')
    .required('Please enter your full name'),
})

const ItemInfo = ({ orderItem }: { orderItem: ItemInOrder }) => {
  return (
    <div className="w-full flex flex-row items-center justify-between gap-3">
      <div className="flex flex-row items-center gap-3">
        <div className="shrink-0 relative group w-24 h-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${orderItem.item.image.url})` }}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-darkCharcoal">
            {orderItem.item.name}
          </h2>
          <h3 className="text-darkCharcoal">quantity: {orderItem.quantity}</h3>
          <h3 className="text-darkCharcoal">
            unit price: ${orderItem.item.price.toFixed(2)}
          </h3>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-darkCharcoal">
        ${(orderItem.item.price * orderItem.quantity).toFixed(2)}
      </h2>
    </div>
  )
}

export const OrderPage = () => {
  const [itemsIds, setItemsIds] = useState<number[]>([])
  const [result, setResult] = useState<'SUCCESS' | 'FAILURE' | undefined>(
    undefined
  )
  const { order, resetOrder } = useOrder()
  const navigate = useNavigate()

  useEffect(() => {
    setItemsIds(
      Object.keys(order.items)
        .filter((key) => order.items[parseInt(key)] !== undefined)
        .map((key) => parseInt(key))
    )
  }, [order])

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlaceOrderFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ name }: PlaceOrderFormData) => {
    console.log('Trying to submit order')
    const success = await api.submitOrder({
      buyer: name,
      purchases: itemsIds.map((id) => ({
        item_id: id,
        quantity: order.items[id]!.quantity,
      })),
    })
    if (success) {
      setResult('SUCCESS')
      resetOrder()
    } else {
      setResult('FAILURE')
    }
  }

  return (
    <div className="bg-creamWhite min-h-screen">
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div className="w-full flex flex-col items-center justify-center bg-espresso h-24">
          <h1 className="font-imperial text-5xl text-white">
            Place &nbsp;your &nbsp;order
          </h1>
        </div>
        {itemsIds.length === 0 ? (
          <>
            <div className="text-xl text-darkCharcoal p-5 text-center">
              You do not have any item in your order, please add items from the
              menu
            </div>

            <div
              onClick={() => navigate('/')}
              className="w-64 flex items-center justify-center px-5 bg-oliveGreen h-12 cursor-pointer hover:bg-oliveGreenDark"
            >
              <p className="text-darkCharcoal">Back to menu</p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl text-darkCharcoal">
              Check the items of your order
            </h1>

            <div className="max-w-2xl w-11/12 bg-white flex flex-col gap-5 p-5 items-center">
              {itemsIds.map((id) => (
                <Fragment key={id}>
                  {order.items[id] !== undefined && (
                    <ItemInfo orderItem={order.items[id]} />
                  )}
                  <div className="max-w-2xl w-11/12 bg-gray-200 h-0.5" />
                </Fragment>
              ))}
              <div className="w-full flex flex-row justify-between">
                <h2 className="text-lg font-semibold text-darkCharcoal">
                  Total
                </h2>
                <h2 className="text-lg font-semibold text-darkCharcoal">
                  ${order.value.toFixed(2)}
                </h2>
              </div>
            </div>

            <h1 className="text-xl text-darkCharcoal">Fill in your name</h1>
            <div className="w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col items-center"
              >
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="max-w-2xl w-11/12 bg-white h-12 flex flex-col items-center justify-center">
                      <input
                        type="text"
                        className="w-full px-5 py-3 focus:outline-none"
                        placeholder="Enter your full name"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  )}
                  name="name"
                />
                {errors.name?.message !== undefined && (
                  <div className="text-rustyRed mt-1">
                    {errors.name.message}
                  </div>
                )}
                <div className="w-full flex items-center justify-center m-7">
                  <button type="submit">
                    <div className="w-64 flex items-center justify-center px-5 bg-oliveGreen h-12 cursor-pointer hover:bg-oliveGreenDark">
                      <p className="text-darkCharcoal">
                        Confirm and place order
                      </p>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      <Modal open={result !== undefined}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',

            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-xl">
              {result === 'SUCCESS'
                ? 'Your order was submited successfully!'
                : 'There was an error when trying to submit your order. Please try again later'}
            </div>
            <div
              onClick={() => navigate('/')}
              className="w-64 flex items-center justify-center px-5 bg-oliveGreen h-12 cursor-pointer hover:bg-oliveGreenDark"
            >
              <p className="text-darkCharcoal">Back to menu</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
