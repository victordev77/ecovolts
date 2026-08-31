# EcoVolts 2.0

Protótipo React + Vite do EcoVolts, organizado para demonstrar a jornada prática:

- diagnóstico residencial;
- recomendação de plano;
- simulação de aquisição;
- Pague com Economia;
- EcoVolts Social demonstrativo;
- instalação;
- EcoVolts Care;
- suporte.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. A rota `/demo` carrega dados demonstrativos sem login.

## Validar

```bash
npm test
npm run build
```

## Supabase opcional

Copie `.env.example` para `.env.local` e preencha:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

O arquivo `supabase/schema.sql` contém tabelas e políticas RLS para persistência autenticada. Não use chave `service_role` no frontend.

## Observações de produto

Todos os valores são simulados. Nenhuma compra, contratação, financiamento, benefício social ou instalação real é realizada pelo protótipo. Diagnósticos e backup dependem de validação técnica em operação real.
