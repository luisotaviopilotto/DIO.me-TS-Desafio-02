(function () {
  var _a;
  const $ = (query) => document.querySelector(query);
  function formatarData(data) {
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  const controlePatio = {
    adicionar(veiculo) {
      var _a;
      const patio = document.querySelector("#patio");
      if (!patio) {
        console.error("Elemento #patio não encontrado.");
        return;
      }
      const row = document.createElement("tr");
      const entradaFormatada = formatarData(new Date(veiculo.entrada));
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${
          veiculo.placa
        }</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${
          veiculo.marca
        } ${veiculo.modelo}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${entradaFormatada}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            veiculo.estado
              ? "bg-green-100 text-green-800"
              : "bg-zinc-100 text-zinc-800"
          }">${veiculo.estado ? "Estacionado" : "Saído"}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button class="text-red-600 hover:text-red-900 registrar-saida" ${
            veiculo.estado
              ? ""
              : "disabled style='opacity:0.5;cursor:not-allowed;'"
          }>${veiculo.estado ? "Registrar Saída" : "Saída Registrada"}</button>
          <button class="text-gray-600 hover:text-gray-900 excluir ml-3">Excluir</button>
        </td>
      `;
      patio.appendChild(row);
      const spanStatus = row.querySelector("span");
      const botaoSaida = row.querySelector(".registrar-saida");
      if (veiculo.estado && botaoSaida && spanStatus) {
        botaoSaida.addEventListener("click", () => {
          veiculo.estado = false;
          const entradaDate = new Date(veiculo.entrada);
          const saidaDate = new Date();
          const diffMs = saidaDate.getTime() - entradaDate.getTime();
          const diffMin = Math.floor(diffMs / 1000 / 60);
          const horas = Math.floor(diffMin / 60);
          const minutos = diffMin % 60;
          alert(`Tempo no estacionamento: ${horas}h ${minutos}min`);
          spanStatus.textContent = "Saído";
          spanStatus.className =
            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-zinc-100 text-zinc-800";
          botaoSaida.textContent = "Saída Registrada";
          botaoSaida.disabled = true;
          botaoSaida.style.opacity = "0.5";
          botaoSaida.style.cursor = "not-allowed";
          const veiculos = controlePatio.ler();
          const index = veiculos.findIndex(
            (v) => v.placa === veiculo.placa && v.entrada === veiculo.entrada
          );
          if (index !== -1) {
            veiculos[index].estado = false;
            controlePatio.salvar(veiculos);
          }
        });
      }
      (_a = row.querySelector(".excluir")) === null || _a === void 0
        ? void 0
        : _a.addEventListener("click", () => {
            if (confirm("Tem certeza que deseja excluir este veículo?")) {
              let veiculos = controlePatio.ler();
              veiculos = veiculos.filter(
                (v) =>
                  !(v.placa === veiculo.placa && v.entrada === veiculo.entrada)
              );
              controlePatio.salvar(veiculos);
              row.remove();
            }
          });
    },
    ler() {
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    },
    salvar(veiculos) {
      localStorage.setItem("patio", JSON.stringify(veiculos));
    },
    renderizar() {
      const veiculos = this.ler();
      veiculos.forEach((v) => this.adicionar(v));
    },
  };
  controlePatio.renderizar();
  (_a = $("#cadastrar")) === null || _a === void 0
    ? void 0
    : _a.addEventListener("click", () => {
        var _a, _b, _c;
        const placa =
          (_a = $("#placa")) === null || _a === void 0
            ? void 0
            : _a.value.trim();
        const marca =
          (_b = $("#marca")) === null || _b === void 0
            ? void 0
            : _b.value.trim();
        const modelo =
          (_c = $("#modelo")) === null || _c === void 0
            ? void 0
            : _c.value.trim();
        if (!placa || !marca || !modelo) {
          alert("Preencha todos os campos.");
          return;
        }
        const novoVeiculo = {
          placa,
          marca,
          modelo,
          estado: true,
          entrada: new Date().toISOString(),
        };
        const veiculos = controlePatio.ler();
        veiculos.push(novoVeiculo);
        controlePatio.salvar(veiculos);
        controlePatio.adicionar(novoVeiculo);
        $("#placa").value = "";
        $("#marca").value = "";
        $("#modelo").value = "";
      });
})();
