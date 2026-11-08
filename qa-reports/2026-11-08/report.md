# QA report — Decora Móveis — 2026-11-08

## Environment
- App URL / launch command: `http://localhost:5173/` / `powershell -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1` (servidor iniciou).
- Browser e versão: não disponível nesta execução. A automação de navegador integrada falhou ao determinar a URL do Chrome no Windows; Playwright CLI e dependências locais não estão instalados.
- Revisão da fonte: `assets/js/app.js`, `assets/js/data.js`, `assets/css/style.css`, `README.md` e páginas HTML.
- Commit/revisão: `1769620`.
- Limitação: nenhuma rota foi aprovada com evidência de navegador. Não há capturas de tela nem logs de console/rede.

## Inventário
| Página/rota | Componentes e fluxos documentados | Status |
|---|---|---|
| `index.html` | Vitrine, seleção por ambiente, coleção e filtros, sobre, entrega, newsletter | Não testada em navegador |
| `produto.html?p=<id>&c=<cor>` | Produto e cor, quantidade, adicionar/comprar, CEP, avaliações/sugestões | Não testada em navegador |
| `carrinho.html` | Itens, cupom, frete, montagem, continuar/finalizar | Não testada em navegador |
| `checkout.html` | Identificação, endereço/CEP, entrega, Pix/cartão/boleto e confirmação demonstrativa | Não testada em navegador |
| `pedido.html` | Confirmação, previsão, acompanhamento e Pix ilustrativo | Não testada em navegador |

## Cobertura
Viewports exigidos: 375×812, 430×932, 768×1024, 1366×768, 1536×864, 1920×1080 e 3840×2160.

| Rota | Viewports/estados | Capturas | Console/rede | Resultado |
|---|---|---|---|---|
| Todas as 5 rotas | 35 combinações de rota/viewport, interações e navegação | Nenhuma — navegador bloqueado | Não coletados | Não testado |

Verificações estáticas: `node --check assets/js/app.js` e `node --check assets/js/data.js` sem erros de sintaxe. Os arquivos locais de imagem referenciados no catálogo existem; quatro imagens da vitrine principal usam Cloudinary e não tiveram disponibilidade de rede verificada.

## Achados e correções
- **QA-01 / severidade média — corrigido:** a logo da página inicial apontava para `index.html`, fazendo recarregar a mesma página. Agora aponta para `#hero` na própria página inicial e continua apontando para `index.html` nas páginas internas. Alteração em `assets/js/app.js`, dentro de `renderHeader`. Reteste estático: scripts continuam sintaticamente válidos. Reteste de clique em navegador pendente devido ao bloqueio acima.

## Regressão
| Correção | Rotas/estados rechecados | Resultado | Evidência |
|---|---|---|---|
| Destino da logo | Sintaxe JavaScript dos dois scripts | Passou | Saída sem erros de `node --check`; clique não testado no navegador |

## Limitações e itens não testados
- Todas as cinco rotas e todos os viewports foram deixados como não testados visualmente. Não foi possível confirmar clipping, sobreposição, layout, carregamento de imagens, navegação real, estados de formulário, acessibilidade ou comportamento de movimento reduzido.
- Fluxos de CEP dependem da consulta externa ViaCEP; fontes e imagens externas também não tiveram sucesso de rede verificado.
- O inventário vem da documentação e do código; nenhuma interação foi afirmada como aprovada sem evidência de navegador.

## Sugestões opcionais
- Reexecutar a matriz de navegador depois que o Chrome puder ser controlado ou Playwright estiver disponível.

## Resumo
- Rotas inventariadas: 5; rotas aprovadas em navegador: 0/5.
- Combinações viewport/rota cobertas: 0/35.
- Defeitos confirmados: 1 (logo recarregava a página inicial), correção feita; reteste de clique ainda pendente.
- Status geral: precisa de acompanhamento para conclusão do QA visual e funcional.

