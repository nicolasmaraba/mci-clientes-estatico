# Fluxo

## Passo 1 - Iniciando o projeto

- Criar diretório
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
- grunt.loadNpmTasks('grunt-contrib-connect');

```js
connect: {
    server: {
        options: {
            base: 'www',
            port: 9090
        }
    }
},
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
    console.log('Passou por aqui!');
})();
```
- Ver log no console do developer tools
- Criar lista de clientes no js - Escopo de bloco/função:
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
- 


jshint: {
    files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    options: {
    globals: {
        jQuery: true
    }
    }
},
## Passo 4 - Obtendo dados "reais"
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
- Incluir o jquery na página
- Testar o jquery:
```js
function init() {
    console.log('Testando jquery: ' +  jQuery().jquery);
    console.log('Testando jquery: ' +  $().jquery);
    var clientes = recuperaClientes();
    atualizaListaClientes(clientes);
}
```
- Recuperar a lista de clientes via JQuery:
```js
(function (undefined) {
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
```
- Ajustar a url do get para weblogic
- problema CORS / proxy reverso

## Passo 5 - Detalhar
- Instalar bootstrap - npm install -D bootstrap
- Ajustar copoy
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