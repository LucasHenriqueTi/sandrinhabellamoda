# Sandrinha Bella Moda - App de Gestão de Estoque

Este é um aplicativo mobile em desenvolvimento para a loja de roupas "Sandrinha Bella Moda". O objetivo principal do projeto é substituir o controle manual de estoque e vendas por uma solução digital, simples e eficiente, otimizando a gestão e reduzindo erros operacionais.

Este projeto também serve como uma atividade de extensão acadêmica, aplicando conceitos modernos de desenvolvimento de aplicativos com React Native.

## ✨ Funcionalidades Atuais (v0.2)

O aplicativo agora conta com um fluxo completo de gerenciamento de estoque e vendas.

### Gestão de Estoque
* **Visualização de Estoque:** Uma tela principal que lista todos os produtos cadastrados, exibindo informações essenciais como nome, preço e quantidade em estoque.
* **Cadastro de Novos Produtos:** Um fluxo completo para adicionar novos itens ao inventário através de um formulário dedicado.

### Fluxo de Venda
* **Adição de Itens à Sacola:** É possível adicionar produtos à sacola de compras diretamente da tela de estoque com um simples toque.
* **Verificação de Estoque:** O sistema impede que mais itens do que o disponível em estoque sejam adicionados à sacola.
* **Tela de Sacola de Compras:** Uma aba dedicada exibe todos os itens na sacola, suas quantidades, o subtotal por item e o valor total da venda.
* **Finalização de Venda:** Ao finalizar a venda, a sacola é limpa e o estoque dos produtos vendidos é atualizado automaticamente.

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
│   │   ├── index.tsx # Tela de Estoque
│   │   └── cart.tsx  # Tela da Sacola de Compras
│   └── add-product.tsx # Tela de formulário para adicionar produtos
├── assets/           # Fontes, imagens e outros arquivos estáticos
├── components/       # Componentes reutilizáveis
├── constants/        # Constantes do app (ex: cores)
└── contexts/         # Lógica de estado global (ProductContext)
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

Agora que o fluxo principal está completo, o foco futuro será na persistência de dados e na melhoria da experiência do usuário.

* **[ ] Persistência de Dados:** Implementar `AsyncStorage` ou um banco de dados local (como `SQLite` ou `Realm`) para que os produtos não desapareçam ao fechar o aplicativo.
* **[ ] Edição e Exclusão de Produtos:** Adicionar a funcionalidade para editar os dados de um produto existente ou removê-lo do estoque.
* **[ ] Melhorias na Sacola:** Permitir o ajuste de quantidade (+/-) e a remoção de itens individuais da sacola.
* **[ ] Histórico de Vendas:** Criar uma nova tela para armazenar e visualizar um registro de todas as vendas finalizadas.