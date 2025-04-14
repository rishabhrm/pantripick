import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import AdminNavbar from '../../components/AdminNavbar'

const ItemList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [items, setItems] = useState([])

  // Fetching data dynamically when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4567/api/products/fetch-product')
        const data = await response.json()
        setItems(data.products)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures this runs only once when the component mounts

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  // Function to update the quantity
  const updateQuantity = async (id, change) => {
    try {
      const response = await fetch('http://localhost:4567/api/products/update-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, change }),
      })

      const result = await response.json()

      if (response.ok) {
        // Update item quantity in UI
        setItems(
          items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + change } : item
          )
        )
      } else {
        console.error(result.error)
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  // Function to remove the product from the database and UI
  const removeProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:4567/api/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Remove item from the UI state if the delete is successful
        setItems(items.filter((item) => item.id !== id))
      } else {
        console.error('Failed to remove product')
      }
    } catch (error) {
      console.error('Error removing product:', error)
    }
  }

  return (
    <>
      <AdminNavbar />
    <div className='min-h-screen flex flex-col items-center bg-white text-black p-6'>
      <h2 className='text-2xl font-bold mb-4'>Item List</h2>
      <input
        type='text'
        placeholder='Search...'
        className='p-2 border rounded w-80 mb-4 shadow-md'
        onChange={handleSearch}
      />
      <table className='w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden'>
        <thead>
          <tr className='bg-blue-500 text-white'>
            <th className='p-3'>Image</th>
            <th className='p-3'>Name</th>
            <th className='p-3'>Qty</th>
            <th className='p-3'>Price</th>
            <th className='p-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) => item.name.toLowerCase().includes(searchTerm))
            .map((item) => (
              <tr key={item.id} className='border-b hover:bg-gray-100'>
                <td className='p-3'>
                  <img
                    src={item.image || assets[item.img]}
                    alt={item.name}
                    className='w-10 h-10 rounded'
                  />
                </td>
                <td className='p-3'>{item.name}</td>
                <td className='p-3'>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className='px-2 border border-gray-300 rounded'
                  >
                    -
                  </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className='px-2 border border-gray-300 rounded'
                  >
                    +
                  </button>
                </td>
                <td className='p-3'>₹{item.price}</td>
                <td className='p-3'>
                  <button
                    onClick={() => removeProduct(item.id)}
                    className='bg-red-500 text-white px-3 py-1 rounded'
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default ItemList
