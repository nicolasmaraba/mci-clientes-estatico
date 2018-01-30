(function (undefined) {
    init();

    function init() {
        var clientes = recuperaClientes();
        atualizaListaClientes(clientes);
    }

    function recuperaClientes() {
        var clientes = [];
        clientes.push({
            mci: 1,
            nome: 'Chewbacca',
            documento: '123.456'
        });

        clientes.push({
            mci: 2,
            nome: 'Leia',
            documento: '111.222'
        });

        clientes.push({
            mci: 3,
            nome: 'Luke',
            documento: '333.222'
        });

        return clientes;
    }

    function atualizaListaClientes(clientes) {
        var tblClientes = document.getElementById('tblClientes').getElementsByTagName('tbody')[0];

        for (var i = 0; i < clientes.length; i++) {
            var novaLinha = tblClientes.insertRow(tblClientes.rows.length);

            var celulaMCI = novaLinha.insertCell(0);
            var textoMCI = document.createTextNode(clientes[i].mci);
            celulaMCI.appendChild(textoMCI);

            var celulaNome = novaLinha.insertCell(1);
            var textoNome = document.createTextNode(clientes[i].nome);
            celulaNome.appendChild(textoNome);
        }
    }
})();