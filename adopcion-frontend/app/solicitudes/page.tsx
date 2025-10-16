"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { adoptionsAPI } from "@/lib/api";
import { SolicitudAdopcion } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, Eye } from "lucide-react";
import { formatDate } from "@/lib/format";
import { EstadoBadge } from "@/components/adoption/estado-badge";
import { SolicitudDetail } from "@/components/adoption/solicitud-detail";

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<SolicitudAdopcion[]>([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState<
    SolicitudAdopcion[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("todos");
  const { toast } = useToast();

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  useEffect(() => {
    filterSolicitudes();
  }, [searchTerm, filterEstado, solicitudes]);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const data = await adoptionsAPI.getAll();
      const items = Array.isArray(data)
        ? data
        : data && Array.isArray((data as any).results)
        ? (data as any).results
        : [];
      setSolicitudes(items);
      setFilteredSolicitudes(items);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las solicitudes",
        variant: "destructive",
      });
      setSolicitudes([]);
      setFilteredSolicitudes([]);
    } finally {
      setLoading(false);
    }
  };

  const filterSolicitudes = () => {
    let filtered = [...solicitudes];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.nombre_solicitante
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.custom_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.animal_detalle.nombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filterEstado !== "todos") {
      filtered = filtered.filter((s) => s.estado === filterEstado);
    }

    setFilteredSolicitudes(filtered);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-teal-600" />
          <p className="mt-2 text-gray-600">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-teal-700">
              Solicitudes de Adopción
            </CardTitle>
            <CardDescription>
              Administra y revisa todas las solicitudes de adopción recibidas
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, email, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en_revision">En Revisión</SelectItem>
                  <SelectItem value="aprobada">Aprobada</SelectItem>
                  <SelectItem value="rechazada">Rechazada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{solicitudes.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {solicitudes.filter((s) => s.estado === "pendiente").length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm text-gray-600">Aprobadas</p>
                <p className="text-2xl font-bold text-green-600">
                  {solicitudes.filter((s) => s.estado === "aprobada").length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm text-gray-600">En Revisión</p>
                <p className="text-2xl font-bold text-blue-600">
                  {solicitudes.filter((s) => s.estado === "en_revision").length}
                </p>
              </div>
            </div>

            {/* Tabla de solicitudes */}
            {filteredSolicitudes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No se encontraron solicitudes</p>
                <p className="text-sm mt-2">
                  {searchTerm || filterEstado !== "todos"
                    ? "Intenta cambiar los filtros de búsqueda"
                    : "No hay solicitudes de adopción registradas"}
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Solicitante</TableHead>
                      <TableHead>Animal</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSolicitudes.map((solicitud) => (
                      <TableRow key={solicitud.id}>
                        <TableCell className="font-mono text-xs">
                          {solicitud.custom_id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {solicitud.nombre_solicitante}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {solicitud.animal_detalle.nombre}
                            </p>
                            <p className="text-xs text-gray-500">
                              {solicitud.animal_detalle.especie} •{" "}
                              {solicitud.animal_detalle.raza}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{solicitud.telefono}</p>
                            <p className="text-xs text-gray-500">
                              {solicitud.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(solicitud.fecha_solicitud)}
                        </TableCell>
                        <TableCell>
                          <EstadoBadge estado={solicitud.estado} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Detalle de Solicitud</DialogTitle>
                                <DialogDescription>
                                  ID: {solicitud.custom_id}
                                </DialogDescription>
                              </DialogHeader>
                              <SolicitudDetail solicitud={solicitud} />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
