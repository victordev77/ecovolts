import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Card, Input, Select } from "../components/ui";
import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import { useAppStore } from "../store/useAppStore";
import type { DiagnosticProfile, GoalId } from "../types";

const schema = z.object({
  bill: z.coerce.number().min(80, "Informe uma conta a partir de R$ 80."),
  kwh: z.coerce.number().min(0),
  unknownKwh: z.boolean(),
  residents: z.coerce.number().min(1).max(12),
  state: z.string().min(2),
  city: z.string().min(2, "Informe sua cidade."),
  homeType: z.string().min(2),
  ownership: z.string().min(2),
  roof: z.string().min(2),
  shade: z.string().min(2),
  appliances: z.array(z.string()).min(1, "Escolha pelo menos um item."),
  usageTime: z.string().min(2),
  goal: z.enum(["economia", "entrada", "cobertura", "seguranca"]),
  preference: z.string().min(2),
  cadunico: z.string().min(2),
});

type FormValues = z.infer<typeof schema>;

export function Diagnostic() {
  const navigate = useNavigate();
  const setProfile = useAppStore((state) => state.setProfile);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...ECOVOLTS_CONFIG.demoProfile },
  });
  const selectedAppliances = watch("appliances");
  const selectedGoal = watch("goal");

  function toggleAppliance(appliance: string) {
    const next = selectedAppliances.includes(appliance)
      ? selectedAppliances.filter((item) => item !== appliance)
      : [...selectedAppliances, appliance];
    setValue("appliances", next, { shouldValidate: true });
  }

  function submit(values: FormValues) {
    const profile: DiagnosticProfile = {
      ...values,
      goal: values.goal as GoalId,
      kwh: values.unknownKwh ? 0 : values.kwh,
    };
    setProfile(profile);
    navigate("/resultado");
  }

  return (
    <section className="page">
      <div className="section-header">
        <span className="eyebrow">Diagnóstico</span>
        <h1>Vamos encontrar o plano ideal para sua casa.</h1>
      </div>

      <form className="grid" onSubmit={handleSubmit(submit)}>
        <Card>
          <h2>Sua conta e consumo</h2>
          <div className="grid grid--3">
            <Input label="Qual é o valor médio da sua conta?" type="number" {...register("bill")} error={errors.bill?.message} />
            <Input label="Quanto você consome por mês? kWh" type="number" {...register("kwh")} error={errors.kwh?.message} />
            <Input label="Quantas pessoas moram na casa?" type="number" {...register("residents")} error={errors.residents?.message} />
          </div>
          <label className="choice">
            <input type="checkbox" {...register("unknownKwh")} />
            Não sei meu consumo em kWh
          </label>
        </Card>

        <Card>
          <h2>Onde fica sua residencia?</h2>
          <div className="grid grid--3">
            <Select label="Estado" {...register("state")}>
              {Object.keys(ECOVOLTS_CONFIG.tariffByState).map((state) => (
                <option key={state}>{state}</option>
              ))}
            </Select>
            <Input label="Cidade" {...register("city")} error={errors.city?.message} />
            <Select label="Imóvel" {...register("homeType")}>
              <option>Casa</option>
              <option>Apartamento</option>
              <option>Comercio pequeno</option>
            </Select>
          </div>
        </Card>

        <Card>
          <h2>Como é o seu telhado?</h2>
          <div className="grid grid--3">
            <Select label="Situação do imóvel" {...register("ownership")}>
              <option>Próprio</option>
              <option>Alugado</option>
              <option>Familiar</option>
            </Select>
            <Select label="Tipo de cobertura" {...register("roof")}>
              <option>Telhado</option>
              <option>Laje</option>
              <option>Terreno</option>
              <option>Não sei</option>
            </Select>
            <Select label="Sombra no local" {...register("shade")}>
              <option>Pouco</option>
              <option>Médio</option>
              <option>Muito</option>
              <option>Não sei</option>
            </Select>
          </div>
        </Card>

        <Card>
          <h2>O que você usa em casa?</h2>
          <div className="choice-grid">
            {ECOVOLTS_CONFIG.appliances.map((appliance) => (
              <label key={appliance} className="choice">
                <input
                  type="checkbox"
                  checked={selectedAppliances.includes(appliance)}
                  onChange={() => toggleAppliance(appliance)}
                />
                {appliance}
              </label>
            ))}
          </div>
          {errors.appliances?.message ? <small className="field-error">{errors.appliances.message}</small> : null}
        </Card>

        <Card>
          <h2>O que você busca?</h2>
          <div className="choice-grid">
            {ECOVOLTS_CONFIG.goals.map((goal) => (
              <label key={goal.id} className="choice">
                <input
                  type="radio"
                  checked={selectedGoal === goal.id}
                  onChange={() => setValue("goal", goal.id, { shouldValidate: true })}
                />
                <span>
                  {goal.title}
                  <small>{goal.text}</small>
                </span>
              </label>
            ))}
          </div>
          <div className="grid grid--3">
            <Select label="Uso principal" {...register("usageTime")}>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
              <option>Distribuído</option>
              <option>Não sei</option>
            </Select>
            <Select label="Preferência de simulação" {...register("preference")}>
              <option>Pague com Economia</option>
              <option>Financiamento</option>
              <option>À vista</option>
              <option>EcoVolts Social</option>
            </Select>
            <Select label="Cadastro social" {...register("cadunico")}>
              <option>Sim</option>
              <option>Não</option>
              <option>Não sei</option>
            </Select>
          </div>
        </Card>

        <div className="actions">
          <Button type="submit">Ver meu plano</Button>
        </div>
      </form>
    </section>
  );
}
