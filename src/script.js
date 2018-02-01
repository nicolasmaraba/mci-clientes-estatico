var app = (function (undefined) {
    'use strict';

    var clienteEmEdicao;

    function init() {
        console.log('Aplicação iniciada!');
        recuperaClientes(function (clientes) {
            atualizaListaClientes(clientes);
        });
    }

    function recuperaClientes(callback) {
        // 1a. Versão
        // var xhr = new XMLHttpRequest();
        // xhr.open('GET', '/mci-clientes-api/api/clientes', true);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         var resposta = JSON.parse(xhr.responseText);
        //         callback(resposta.listaClientes);
        //     }
        // };
        // xhr.send();

        // 2a. Versão
        // $.ajax({
        //     url: '/mci-clientes-api/api/clientes',
        //     success: function (resposta) {
        //         callback(resposta.listaClientes);
        //     }
        // });

        // 3a. Versão
        $.get('/mci-clientes-api/api/clientes', function (resposta) {
            callback(resposta.listaClientes);
        });
    }

    function detalharCliente(mci) {
        $.get('/mci-clientes-api/api/clientes/' + mci, function (cliente) {
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
                '<button type="button" class="btn btn-info" onclick="app.colocarClienteEmEdicao(' + cliente.mci + ')">Alterar</button>' +
                '<button type="button" class="btn btn-danger" onclick="app.excluirCliente(' + cliente.mci + ')">Excluir</button>' +
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

        $.ajax({
            url: '/mci-clientes-api/api/clientes',
            type: 'POST',
            data: JSON.stringify(cliente),
            contentType: 'application/json',
            success: function () {
                $('#inputNome').val('');
                $('#inputDocumento').val('');
                $('#mdlIncluirCliente').modal('hide');
                init();
            }
        });
    }

    function colocarClienteEmEdicao(mci) {
        $.get('/mci-clientes-api/api/clientes/' + mci, function (cliente) {
            clienteEmEdicao = cliente;
            $('#mciClienteEdicao').text(clienteEmEdicao.mci);
            $('#inputAlterarNome').val(clienteEmEdicao.nome);
            $('#inputAlterarDocumento').val(clienteEmEdicao.documento);
            $('#mdlAlterarCliente').modal('show');
        });
    }

    function alterarCliente() {
        clienteEmEdicao.nome = $('#inputAlterarNome').val().trim();

        if (!clienteEmEdicao.nome) {
            window.alert('Nome não pode ser vazio!');
            return;
        }

        clienteEmEdicao.documento = $('#inputAlterarDocumento').val().trim();
        if (!clienteEmEdicao.documento) {
            window.alert('Documento não pode ser vazio!');
            return;
        }

        $.ajax({
            url: '/mci-clientes-api/api/clientes/' + clienteEmEdicao.mci,
            type: 'PUT',
            data: JSON.stringify(clienteEmEdicao),
            contentType: 'application/json',
            success: function () {
                $('#mdlAlterarCliente').modal('hide');
                init();
            }
        });
    }

    function excluirCliente(mci) {
        if(window.confirm('Deseja realmente excluir o cliente?')) {
            $.ajax({
                url: '/mci-clientes-api/api/clientes/' + mci,
                type: 'DELETE',
                success: function() {
                    init();
                }
            });
        }
    }

    return {
        init: init,
        detalharCliente: detalharCliente,
        incluirCliente: incluirCliente,
        alterarCliente: alterarCliente,
        colocarClienteEmEdicao: colocarClienteEmEdicao,
        excluirCliente: excluirCliente
    };
})();

app.init();