import { useEffect, useState } from 'react'
import { api } from '@api'
import { MenuItem, MenuItemCategory } from '@entities'

const allCategory: MenuItemCategory = {
  id: 0,
  name: 'All items',
  image: {
    id: 'f3fbf57b118fa9',
    url: 'http://localhost:3000/images/f3fbf57b118fa9.jpg',
  },
}

export type CategoryCardProps = {
  category: MenuItemCategory
  selectedCategoryId: number
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number>>
}

const CategoryCard = (props: CategoryCardProps) => {
  return (
    <div
      className="shrink-0 relative group w-32 h-32 hover:cursor-pointer"
      onClick={() => props.setSelectedCategoryId(props.category.id)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${props.category.image.url})` }}
      ></div>

      {/* Title Overlay */}
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

export const HomePage = () => {
  const [cateogires, setCategories] = useState<MenuItemCategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [items, setItems] = useState<MenuItem[]>([])

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
        <div className="w-full bg-espresso flex flex-col items-center justify-center">
          <div className="w-80 bg-white h-12 m-5 flex flex-col items-center justify-center">
            <input
              type="text"
              className="w-full px-5 py-3 focus:outline-none"
              placeholder="Search item"
              onChange={(event) => setSearchTerm(event.target.value)}
            ></input>
          </div>
        </div>
        <p className="mt-2">You typed: {searchTerm}</p>
        <p>{JSON.stringify(items)}</p>
      </div>
    </div>
  )
}
