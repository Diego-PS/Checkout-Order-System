import { Fragment, useEffect, useState } from 'react'
import { api } from '@api'
import { MenuItem, MenuItemCategory } from '@entities'
import { OrderDrawer } from '@components'
import { useOrder } from '@hooks'
import { RestaurantBill } from '@icons'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

const allCategory: MenuItemCategory = {
  id: 0,
  name: 'All items',
  image: {
    id: '3e1bd1342800f7',
    url: 'http://localhost:3000/images/3e1bd1342800f7.jpg',
  },
}

type CategoryCardProps = {
  category: MenuItemCategory
  selectedCategoryId: number
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number>>
}

const CategoryCard = (props: CategoryCardProps) => {
  return (
    <div
      className="shrink-0 relative group w-32 h-32 cursor-pointer"
      onClick={() => props.setSelectedCategoryId(props.category.id)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${props.category.image.url})` }}
      ></div>
      {props.selectedCategoryId === props.category.id ? (
        <div className="absolute bottom-0 w-full bg-white/80 group-hover:bg-white/00 transition-all duration-300">
          <p className="text-black text-center py-2 group-hover:py-4 transition-all duration-300">
            {props.category.name}
          </p>
        </div>
      ) : (
        <div className="absolute bottom-0 w-full bg-black/50 group-hover:bg-black/70 transition-all duration-300">
          <p className="text-white text-center py-2 group-hover:py-4 transition-all duration-300">
            {props.category.name}
          </p>
        </div>
      )}
    </div>
  )
}
type MenuItemCardProps = {
  item: MenuItem
  windowDimensions: { width: number; height: number }
  addItem: () => void
  openDrawer: () => void
}

const MenuItemCard = (props: MenuItemCardProps) => {
  const handleClick = () => {
    props.addItem()
    props.openDrawer()
  }
  return (
    <div className="w-full max-w-2xl flex flex-row items-center p-6 gap-5">
      <div className="shrink-0 relative group w-32 h-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${props.item.image.url})` }}
        />
      </div>
      {props.windowDimensions.width > 720 ? (
        <>
          <div className="w-full flex flex-col">
            <h2 className="font-imperial text-4xl text-darkCharcoal">
              {props.item.name}
            </h2>
            <h3 className="font-imperial text-2xl text-darkCharcoal">
              ${props.item.price.toFixed(2)}
            </h3>
          </div>
          <div className="w-full flex flex-row-reverse items-center">
            <div
              onClick={handleClick}
              className="flex flex-row items-center justify-center bg-oliveGreen w-32 h-10 cursor-pointer hover:bg-oliveGreenDark"
            >
              <p className="text-darkCharcoal">Add to order</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col gap-1">
            <h2 className="font-imperial text-2xl text-darkCharcoal">
              {props.item.name}
            </h2>
            <h3 className="font-imperial text-xl text-darkCharcoal">
              ${props.item.price.toFixed(2)}
            </h3>
            <div
              onClick={handleClick}
              className="flex flex-row items-center justify-center bg-oliveGreen w-32 h-10 cursor-pointer hover:bg-oliveGreenDark"
            >
              <p className="text-darkCharcoal">Add to order</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export const HomePage = () => {
  const [cateogires, setCategories] = useState<MenuItemCategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [items, setItems] = useState<MenuItem[]>([])
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const { order, addItem, removeItem } = useOrder()

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getCategories = async () => {
    try {
      const categories = await api.getCategories()
      setCategories(categories)
    } catch (error) {
      console.error('Could not retrieve categories', error)
    }
  }

  const getItems = async (categoryId?: number, name?: string) => {
    try {
      const items = await api.searchItems(categoryId, name)
      setItems(items)
    } catch (error) {
      console.error('Could not retrieve hello message', error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    getItems(selectedCategoryId, searchTerm)
  }, [selectedCategoryId, searchTerm])

  return (
    <div className="bg-creamWhite min-h-screen">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center bg-espresso h-24">
          <h1 className="font-imperial text-5xl text-white">
            Checkout &nbsp;Order &nbsp;System
          </h1>
        </div>

        <div className="w-full flex flex-col items-center justify-center bg-oliveGreen">
          <div className="w-full max-w-2xl">
            <div className="p-7 flex flex-row items-center justify-between gap-7 overflow-x-auto whitespace-nowrap">
              <CategoryCard
                category={allCategory}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
              />
              {cateogires.map((cateogory) => (
                <CategoryCard
                  key={cateogory.id}
                  category={cateogory}
                  selectedCategoryId={selectedCategoryId}
                  setSelectedCategoryId={setSelectedCategoryId}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full bg-espresso h-24 flex flex-row items-center justify-center gap-3">
          <div className="w-64 bg-white h-12 flex flex-col items-center justify-center">
            <input
              type="text"
              className="w-full px-5 py-3 focus:outline-none"
              placeholder="Search item"
              onChange={(event) => setSearchTerm(event.target.value)}
            ></input>
          </div>
          <div
            onClick={() => setDrawerOpen(true)}
            className="cursor-pointer hover:bg-richBrown h-24 w-16 flex items-center justify-center"
          >
            <RestaurantBill height={50} width={50} color="white" />
          </div>
        </div>
        {items.length !== 0 ? (
          items.map((item, index) => (
            <Fragment key={item.id}>
              <MenuItemCard
                item={item}
                windowDimensions={windowDimensions}
                addItem={() => addItem(item)}
                openDrawer={() => setDrawerOpen(true)}
              />
              {index < items.length - 1 && (
                <div className="max-w-2xl w-11/12 bg-espresso h-0.5" />
              )}
            </Fragment>
          ))
        ) : (
          <div className="m-5 text-center text-lg">No items found</div>
        )}
      </div>
      <OrderDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        order={order}
        addItem={addItem}
        removeItem={removeItem}
      />
    </div>
  )
}
