# Fluxo

## Passo 1 - Iniciando o projeto

- Criar diretório 'mci-clientes-estatico'
- git init
- npm init
- Criar pasta www
- Criar index.html (html:5)
- npm install http-server --save-dev
- Criar .gitignore com node_modules
- node node_modules/http-server/bin/http-server www -p 9090
- Incluir no package.json -> "start": "http-server www -p 9090",
- npm start

## Passo 2 - Grunt
- npm install grunt -D
- Mover index.html para src
- https://gruntjs.com/sample-gruntfile
- Executar, toma erro pela falta do Gruntfile.js
```js
module.exports = function(grunt) {
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });
};
```

- https://github.com/gruntjs/grunt-contrib-copy
- npm install grunt-contrib-copy -D

```js
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: '**',
                dest: 'www',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};
```
- Renomear arquivo para principal.html e rodar grunt novamente, precisamos limpar o destino...
- https://github.com/gruntjs/grunt-contrib-clean
- npm install grunt-contrib-clean --save-dev

```js
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: '**',
                dest: 'www',
            }
        },
        clean: ['www']
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'copy']);
};
```

- Queria que fosse automático, que o grunt ficasse "observando" as mudanças...
- https://github.com/gruntjs/grunt-contrib-watch
- npm install grunt-contrib-watch -D

```js
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: '**',
                dest: 'www',
            }
        },
        clean: ['www'],
        watch: {
            files: ['src/**/*.*'],
            tasks: ['clean', 'copy']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'copy', 'watch']);
};
```

- Meu dedo está cansado, não quero fazer F5

```html
<body>
    Página inicial do contexto estático
    <script src="//localhost:35729/livereload.js"></script>
</body>
```

```js
watch: {
    files: ['src/**/*.*'],
    tasks: ['clean', 'copy'],
    options: {
        livereload: true
    }
}
```

- Cansei desse negócio de fazer npm start...
- https://github.com/gruntjs/grunt-contrib-connect
- npm install grunt-contrib-connect --save-dev
- Versão final do Gruntfile.js
```js
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: '**',
                dest: 'www',
            }
        },
        clean: ['www'],
        connect: {
            server: {
                options: {
                    base: 'www',
                    port: 9090
                }
            }
        },
        watch: {
            files: ['src/**/*.*'],
            tasks: ['clean', 'copy'],
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['clean', 'copy', 'connect', 'watch']);
};

```

- Ok, podemos já dá pra começar!

## Passo 3 - O CRUD

- http://www.codemag.com/Article/1511031/CRUD-in-HTML-JavaScript-and-jQuery
- Listagem de Produtos:
```html
<h1>Clientes</h1>
<h2>Listagem</h2>
table>thead>tr>(th>lorem1)*3
tbody>(tr>(td>lorem4)*3)*5
```
- https://docs.emmet.io/cheatsheet-a5.pdf
```html
<tr>
    <th>MCI</th>
    <th>Nome</th>
    <th>Ações</th>
</tr>
```
- Temos que dar vida a nossa página: JavaScript!
- Criar script.js
- <script src="script.js"></script> antes do script de reload
```js
(function (undefined) {
    'use strict';

    console.log('Passou por aqui!');
})();
```
- Ver log no console do developer tools
- Criar lista de clientes no js - Escopo de bloco/função:
```js
(function (undefined) {
    'use strict';

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

    console.log('Quantidade de clientes: ' + clientes.length);
})();
```
- Atualizando a lista de clientes via API do DOM:
```js
(function (undefined) {
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
})();
```

- Isolando responsabilidades / Hoisting

```js
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
```

- Melhorando a qualidade do código - JShint
- Criar arquivo .jshintrc
- Instalar a dependência jshint - npm install grunt-contrib-jshint -D
- Criar a task 'dist'
- Ajustar o Gruntfile:
```js
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: '**',
                dest: 'www',
            }
        },
        clean: ['www'],
        connect: {
            server: {
                options: {
                    base: 'www',
                    port: 9090
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            dev: {
                options: {
                    force: true
                },
                files: {
                    src: ['src/**/*.js'],
                }
            },
            dist: {
                files: {
                    src: ['src/**/*.js'],
                }
            }
        },
        watch: {
            files: ['src/**/*.*'],
            tasks: ['clean', 'jshint:dev', 'copy'],
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['clean', 'jshint:dev', 'copy', 'connect', 'watch']);
    grunt.registerTask('dist', ['clean', 'jshint:dist', 'copy']);
};
```

## Passo 4 - Obtendo dados "reais" (AJAX sem JQuery e com JQuery)
- Instalando JQuery - npm install jquery -D
- Ajustar tarefa de copy:
```js
copy: {
    main: {
        files: [{
            expand: true,
            cwd: 'src',
            src: '**',
            dest: 'www'
        }, {
            src: 'node_modules/jquery/dist/jquery.min.js',
            dest: 'www/jquery.min.js'
        }]
    }
},
```
- Incluir o jquery na página (AJAX sem JQuery e com JQuery)
- Testar o jquery:
```js
function init() {
    console.log('Testando jquery: ' +  jQuery().jquery);
    console.log('Testando jquery: ' +  $().jquery);
    var clientes = recuperaClientes();
    atualizaListaClientes(clientes);
}
```
- Ajuste do array para forEach
- Recuperar a lista de clientes sem JQuery e com JQuery:
- Single thread
```js
(function (undefined) {
    init();

    function init() {
        // 1 versão
        recuperaClientes(function (clientes) {
            atualizaListaClientes(clientes);
        });

        // 2 versão
        recuperaClientes(atualizaListaClientes);
    }

    function recuperaClientes(callback) {
        // 1a. Versão
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/mci-clientes-api/api/clientes', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var resposta = JSON.parse(xhr.responseText);
                callback(resposta.listaClientes);
            }
        };
        xhr.send();

        // 2a. Versão
        $.ajax({
            url: '/mci-clientes-api/api/clientes',
            success: function (resposta) {
                callback(resposta.listaClientes);
            }
        });

        // 3a. Versão
        $.get('/mci-clientes-api/api/clientes', function (resposta) {
            callback(resposta.listaClientes);
        });
    }

    function atualizaListaClientes(clientes) {
        clientes.forEach(function (cliente) {
            $('#tblClientes tr:last').after(
                '<tr><td>' + cliente.mci + '</td><td>' + cliente.nome + '</td><td></td></tr>'
            );
        });
    }
})();
```
- Ajustar a URL do request AJAX para Weblogic
- Problema CORS / proxy reverso
- Incluir as linhas abaixo no arquivo /etc/apache2/sites-enabled/default-ssl.conf:
```
ProxyPass          /mci-clientes-api    http://localhost:7001/mci-clientes-api
ProxyPassReverse   /mci-clientes-api    http://localhost:7001/mci-clientes-api

ProxyPass          /mci-clientes        http://127.0.0.1:9090/
ProxyPassReverse   /mci-clientes        http://127.0.0.1:9090/
```

## Passo 5 - Detalhar
- Primeiro vamos deixar a tela mais bonita
- Instalar bootstrap - npm install -D bootstrap
- Ajustar copy
```js
copy: {
    main: {
        files: [{
            expand: true,
            cwd: 'src',
            src: '**',
            dest: 'www'
        }, {
            expand: true,
            cwd: 'node_modules',
            flatten: true,
            src: [
                'jquery/dist/jquery.min.js',
                'bootstrap/dist/css/bootstrap.min.css',
                'bootstrap/dist/js/bootstrap.min.js'
            ],
            dest: 'www'
        }]
    }
},
```

- Incluir css e scripts na página, incluir classes do bootstrap:
```html
<body>
    <div class="jumbotron text-center">
        <h1>Clientes</h1>
    </div>

    <div class="container">
        <!-- Cabeçalho -->
        <div class="row">
            <h2>Listagem</h2>
        </div>
        <!-- FIM: Cabeçalho -->

        <!-- Tabela de Clientes -->
        <div class="row">
            <table id="tblClientes" class="table">
                <thead>
                    <tr>
                        <th>MCI</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <!-- FIM: Tabela de Clientes -->
    </div>

    <!-- Modal Detalhar -->
    <div class="modal fade" id="mdlDetalhaCliente" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <table id="tblDetalhaCliente" class="table">
                        <thead>
                            <tr>
                                <th>MCI</th>
                                <th>Nome</th>
                                <th>Documento</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- FIM: Modal Detalhar -->

    <script src="/mci-clientes/jquery.min.js"></script>
    <script src="/mci-clientes/bootstrap.min.js"></script>
    <link rel="stylesheet" href="/mci-clientes/bootstrap.min.css">
    <script src="/mci-clientes/script.js"></script>
    <script src="//localhost:35729/livereload.js"></script>
</body>
```

- Ajustar js:
```js
var app = (function (undefined) {
    'use strict';

    function init() {
        recuperaClientes(function (resposta) {
            atualizaListaClientes(resposta.listaClientes);
        });
    }

    function recuperaClientes(callback) {
        $.get('/mci-clientes-api/api/clientes', callback);
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
                '</div></td></tr>'
            );
        });
    }

    return {
        init: init,
        detalharCliente: detalharCliente
    };
})();

app.init();
```

- Jumbotron ficou muito grande, vamos diminuí-lo
- Criar arquivo styles.css
```css
.jumbotron {
    padding: 0.5em 0.6em;
}

.jumbotron h1 {
    font-size: 2em;
}
```

## Passo 6 - Incluir
- Colocar um botão de inclusão na página

```html
<!-- FIM: Tabela de Clientes -->

<div class="row">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#mdlIncluirCliente">
        Incluir
    </button>
</div>
```

- Criar formulário de inclusão, pode ser logo após a div que fecha a row do botão de inclusão:
```html
<!-- Modal Incluir -->
<div class="modal fade" id="mdlIncluirCliente" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="inputNome">Nome</label>
                        <input type="text" class="form-control" id="inputNome" placeholder="Digite o nome">
                    </div>
                    <div class="form-group">
                        <label for="inputDocumento">Documento</label>
                        <input type="text" class="form-control" id="inputDocumento" placeholder="Digite o documento">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="app.incluirCliente()">Incluir</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<!-- FIM: Modal Incluir -->
```

- Criar função de inclusão e disponibilizá-la no objeto app:

```js
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

return {
    init: init,

    // Código novo aqui!
    detalharCliente: detalharCliente,
    incluirCliente: incluirCliente
};
```

## Passo 7 - Alterar
- Logo no começo do nosso arquivo script.js vamos criar uma variável para guardar o cliente atualmente em edição:
```js
var app = (function (undefined) {
    'use strict';

    // Código novo aqui!
    var clienteEmEdicao;

    function init() {
        recuperaClientes(function (resposta) {
            atualizaListaClientes(resposta.listaClientes);
        });
    }

```

- Agora vamos ajustar a função que insere os clientes na listagem, incluindo um botão em cada linha de tabela que colocará o cliente em edição:
```js
function atualizaListaClientes(clientes) {
    $('#tblClientes tbody').empty();
    clientes.forEach(function (cliente) {
        $('#tblClientes tbody').append(
            '<tr><td>' + cliente.mci + '</td>' +
            '<td>' + cliente.nome + '</td>' +
            '<td><div class="btn-group" role="group">' +
            '<button type="button" class="btn btn-info" onclick="app.detalharCliente(' + cliente.mci + ')">Detalhar</button>' +

            // Código novo aqui!
            '<button type="button" class="btn btn-info" onclick="app.colocarClienteEmEdicao(' + cliente.mci + ')">Alterar</button>' +

            '</div></td></tr>'
        );
    });
}
```

- Vamos criar as duas funções, uma que coloca o cliente em edição e exibe a modal para edição e outra que persiste a edição via AJAX no servidor, lembrando que estas funções deve ser expostas no objeto global 'app':

```js
// Nova função
function colocarClienteEmEdicao(mci) {
    $.get('/mci-clientes-api/api/clientes/' + mci, function (cliente) {
        clienteEmEdicao = cliente;
        $('#mciClienteEdicao').text(clienteEmEdicao.mci);
        $('#inputAlterarNome').val(clienteEmEdicao.nome);
        $('#inputAlterarDocumento').val(clienteEmEdicao.documento);
        $('#mdlAlterarCliente').modal('show');
    });
}

// Nova função
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

return {
    init: init,
    detalharCliente: detalharCliente,
    incluirCliente: incluirCliente,

    // Código novo aqui
    alterarCliente: alterarCliente,
    colocarClienteEmEdicao: colocarClienteEmEdicao
};
```

- Agora só falta ajustar o html colocando a nova modal logo abaixo do fim da modal de inclusão:
```html
<!-- Modal Alterar -->
<div class="modal fade" id="mdlAlterarCliente" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2>MCI: <span id="mciClienteEdicao"></span></h2>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="inputNome">Nome</label>
                        <input type="text" class="form-control" id="inputAlterarNome" placeholder="Digite o nome">
                    </div>
                    <div class="form-group">
                        <label for="inputDocumento">Documento</label>
                        <input type="text" class="form-control" id="inputAlterarDocumento" placeholder="Digite o documento">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="app.alterarCliente()">Salvar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<!-- FIM: Modal Alterar -->
```

## Passo 8 - Excluir
- Nosso último passo é excluir um cliente da lista, primeiro incluiremos o botão de exclusão na tabela de clientes:
```js
function atualizaListaClientes(clientes) {
    $('#tblClientes tbody').empty();
    clientes.forEach(function (cliente) {
        $('#tblClientes tbody').append(
            '<tr><td>' + cliente.mci + '</td>' +
            '<td>' + cliente.nome + '</td>' +
            '<td><div class="btn-group" role="group">' +
            '<button type="button" class="btn btn-info" onclick="app.detalharCliente(' + cliente.mci + ')">Detalhar</button>' +
            '<button type="button" class="btn btn-info" onclick="app.colocarClienteEmEdicao(' + cliente.mci + ')">Alterar</button>' +

            // Código novo aqui!
            '<button type="button" class="btn btn-danger" onclick="app.excluirCliente(' + cliente.mci + ')">Excluir</button>' +

            '</div></td></tr>'
        );
    });
}
```

- Agora é só criar o método que de fato exclui e exportá-lo para o objeto global:

```js
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
```

## Bug quando a lista tem somente um cliente
- O bug é explicado aqui: [Missing Brackets At JSON One-Element Arrays In Jersey](https://blogs.oracle.com/japod/missing-brackets-at-json-one-element-arrays-in-jersey)
- Mas a solução melhor é incluir a dependência abaixo no pom.xml
```xml
<dependency>
    <groupId>org.codehaus.jackson</groupId>
    <artifactId>jackson-jaxrs</artifactId>
    <version>1.9.0</version>
</dependency>
```

## Desafios:
- Desativar o botão de incluir/salvar durante a inclusão/alteração se o formulário estiver inválido
- Mensagens de sucesso/fracasso ao efetuar operações no servidor (Registro incluído com sucesso/Erro ao salvar, etc)
- Spinner com overlay enquanto uma operação estiver sendo executada no servidor
