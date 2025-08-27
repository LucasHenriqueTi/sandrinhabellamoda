# Sandrinha Bella Moda - App de Gestão de Estoque

Este é um aplicativo mobile em desenvolvimento para a loja de roupas "Sandrinha Bella Moda". O objetivo principal do projeto é substituir o controle manual de estoque e vendas por uma solução digital, simples e eficiente, otimizando a gestão e reduzindo erros operacionais.

Este projeto também serve como uma atividade de extensão acadêmica, aplicando conceitos modernos de desenvolvimento de aplicativos com React Native.

## ✨ Funcionalidades Atuais (v0.3)

O aplicativo agora conta com um fluxo completo de gerenciamento de estoque e vendas, com uma base de código refatorada para maior manutenibilidade.

### Gestão de Estoque (CRUD Completo)
* **Listar (Read):** Visualização completa do estoque na tela principal.
* **Cadastrar (Create):** Adição de novos produtos ao inventário através de um formulário.
* **Editar (Update):** Edição dos detalhes de produtos existentes reutilizando o mesmo formulário.
* **Excluir (Delete):** Remoção de produtos do estoque com um alerta de confirmação.
* **Persistência de Dados:** Todo o estoque é salvo no dispositivo, garantindo que os dados não se percam ao fechar e reabrir o aplicativo.

### Fluxo de Venda
* **Adição de Itens à Sacola:** Produtos podem ser adicionados à sacola de compras diretamente da tela de estoque.
* **Controle de Quantidade:** É possível incrementar, decrementar ou remover itens diretamente na tela da sacola, com validação de estoque em tempo real.
* **Indicador Visual (Badge):** O ícone da aba "Sacola" exibe um indicador numérico com a quantidade total de itens, atualizado em tempo real.
* **Finalização de Venda:** A finalização da venda dá baixa automática no estoque e limpa a sacola.

## 🏛️ Arquitetura

O projeto adota um padrão de **Separação de Responsabilidades**, dividindo a interface em duas categorias principais para facilitar a manutenção e escalabilidade:

* **Screens (Telas):** Componentes de alto nível responsáveis pela lógica de negócio, busca de dados do contexto e layout geral da tela (ex: `ProductScreen`, `CartScreen`).
* **Components (Componentes Reutilizáveis):** Componentes "puros" e autossuficientes responsáveis apenas pela aparência e exibição de dados recebidos via `props` (ex: `ProductItem`, `CartListItem`).

## 🛠️ Tecnologias Utilizadas

* **Framework:** React Native (com Expo)
* **Linguagem:** TypeScript
* **Roteamento:** Expo Router
* **Gerenciamento de Estado:** React Context API
* **Persistência Local:** AsyncStorage
* **Estilização:** React Native `StyleSheet`

## 📂 Estrutura de Pastas

```
/
├── app/              # Telas e rotas
│   ├── (tabs)/
│   │   ├── index.tsx # Tela de Estoque
│   │   └── cart.tsx  # Tela da Sacola
│   └── add-product.tsx # Tela de Cadastro/Edição
├── assets/           # Arquivos estáticos
├── components/       # Componentes reutilizáveis
│   ├── ProductItem.tsx
│   └── CartListItem.tsx
├── constants/        # Constantes (cores)
└── contexts/         # Estado global (ProductContext)
```

## 🚀 Como Executar o Projeto

1.  **Instale as dependências:** `npm install`
2.  **Inicie o servidor:** `npx expo start`
3.  **Abra no celular:** Escaneie o QR Code com o app **Expo Go**.

## 🔮 Próximos Passos

Com o núcleo do aplicativo estável e bem estruturado, o próximo grande objetivo é adicionar inteligência de negócio.

* **[ ] Histórico de Vendas:** Criar uma nova tela e a lógica necessária para armazenar e visualizar um registro de todas as vendas finalizadas, permitindo futuras análises.
* **[ ] Melhorias de UI/UX:** Adicionar feedbacks mais sutis (como toasts em vez de alertas), animações e otimizar a interface geral.
* **[ ] Busca e Filtro:** Implementar uma barra de busca na tela de estoque para encontrar produtos rapidamente.