// Tipado para seguridad de datos
export interface TasaData {
  bcv: number;
  paralelo: number;
  binanceP2P: number;
  pesoCucuta: number; // Tasa de cambio en La Parada/Cúcuta
  ultimaActualizacion: string;
}

// Simulador de fetch (aquí conectarás tu API real luego)
export const obtenerTasas = async (): Promise<TasaData> => {
  // En producción usarías: fetch('https://api.criptoya.com/v1/binancep2p/ves/usdt/5')
  return {
    bcv: 36.45,
    paralelo: 38.90,
    binanceP2P: 38.10,
    pesoCucuta: 3950.00, // COP por USD
    ultimaActualizacion: new Date().toLocaleTimeString()
  };
};