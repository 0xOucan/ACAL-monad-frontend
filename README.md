# 🛶 ACAL - Tu Canoa a Monad

![ACAL Logo](./public/placeholder-logo.png)

**Tagline:** "Tu canoa digital: de pesos mexicanos directo a Monad"  
**Ticker:** $ACL  
**Network:** Monad Testnet (Chain ID: 10143)

## 📱 Descripción del Proyecto

ACAL es una Progressive Web App (PWA) que conecta el mundo tradicional mexicano con la blockchain de Monad. Inspirado en las canoas de la antigua Tenochtitlán que servían como puente entre mundos, ACAL es tu canoa digital para intercambiar pesos mexicanos por tokens MON de forma peer-to-peer, usando OXXO como método de pago.

### ✨ Características Principales

- 🎨 **Estética Pixel Art Azteca**: Diseño retro inspirado en códices prehispánicos
- 📱 **PWA Instalable**: Funciona como app nativa en Android/iOS
- 🔒 **Escrow Inteligente**: Sistema de garantía con bonos para proteger ambas partes
- 🏪 **Integración OXXO**: Pagos en efectivo en más de 20,000 tiendas
- ⚡ **Máximo 5 Clics**: Flujos optimizados para máxima simplicidad
- 🌊 **Mobile-First**: Diseñado para dispositivos móviles

## 🎨 Paleta de Colores

- **Turquesa** `#40E0D0` → Agua/Flujo
- **Azul Marino** `#002147` → Confianza/Tecnología  
- **Dorado** `#FFD700` → Valor/Prosperidad
- **Obsidiana** `#1C1C1C` → Raíz Cultural/Poder

## 🏗️ Arquitectura del Sistema

### Smart Contracts (Monad Testnet)

- **AcalEscrow**: `0x9486f6C9d28ECdd95aba5bfa6188Bbc104d89C3e`
  - Sistema de escrow 2-of-3 multisig
  - Bonos de protección para maker/taker
  - Firmas criptográficas EIP-712

- **SponsorPool**: `0x64A47d84dE05B9Efda4F63Fbca2Fc8cEb96E6816`
  - Pool de subsidios automatizado
  - Gestión de bonos de insurance
  - Distribución de fondos de patrocinio

### Parámetros del Contrato

- **Subsidio**: 0.12 MON (por transacción completada)
- **Bono Maker**: 0.05 MON 
- **Bono Taker**: 0.05 MON
- **Rango de Intercambio**: 100-500 MXN

## 📱 Pantallas y Flujos de Usuario

### 🏠 Pantalla Principal (`/`)

**Historia del Onboarding:**
> "En la antigua Tenochtitlán, las canoas eran el puente entre mundos. Hoy, ACAL es tu canoa digital: de pesos mexicanos directo a Monad, en pocos clics y sin complicaciones."

**Componentes:**
- Hero con animación de canoa pixelada
- Botones principales: "Soy Maker" / "Soy Taker" 
- Conexión de wallet Monad
- Estadísticas en tiempo real

### 👨‍💼 Flujo Maker (`/maker`)

**Objetivo:** Usuario con pesos mexicanos que quiere MON

#### 1️⃣ Subida de QR (`/maker` - Componente: `qr-upload.tsx`)
- **Input**: Foto del QR OXXO SPIN
- **Validación**: Hash del QR para verificación
- **Estado**: Canoa vacía esperando carga

#### 2️⃣ Confirmación de Monto (`/maker` - Componente: `amount-confirmation.tsx`)
- **Rango**: 100-500 MXN
- **Cálculos automáticos**:
  - Comisión: 12 MXN
  - MON a recibir: `(mxn - 12) / tasa_cambio`
  - CR (Código de Referencia): Hash único
- **Validación**: Fondos suficientes en QR

#### 3️⃣ Preview de Orden (`/maker` - Componente: `order-preview.tsx`)
- **Mostrar**: Monto, comisión, CR, hash del QR
- **Expiración**: 30 minutos automático
- **Botón**: "Publicar Orden" (llamada a contrato)

#### 4️⃣ Esperando Taker (`/maker` - Componente: `waiting-for-taker.tsx`)
- **Estado**: `Open` → Orden publicada en blockchain
- **Animación**: Canoa navegando en olas pixeladas
- **Info**: CR único, tiempo restante
- **Acciones**: Cancelar orden (reembolso de bono)

### 👨‍🎓 Flujo Taker (`/taker`)

**Objetivo:** Usuario con MON que quiere pesos mexicanos

#### 1️⃣ Marketplace (`/taker` - Componente: `order-marketplace.tsx`)
- **Lista**: Órdenes activas en cards pixel art
- **Filtros**: Por monto, tiempo restante
- **Estados visuales**:
  - 🛶 `Open`: Canoa vacía
  - 👤 `Locked`: Canoa con pasajero
  - ✅ `Completed`: Canoa dorada
  - ❌ `Cancelled`: Canoa rota
  - ⏰ `Expired`: Canoa hundida

#### 2️⃣ Detalles de Orden (`/taker` - Componente: `order-details.tsx`)
- **Info**: Monto MXN, CR, tiempo de expiración
- **Requerimientos**: MON + bono (1.05 MON total)
- **Botón**: "Bloquear Orden" (llamada a contrato)

#### 3️⃣ Depósito en Escrow (`/taker` - Componente: `escrow-deposit.tsx`)
- **Transacción**: `lockOrder()` con 1.05 MON
- **Estado**: Cambio a `Locked`
- **Confirmación**: Hash de transacción

#### 4️⃣ Descarga de QR (`/taker` - Componente: `qr-download.tsx`)
- **Recibir**: QR OXXO del maker
- **Instrucciones**: Cómo cobrar en OXXO
- **Info**: CR para presentar en tienda

#### 5️⃣ Confirmación de Pago (`/taker` - Componente: `transaction-complete.tsx`)
- **Botón**: "He recibido el dinero"
- **Acción**: `completeOrder()` con firmas criptográficas
- **Resultado**: Liberación de fondos + subsidio

### 💳 Pantalla Wallet (`/wallet`)

**Componentes:**
- **Conexión**: `wallet-connection.tsx`
- **Red**: `network-switch.tsx` (auto-switch a Monad)
- **Transacciones**: `transaction-monitor.tsx`

**Información mostrada:**
- Balance MON
- Historial de órdenes
- Transacciones pendientes
- Estado de bonos

## 🎮 Elementos UI Pixel Art

### Componentes Visuales (`/components/pixel-art/`)

- **`aztec-border.tsx`**: Marcos geométricos de códices
- **`aztec-pattern.tsx`**: Patrones decorativos prehispánicos  
- **`canoe.tsx`**: Canoa principal en diferentes estados
- **`currency-icon.tsx`**: Íconos MXN/MON pixelados
- **`loading-waves.tsx`**: Animaciones de agua 8-bit
- **`order-status.tsx`**: Estados visuales de órdenes
- **`pixel-button.tsx`**: Botones con estética retro

### Estados de Orden

```typescript
type OrderStatus = "Open" | "Locked" | "Completed" | "Cancelled" | "Expired"

const OrderIcons = {
  Open: "🛶",      // Canoa vacía
  Locked: "👤🛶",  // Canoa con pasajero  
  Completed: "✨🛶", // Canoa dorada
  Cancelled: "💥🛶", // Canoa rota
  Expired: "🌊🛶"   // Canoa hundida
}
```

## ⚙️ Instalación y Desarrollo

### Requisitos Previos

- Node.js 18+
- pnpm
- Wallet compatible con Monad Testnet

### Comandos

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Servidor de producción
pnpm start

# Linting
pnpm lint
```

### Variables de Entorno

```env
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_ESCROW_CONTRACT=0x9486f6C9d28ECdd95aba5bfa6188Bbc104d89C3e
NEXT_PUBLIC_SPONSOR_POOL=0x64A47d84dE05B9Efda4F63Fbca2Fc8cEb96E6816
```

## 🔧 Integración Blockchain

### Funciones Principales

```typescript
// Crear orden (Maker)
await createOrder({
  crHash: "0x...",    // Hash del código de referencia
  hashQR: "0x...",    // Hash del QR OXXO
  mxn: 150,           // Monto en pesos
  expiry: timestamp   // Expiración
});

// Bloquear orden (Taker)  
await lockOrder({
  id: orderId,
  value: "1.05"       // MON + bono
});

// Completar orden (Taker)
await completeOrder({
  orderId: id,
  signatures: [makerSig, takerSig],
  action: { actionType: "Complete", evidenceHash, deadline }
});
```

### Red Monad Testnet

```typescript
const MONAD_TESTNET = {
  chainId: "0x29A",  // 10143 decimal
  chainName: "Monad Testnet",
  nativeCurrency: {
    name: "MON",
    symbol: "MON", 
    decimals: 18
  },
  rpcUrls: ["https://testnet-rpc.monad.xyz"],
  blockExplorerUrls: ["https://testnet-explorer.monad.xyz"]
}
```

## 🎯 Roadmap

### Fase 1: MVP Demo (Actual)
- ✅ Interfaz pixel art completa
- ✅ Flujos Maker/Taker simulados
- ✅ PWA instalable
- ✅ Integración básica con Monad

### Fase 2: Testnet
- 🔄 Integración real con contratos
- 🔄 Sistema de firmas EIP-712
- 🔄 API OXXO SPIN real
- 🔄 Pool de liquidez

### Fase 3: Mainnet
- ⏳ Auditoría de contratos
- ⏳ Programa de incentivos
- ⏳ Expansión a más exchanges
- ⏳ Token $ACL governance

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 🌊 Navegando hacia el Futuro

> *"Como las canoas que conectaron los lagos de Tenochtitlán, ACAL conecta las tradiciones mexicanas con el futuro descentralizado. Tu primer viaje a Monad comienza aquí."*

---

**Construido con 🇲🇽 para la comunidad Monad**

[GitHub](https://github.com/0xOucan/acal-monad-p2p) | [Demo](https://acal.app) | [Discord](https://discord.gg/monad)