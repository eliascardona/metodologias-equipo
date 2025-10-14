import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PetsCarousel } from "@/components/adoption/carousel";

export default function AdoptionForm() {
  //   <section className="space-y-4">
  //   <h3 className="font-semibold text-gray-800">Sección 1: Animal de Interés</h3>
  //   <div className="grid gap-4 sm:grid-cols-2">
  //     <div className="space-y-2">
  //       <Label htmlFor="animalId">Identificador del Animal (ID)</Label>
  //       <Input id="animalId" placeholder="RESC-2024-058" required />
  //     </div>
  //     <div className="space-y-2">
  //       <Label htmlFor="animalName">Nombre del Animal</Label>
  //       <Input id="animalName" placeholder="Pelusa" required />
  //     </div>
  //   </div>
  // </section>

  return (
    <div className="w-full min-h-[100vh] grid place-items-center bg-gray-50 py-10 px-4">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-teal-700">
            Solicitud de Adopción
          </CardTitle>
          <CardDescription>
            Completa el siguiente formulario para registrar tu interés en adoptar
            un animal rescatado.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-sm">
          {/* Sección 1 */}
          <div className="w-full grid">
            <PetsCarousel />
          </div>

          {/* Sección 1 */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-800">Sección 1: Datos del Solicitante</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input id="fullName" placeholder="Tu nombre completo" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono de Contacto (WhatsApp)</Label>
                <Input id="phone" type="tel" placeholder="+52 555 123 4567" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="ejemplo@correo.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad y Estado de Residencia</Label>
                <Input id="city" placeholder="Ciudad de México, CDMX" required />
              </div>
            </div>
          </section>

          <Separator />

          {/* Sección 2 */}
          <section className="space-y-4">
            <h3 className="font-semibold text-gray-800">Sección 2: Condiciones para la Adopción</h3>

            <div className="space-y-2">
              <Label htmlFor="motivation">1. ¿Por qué estás interesado/a en adoptar?</Label>
              <Textarea id="motivation" placeholder="Explica tus motivos..." required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>2. ¿Dónde vivirá el animal?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="finca">Finca</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>3. La vivienda es:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="propia">Propia</SelectItem>
                    <SelectItem value="rentada">Rentada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>4. ¿Viven niños en el hogar?</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sí / No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <Input id="childrenAges" placeholder="En caso afirmativo, ¿qué edades tienen?" />
            </div>

            <div className="space-y-2">
              <Label>5. ¿Tienes otras mascotas?</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sí / No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <Input id="otherPets" placeholder="En caso afirmativo, especifica cuáles." />
            </div>

            <div className="space-y-2">
              <Label>6. ¿Estás de acuerdo con permitir una visita domiciliaria de seguimiento?</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sí / No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
        </CardContent>

        <CardFooter className="flex justify-center pt-6">
          <Button type="button" className="bg-teal-600 hover:bg-teal-700 w-full max-w-sm">
            Enviar Solicitud
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
