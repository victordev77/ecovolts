import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Card, Select, Textarea, Toast } from "../components/ui";
import { useAppStore } from "../store/useAppStore";

const supportSchema = z.object({
  category: z.string().min(2),
  description: z.string().min(8, "Descreva rapidamente o que aconteceu."),
});

type SupportValues = z.infer<typeof supportSchema>;

export function Support() {
  const addSupportRequest = useAppStore((state) => state.addSupportRequest);
  const requests = useAppStore((state) => state.supportRequests);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SupportValues>({ resolver: zodResolver(supportSchema), defaultValues: { category: "Geração", description: "" } });

  function submit(values: SupportValues) {
    addSupportRequest(values.category, values.description);
    reset({ category: values.category, description: "" });
  }

  return (
    <div className="grid">
      <div className="section-header">
        <span className="eyebrow">Suporte</span>
        <h1>Solicitar atendimento</h1>
      </div>
      <Card>
        <form className="grid" onSubmit={handleSubmit(submit)}>
          <Select label="Motivo" {...register("category")}>
            <option>Geração</option>
            <option>Monitoramento</option>
            <option>Equipamento</option>
            <option>Outro</option>
          </Select>
          <Textarea label="Descrição" {...register("description")} error={errors.description?.message} />
          <Button type="submit">Simular solicitação</Button>
        </form>
      </Card>

      {requests.length ? (
        <Card>
          <h2>Próxima etapa</h2>
          <p>Encaminhamento para assistência credenciada.</p>
          <div className="grid">
            {requests.map((request) => (
              <div className="metric-card" key={request.id}>
                <span>{request.category}</span>
                <strong>{request.status}</strong>
                <small>{request.description}</small>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
      <Toast message={isSubmitSuccessful ? "Solicitação registrada na demonstração." : ""} />
    </div>
  );
}
