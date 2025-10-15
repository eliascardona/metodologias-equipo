"use client"
import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { animalsAPI } from "@/lib/api"
import { Animal } from "@/lib/types"
import { Skeleton } from "../ui/skeleton"

interface PetsCarouselProps {
  onSelectAnimal?: (animal: Animal | null) => void;
}

export function PetsCarousel({ onSelectAnimal }: PetsCarouselProps) {
  const [animales, setAnimales] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [seleccionadaId, setSeleccionadaId] = useState<number | null>(null)

  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        setLoading(true)
        const data = await animalsAPI.getAvailable()
        setAnimales(data)
      } catch (err) {
        console.error('Error al cargar animales:', err)
        setError('No se pudieron cargar los animales disponibles')
      } finally {
        setLoading(false)
      }
    }

    fetchAnimales()
  }, [])

  const seleccionar = useCallback((animal: Animal) => {
    setSeleccionadaId(animal.id)
    onSelectAnimal?.(animal)
  }, [onSelectAnimal])

  if (loading) {
    return (
      <ScrollArea className="w-156 justify-self-center whitespace-nowrap">
        <div className="flex w-max space-x-4 p-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="shrink-0 space-y-2">
              <Skeleton className="w-[300px] h-[400px] rounded-md" />
              <Skeleton className="h-4 w-[200px] mx-auto" />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    )
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-600">
        <p>{error}</p>
      </div>
    )
  }

  if (animales.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-600">
        <p>No hay animales disponibles para adopción en este momento.</p>
      </div>
    )
  }

  return (
    <ScrollArea className="w-156 justify-self-center whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {animales.map((animal) => {
          const isActive = seleccionadaId === animal.id
          const imageSrc = animal.foto
            ? `http://localhost:8000${animal.foto}`
            : '/images/placeholder-animal.jpg'

          return (
            <figure key={animal.id} className="shrink-0">
              <button
                type="button"
                onClick={() => seleccionar(animal)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    seleccionar(animal)
                  }
                }}
                aria-pressed={isActive}
                aria-label={`Seleccionar a ${animal.nombre}`}
                className={[
                  "overflow-hidden rounded-md w-[300px] h-[400px]",
                  "transition-transform duration-200 outline-none",
                  isActive ? "ring-2 ring-indigo-500 ring-offset-2 scale-[1.02]" : "hover:scale-[1.01] focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                ].join(" ")}
              >
                <Image
                  src={imageSrc}
                  alt={`Imagen de ${animal.nombre}`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </button>

              <figcaption className="text-muted-foreground pt-2 text-xs text-center max-w-[300px]">
                <div className="font-semibold text-foreground text-sm mb-1">
                  {animal.nombre}
                </div>
                <div className="text-[10px]">
                  {animal.especie.charAt(0).toUpperCase() + animal.especie.slice(1)} • {animal.raza} • {animal.edad} {animal.edad === 1 ? 'año' : 'años'}
                </div>
                {isActive && (
                  <span className="mt-2 inline-block rounded px-2 py-0.5 text-[10px] font-medium bg-indigo-50 text-indigo-700">
                    Seleccionada
                  </span>
                )}
              </figcaption>
            </figure>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}