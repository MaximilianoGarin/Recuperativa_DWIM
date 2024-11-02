import { useState } from 'react'
import { sellTicket } from '../service/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Component({ userId, onLogout }: { userId: string, onLogout: () => void }) {
  const [ticketType, setTicketType] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    try {
      const data = await sellTicket({ ticketType, quantity, userId })
      console.log('Ticket sale successful:', data)
      setMessage('Ticket vendido exitosamente')
      toast.success('Se generó el vale')
      setTicketType('')
      setQuantity(1)
    } catch (error) {
      console.error('Error:', error)
      setMessage('Ocurrió un error. Por favor, intente nuevamente.')
      toast.error('Error al generar el vale')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-2xl font-bold">Empresa X</h1>
          <button
            onClick={onLogout}
            className="rounded bg-sky-400 px-4 py-2 font-semibold text-white transition-colors hover:bg-sky-500"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-6">
        <div className="mb-8 grid grid-cols-2 gap-4 rounded-lg bg-gray-800 p-4">
          <div className="text-lg">Usuario: {userId}</div>
          <div className="text-lg text-right"></div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-6 text-center text-2xl font-bold">Venta de Tickets</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <p className="rounded bg-gray-700 p-3 text-center">
                {message}
              </p>
            )}
            
            <div className="space-y-2">
              <label className="block text-lg">Tipo de Ticket:</label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="w-full rounded bg-gray-700 p-2 text-white"
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="general">General</option>
                <option value="vip">VIP</option>
                <option value="estudiante">Estudiante</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Cantidad:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                required
                className="w-full rounded bg-gray-700 p-2 text-white"
              />
            </div>

            <div className="grid gap-4">
              <button 
                type="submit"
                className="w-full rounded bg-sky-400 py-2 font-semibold text-white transition-colors hover:bg-sky-500"
              >
                Vender Tickets
              </button>
              <button 
                type="button"
                className="w-full rounded bg-sky-400 py-2 font-semibold text-white transition-colors hover:bg-sky-500"
              >
                Pedir Varios
              </button>
              <button 
                type="button"
                className="w-full rounded bg-sky-400 py-2 font-semibold text-white transition-colors hover:bg-sky-500"
              >
                Imprimir
              </button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer theme="dark" />
    </div>
  )
}