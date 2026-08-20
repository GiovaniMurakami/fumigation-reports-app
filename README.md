# Galpex App

SPA React/Vite pronta para AWS Amplify Hosting. Configure `VITE_API_URL` com a URL do API Gateway.

```bash
npm install
npm run dev
```

No Amplify, use esta pasta como raiz do monorepo (se aplicável), adicione `VITE_API_URL` nas variáveis de ambiente e mantenha a regra de rewrite de SPA (`/<*>` para `/index.html`, status 200).
