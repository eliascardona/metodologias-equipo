"use client"
import { useState, useCallback } from "react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

export interface Mascota {
  nombre: string
  foto: string
}

export function PetsCarousel() {
  const mascotas: Mascota[] = [
    { nombre: "Firulais", foto: "images/perro1.jpeg" },
    { nombre: "Michi",    foto: "images/gato1.png" },
    { nombre: "Rocky",    foto: "images/perro2.jpeg" },
    { nombre: "Tupu",     foto: "images/gato2.jpeg" },
  ]

  const [seleccionada, setSeleccionada] = useState<string | null>(null)

  const seleccionar = useCallback((nombre: string) => {
    setSeleccionada(nombre)
    // Aquí podrías hacer algo con la selección (p.ej. console.log o llamar a un callback)
    // console.log("Mascota seleccionada:", nombre)
  }, [])

  return (
    <ScrollArea className="w-156 justify-self-center whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {mascotas.map((mascota) => {
          const isActive = seleccionada === mascota.nombre
          return (
            <figure key={mascota.nombre} className="shrink-0">
              <button
                type="button"
                onClick={() => seleccionar(mascota.nombre)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    seleccionar(mascota.nombre)
                  }
                }}
                aria-pressed={isActive}
                aria-label={`Seleccionar a ${mascota.nombre}`}
                className={[
                  "overflow-hidden rounded-md w-[300px] h-[400px]",
                  "transition-transform duration-200 outline-none",
                  isActive ? "ring-2 ring-indigo-500 ring-offset-2 scale-[1.02]" : "hover:scale-[1.01] focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                ].join(" ")}
              >
                <Image
                  src={mascota.foto}
                  alt={`Imagen de ${mascota.nombre}`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </button>

              <figcaption className="text-muted-foreground pt-2 text-xs text-center">
                Nombre{": "}
                <span className="text-foreground font-semibold">
                  {mascota.nombre}
                </span>
                {isActive && (
                  <span className="ml-2 inline-block rounded px-2 py-0.5 text-[10px] font-medium bg-indigo-50 text-indigo-700">
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