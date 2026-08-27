
let saldo = 0;

function formatear(valor) {
  return "$" + valor.toLocaleString("es-CO", { maximumFractionDigits: 2 });
}
function depositar(monto) {
  if (Number.isNaN(monto) || monto <= 0) {
    return { ok: false, mensaje: "El monto de depósito debe ser mayor que cero." };
  }
  saldo += monto;
  return { ok: true, mensaje: `Depósito de ${formatear(monto)} realizado.` };
}
function retirar(monto) {
  if (Number.isNaN(monto) || monto <= 0) {
    return { ok: false, mensaje: "El monto de retiro debe ser mayor que cero." };
  }
  if (monto > saldo) {
    return { ok: false, mensaje: "Saldo insuficiente para realizar el retiro." };
  }
  saldo -= monto;
  return { ok: true, mensaje: `Retiro de ${formatear(monto)} realizado.` };
}


const setupSection = document.getElementById("setup");
const accountSection = document.getElementById("account");
const initialBalanceInput = document.getElementById("initial-balance");
const balanceEl = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const movementsList = document.getElementById("movements-list");

document.getElementById("btn-create").addEventListener("click", () => {
  const inicial = initialBalanceInput.value === "" ? 0 : Number(initialBalanceInput.value);
  if (Number.isNaN(inicial) || inicial < 0) {
    alert("El saldo inicial debe ser un número mayor o igual a cero.");
    return;
  }
  saldo = inicial;
  setupSection.classList.add("hidden");
  accountSection.classList.remove("hidden");
  actualizarSaldo();
  agregarMovimiento(`Cuenta abierta con saldo inicial de ${formatear(saldo)}.`, true);
});
document.getElementById("btn-deposit").addEventListener("click", () => {
  const resultado = depositar(Number(amountInput.value));
  agregarMovimiento(resultado.mensaje, resultado.ok);
  if (resultado.ok) {
    actualizarSaldo();
    amountInput.value = "";
  }
});
document.getElementById("btn-withdraw").addEventListener("click", () => {
  const resultado = retirar(Number(amountInput.value));
  agregarMovimiento(resultado.mensaje, resultado.ok);
  if (resultado.ok) {
    actualizarSaldo();
    amountInput.value = "";
  }
});


function actualizarSaldo() {
  balanceEl.textContent = formatear(saldo);
  balanceEl.classList.add("pulse");
  setTimeout(() => balanceEl.classList.remove("pulse"), 180);
}

function agregarMovimiento(mensaje, ok) {
  const empty = movementsList.querySelector(".movements-empty");
  if (empty) empty.remove();

  const hora = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const li = document.createElement("li");
  li.className = "movements-entry " + (ok ? "good" : "bad");
  li.innerHTML = `
    <span class="desc">${hora} — ${mensaje}</span>
    <span class="amount">${ok ? "✔" : "✘"}</span>
  `;
  movementsList.prepend(li);
}