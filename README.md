# Decora Móveis

Loja demonstrativa de móveis com catálogo, vitrine interativa, carrinho, checkout e área do cliente. O projeto é estático: não possui backend, banco de dados, login real nem cobrança. Carrinho, pedidos demonstrativos, favoritos, endereços e dados da conta ficam no `localStorage` do navegador atual.

## Experiência

- `index.html`: vitrine, categorias, coleções e conteúdo institucional.
- `produto.html?p=<id>&c=<cor>`: detalhes, variações, prazo simulado e itens relacionados.
- `perfil.html`: conta de exemplo com pedidos, favoritos, endereços, cartões fictícios e dados editáveis.
- `carrinho.html`: itens, cupons, frete e montagem simulados.
- `checkout.html`: identificação, endereço e forma de pagamento ilustrativa.
- `pedido.html`: confirmação demonstrativa salva apenas neste navegador.

A área do cliente usa o perfil de exemplo Mariana Costa. Os favoritos começam com alguns produtos e podem ser alterados na vitrine ou na página da conta. Endereços, cartões e dados editados são demonstrações locais. Não use informações de pagamento reais.

Cupons de teste: `DECORA10`, `BEMVINDO` e `FRETEGRATIS`.

## Rodar localmente

Requer Node.js 20 ou superior. No Windows, execute `powershell -ExecutionPolicy Bypass -File serve.ps1` e abra `http://localhost:5173`. O servidor Node incluído só entrega arquivos estáticos para desenvolvimento; a experiência de compra roda no navegador.

## Catálogo

Os produtos e suas variações estão em [`assets/js/data.js`](assets/js/data.js). As imagens são servidas localmente ou por URLs de imagem configuradas no catálogo. A consulta de endereço por CEP usa o serviço público ViaCEP; se estiver indisponível, os campos podem ser preenchidos manualmente.

## Publicar

Publique os arquivos estáticos em qualquer hospedagem de sites estáticos. Não é necessário provisionar banco de dados nem funções de servidor.
