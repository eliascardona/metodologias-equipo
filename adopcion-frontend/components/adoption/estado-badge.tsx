import { Badge } from "@/components/ui/badge";

type EstadoSolicitud = "pendiente" | "en_revision" | "aprobada" | "rechazada";

interface EstadoBadgeProps {
  estado: EstadoSolicitud | string;
}

const estadoConfig: Record<
  EstadoSolicitud,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
  }
> = {
  pendiente: { variant: "outline", label: "Pendiente" },
  en_revision: { variant: "secondary", label: "En Revisión" },
  aprobada: { variant: "default", label: "Aprobada" },
  rechazada: { variant: "destructive", label: "Rechazada" },
};

export function EstadoBadge({ estado }: EstadoBadgeProps) {
  const config = estadoConfig[estado as EstadoSolicitud] || {
    variant: "outline" as const,
    label: estado,
  };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
