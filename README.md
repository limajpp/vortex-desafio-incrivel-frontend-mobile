# 📱 Desafio Incrível - Expenzeus (Vortex)

O braço móvel do ecossistema Vortex. Um aplicativo focado em agilidade, permitindo que o usuário registre despesas em segundos, direto do bolso.

## 📖 Sobre o Projeto

Este aplicativo foi desenvolvido como parte do Desafio Vortex, cumprindo o requisito de "App Rápido". Enquanto a versão Web foca em análise e gráficos, o Mobile foca na inserção e gestão rápida de lançamentos.

Construído com Expo e NativeWind, o app oferece uma experiência nativa fluida, suporte automático a temas (Dark/Light Mode) e uma arquitetura limpa baseada em rotas (Expo Router).

## ✨ Funcionalidades

### ⚡ Foco em Agilidade (Smart Input)
- Adicionar Despesa: Interface modal em tela cheia otimizada para velocidade.
- Input de valor em destaque (foco automático).
- Data pré-preenchida com "hoje".
- Teclado numérico inteligente.
- Formatação monetária automática (máscara de R$).

### 🔐 Segurança & Autenticação
- Fluxo Completo: Login e Cadastro integrados à API.
- Validação de Senha Forte: Feedback visual em tempo real para requisitos de senha (maiúsculas, símbolos, números).
- Proteção de Dados: Campos de texto bloqueiam a inserção de emojis para garantir a integridade do banco de dados.
- Sessão Persistente: Tokens JWT armazenados de forma segura via Expo SecureStore.
- Auto-Logout: O app detecta sessões expiradas (401) e redireciona o usuário para o login automaticamente.

### 📊 Gestão Financeira (CRUD Completo)
- Dashboard: Visualização clara do total gasto e lista de histórico recente.
- Atualização (Pull-to-Refresh): Arraste para baixo para atualizar os dados.
- Edição: Toque em qualquer card para editar valores, descrições ou datas.
- Exclusão: Remova lançamentos incorretos com confirmação de segurança.

## 🛠️ Tech Stack
- Core: React Native via Expo (SDK 50+)
- Linguagem: TypeScript
- Estilização: NativeWind (TailwindCSS para RN)
- Navegação: Expo Router (File-based routing)
- Conexão API: Axios (com interceptors para tratamento de erros)
- Ícones: Lucide React Native

## 📁 Estrutura do Projeto

Abaixo uma visualização mais clara e organizada da estrutura principal do projeto. Comentários ao lado explicam o propósito de cada pasta/arquivo.

```text
.
├── app/                     # Roteamento baseado em arquivos (pages/screens)
│   ├── (tabs)/              # Grupo de rotas autenticadas (Dashboard)
│   │   ├── index.tsx        # Tela Principal (Lista e Total)
│   │   └── _layout.tsx      # Layout e configuração das tabs
│   ├── login/               # Rotas públicas: Login / Cadastro
│   │   ├── index.tsx        # Tela de Login
│   │   └── register.tsx     # Tela de Cadastro
│   ├── components/          # Componentes específicos de rota (separados por rota quando necessário)
│   ├── settings/            # Tela de configurações do usuário
│   └── _layout.tsx          # Layout global do app (providers, navegadores)
├── src/
│   ├── services/
│   │   └── api.ts           # Configuração do Axios (baseURL, interceptors)
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utilitários (formatação, máscaras)
│   ├── contexts/            # React Contexts / Providers
│   └── types/               # Tipagens TypeScript
├── assets/                  # Imagens, fontes e ícones
├── .expo/                   # Configurações do Expo (gerado)
├── package.json
└── README.md
```

Observação: alguns nomes e níveis podem variar conforme a árvore real do repositório — usei exemplos comuns para tornar a visualização legível.

## 🚀 Como Rodar

### Pré-requisitos
- Node.js instalado.
- Celular com o app Expo Go ou Emulador (Android Studio/Xcode).

### Passo a Passo

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/vortex-desafio-frontend-mobile.git
cd vortex-desafio-frontend-mobile
```

Instale as dependências:
```bash
npm install
```

Configure a API:

Abra o arquivo src/services/api.ts e atualize a baseURL para o IP da sua máquina local:

```ts
// Exemplo para emulador Android
const api = axios.create({ baseURL: "http://10.0.2.2:3000" });

// Exemplo para dispositivo físico na mesma rede
const api = axios.create({ baseURL: "http://192.168.1.XX:3000" });
```

Inicie o projeto:
```bash
npx expo start -c
```

Execute:
- Escaneie o QR Code com seu celular (Android/iOS) ou
- pressione "a" para abrir no emulador Android.

🎨 Design System

O app respeita as configurações de tema do sistema operacional do usuário.

Modo — Características

Light ☀️
- Fundo: zinc-50
- Cartões: brancos
- Texto: zinc-900

Dark 🌙
- Fundo: zinc-950
- Cartões: zinc-900
- Texto: branco
