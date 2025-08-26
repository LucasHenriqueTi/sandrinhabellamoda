# Sandrinha Bella Moda - App de Gestão de Estoque

Este é um aplicativo mobile em desenvolvimento para a loja de roupas "Sandrinha Bella Moda". O objetivo principal do projeto é substituir o controle manual de estoque e vendas por uma solução digital, simples e eficiente, otimizando a gestão e reduzindo erros operacionais.

Este projeto também serve como uma atividade de extensão acadêmica, aplicando conceitos modernos de desenvolvimento de aplicativos com React Native.

## ✨ Funcionalidades Atuais (v0.1)

Até o momento, o aplicativo possui as seguintes funcionalidades implementadas:

* **Visualização de Estoque:** Uma tela principal que lista todos os produtos cadastrados, exibindo informações essenciais como nome, preço e quantidade em estoque.
* **Cadastro de Novos Produtos:**
    * Um botão flutuante na tela de estoque permite iniciar o fluxo de cadastro.
    * Uma tela de formulário dedicada para inserir os dados de um novo produto (nome, preço, cor, gênero e quantidade).
    * Validação básica para garantir que os campos essenciais sejam preenchidos.
* **Atualização em Tempo Real:** Após o cadastro de um novo item, a lista de estoque é atualizada automaticamente, refletindo o novo estado do inventário.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando um ecossistema moderno baseado em JavaScript e TypeScript.

* **Framework:** [React Native](https://reactnative.dev/) (com [Expo](https://expo.dev/))
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Roteamento e Navegação:** [Expo Router](https://docs.expo.dev/router/introduction/) (navegação baseada em arquivos)
* **Gerenciamento de Estado Global:** [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
* **Estilização:** React Native `StyleSheet` (baseado em Flexbox)
* **Ícones:** `@expo/vector-icons`

## 📂 Estrutura de Pastas

O projeto segue uma arquitetura organizada para facilitar a manutenção e escalabilidade.

```
/
├── app/              # Telas e rotas (gerenciado pelo Expo Router)
│   ├── (tabs)/       # Layout principal de navegação por abas
│   └── add-product.tsx # Tela de formulário para adicionar produtos
├── assets/           # Fontes, imagens e outros arquivos estáticos
├── components/       # Componentes reutilizáveis (ex: ProductItem)
├── constants/        # Constantes do app (ex: cores)
└── contexts/         # Lógica de estado global (ex: ProductContext)
```

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    ```
2.  **Acesse a pasta do projeto:**
    ```bash
    cd SandrinhaBellaModa-App
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npx expo start
    ```
5.  **Abra no seu celular:** Escaneie o QR Code exibido no terminal com o aplicativo **Expo Go** (disponível para Android e iOS).

## 🔮 Próximos Passos

O roadmap de desenvolvimento para as próximas versões inclui:

* [ ] Criação da "Sacola de Vendas" para adicionar produtos a um carrinho.
* [ ] Implementação da lógica de baixa no estoque ao finalizar uma venda.
* [ ] Funcionalidade para editar e excluir produtos existentes.
* [ ] Tela de histórico para visualizar todas as vendas realizadas.