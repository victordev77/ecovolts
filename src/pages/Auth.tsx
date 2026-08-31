import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Card, Input } from "../components/ui";
import { authService } from "../services/authService";
import { isSupabaseConfigured } from "../services/supabase";

type AuthValues = {
  email: string;
  password: string;
};

export function Auth() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm<AuthValues>({ defaultValues: { email: "", password: "" } });

  async function submit(values: AuthValues) {
    const result = await authService.signIn(values.email, values.password);
    setMessage(result.data?.user ? "Login demonstrativo conectado." : result.error?.message ?? "Não foi possível entrar.");
  }

  return (
    <section className="page">
      <div className="section-header">
        <span className="eyebrow">Conta</span>
        <h1>Acessar EcoVolts</h1>
        <p>Login opcional para persistência em Supabase. A demo funciona sem credenciais.</p>
      </div>
      {!isSupabaseConfigured ? (
        <Alert tone="info">Supabase não configurado. Use a demo local sem criar conta.</Alert>
      ) : null}
      <Card>
        <form className="grid" onSubmit={handleSubmit(submit)}>
          <Input label="E-mail" type="email" {...register("email")} />
          <Input label="Senha" type="password" {...register("password")} />
          <Button type="submit">Entrar</Button>
        </form>
      </Card>
      {message ? <Alert tone="info">{message}</Alert> : null}
    </section>
  );
}
