(function (undefined) {
    'use strict';
    
    init();

    function init() {
        recuperaClientes(function (clientes) {
            atualizaListaClientes(clientes);
        });
    }

    function recuperaClientes(callback) {
        $.get('clientes.json', callback);
    }

    function atualizaListaClientes(clientes) {
        clientes.forEach(function (cliente) {
            console.log(cliente);
            $('#tblClientes tr:last').after(
                '<tr><td>' + cliente.mci + '</td><td>' + cliente.nome + '</td><td></td></tr>'
            );
        });
    }
})();