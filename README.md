# Sandrinha Bella Moda - App de Gestão de Estoque

Este é um aplicativo mobile em desenvolvimento para a loja de roupas "Sandrinha Bella Moda". O objetivo principal do projeto é substituir o controle manual de estoque e vendas por uma solução digital, simples e eficiente, otimizando a gestão e permitindo a análise do histórico de vendas.

Este projeto também serve como uma atividade de extensão acadêmica, aplicando conceitos modernos de desenvolvimento de aplicativos com React Native.

## ✨ Funcionalidades Atuais (v0.4)

O aplicativo agora conta com um ciclo completo de gestão de produtos, um fluxo de vendas interativo e um sistema de histórico.

### Gestão de Estoque (CRUD Completo)
* **Listar (Read):** Visualização completa do estoque na tela principal.
* **Cadastrar (Create):** Adição de novos produtos ao inventário através de um formulário.
* **Editar (Update):** Edição dos detalhes de produtos existentes.
* **Excluir (Delete):** Remoção de produtos do estoque com confirmação.
* **Persistência:** Todo o inventário de produtos é salvo permanentemente no dispositivo.

### Fluxo de Venda
* **Sacola de Compras Interativa:** Adição de itens, controle de quantidade (+/-) e remoção individual de produtos, com validação de estoque em tempo real.
* **Indicador Visual (Badge):** O ícone da aba "Sacola" exibe a quantidade total de itens.
* **Finalização de Venda:** A finalização da venda dá baixa automática no estoque e registra a transação.

### Histórico de Vendas
* **Registro Automático:** Cada venda finalizada é salva permanentemente no dispositivo.
* **Tela de Histórico:** Uma aba dedicada exibe a lista de todas as vendas passadas, ordenadas da mais recente para a mais antiga.
* **Detalhes da Venda:** Cada registro no histórico exibe a data, o total de itens e o valor total da venda.

## 🏛️ Arquitetura

O projeto adota um padrão de **Separação de Responsabilidades** com uma arquitetura baseada em contextos para gerenciar o estado global, dividindo-o em domínios lógicos:

* **`ProductContext`:** Responsável por todo o estado relacionado ao inventário de produtos e à sacola de compras atual.
* **`SalesContext`:** Responsável por todo o estado relacionado ao histórico de vendas passadas.
* **Screens (Telas):** Componentes que orquestram a lógica de negócio e consomem dados dos contextos.
* **Components (Componentes Reutilizáveis):** Componentes puros e autossuficientes responsáveis pela aparência.

## 🛠️ Tecnologias Utilizadas

* **Framework:** React Native (com Expo)
* **Linguagem:** TypeScript
* **Roteamento:** Expo Router
* **Gerenciamento de Estado:** React Context API (Múltiplos Contextos)
* **Persistência Local:** AsyncStorage
* **Estilização:** React Native `StyleSheet`

## 📂 Estrutura de Pastas

```
/
├── app/              # Telas e rotas
│   ├── (tabs)/
│   │   ├── index.tsx   # Tela de Estoque
│   │   ├── cart.tsx    # Tela da Sacola
│   │   └── history.tsx # Tela de Histórico
│   └── add-product.tsx # Tela de Cadastro/Edição
├── assets/           # Arquivos estáticos
├── components/       # Componentes reutilizáveis
│   ├── ProductItem.tsx
│   └── CartListItem.tsx
└── contexts/         # Estado global
    ├── ProductContext.tsx
    └── SalesContext.tsx
```

## 🚀 Como Executar o Projeto

1.  **Instale as dependências:** `npm install`
2.  **Inicie o servidor:** `npx expo start`
3.  **Abra no celular:** Escaneie o QR Code com o app **Expo Go**.

## 🔮 Próximos Passos

Com as funcionalidades principais implementadas, o foco futuro é o refinamento e a adição de mais inteligência e usabilidade.

* **[ ] Busca e Filtro de Produtos:** Implementar uma barra de busca na tela de estoque para encontrar produtos rapidamente.
* **[ ] Detalhes da Venda:** Tornar cada item no histórico clicável, levando a uma nova tela que mostra em detalhes todos os produtos daquela venda específica.
* **[ ] Melhorias de UI/UX:** Adicionar feedbacks mais sutis (como *toasts* em vez de alertas), animações, e otimizar a interface geral.
* **[ ] Relatórios Simples:** Criar uma nova tela ou seção que analise o histórico de vendas para mostrar dados como "produto mais vendido" ou "faturamento do dia/mês".