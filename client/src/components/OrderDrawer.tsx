import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import { ItemInOrder, MenuItem, OrderClient } from '@entities'
import { useNavigate } from 'react-router-dom'

type OrderItemProps = {
  orderItem: ItemInOrder
  addItem: (item: MenuItem) => void
  removeItem: (id: number) => void
}

const OrderItem = (props: OrderItemProps) => (
  <div className="w-full flex flex-row items-center p-6 gap-5">
    <div className="shrink-0 relative group w-28 h-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${props.orderItem.item.image.url})` }}
      />
    </div>
    <div className="w-full flex flex-col gap-1">
      <h2 className="text-m text-darkCharcoal">{props.orderItem.item.name}</h2>
      <h3 className="text-sm text-darkCharcoal">
        unit: ${props.orderItem.item.price.toFixed(2)}
      </h3>
      <h3 className="text-sm text-darkCharcoal">
        total: $
        {(props.orderItem.item.price * props.orderItem.quantity).toFixed(2)}
      </h3>
      <div className="flex flex-row">
        <div
          onClick={() => props.removeItem(props.orderItem.item.id)}
          className="hover:bg-richBrown cursor-pointer w-8 h-8 bg-espresso text-white flex items-center justify-center"
        >
          -
        </div>
        <div className="w-8 h-8 bg-white flex items-center justify-center">
          {props.orderItem.quantity}
        </div>
        <div
          onClick={() => props.addItem(props.orderItem.item)}
          className="hover:bg-richBrown cursor-pointer w-8 h-8 bg-espresso text-white flex items-center justify-center"
        >
          +
        </div>
      </div>
    </div>
  </div>
)

type OrderDrawerPrpos = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  order: OrderClient
  addItem: (item: MenuItem) => void
  removeItem: (id: number) => void
}

export const OrderDrawer = (props: OrderDrawerPrpos) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    props.setOpen(newOpen)
  }

  const itemsIds = Object.keys(props.order.items).filter(
    (key) => props.order.items[parseInt(key)] !== undefined
  )

  const navigate = useNavigate()

  const DrawerList = (
    <div className="bg-creamWhite min-h-full">
      <Box sx={{ width: 300 }} role="presentation">
        <div className="flex flex-col items-center justify-center bg-creamWhite">
          <div className="w-full flex flex-col items-center justify-center bg-espresso h-16">
            <h1 className="font-imperial text-4xl text-white">
              My &nbsp;Order
            </h1>
          </div>
          <List>
            {itemsIds.map((key, index) => (
              <React.Fragment key={key}>
                <Box>
                  <OrderItem
                    orderItem={props.order.items[parseInt(key)]!}
                    addItem={props.addItem}
                    removeItem={props.removeItem}
                  />
                </Box>
                {index < itemsIds.length - 1 && (
                  <div className="w-full flex flex-col items-center">
                    <div className="w-11/12 bg-espresso h-0.5 margin-auto" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </List>
          <div className="w-full p-6">
            <div
              onClick={() => navigate('/order')}
              className="flex flex-row items-center justify-between px-5 bg-oliveGreen h-12 cursor-pointer hover:bg-oliveGreenDark"
            >
              <p className="text-darkCharcoal">Order</p>
              <p className="text-darkCharcoal">
                ${props.order.value.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )

  return (
    <Drawer open={props.open} onClose={toggleDrawer(false)} anchor="right">
      {DrawerList}
    </Drawer>
  )
}
