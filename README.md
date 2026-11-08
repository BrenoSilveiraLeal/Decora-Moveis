# Decora Móveis

Loja de móveis **demonstrativa** com design minimalista: vitrine em tela cheia onde cada cor troca o móvel, o fundo e as cores da página, carrinho, cupons, frete, checkout em etapas e confirmação de pedido. O projeto inclui uma API Node.js para validar os pedidos no servidor.

> Projeto de demonstração: não há login, banco de dados nem cobrança real. O carrinho e o comprovante ficam salvos apenas no navegador (localStorage); a API valida o pedido, mas não mantém histórico.

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

Requer Node.js 20 ou superior. No Windows, inicie o servidor de desenvolvimento incluso e acesse `http://localhost:5173`:

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

O servidor local atende o site e as mesmas rotas da API usadas no Vercel:

| Rota | O que faz |
|---|---|
| `GET /api/health` | Informa o estado da API e os recursos demonstrados |
| `GET /api/catalog` | Retorna produtos, cores, preços e imagens do catálogo |
| `POST /api/orders` | Revalida itens e quantidades, recalcula preços, cupons, entrega e montagem e gera um comprovante demonstrativo |

O checkout envia ao servidor somente os itens, cupom, primeiro dígito do CEP, entrega selecionada, montagem e forma de pagamento/parcelas. Nome, contato, endereço completo e dados do cartão não são enviados à API. O comprovante final continua no navegador; sem armazenamento persistente, ele não fica disponível em outro dispositivo ou navegador.

## Publicar

O projeto está configurado para o Vercel, que publica as páginas estáticas e as funções em `api/`. GitHub Pages publica apenas os arquivos estáticos e não executa essa API; para manter o checkout com validação de servidor, use o Vercel ou outro host que execute funções Node.js.

## Tecnologias

HTML5 semântico, CSS, JavaScript em módulos ES e funções Node.js nativas — sem dependências de runtime. Fontes Fredoka e Plus Jakarta Sans (Google Fonts). Fotos dos produtos geradas com IA em estilo de estúdio.
