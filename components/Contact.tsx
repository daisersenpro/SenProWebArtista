"use client"
import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <section id="contact" className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4">Contacto</h2>
        <p className="text-gray-400 mb-6">Escríbenos para booking, prensa o compras de merch.</p>

        {!sent ? (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="max-w-xl">
            <input className="w-full p-3 mb-3 bg-gray-900 rounded" placeholder="Tu nombre" required />
            <input type="email" className="w-full p-3 mb-3 bg-gray-900 rounded" placeholder="Tu email" required />
            <textarea className="w-full p-3 mb-3 bg-gray-900 rounded" placeholder="Mensaje" rows={5} required />
            <button className="px-4 py-2 bg-white text-black rounded">Enviar</button>
          </form>
        ) : (
          <div className="text-green-400">Gracias — te responderemos pronto.</div>
        )}
      </div>
    </section>
  )
}
