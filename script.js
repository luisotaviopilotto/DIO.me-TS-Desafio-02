const data = new Date();
const dataFormatada = data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
});
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function patio() {
        function ler() { }
        function adicionar(veiculo) {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${veiculo.placa}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${veiculo.marca} ${veiculo.modelo}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${veiculo.entrada}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${veiculo.estado}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Estacionado</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button class="text-primary-600 hover:text-primary-900 mr-3">
          Editar
        </button>
        <button class="text-red-600 hover:text-red-900">
          Registrar Saída
        </button>
      </td>
      `;
            $("#patio").append(row);
        }
        function deletar() { }
        function salvar() { }
        function renderizar() { }
        return {
            ler,
            adicionar,
            deletar,
            salvar,
            renderizar,
        };
    }
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const placa = $("#placa").value;
        const marca = $("#marca").value;
        const modelo = $("#modelo").value;
        if (!placa || !marca || !modelo) {
            alert("Preencha todos os campos.");
            return;
        }
        patio().adicionar({
            marca,
            modelo,
            placa,
            estado: true,
            entrada: this.dataFormatada,
        });
    });
})();
