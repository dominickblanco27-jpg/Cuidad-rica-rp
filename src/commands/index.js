import { registrar } from './registrar.js';
import { abrirServer } from './abrir-server.js';
import { cerrarServer } from './cerrar-server.js';
import { abrirVotacion } from './abrir-votacion.js';
import { anuncio } from './anuncio.js';
import { whitelistAceptada } from './whitelist-aceptada.js';
import { whitelistDenegada } from './whitelist-denegada.js';
import { sancionar } from './sancionar.js';
import { banear } from './banear.js';
import { calificarStaff } from './calificar-staff.js';
import { strikeAdministrativo } from './strike-administrativo.js';

export const commands = [
  registrar,
  abrirServer,
  cerrarServer,
  abrirVotacion,
  anuncio,
  whitelistAceptada,
  whitelistDenegada,
  sancionar,
  banear,
  calificarStaff,
  strikeAdministrativo,
];
