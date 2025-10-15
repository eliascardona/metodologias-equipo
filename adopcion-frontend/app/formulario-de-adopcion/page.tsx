"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PetsCarousel } from "@/components/adoption/carousel";
import { adoptionsAPI } from "@/lib/api";
import { Animal } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function AdoptionForm() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    telefono: "",
    email: "",
    ciudad: "",
    motivacion: "",
    tipoVivienda: "",
    propiedadVivienda: "",
    ninos: "",
    edadesNinos: "",
    otrasMascotas: "",
    especificarMascotas: "",
    visitaDomiciliaria: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAnimal) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un animal para adoptar",
        variant: "destructive",
      });
      return;
    }

    // Validar campos requeridos
    if (!formData.nombreCompleto || !formData.telefono || !formData.email || !formData.ciudad || !formData.motivacion) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const respuestas = {
        motivacion: formData.motivacion,
        tipo_vivienda: formData.tipoVivienda,
        propiedad_vivienda: formData.propiedadVivienda,
        ninos: formData.ninos,
        edades_ninos: formData.edadesNinos,
        otras_mascotas: formData.otrasMascotas,
        especificar_mascotas: formData.especificarMascotas,
        visita_domiciliaria: formData.visitaDomiciliaria,
      };

      await adoptionsAPI.create({
        animal: selectedAnimal.id,
        nombre_solicitante: formData.nombreCompleto,
        telefono: formData.telefono,
        email: formData.email,
        ciudad: formData.ciudad,
        respuestas,
      });

      toast({
        title: "Solicitud enviada",
        description: "Tu solicitud de adopción ha sido enviada exitosamente. Te contactaremos pronto.",
      });

      // Limpiar formulario
      setFormData({
        nombreCompleto: "",
        telefono: "",
        email: "",
        ciudad: "",
        motivacion: "",
        tipoVivienda: "",
        propiedadVivienda: "",
        ninos: "",
        edadesNinos: "",
        otrasMascotas: "",
        especificarMascotas: "",
        visitaDomiciliaria: "",
      });
      setSelectedAnimal(null);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      toast({
        title: "Error",
        description: "Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
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

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 text-sm">
            {/* Carrusel de animales */}
            <div className="w-full grid">
              <PetsCarousel onSelectAnimal={setSelectedAnimal} />
              {selectedAnimal && (
                <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md text-center">
                  <p className="text-sm text-indigo-800">
                    Has seleccionado a <span className="font-semibold">{selectedAnimal.nombre}</span> ({selectedAnimal.custom_id})
                  </p>
                </div>
              )}
            </div>

            {/* Sección 1 */}
            <section className="space-y-4">
              <h3 className="font-semibold text-gray-800">Sección 1: Datos del Solicitante</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo *</Label>
                  <Input
                    id="fullName"
                    placeholder="Tu nombre completo"
                    value={formData.nombreCompleto}
                    onChange={(e) => handleInputChange("nombreCompleto", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono de Contacto (WhatsApp) *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+52 555 123 4567"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad y Estado de Residencia *</Label>
                  <Input
                    id="city"
                    placeholder="Ciudad de México, CDMX"
                    value={formData.ciudad}
                    onChange={(e) => handleInputChange("ciudad", e.target.value)}
                    required
                  />
                </div>
              </div>
            </section>

          <Separator />

            {/* Sección 2 */}
            <section className="space-y-4">
              <h3 className="font-semibold text-gray-800">Sección 2: Condiciones para la Adopción</h3>

              <div className="space-y-2">
                <Label htmlFor="motivation">1. ¿Por qué estás interesado/a en adoptar? *</Label>
                <Textarea
                  id="motivation"
                  placeholder="Explica tus motivos..."
                  value={formData.motivacion}
                  onChange={(e) => handleInputChange("motivacion", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>2. ¿Dónde vivirá el animal?</Label>
                  <Select
                    value={formData.tipoVivienda}
                    onValueChange={(value) => handleInputChange("tipoVivienda", value)}
                  >
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
                  <Select
                    value={formData.propiedadVivienda}
                    onValueChange={(value) => handleInputChange("propiedadVivienda", value)}
                  >
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
                <Select
                  value={formData.ninos}
                  onValueChange={(value) => handleInputChange("ninos", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sí / No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="si">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="childrenAges"
                  placeholder="En caso afirmativo, ¿qué edades tienen?"
                  value={formData.edadesNinos}
                  onChange={(e) => handleInputChange("edadesNinos", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>5. ¿Tienes otras mascotas?</Label>
                <Select
                  value={formData.otrasMascotas}
                  onValueChange={(value) => handleInputChange("otrasMascotas", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sí / No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="si">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="otherPets"
                  placeholder="En caso afirmativo, especifica cuáles."
                  value={formData.especificarMascotas}
                  onChange={(e) => handleInputChange("especificarMascotas", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>6. ¿Estás de acuerdo con permitir una visita domiciliaria de seguimiento?</Label>
                <Select
                  value={formData.visitaDomiciliaria}
                  onValueChange={(value) => handleInputChange("visitaDomiciliaria", value)}
                >
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
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 w-full max-w-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Solicitud'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
