import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { Skeleton } from "./components/ui";
import { AppLayout } from "./layouts/AppLayout";
import { MyEcovoltsLayout } from "./layouts/MyEcovoltsLayout";

const queryClient = new QueryClient();
const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const Solutions = lazy(() => import("./pages/Solutions").then((module) => ({ default: module.Solutions })));
const Diagnostic = lazy(() => import("./pages/Diagnostic").then((module) => ({ default: module.Diagnostic })));
const Result = lazy(() => import("./pages/Result").then((module) => ({ default: module.Result })));
const Demo = lazy(() => import("./pages/Demo").then((module) => ({ default: module.Demo })));
const Auth = lazy(() => import("./pages/Auth").then((module) => ({ default: module.Auth })));
const Overview = lazy(() => import("./pages/Overview").then((module) => ({ default: module.Overview })));
const MySolution = lazy(() => import("./pages/MySolution").then((module) => ({ default: module.MySolution })));
const Acquisition = lazy(() => import("./pages/Acquisition").then((module) => ({ default: module.Acquisition })));
const Installation = lazy(() => import("./pages/Installation").then((module) => ({ default: module.Installation })));
const Care = lazy(() => import("./pages/Care").then((module) => ({ default: module.Care })));
const Support = lazy(() => import("./pages/Support").then((module) => ({ default: module.Support })));
const NotFound = lazy(() => import("./pages/NotFound").then((module) => ({ default: module.NotFound })));

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="page"><Skeleton lines={4} /></div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="solucoes" element={<Solutions />} />
            <Route path="diagnostico" element={<Diagnostic />} />
            <Route path="resultado" element={<Result />} />
            <Route path="demo" element={<Demo />} />
            <Route path="auth" element={<Auth />} />
            <Route path="meu-ecovolts" element={<MyEcovoltsLayout />}>
              <Route index element={<Overview />} />
              <Route path="minha-solucao" element={<MySolution />} />
              <Route path="aquisicao" element={<Acquisition />} />
              <Route path="instalacao" element={<Installation />} />
              <Route path="care" element={<Care />} />
              <Route path="suporte" element={<Support />} />
            </Route>
            <Route path="app" element={<Navigate to="/meu-ecovolts" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}
