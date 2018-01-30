# Fluxo

## Passo 1 - Iniciando o projeto

- Criar diretório
- git init
- npm init
- Criar pasta www
- Criar index.html
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