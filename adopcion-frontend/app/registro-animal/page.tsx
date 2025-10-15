"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { animalsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnimalRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    edad: "",
    raza: "",
  });

  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!formData.nombre || !formData.especie || !formData.edad || !formData.raza) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Validar que la edad sea un número positivo
    const edadNum = parseInt(formData.edad);
    if (isNaN(edadNum) || edadNum < 0) {
      toast({
        title: "Error",
        description: "La edad debe ser un número positivo",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const data: any = {
        nombre: formData.nombre,
        especie: formData.especie as any,
        edad: edadNum,
        raza: formData.raza,
      };

      if (foto) {
        data.foto = foto;
      }

      await animalsAPI.create(data);

      toast({
        title: "Animal registrado",
        description: "El animal ha sido registrado exitosamente y está disponible para adopción.",
      });

      // Limpiar formulario
      setFormData({
        nombre: "",
        especie: "",
        edad: "",
        raza: "",
      });
      setFoto(null);
      setFotoPreview(null);

      // Opcional: redirigir a otra página
      // router.push('/formulario-de-adopcion');
    } catch (error) {
      console.error("Error al registrar el animal:", error);
      toast({
        title: "Error",
        description: "Hubo un error al registrar el animal. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[100vh] grid place-items-center bg-gray-50 py-10 px-4">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold text-teal-700">
            Registro de Animal
          </CardTitle>
          <CardDescription>
            Registra un nuevo animal disponible para adopción.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 text-sm">
            {/* Información básica */}
            <section className="space-y-4">
              <h3 className="font-semibold text-gray-800">Información del Animal</h3>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Animal *</Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Firulais"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="especie">Especie *</Label>
                  <Select
                    value={formData.especie}
                    onValueChange={(value) => handleInputChange("especie", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una especie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perro">Perro</SelectItem>
                      <SelectItem value="gato">Gato</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edad">Edad (años) *</Label>
                  <Input
                    id="edad"
                    type="number"
                    min="0"
                    placeholder="Ej: 3"
                    value={formData.edad}
                    onChange={(e) => handleInputChange("edad", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="raza">Raza *</Label>
                <Input
                  id="raza"
                  placeholder="Ej: Mestizo, Golden Retriever, etc."
                  value={formData.raza}
                  onChange={(e) => handleInputChange("raza", e.target.value)}
                  required
                />
              </div>
            </section>

            {/* Fotografía */}
            <section className="space-y-4">
              <h3 className="font-semibold text-gray-800">Fotografía</h3>

              <div className="space-y-2">
                <Label htmlFor="foto">Foto del Animal</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                {fotoPreview && (
                  <div className="mt-4">
                    <img
                      src={fotoPreview}
                      alt="Vista previa"
                      className="w-full max-w-xs rounded-md border border-gray-300"
                    />
                  </div>
                )}
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
                  Registrando...
                </>
              ) : (
                'Registrar Animal'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
