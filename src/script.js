var app = (function (undefined) {
    'use strict';

    function init() {
        console.log('Aplicação iniciada!');
        recuperaClientes(function (clientes) {
            atualizaListaClientes(clientes);
        });
    }

    function recuperaClientes(callback) {
        $.get('clientes.json', callback);
    }

    function detalharCliente(mci) {
        $.get(mci + '.json', function (cliente) {
            $('#tblDetalhaCliente tbody').empty();
            $('#tblDetalhaCliente tbody').append(
                '<tr><td>' + cliente.mci + '</td><td>' + cliente.nome + '</td><td>' + cliente.documento + '</td></tr>'
            );
            $('#mdlDetalhaCliente').modal('show');
        });
    }

    function atualizaListaClientes(clientes) {
        $('#tblClientes tbody').empty();
        clientes.forEach(function (cliente) {
            $('#tblClientes tbody').append(
                '<tr><td>' + cliente.mci + '</td>' + 
                '<td>' + cliente.nome + '</td>' + 
                '<td><div class="btn-group" role="group">' +
                '<button type="button" class="btn btn-info" onclick="app.detalharCliente(' + cliente.mci + ')">Detalhar</button>' +
                '</div></td></tr>'
            );
        });
    }

    function incluirCliente() {
        var cliente = {};
        cliente.nome = $('#inputNome').val().trim();

        if (!cliente.nome) {
            window.alert('Nome não pode ser vazio!');
            return;
        }

        cliente.documento = $('#inputDocumento').val().trim();
        if (!cliente.documento) {
            window.alert('Documento não pode ser vazio!');
            return;
        }

        
    }

    return {
        init: init,
        detalharCliente: detalharCliente,
        incluirCliente: incluirCliente
    };
})();

app.init();