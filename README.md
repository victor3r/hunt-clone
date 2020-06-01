<h1 align="center">
<br>
  <img src="https://miro.medium.com/max/5450/1*EqkeQrcJTRl0keOIKMSmMA.png" alt="JavaScript" width="120">
<br>
<br>
Product hunt clone
</h1>

---

## Tecnologias

- **Node.JS**
  - Docker
  - Insomnia
- **React.JS**
- **React Native**

### Dependências Node.JS

- Express.JS (Micro-framework para lidar com rotas e views)
- Mongoose (ORM de bancos não relacionais com mongodb)
- Require-dir
- Nodemon (Para reiniciar automáticamente o servidor node quando **ouvir** uma alteração)

---

## Back-end

![Node.JS and Docker img](https://d262ilb51hltx0.cloudfront.net/max/1600/1*_MtS4HqN2srTcrSyet61DQ.jpeg)

### Node JS

É um interpretador que usa da V8 (engine do Google Chrome) no lado do back-end.
Node.js permite o uso do JavaScript fora dos navegadores.

**Full MVC**: quando se cria a parte visual do seu app junto do back-end, ou seja, o servidor e o front-end estão unidos e não separados.

**API REST**: separamos o back-end do front-end. O back-end serve apenas para manipular informações do banco de dados, receber requisições, enviar respostas, e temos o front-end separado, construído com uma biblioteca.

**Benefícios**:
**Rest**: oferece mais flexibilidade, conseguimos tratar com os dados de uma forma melhor. Trabalhamos com uma única api em várias plataformas.D

INICIANDO:

```bash
npm init -y
```

Vai criar um **package.json** (responsável por guardar todas as informações das dependências)

Instalando dependências:

```js
npm install express
```

Iniciando a aplicação:

> backend/src/server.js:

```js
// Importar o express
const express = require("express");

// Iniciando o express
const app = express();

// Ouvir a porta 3333 do navegador
app.listen(3333);
```

Executando no terminal ou cmd:

```bash
node src/server.js
```

### Rotas

Quando o usuário acessar localhost:3333 vamos retornar uma mensagem na tela

Primeira rota:

Antes do:

```js
app.listen(3333);
```

digite:

```js
app.get("/", (req, res) => {
  res.send("Hello World");
});
```

onde:
**get()** - Método http para listar informações do back-end

**"/"** - simboliza a rota raiz ou inicial

**req** - Simboliza a requisição que agente faz pro servidor, ele vai conter todos os detalhes e informações possíveis dessa requisição, podemos pegar: parámetros, corpo da requisição, cabeçalho, usuário que está fazendo a requisição, IP, autenticação, etc.

**res** - Resposta que vamos dar para a requisição, aqui vão estar todas as informações para gente devolver uma resposta para o usuário

**send()** - Função do express para retornar alguma coisa a requisição

Instalando e configurando o nodemon:

```bash
npm install -D nodemon
```

> backend/package.json

```json
"scripts": {
  "start": "nodemon src/server.js"
},
```

Onde:

**-D** Simboliza que é uma dependência só de desenvolvimento, não enterfere no código da app (não vamos instalar quando a aplicação dor no ar), cria uma secção no **package.json** chamada **devDependecies**.

Rodando a aplicação com nodemon:

```bash
npm start
```

---

## Instalar o MongoDB

**Docker** - Software que permite-nos fazer a containerização de recursos, de softwares ou de qualquer tipo de aplicação dentro da nossa máquina (para evitar conflitos entre apps, recursos, banco de dados, quando instalados directamente na nossa máquina).

Para não precisar mexer em qualquer coisa no nosso sistema. Então, vamos subir uma máquina virtual rodando o linux por trás, que vai conter a instalação do mongo (pode ser qualquer coisa), quando precisarmos alterar, deletar ou recriar fica muito fácil.

BAIXANDO:
[Docker](https://www.docker.com/products/docker-desktop)

Iniciando no terminal:

Instalar o mongodb

```bash
docker pull mongo
```

Executar o mongodb:

```bash
docker run --name mongodb -p 27017:27017 -d mongo
```

Onde:

**--name**: Para criar o nome do container

**-p 27017:27017**: Para redirecionar a porta, o mongo usa a porta 27017, então eu quero que quando eu acesse a porta 27017 (pode ser outra) redirecione para a porta do mongo 27017 (não pode ser alterada)

Para ver se a Database está mesmo funcionando, ver os schemas e muito mais, podemos usar o software [Robo3T](https://robomongo.org/download)

---

## Connectando a database

Uma **ORM** encapsula a lógica das operações do banco de dados através do código, ou seja, ao invés de usarmos querys ou a linguagem do banco de dados, vamos sempre usar apenas código JavaScript (para fazer deletes, inserts, updates, e muito mais.)

**O**: Object, **R**: Relational, **M**: Maping.

Instalando o mongoose:

```bash
npm install mongoose
```

> backend/src/server.js

```js
const mongoose = require("mongoose");

// Antes da primeira rota

// Iniciando a DB
mongoose.connect("mongodb://localhost:27017/backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

### Criando um model de produto

**model**: Model representa a forma dos dados. Os objetos do model armazenam dados recuperados do banco de dados.

**schema**: São coleções de objetos dentro de um determinado banco de dados, que organizam vários aspectos e são importantes para segmentação da segurança, facilitando a administração dos objetos e dos dados.

Iniciando

> backend/src/models/product.js

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

Onde:

**new mongoose.Schema()**: cria um schema (que serão objectos)

**type**: indica o qual é o tipo de dado que será introduzido alí

**required**: diz que aquele campo é obrigatório, não se pode deixar vazio

**default**: indica qual será o valor padrão que estará lá (nesse caso ele vai autopreencher o campo com a data que foi criada o produto)

### Criando um produto

```bash
npm install require-dir
```

> backend/src/server.js

```js
const requireDir = require("requireDir");
// ---------------------------------

// Usando o require-dir para importar todos os ficheiros desta pasta
requireDir("./models");

// Importando o model dos produtos
const Product = mongoose.model("Product");

// Primeira rota
app.get("/", (req, res) => {
  Product.create({
    title: "React Native",
    description: "Uma nova forma de criar apps",
    url: "http://rocketseat.com.br",
  });

  res.send("Hello World!");
});
```

## Reestruturação de arquivos

Vamos separar as rotas em outro arquivo e separar a lógica em um outro arquivo também.

> backend/src/routes.js

```js
const express = require("express");
const routes = express.Router();

// Rota retirada do arquivo server.js
routes.get("/", (req, res) => {
  Product.create({
    title: "React Native",
    description: "Uma nova forma de criar apps",
    url: "http://rocketseat.com.br",
  });

  res.send("Hello World!");
});

module.exports = routes;
```

> backend/src/server.js

```js
const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

// Iniciando o express
const app = express();

// Iniciando a DB
mongoose.connect("mongodb://localhost:27017/backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir("./models");

// Sempre que acessar essa rota vai ser enviado para a /api
app.use("/api", require("./routes"));

// Ouvir a porta 3333 do navegador
app.listen(3333);
```

> backend/src/controller/ProductController.js

```js
const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
  async index(req, res) {
    const products = await Product.find();

    return res.json(products);
  },
};
```

Se acessarmos a rota /api/product vamos poder ver o producto que foi salvo no banco de dados em formato **JSON**

### Usando o insomnia Rest Client

Baixe a opção **Core**: [Insomnia Rest](http://insomnia.rest)

Para saber como usar assista [Como usar o insomnia rest](https://www.youtube.com/watch?v=3tB0uDliS6Y)

## Criação de registo

> backend/src/server.js

```js
app.use(express.json());
```

> backend/src/routes.js

```js
routes.post("/products", ProductController.store);
```

> backend/src/controller/ProductController.js

```js
async store(req, res) {
    // Criação
    const product = await Product.create(req.body);

    return res.json(product);
},
```

onde:

**req.body**: usamos para acessar a todas informações da requisição

## CRUD

Vamos criar a rota de delete, atualização, detalhe (sobre um único produto)

> backend/src/routes.js

```js
// Rotas CRUD
routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);
```

Métodos HTTP:
**get**: Serve para listar informações do back-end
**post**: Criar informações no back-end
**put**: Actualizar uma informação já existente no back-end
**delete**: Remover ou apagar uma informação no back-end

> backend/src/controller/ProductController.js

```js
const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
  // Listar
  async index(req, res) {
    const products = await Product.find();

    return res.json(products);
  },

  // Mostrar um único producto de cada vez
  async show(req, res) {
    // Detalhe
    const product = await Product.findById(req.params.id);

    return res.json(product);
  },

  // Criar produto
  async store(req, res) {
    // Criação
    const product = await Product.create(req.body);

    return res.json(product);
  },

  // Atualizar informações do produto
  async update(req, res) {
    const product = await Product.findById(req.params.id, req.body, {
      new: true,
    });

    return res.json(product);
  },

  // Apagar produtos
  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
```

---

## Paginação da lista

Instalar o mongoose-paginate e importar no model/product

```bash
npm install mongoose-paginate
```

Antes do products do Listar adicione **const { page } = req.query;** para pegar o parámetro page que está no nosso get, e definimos um valor padrão para quando a rota não consegui encontrar o parámetro

Depois de importar o **mongoose-paginate**, usar antes do **mongoose.model('Product', ProductSchema)**, **ProductSchema.plugin(mongoosePaginate)**

Usar o **paginate({}, { page, limit: 10 })** ao invés do **find()** no ProductController.js

---

## Adicionando CORS

Para finalizar a API, temos que permitir que outros endereços acessem a nossa api.

Instalando

```bash
npm install cors
```

Importe o **cors** dentro do server.js, e depois do **app.use(express.json())** adicione o \*\*app.use(cors());

Dentro do **cors()**, de forma opcional podemos dizer os domínios que permitiremos acesso a API, mas vamos deixar vazia para permitir para todos.

---

## Finalização dos arquivos

### server.js

```js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

// Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando a DB
mongoose.connect("mongodb://localhost:27017/backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir("./models");

const Product = mongoose.model("Product");

// Primeira rota
app.use("/api", require("./routes"));

// Ouvir a porta 3333 do navegador
app.listen(3333);
```

### routes.js

```js
const express = require("express");
const routes = express.Router();

// Product controller
const ProductController = require("./controller/ProductController");

// Rotas CRUD
routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);

module.exports = routes;
```

### product.js

```js
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.plugin(mongoosePaginate);
mongoose.model("Product", ProductSchema);
```

### ProductController.js

```js
const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
  // Listar
  async index(req, res) {
    const { page } = req.query;
    const products = await Product.paginate({}, { page, limit: 10 });

    return res.json(products);
  },

  // Mostrar um único producto de cada vez
  async show(req, res) {
    // Detalhe
    const product = await Product.findById(req.params.id);

    return res.json(product);
  },

  // Criar produto
  async store(req, res) {
    // Criação
    const product = await Product.create(req.body);

    return res.json(product);
  },

  // Atualizar informações do produto
  async update(req, res) {
    const product = await Product.findById(req.params.id, req.body, {
      new: true,
    });

    return res.json(product);
  },

  // Apagar produtos
  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
```

---

## Front-end

### React.JS

![React.JS](https://beagledigital.com.au/wp-content/uploads/2019/12/react-JS-image.jpg)

React é uma biblioteca JavaScript para criar interfaces reponsivas e dinâmicas. É mantido pelo Facebook e por uma comunidade de desenvolvedores e empresas individuais. O React pode ser usado como base no desenvolvimento de aplicações de página única (SPA).

### Iniciando

Refactorando as pastas

**Eliminar da pasta src e public**: App.css, index.css, favicon.ico, logo192.png, logo512.png, manifest.json, robots.txt, setupTests.js, logo.svg, App.test.js

E remover as importações de dentro do index.html, App.js e index.js.

### Components

Os componentes são os elementos básicos de qualquer aplicativo React e um aplicativo React típico terá muitos deles.
Simplificando, um componente é uma classe ou função JavaScript que opcionalmente aceita entradas, como propriedades (props) e retorna um elemento React que descreve como uma seção da interface do usuário (interface do usuário) deve aparecer.

Componentes são partes do código rodam de forma independente, sem interfirir em outras partes do código.

### Criando o Header

Criar uma pasta dentro do src/ chamada components para guardar todos os componentes.

Dentro dela crie mais uma pasta chamada **Header** com index.js dentro dele.

Crie a estrutura do Header

```jsx
import React from "react";

import ".style.css";

const Header = () => {
  return <header id="main-header">JSHUNT</header>;
};

export default Header;
```

Removendo a estilização padrão dos navegadores. Crie um ficheiro style.css dentro da pasta src e importe dentro no App.css

```css
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background: #fafafa;
  color: #333;
}
```

Estilização do Header. Crie um style.css dentro do Header e importe no index.js do Header.

```css
header#main-header {
  width: 100%;
  height: 60px;
  background: #da552f;
  font-size: 18px;
  font-weight: bold;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

### Buscando produtos da API

Vamos utilizar o axios para acessar uma api rest ou um endereço externo dentro do React.

```bash
yarn add axios
```

Vamos criar uma pasta dentro do src chamada **services** para conter a nossa API, crie um ficheiro **api.js** para referenciarmos a api.

Dentro da **api.js**:

```js
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3333" });

export default api;
```

onde:

**baseURL**: Para preencher com o domínio da API.

Vamos importar o api.js no App.js

```js
import api from "./api.js";
```

### Main

Criar a estrutura do container do conteúdo principal. Vamos criar uma pasta chamada **pages** com mais uma pasta chamada **main** e um arquivo chamado **index.js**.

```jsx
import React from "react";

import api from "../../services/api";

export default function Main(){
    return (
      <>
        <main>Hello World</main>
      </>
    );
}
```

Agora vamos buscar os produtos da api.

```js
import React, {useEffect} from "react";

import api from "../../services/api";

export default function Main() {
  useEffect(() => {
    loadProducts();
  },[]);

  async function loadProducts() => {
    const response = await api.get("/products");

    console.log(response.data.docs);
  };

    return (
      <>
        <main>Hello World</main>
        <h1>Yes</h1>
      </>
    );
}
```

Agora vamos armazenar todos os valores retornado do **response.data.docs**.

Para armazenar informações dentro do React temos o conceito chamado **estado** que é sempre um objecto '{}'.

Vamos atualizar código acima para:

```jsx
import React, {useState, useEffect} from "react";

import api from "../../services/api";

export default function Main(){
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    loadProducts();
  },[]);

  async function loadProducts() {
    const response = await api.get("/products");

    setProducts(response.data.docs);
  };

    return (
      <div className="product-list">
        {products.map((product) => (
          <h2 key={product._id}>{product.title}</h2>
        ))}
      </div>
    );
}
```

onde:

O React pede para que em cada produto agente adicionar uma **key**.

Agora precisamos listar os produtos da API.

Vamos atualizar o código acima para:

```jsx
import React, {useState} from "react";

// Services
import api from "../../services/api";

// Stylesheets
import "./styles.css";

export default function Main() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    loadProducts();
  },[]);

  async function loadProducts() {
    const response = await api.get("/products");

    setProducts(response.data.docs);
  };

    return (
      <div className="product-list">
        {products.map((product) => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <a href="#">Acessar</a>
          </article>
        ))}
      </div>
    );
}
```

E a estilização do main dentro do arquivo style.css:

```css
.product-list {
  max-width: 700px;
  margin: 20px auto 0;
  padding: 0 20px;
}

.product-list article {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.product-list article p {
  font-size: 16px;
  color: #999;
  margin-top: 5px;
  line-height: 24px;
}

.product-list article a {
  height: 42px;
  border-radius: 5px;
  border: 2px solid #da552f;
  background: none;
  margin-top: 10px;
  color: #da552f;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s;
}

.product-list article a:hover {
  background: #da552f;
  color: white;
}
```

### Página anterior e próxima

```jsx
<div className="actions">
  <button disabled={page === 1} onClick={prevPage}>
    Anterior
  </button>
  <button disabled={page === productInfo.pages} onClick={nextPage}>
    Próximo
  </button>
</div>
```

Estilização do botão

```css
.product-list .actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.product-list .actions button {
  padding: 10px;
  border-radius: 5px;
  border: 0;
  background: #da552f;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
```

Vamos adicionar uma classe de desabilitado ao nosso botão quando ele não tiver mais para onde ir.

```css
.product-list .actions button[disabled] {
  opacity: 0.5;
  cursor: default;
}

.product-list .actions button:hover {
  opacity: 0.7;
}

.product-list .actions button[disabled]:hover {
  opacity: 0.5;
}
```

Configuração da navegação

Vamos usar o react-router-dom para fazer as navegações

Instalando:

```bash
yarn add react-router-dom
```

Crie um arquivo routes.js no src e digite

```js
import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Product from "./pages/products";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/products/:id" component={Product} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
```

E dentro do App.js vamos importar o arquivo de rotas:

```jsx
import React from "react";
import Routes from "./routes";

import "./style.css";

import Header from "./components/Header";

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
```

Vamos criar um arquivo chamado index.js dentro de uma pasta chamada products e vamos configurar os detalhes do produto e ver os detalhes:

```js
import React, { useState } from "react";
import api from "../../services/api";

import "./styles.css";

export default function Product(props) {
  const [product, setProduct] = useState([]);

  async componentDidMount() {
    const { id } = props.match.params;
    const response = await api.get(`/products/${id}`);

    setProduct(response.data);
  }
    return (
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>

        <p>
          URL: <a href={product.url}>{product.url}</a>
        </p>
      </div>
    );
}
```

Vamos fazer o estilo do detalhe dos produtos dentro de um arquivo chamado style.css dentro do products:

```css
.product-info {
  max-width: 700px;
  margin: 20px auto 0;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.product-info h1 {
  font-size: 32px;
}

.product-info p {
  color: #666;
  line-height: 24px;
  margin-top: 5px;
}

.product-info p a {
  color: #069;
}
```

---

### Obrigações

- Em todos os arquivos do React devemos fazer a importação do react, para que o jsx funcione

---

## Mobile

![React Native](https://www.sitepen.com/wp-content/uploads/2020/03/blog-react-native.png)

### React Native

O React Native é um framework de código aberto criada pelo Facebook. É usado para desenvolver aplicativos para Android e iOS permitindo que os desenvolvedores usem o React junto com os recursos da plataforma nativa.

### Iniciando

Para iniciar um projecto usamos o comando:

```bash
npx react-native init projectName
```

E para executar no emulador usamos:

Para Emuladores IOS

```bash
npx react-native run-ios --emulator="nome do emulador"
```

Para Emuladores Android

```bash
npx react-native run-android --emulator="nome do emulador"
```

O emulador vai demorar de 5 à 10 minutos para executar. Depois disso vais estar habilitado a executar alguns comandos como:

**cmd + R** para recarregar o emulator.
**cmd + D** para fazer um shake (agitar) no celular e mostrar uma série de opções para debugar a aplicação.

ATT: Quando executar denovo o emulador com um projecto que já se fez o código acima, é só executar:

```bash
npx react-native start
```

E ele vai executar (e dessa vez uns 10 segundos ou 20 para executar 😁)

### Estrutura de pastas

### Pastas

**android**: Configurações e o código nativa da nossa aplicação Android, só vamos mexer básicamente só na hora de fazer o deploy da nossa aplicação.

**ios**: Configurações e o código nativa da nossa aplicação IOS, só vamos mexer também básicamente só na hora de fazer o deploy da nossa aplicação.

**node_modules**: Todas as dependências instaladas.

### Arquivos

**.babelrc**: Config do Babel
**.buckconfig**: Config do Buck
**.flowconfig**: Config do Flow
**.eslintrc.js**: Config do ESlint
**.prettier**: Config do formatador de código Prettier
**.gitattributes e .gitignore**: Config do Git
**.watchmanconfig**: Config do Watchman
**app.json**: Determina como a aplicação vai ser apresentada para o usuário final, e o nome dela internamente para a gente
**index.js**: Arquivo introdutório/principal, ele vai carregar assim que a nossa aplicação for executada.

São conjunto de código entre código de visualização, código de lógica e estilização

> Usar a componentização quando a separação daquele código faz algum sentido ou quando vai se reutilizar aquele código (por ex. o Header é um componente que vamos usar em todas as nossas telas)

### Entendendo o App.js

Vamos refactorar o código gerado para: (se for preciso apague tudo do App.js e digite o código abaixo)

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello Wolrd!</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
});
```

onde:

O **react-native** expõe várias tags para gente utilizar como se fosse no HTML, se a gente quiser importar o input do HTML será **TextInput**, se a gente quiser o botão, será **Button**:

**View**: Como se fosse uma caixa sem estilização (div do HTML)

Para estilizar no React Native não usamos class ou id, importamos a função Stylesheet de dentro do react-native, como fiz no código acima.

E para estilizar não usamos o ínfen (-) do css, em vez disso usamos camel case. Por exemplo, **font-size: 13px;** vai ficar **fontSize: 13,**

O **render() {}** é a parte visual que ele vai retornar.

### Configurando a navegação

Como a nossa aplicação vai ter mais de uma rota vamos utilizar uma dependência chamada react-navigation.

Ela é muito utilizada para a essa parte de navegação

### Instalação do react-navigation

```bash
yarn add react-navigation
```

---

### Conceitos fundamentais

- **View**
- **Text**
- **Image**
- **Button**
- **Touchables**

No React Native nós temos uma monte de componentes built-in para criar UI.

Para que o nosso conteúdo não fique preso cimo do celular (que pode se juntar com notch no iPhone ou a barra de notificações) usamos o componente **safeAreaView**.

**View**: é componente que pode servir com um container component (div)
**Text**: usado para disparar texto na tela.
**Image**: serve fazer chamada de imagens, tal como no html nós temos o <img />. Para fazer chamadas de imagens da internet devemos usar assim **source={{width: largura, height: altura, uri: 'link da imagem'}}**
**Touchable components**: essa função dependerá de que tipo de feedback queremos dar aos nossos componentes
**Button**: tal como no html temos o <button></button>, no **RN** temos o <Button />

### Estilização

Para estilizar no React Native usamos a API Stylesheet.

Fazemos a chamada dela dentro de uma variável que vai receber a função **Stylesheet.create()**, que recebe um objecto e que lá são definidas as propriedades (os estilos)

ex:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```
