# Decora Móveis

Loja de móveis **demonstrativa** com design minimalista: vitrine em tela cheia onde cada cor troca o móvel, o fundo e as cores da página, carrinho, cupons, frete simulado por CEP, checkout em etapas e confirmação de pedido.

> Projeto de demonstração: não há login, banco de dados nem cobrança real. O carrinho e o pedido ficam salvos apenas no navegador (localStorage).

## Páginas

| Arquivo | O que tem |
|---|---|
| `index.html` | Vitrine principal, compra por ambiente, coleção com filtros, sobre, entrega e newsletter |
| `produto.html?p=<id>&c=<cor>` | Vitrine do móvel com troca de cor, painel de compra, prazo por CEP e sugestões do mesmo ambiente |
| `carrinho.html` | Itens, cupom, frete (padrão, expressa ou retirada) e montagem opcional |
| `checkout.html` | Identificação, endereço (preenchido pelo CEP via ViaCEP) e pagamento (Pix, cartão ou boleto) |
| `pedido.html` | Pedido confirmado, previsão de entrega, acompanhamento e Pix ilustrativo |

## Catálogo

12 móveis com 4 cores cada (48 variações): poltrona, sofá, cadeira, conjunto de jantar, mesa de centro, rack, cama, guarda-roupa, cômoda, mesa de cabeceira, pufe e luminária. Tudo fica em [`assets/js/data.js`](assets/js/data.js) — para adicionar um móvel, copie um bloco do array `PRODUCTS` e troque nome, preços, fotos e cores do tema.

Cupons de teste: `DECORA10`, `BEMVINDO` e `FRETEGRATIS`.

## Rodar localmente

Basta abrir o `index.html` no navegador. Ou, no Windows, suba o servidor incluso e acesse `http://localhost:5173`:

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

## Publicar no GitHub Pages

1. Envie estes arquivos para a raiz de um repositório.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. O site fica disponível em `https://<seu-usuario>.github.io/<repositorio>/`.

## Tecnologias

HTML5 semântico, um único CSS e JavaScript puro — sem framework e sem build. Fontes Fredoka e Plus Jakarta Sans (Google Fonts). Fotos dos produtos geradas com IA em estilo de estúdio.
