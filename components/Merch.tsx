"use client"
import { useState } from 'react'

const products = [
  { id: 'cap', title: 'Gorro SENPRO', price: '25€', img: '/images/logo.png' },
  { id: 'hoodie', title: 'Polerón SENPRO', price: '55€', img: '/images/logo.png' },
  { id: 'tee', title: 'Polera SENPRO', price: '22€', img: '/images/logo.png' }
]

export default function Merch() {
  const [cart, setCart] = useState<string[]>([])
  return (
    <section id="merch" className="py-24 bg-black/30">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Merch</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-gray-900 p-4 rounded-lg">
              <img src={p.img} alt={p.title} className="w-full h-40 object-contain mb-4" />
              <h3 className="font-semibold">{p.title}</h3>
              <div className="text-gray-400 mb-3">{p.price}</div>
              <div className="flex gap-2">
                <button onClick={() => setCart(prev => [...prev, p.id])} className="px-3 py-2 bg-white text-black rounded">Añadir</button>
                <a href="mailto:contact@senpro.example?subject=Compra%20Merch&body=Quiero%20comprar%20el%20producto%20${p.id}" className="px-3 py-2 border rounded">Contactar</a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-gray-400">Carrito: {cart.length} items (demo)</div>
      </div>
    </section>
  )
}
