# Sandrinha Bella Moda - App de Gestão de Estoque

Este é um aplicativo mobile em desenvolvimento para a loja de roupas "Sandrinha Bella Moda". O objetivo principal do projeto é substituir o controle manual de estoque e vendas por uma solução digital, simples e eficiente, otimizando a gestão e permitindo a análise do histórico de vendas.

Este projeto também serve como uma atividade de extensão acadêmica, aplicando conceitos modernos de desenvolvimento de aplicativos com React Native.

## ✨ Funcionalidades Atuais (v0.5)

O aplicativo agora conta com um ciclo completo de gestão de produtos, um fluxo de vendas interativo e um sistema de histórico robusto.

### Gestão de Estoque (CRUD Completo)
* **Listar (Read):** Visualização completa do estoque na tela principal.
* **Cadastrar (Create):** Adição de novos produtos ao inventário.
* **Editar (Update):** Edição dos detalhes de produtos existentes.
* **Excluir (Delete):** Remoção de produtos do estoque com confirmação.
* **Persistência:** Todo o inventário de produtos é salvo permanentemente no dispositivo.

### Fluxo de Venda
* **Sacola de Compras Interativa:** Adição de itens, controle de quantidade (+/-) e remoção individual, com validação de estoque em tempo real.
* **Indicador Visual (Badge):** O ícone da aba "Sacola" exibe a quantidade total de itens.
* **Finalização de Venda:** A finalização da venda dá baixa automática no estoque e registra a transação.

### Histórico e Gerenciamento de Vendas
* **Registro Automático:** Cada venda finalizada é salva permanentemente no dispositivo.
* **Tela de Histórico:** Uma aba dedicada exibe a lista de todas as vendas passadas.
* **Visualização de Detalhes:** Cada registro no histórico é clicável, levando a uma tela com todos os detalhes da transação (data, valor, lista de itens vendidos).
* **Reversão de Vendas:** Funcionalidade para reverter uma venda a partir da tela de detalhes. A reversão exclui o registro da venda e restaura o estoque dos produtos devolvidos.

## 🏛️ Arquitetura

O projeto adota um padrão de **Separação de Responsabilidades** com uma arquitetura baseada em múltiplos contextos para gerenciar o estado global:

* **`ProductContext`:** Responsável por todo o estado relacionado ao inventário de produtos e à sacola de compras.
* **`SalesContext`:** Responsável por todo o estado relacionado ao histórico de vendas passadas.
* **Screens (Telas):** Componentes que orquestram a lógica de negócio e consomem dados dos contextos.
* **Components (Componentes Reutilizáveis):** Componentes puros e autossuficientes responsáveis pela aparência.

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
│   │   ├── index.tsx   # Tela de Estoque
│   │   ├── cart.tsx    # Tela da Sacola
│   │   └── history.tsx # Tela de Histórico
│   ├── add-product.tsx # Tela de Cadastro/Edição
│   └── sale-detail.tsx # Tela de Detalhes da Venda
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
* **[ ] Relatórios Simples:** Criar uma nova tela que analise o histórico de vendas para mostrar dados como "produto mais vendido" ou "faturamento do dia/mês".
* **[ ] Melhorias de UI/UX:** Adicionar feedbacks mais sutis (como *toasts* em vez de alertas), animações, e otimizar a interface geral.