/**
 * DECORA MÓVEIS - CATÁLOGO (fonte única de verdade)
 * Cada produto tem 4 variantes de cor; cada variante traz a foto, o preço,
 * a frase adaptável e as seis cores de tema usadas pela vitrine.
 */

export const PRODUCTS = [
  {
    id: 'poltrona-orbe',
    name: 'Orbe',
    category: 'Poltrona',
    categoryKey: 'poltronas',
    room: 'sala',
    word: 'orbe',
    mobileScale: 178,
    cardZoom: 1.3,
    assembly: false,
    tagline: 'A poltrona que abraça.',
    description: 'Formas envolventes, assento profundo e estofamento texturizado de alta densidade. A Orbe nasceu para ser o canto preferido da casa: compacta no espaço, generosa no conforto.',
    specs: {
      'Dimensões': '98 L × 84 P × 76 A cm',
      'Altura do assento': '42 cm',
      'Estrutura': 'Madeira de reflorestamento',
      'Estofamento': 'Espuma D33 + fibra siliconada',
      'Tecido': 'Linho texturizado antimanchas',
      'Pés': 'Carvalho maciço',
      'Peso': '24 kg'
    },
    variants: [
      { id: 'verde', name: 'Oliva', swatch: '#5b5f41', price: 1850, image: 'https://res.cloudinary.com/dalwymbky/image/upload/v1791332762/verde_jmsp7i.png', quote: ['Design autoral', 'para o seu aconchego'], fill: '#a8ab8a',
        theme: { navText: '#2e3522', darkBtn: '#3c442c', darkHover: '#2a301e', badgeBg: '#4f593b', titleText: '#f4efe5', bodyBg: '#9da383' } },
      { id: 'azul', name: 'Azul', swatch: '#5e809d', price: 1690, image: 'https://res.cloudinary.com/dalwymbky/image/upload/v1791332763/azul_vnojkk.png', quote: ['Serenidade nórdica', 'para momentos de calma'], fill: '#839cb3',
        theme: { navText: '#202f3d', darkBtn: '#293e50', darkHover: '#1c2b38', badgeBg: '#365169', titleText: '#f0f4f8', bodyBg: '#7b95a8' } },
      { id: 'laranja', name: 'Laranja', swatch: '#d0511f', price: 2150, image: 'https://res.cloudinary.com/dalwymbky/image/upload/v1791332762/laranja_l7oohl.png', quote: ['Tons acolhedores', 'para lares autênticos'], fill: '#ec9054',
        theme: { navText: '#42200f', darkBtn: '#5a2d16', darkHover: '#3e1e0d', badgeBg: '#733b1e', titleText: '#fff3ea', bodyBg: '#d98b58' } },
      { id: 'bege', name: 'Bege', swatch: '#beae96', price: 1980, image: 'https://res.cloudinary.com/dalwymbky/image/upload/v1791332763/bege_wazzeh.png', quote: ['Pura harmonia', 'para o descanso diário'], fill: '#d3c4b1',
        theme: { navText: '#3a3328', darkBtn: '#4e4537', darkHover: '#352f25', badgeBg: '#675b49', titleText: '#faf7f2', bodyBg: '#cbbfb0' } }
    ]
  },
  {
    id: 'sofa-lumo',
    name: 'Lumo',
    category: 'Sofá',
    categoryKey: 'sofas',
    room: 'sala',
    word: 'lumo',
    mobileScale: 135,
    cardZoom: 1,
    assembly: true,
    tagline: 'Três lugares, nenhuma pressa.',
    description: 'Almofadas fartas e volumes arredondados que convidam a desacelerar. O Lumo acomoda a família toda sem perder a leveza visual, apoiado em pés delgados de carvalho.',
    specs: {
      'Dimensões': '228 L × 96 P × 78 A cm',
      'Lugares': '3',
      'Altura do assento': '44 cm',
      'Estrutura': 'Madeira de reflorestamento + percintas elásticas',
      'Estofamento': 'Espuma D28 soft + plumante',
      'Tecido': 'Tramado texturizado antimanchas',
      'Pés': 'Carvalho maciço',
      'Peso': '68 kg'
    },
    variants: [
      { id: 'rosa', name: 'Rosa', swatch: '#b0857f', price: 4790, image: 'assets/img/sofa-rosa.jpg', heroScale: 1.08, quote: ['Abraço macio', 'para a família toda'], fill: '#d8b6b4',
        theme: { navText: '#4a2a2a', darkBtn: '#6e3f3c', darkHover: '#52302d', badgeBg: '#8a5550', titleText: '#fff6f4', bodyBg: '#d8b6b4' } },
      { id: 'mostarda', name: 'Mostarda', swatch: '#b9831f', price: 4790, image: 'assets/img/sofa-mostarda.jpg', heroScale: 1, quote: ['Cor que acende', 'a sala de estar'], fill: '#caa451',
        theme: { navText: '#3d2c08', darkBtn: '#5c4210', darkHover: '#43300a', badgeBg: '#7a5a1a', titleText: '#fff8e6', bodyBg: '#caa451' } },
      { id: 'petroleo', name: 'Petróleo', swatch: '#215263', price: 4990, image: 'assets/img/sofa-petroleo.jpg', heroScale: 1.08, quote: ['Profundidade e calma', 'para noites longas'], fill: '#739dab',
        theme: { navText: '#0f2a33', darkBtn: '#1d4552', darkHover: '#13323d', badgeBg: '#2b5b6b', titleText: '#f0f7f9', bodyBg: '#739dab' } },
      { id: 'linho', name: 'Linho', swatch: '#d9d0c1', price: 5290, image: 'assets/img/sofa-linho.jpg', heroScale: 1.03, quote: ['Linho natural', 'leveza em cada fibra'], fill: '#9b8e7e',
        theme: { navText: '#2e271f', darkBtn: '#4a4034', darkHover: '#352d24', badgeBg: '#65584a', titleText: '#faf6f0', bodyBg: '#9b8e7e' } }
    ]
  },
  {
    id: 'cadeira-aro',
    name: 'Aro',
    category: 'Cadeira',
    categoryKey: 'cadeiras',
    room: 'jantar',
    word: 'aro',
    mobileScale: 210,
    cardZoom: 1.25,
    assembly: false,
    tagline: 'Jantares longos, costas felizes.',
    description: 'Concha curva que envolve as costas, assento acolchoado e pés palito em carvalho. A Aro vai da mesa de jantar ao home office com a mesma elegância.',
    specs: {
      'Dimensões': '54 L × 56 P × 80 A cm',
      'Altura do assento': '47 cm',
      'Estrutura': 'Aço carbono + madeira',
      'Estofamento': 'Espuma injetada D45',
      'Tecido': 'Tramado texturizado antimanchas',
      'Pés': 'Carvalho maciço',
      'Peso': '7 kg'
    },
    variants: [
      { id: 'musgo', name: 'Musgo', swatch: '#5d6447', price: 890, image: 'assets/img/cadeira-musgo.jpg', quote: ['Verde de mata', 'para a mesa posta'], fill: '#92967b',
        theme: { navText: '#262a1a', darkBtn: '#3e4430', darkHover: '#2b3020', badgeBg: '#555c40', titleText: '#f6f5ec', bodyBg: '#92967b' } },
      { id: 'terracota', name: 'Terracota', swatch: '#b5532c', price: 890, image: 'assets/img/cadeira-terracota.jpg', quote: ['Calor de barro', 'em cada refeição'], fill: '#d78c6c',
        theme: { navText: '#45200f', darkBtn: '#6b3219', darkHover: '#4e2311', badgeBg: '#8a4527', titleText: '#fff2ea', bodyBg: '#d78c6c' } },
      { id: 'ceu', name: 'Céu', swatch: '#8fb0d3', price: 890, image: 'assets/img/cadeira-ceu.jpg', quote: ['Azul de domingo', 'para conversas leves'], fill: '#bfd5ea',
        theme: { navText: '#1d3550', darkBtn: '#2f5378', darkHover: '#213e5c', badgeBg: '#3f6890', titleText: '#ffffff', bodyBg: '#bfd5ea' } },
      { id: 'creme', name: 'Creme', swatch: '#e6dccb', price: 950, image: 'assets/img/cadeira-creme.jpg', quote: ['Bouclê macio', 'para lares serenos'], fill: '#b99f84',
        theme: { navText: '#36291b', darkBtn: '#574330', darkHover: '#3e2f21', badgeBg: '#725a42', titleText: '#fbf7f1', bodyBg: '#b99f84' } }
    ]
  },
  {
    id: 'pufe-bolha',
    name: 'Bolha',
    category: 'Pufe',
    categoryKey: 'pufes',
    room: 'sala',
    word: 'bolha',
    mobileScale: 200,
    cardZoom: 1.35,
    assembly: false,
    tagline: 'Assento extra, charme em dobro.',
    description: 'Redondo, fofo e versátil: vira apoio para os pés, assento extra ou mesa lateral com uma bandeja. O Bolha é revestido em bouclê com acabamento em vivo.',
    specs: {
      'Dimensões': 'Ø 70 × 38 A cm',
      'Estrutura': 'Base em MDF + espuma',
      'Estofamento': 'Espuma D33 + manta acrílica',
      'Tecido': 'Bouclê antimanchas',
      'Base': 'Antiderrapante',
      'Peso': '9 kg'
    },
    variants: [
      { id: 'lilas', name: 'Lilás', swatch: '#a99ab9', price: 690, image: 'assets/img/pufe-lilas.jpg', quote: ['Um toque lúdico', 'para cantos tranquilos'], fill: '#d2cae1',
        theme: { navText: '#352b4a', darkBtn: '#54476e', darkHover: '#3e3354', badgeBg: '#6b5c8a', titleText: '#fbf9ff', bodyBg: '#d2cae1' } },
      { id: 'manteiga', name: 'Manteiga', swatch: '#d8a844', price: 690, image: 'assets/img/pufe-manteiga.jpg', heroScale: 1.1, quote: ['Amarelo manteiga', 'para dias ensolarados'], fill: '#e9cc86',
        theme: { navText: '#4a3608', darkBtn: '#7a5a12', darkHover: '#5b420c', badgeBg: '#94701c', titleText: '#fffaf0', bodyBg: '#e9cc86' } },
      { id: 'menta', name: 'Menta', swatch: '#9cc2a6', price: 690, image: 'assets/img/pufe-menta.jpg', quote: ['Frescor de menta', 'para respirar fundo'], fill: '#b4ccb6',
        theme: { navText: '#1f3a28', darkBtn: '#355c41', darkHover: '#26452f', badgeBg: '#487556', titleText: '#f7fbf7', bodyBg: '#b4ccb6' } },
      { id: 'pedra', name: 'Pedra', swatch: '#827b75', price: 720, image: 'assets/img/pufe-pedra.jpg', heroScale: 1.1, quote: ['Neutro e urbano', 'para combinar com tudo'], fill: '#8c8885',
        theme: { navText: '#252321', darkBtn: '#403c38', darkHover: '#2c2926', badgeBg: '#5a5550', titleText: '#f7f5f2', bodyBg: '#8c8885' } }
    ]
  },
  {
    id: 'luminaria-cogu',
    name: 'Cogu',
    category: 'Luminária',
    categoryKey: 'iluminacao',
    room: 'quarto',
    word: 'cogu',
    mobileScale: 220,
    cardZoom: 1,
    assembly: false,
    tagline: 'Luz quente em forma de cogumelo.',
    description: 'Cerâmica esmaltada à mão, cúpula em domo e luz difusa e quente. A Cogu cria aquele clima de fim de tarde em qualquer aparador, mesa de cabeceira ou estante.',
    specs: {
      'Dimensões': 'Ø 32 × 40 A cm',
      'Material': 'Cerâmica esmaltada',
      'Lâmpada': 'LED E27 2700K (inclusa)',
      'Interruptor': 'Dimmer no cabo',
      'Cabo': '1,8 m em tecido',
      'Voltagem': 'Bivolt',
      'Peso': '3,2 kg'
    },
    variants: [
      { id: 'coral', name: 'Coral', swatch: '#d95b32', price: 490, image: 'assets/img/luminaria-coral.jpg', quote: ['Brilho de coral', 'para noites aconchegantes'], fill: '#e8a087',
        theme: { navText: '#4f1d0c', darkBtn: '#a3401e', darkHover: '#7f3015', badgeBg: '#b9522d', titleText: '#fff4ef', bodyBg: '#e8a087' } },
      { id: 'salvia', name: 'Sálvia', swatch: '#8f9a7c', price: 490, image: 'assets/img/luminaria-salvia.jpg', quote: ['Verde suave', 'para leituras sem pressa'], fill: '#b3baa8',
        theme: { navText: '#2b3122', darkBtn: '#4b5539', darkHover: '#363e29', badgeBg: '#616d4b', titleText: '#f8faf4', bodyBg: '#b3baa8' } },
      { id: 'cobalto', name: 'Cobalto', swatch: '#1b3a9c', price: 520, image: 'assets/img/luminaria-cobalto.jpg', quote: ['Azul cobalto', 'para quem ama cor'], fill: '#728fc7',
        theme: { navText: '#0d1c45', darkBtn: '#1c3378', darkHover: '#13255a', badgeBg: '#2a4592', titleText: '#f2f6ff', bodyBg: '#728fc7' } },
      { id: 'marfim', name: 'Marfim', swatch: '#efe3cf', price: 490, image: 'assets/img/luminaria-marfim.jpg', quote: ['Marfim atemporal', 'para qualquer ambiente'], fill: '#a68e76',
        theme: { navText: '#33261a', darkBtn: '#574330', darkHover: '#3e2f21', badgeBg: '#6f5841', titleText: '#fdf8f0', bodyBg: '#a68e76' } }
    ]
  },
  {
    id: 'mesa-seixo',
    name: 'Seixo',
    category: 'Mesa de centro',
    categoryKey: 'mesas',
    room: 'sala',
    word: 'seixo',
    mobileScale: 175,
    cardZoom: 1.15,
    assembly: true,
    tagline: 'Uma pedra de rio no meio da sala.',
    description: 'Tampo orgânico em forma de seixo e base robusta arredondada. A Seixo é peça escultural: centraliza a sala e acolhe livros, velas e o café de domingo.',
    specs: {
      'Dimensões': '110 L × 72 P × 32 A cm',
      'Tampo': 'Orgânico, 4 cm de espessura',
      'Base': 'Pedestal arredondado',
      'Acabamento': 'Selador fosco antimanchas',
      'Peso': '38 kg'
    },
    variants: [
      { id: 'travertino', name: 'Travertino', swatch: '#d7bfa3', price: 3490, image: 'assets/img/mesa-travertino.jpg', quote: ['Pedra natural', 'com poros que contam histórias'], fill: '#ccb8a0',
        theme: { navText: '#3d2f20', darkBtn: '#5e4a35', darkHover: '#443526', badgeBg: '#7a6248', titleText: '#fffaf3', bodyBg: '#ccb8a0' } },
      { id: 'nogueira', name: 'Nogueira', swatch: '#5a3014', price: 2890, image: 'assets/img/mesa-nogueira.jpg', quote: ['Madeira nobre', 'com veios aparentes'], fill: '#ab764a',
        theme: { navText: '#2e1708', darkBtn: '#4f2a10', darkHover: '#391d0a', badgeBg: '#6a3a17', titleText: '#fff5ea', bodyBg: '#ab764a' } },
      { id: 'argila', name: 'Argila', swatch: '#9a4a32', price: 2590, image: 'assets/img/mesa-argila.jpg', quote: ['Cerâmica de argila', 'feita para durar'], fill: '#c38473',
        theme: { navText: '#3f1a10', darkBtn: '#6b2f1f', darkHover: '#4f2216', badgeBg: '#86402c', titleText: '#fff3ef', bodyBg: '#c38473' } },
      { id: 'grafite', name: 'Grafite', swatch: '#2a2a2c', price: 2690, image: 'assets/img/mesa-grafite.jpg', quote: ['Microcimento grafite', 'para salas marcantes'], fill: '#7d7e82',
        theme: { navText: '#1a1a1d', darkBtn: '#2e2e33', darkHover: '#1f1f23', badgeBg: '#45454c', titleText: '#f5f5f7', bodyBg: '#7d7e82' } }
    ]
  },
  {
    id: 'conjunto-roda',
    name: 'Roda',
    category: 'Conjunto de jantar',
    categoryKey: 'conjuntos',
    room: 'jantar',
    word: 'roda',
    mobileScale: 150,
    cardZoom: 1.05,
    assembly: true,
    tagline: 'Mesa redonda, conversa sem cabeceira.',
    description: 'Conjunto completo com mesa redonda de pedestal e quatro cadeiras de concha curva. A Roda aproxima todo mundo à mesa e ocupa pouco espaço: perfeita para salas de jantar integradas.',
    specs: {
      'Inclui': '1 mesa + 4 cadeiras',
      'Mesa': 'Ø 120 × 76 A cm',
      'Cadeiras': '54 L × 56 P × 80 A cm',
      'Tampo': 'MDF revestido + borda arredondada',
      'Base da mesa': 'Pedestal cônico maciço',
      'Estofamento': 'Espuma injetada D45',
      'Lugares': '4 (até 5 confortáveis)',
      'Peso': '62 kg (total)'
    },
    variants: [
      { id: 'linho', name: 'Linho', swatch: '#e8e0d2', price: 6490, image: 'assets/img/conjunto-linho.jpg', quote: ['Carvalho e linho', 'para almoços sem pressa'], fill: '#c5b098',
        theme: { navText: '#3b2f20', darkBtn: '#5e4a33', darkHover: '#443524', badgeBg: '#7a6244', titleText: '#fffaf2', bodyBg: '#c5b098' } },
      { id: 'terracota', name: 'Terracota', swatch: '#b5532c', price: 6890, image: 'assets/img/conjunto-terracota.jpg', quote: ['Nogueira e terracota', 'para jantares quentes'], fill: '#cb8261',
        theme: { navText: '#42190a', darkBtn: '#6b2f18', darkHover: '#4e2210', badgeBg: '#874026', titleText: '#fff2ea', bodyBg: '#cb8261' } },
      { id: 'salvia', name: 'Sálvia', swatch: '#8f9a7c', price: 6490, image: 'assets/img/conjunto-salvia.jpg', quote: ['Branco e sálvia', 'para manhãs de domingo'], fill: '#adb6a3',
        theme: { navText: '#28301f', darkBtn: '#4b5539', darkHover: '#363e29', badgeBg: '#616d4b', titleText: '#f8faf4', bodyBg: '#adb6a3' } },
      { id: 'mostarda', name: 'Mostarda', swatch: '#c08a2a', price: 6690, image: 'assets/img/conjunto-mostarda.jpg', quote: ['Preto e mostarda', 'para mesas marcantes'], fill: '#c39a51',
        theme: { navText: '#3a2a08', darkBtn: '#5c4210', darkHover: '#43300a', badgeBg: '#7a5a1a', titleText: '#fff8e6', bodyBg: '#c39a51' } }
    ]
  },
  {
    id: 'guardaroupa-nicho',
    name: 'Nicho',
    category: 'Guarda-roupa',
    categoryKey: 'guardaroupas',
    room: 'quarto',
    word: 'nicho',
    mobileScale: 190,
    cardZoom: 1,
    assembly: true,
    tagline: 'Três portas, cantos macios.',
    description: 'Guarda-roupa de três portas com quinas arredondadas e puxadores cavados que somem no desenho. Por dentro: cabideiro duplo, quatro prateleiras e duas gavetas internas com corrediça telescópica.',
    specs: {
      'Dimensões': '135 L × 58 P × 210 A cm',
      'Portas': '3, com dobradiças de amortecimento',
      'Interno': 'Cabideiro duplo, 4 prateleiras, 2 gavetas',
      'Material': 'MDF 18 mm laqueado fosco',
      'Pés': 'Carvalho maciço',
      'Peso': '96 kg'
    },
    variants: [
      { id: 'areia', name: 'Areia', swatch: '#d6c6b3', price: 4290, image: 'assets/img/guardaroupa-areia.jpg', quote: ['Neutro e sereno', 'para quartos tranquilos'], fill: '#a69381',
        theme: { navText: '#2f261c', darkBtn: '#4f4233', darkHover: '#392f24', badgeBg: '#6a5a48', titleText: '#fbf6ef', bodyBg: '#a69381' } },
      { id: 'salvia', name: 'Sálvia', swatch: '#8a947d', price: 4290, image: 'assets/img/guardaroupa-salvia.jpg', quote: ['Verde calmo', 'para acordar devagar'], fill: '#b3bbaa',
        theme: { navText: '#2b3122', darkBtn: '#4b5539', darkHover: '#363e29', badgeBg: '#616d4b', titleText: '#f8faf4', bodyBg: '#b3bbaa' } },
      { id: 'nevoa', name: 'Névoa', swatch: '#8396a5', price: 4290, image: 'assets/img/guardaroupa-nevoa.jpg', quote: ['Azul névoa', 'para manhãs frescas'], fill: '#a8b4be',
        theme: { navText: '#1f2e3b', darkBtn: '#34495b', darkHover: '#253543', badgeBg: '#4a6175', titleText: '#f6f9fc', bodyBg: '#a8b4be' } },
      { id: 'nogueira', name: 'Nogueira', swatch: '#6b3f22', price: 4890, image: 'assets/img/guardaroupa-nogueira.jpg', quote: ['Lâmina de nogueira', 'com veios naturais'], fill: '#b98a5f',
        theme: { navText: '#2e1708', darkBtn: '#4f2a10', darkHover: '#391d0a', badgeBg: '#6a3a17', titleText: '#fff5ea', bodyBg: '#b98a5f' } }
    ]
  },
  {
    id: 'comoda-onda',
    name: 'Onda',
    category: 'Cômoda',
    categoryKey: 'comodas',
    room: 'quarto',
    word: 'onda',
    mobileScale: 175,
    cardZoom: 1.25,
    assembly: false,
    tagline: 'Seis gavetas em ritmo de onda.',
    description: 'Frentes ripadas que desenham uma onda suave, puxadores redondos de madeira e cantos arredondados. A Onda guarda muito e ainda vira aparador no quarto ou na sala.',
    specs: {
      'Dimensões': '140 L × 48 P × 78 A cm',
      'Gavetas': '6, com corrediça telescópica',
      'Frentes': 'MDF ripado laqueado fosco',
      'Puxadores': 'Madeira maciça torneada',
      'Pés': 'Carvalho maciço',
      'Peso': '58 kg'
    },
    variants: [
      { id: 'terracota', name: 'Terracota', swatch: '#b8582f', price: 2390, image: 'assets/img/comoda-terracota.jpg', quote: ['Ripado terracota', 'para quartos cheios de vida'], fill: '#d7916f',
        theme: { navText: '#45200f', darkBtn: '#6b3219', darkHover: '#4e2311', badgeBg: '#8a4527', titleText: '#fff2ea', bodyBg: '#d7916f' } },
      { id: 'creme', name: 'Creme', swatch: '#ece2d0', price: 2390, image: 'assets/img/comoda-creme.jpg', quote: ['Creme macio', 'que combina com tudo'], fill: '#bfa78e',
        theme: { navText: '#36291b', darkBtn: '#574330', darkHover: '#3e2f21', badgeBg: '#725a42', titleText: '#fbf7f1', bodyBg: '#bfa78e' } },
      { id: 'oliva', name: 'Oliva', swatch: '#6b7150', price: 2390, image: 'assets/img/comoda-oliva.jpg', quote: ['Verde oliva', 'para cantos aconchegantes'], fill: '#9b9e84',
        theme: { navText: '#262a1a', darkBtn: '#3e4430', darkHover: '#2b3020', badgeBg: '#555c40', titleText: '#f6f5ec', bodyBg: '#9b9e84' } },
      { id: 'rosa', name: 'Rosa', swatch: '#d4a3a3', price: 2490, image: 'assets/img/comoda-rosa.jpg', quote: ['Rosa empoeirado', 'para um quarto doce'], fill: '#e6cfcf',
        theme: { navText: '#4a2a2a', darkBtn: '#6e3f3c', darkHover: '#52302d', badgeBg: '#8a5550', titleText: '#fff9f9', bodyBg: '#e6cfcf' } }
    ]
  },
  {
    id: 'cama-nuvem',
    name: 'Nuvem',
    category: 'Cama',
    categoryKey: 'camas',
    room: 'quarto',
    word: 'nuvem',
    mobileScale: 150,
    cardZoom: 1.05,
    assembly: true,
    tagline: 'Dormir dentro de uma nuvem.',
    description: 'Cama queen estofada com cabeceira alta em formato de nuvem e base envolvente. Estrado em madeira com lâminas flexíveis — é só colocar o colchão. Roupa de cama não inclusa.',
    specs: {
      'Tamanho': 'Queen (para colchão 158 × 198 cm)',
      'Dimensões': '186 L × 222 P × 118 A cm',
      'Cabeceira': 'Estofada, 118 cm de altura',
      'Estrado': 'Lâminas flexíveis de madeira',
      'Tecido': 'Bouclê / veludo antimanchas',
      'Peso': '74 kg'
    },
    variants: [
      { id: 'aveia', name: 'Aveia', swatch: '#cdbfae', price: 5490, image: 'assets/img/cama-aveia.jpg', quote: ['Bouclê aveia', 'para noites leves'], fill: '#b9a795',
        theme: { navText: '#33291e', darkBtn: '#554636', darkHover: '#3d3227', badgeBg: '#6f5d4a', titleText: '#fbf7f1', bodyBg: '#b9a795' } },
      { id: 'rosa', name: 'Rosa', swatch: '#c48d8a', price: 5490, image: 'assets/img/cama-rosa.jpg', quote: ['Veludo rosado', 'para sonhos macios'], fill: '#d9bab8',
        theme: { navText: '#4a2a2a', darkBtn: '#6e3f3c', darkHover: '#52302d', badgeBg: '#8a5550', titleText: '#fff6f4', bodyBg: '#d9bab8' } },
      { id: 'indigo', name: 'Índigo', swatch: '#23365f', price: 5690, image: 'assets/img/cama-indigo.jpg', quote: ['Azul índigo', 'para noites profundas'], fill: '#597497',
        theme: { navText: '#0f1d33', darkBtn: '#1f3557', darkHover: '#152742', badgeBg: '#2c4670', titleText: '#f0f4fb', bodyBg: '#597497' } },
      { id: 'floresta', name: 'Floresta', swatch: '#2f4128', price: 5690, image: 'assets/img/cama-floresta.jpg', quote: ['Verde floresta', 'para descansar de verdade'], fill: '#737d60',
        theme: { navText: '#1b2214', darkBtn: '#2f3a25', darkHover: '#212a1a', badgeBg: '#455237', titleText: '#f4f6ee', bodyBg: '#737d60' } }
    ]
  },
  {
    id: 'cabeceira-pingo',
    name: 'Pingo',
    category: 'Mesa de cabeceira',
    categoryKey: 'cabeceiras',
    room: 'quarto',
    word: 'pingo',
    mobileScale: 220,
    cardZoom: 1.35,
    assembly: false,
    tagline: 'Pequena, redonda e cheia de cor.',
    description: 'Mesa de cabeceira em formato de pílula, com gaveta e nicho aberto para livros. A Pingo chega montada e forma dupla perfeita com a cama Nuvem.',
    specs: {
      'Dimensões': '50 L × 38 P × 55 A cm',
      'Gaveta': '1, com corrediça telescópica',
      'Nicho': 'Aberto, 14 cm de altura',
      'Material': 'MDF laqueado fosco',
      'Pés': 'Madeira maciça',
      'Peso': '11 kg'
    },
    variants: [
      { id: 'mostarda', name: 'Mostarda', swatch: '#c9971f', price: 790, image: 'assets/img/cabeceira-mostarda.jpg', quote: ['Um pingo de sol', 'ao lado da cama'], fill: '#e5cb8a',
        theme: { navText: '#4a3608', darkBtn: '#7a5a12', darkHover: '#5b420c', badgeBg: '#94701c', titleText: '#fffaf0', bodyBg: '#e5cb8a' } },
      { id: 'lilas', name: 'Lilás', swatch: '#a99ab9', price: 790, image: 'assets/img/cabeceira-lilas.jpg', quote: ['Lilás suave', 'para leituras noturnas'], fill: '#c5bed7',
        theme: { navText: '#352b4a', darkBtn: '#54476e', darkHover: '#3e3354', badgeBg: '#6b5c8a', titleText: '#fbf9ff', bodyBg: '#c5bed7' } },
      { id: 'giz', name: 'Giz', swatch: '#f2efe9', price: 790, image: 'assets/img/cabeceira-giz.jpg', quote: ['Branco giz', 'para quartos claros'], fill: '#b6ada3',
        theme: { navText: '#2e2a25', darkBtn: '#4a443d', darkHover: '#35302b', badgeBg: '#645c53', titleText: '#fdfbf8', bodyBg: '#b6ada3' } },
      { id: 'nogueira', name: 'Nogueira', swatch: '#5a3420', price: 890, image: 'assets/img/cabeceira-nogueira.jpg', quote: ['Nogueira maciça', 'feita para durar'], fill: '#ca9d74',
        theme: { navText: '#2e1708', darkBtn: '#4f2a10', darkHover: '#391d0a', badgeBg: '#6a3a17', titleText: '#fff6ec', bodyBg: '#ca9d74' } }
    ]
  },
  {
    id: 'rack-arco',
    name: 'Arco',
    category: 'Rack',
    categoryKey: 'racks',
    room: 'sala',
    word: 'arco',
    mobileScale: 145,
    cardZoom: 1.05,
    assembly: true,
    tagline: 'Arcos entalhados, fios escondidos.',
    description: 'Rack baixo de quatro portas com arcos entalhados e laterais arredondadas. Comporta TVs de até 85", tem passa-fios traseiro e prateleiras internas reguláveis.',
    specs: {
      'Dimensões': '200 L × 45 P × 55 A cm',
      'Portas': '4, com fechamento suave',
      'TV': 'Até 85 polegadas',
      'Interno': '2 prateleiras reguláveis + passa-fios',
      'Material': 'MDF entalhado',
      'Peso': '64 kg'
    },
    variants: [
      { id: 'carvalho', name: 'Carvalho', swatch: '#c9a77c', price: 3190, image: 'assets/img/rack-carvalho.jpg', quote: ['Carvalho natural', 'para salas acolhedoras'], fill: '#d5c3ac',
        theme: { navText: '#3d2f20', darkBtn: '#5e4a35', darkHover: '#443526', badgeBg: '#7a6248', titleText: '#fffaf3', bodyBg: '#d5c3ac' } },
      { id: 'grafite', name: 'Grafite', swatch: '#2e2f33', price: 3190, image: 'assets/img/rack-grafite.jpg', quote: ['Grafite fosco', 'para salas de cinema'], fill: '#777a7f',
        theme: { navText: '#1a1a1d', darkBtn: '#2e2e33', darkHover: '#1f1f23', badgeBg: '#45454c', titleText: '#f5f5f7', bodyBg: '#777a7f' } },
      { id: 'salvia', name: 'Sálvia', swatch: '#8f9a7c', price: 3190, image: 'assets/img/rack-salvia.jpg', quote: ['Sálvia suave', 'para salas leves'], fill: '#bdc4b4',
        theme: { navText: '#2b3122', darkBtn: '#4b5539', darkHover: '#363e29', badgeBg: '#616d4b', titleText: '#f8faf4', bodyBg: '#bdc4b4' } },
      { id: 'terracota', name: 'Terracota', swatch: '#b5532c', price: 3290, image: 'assets/img/rack-terracota.jpg', quote: ['Terracota viva', 'para salas com atitude'], fill: '#db9775',
        theme: { navText: '#45200f', darkBtn: '#6b3219', darkHover: '#4e2311', badgeBg: '#8a4527', titleText: '#fff2ea', bodyBg: '#db9775' } }
    ]
  }
];

// Limites visuais: [esquerda, topo, direita, base], em coordenadas de 0 a 1.
// Todas as cores compartilham largura, altura, centro e ajuste de cobertura.
export const HERO_FRAMES = {
  'poltrona-orbe': {
    focus: [0.4995,0.5026],
    verde: { bounds: [0.21224,0.11343,0.78776,0.88889] },
    azul: { bounds: [0.21224,0.11111,0.78776,0.8912] },
    laranja: { bounds: [0.21224,0.1088,0.78906,0.8912] },
    bege: { bounds: [0.21224,0.10185,0.78385,0.8912] }
  },
  'sofa-lumo': {
    focus: [0.502,0.5521],
    subjectScale: 0.94,
    cardSubjectScale: 0.77,
    cardFocus: [0.5, 0.55],
    rosa: { bounds: [0.16016,0.34491,0.84115,0.76157] },
    mostarda: { bounds: [0.13021,0.33102,0.86719,0.78472] },
    petroleo: { bounds: [0.14323,0.31481,0.85677,0.72917] },
    linho: { bounds: [0.1276,0.3287,0.87109,0.76852] }
  },
  'cadeira-aro': {
    focus: [0.499,0.4835],
    musgo: { bounds: [0.36198,0.13657,0.63542,0.85185] },
    terracota: { bounds: [0.35677,0.15741,0.63411,0.84722] },
    ceu: { bounds: [0.35938,0.14352,0.64062,0.84259] },
    creme: { bounds: [0.35417,0.15046,0.64193,0.86806] }
  },
  'pufe-bolha': {
    focus: [0.5035,0.5688],
    lilas: { bounds: [0.29427,0.3287,0.69661,0.79398] },
    manteiga: { bounds: [0.31901,0.35648,0.67839,0.78704] },
    menta: { bounds: [0.29948,0.32176,0.69792,0.77778] },
    pedra: { bounds: [0.3151,0.35648,0.67839,0.7963] }
  },
  'luminaria-cogu': {
    focus: [0.5,0.5043],
    coral: { bounds: [0.35417,0.15741,0.64453,0.84491] },
    salvia: { bounds: [0.35938,0.1713,0.63802,0.84028] },
    cobalto: { bounds: [0.36589,0.20833,0.63542,0.83796] },
    marfim: { bounds: [0.34505,0.16898,0.64583,0.84722] }
  },
  'mesa-seixo': {
    focus: [0.5063,0.5886],
    travertino: { bounds: [0.23307,0.37731,0.77344,0.78935] },
    nogueira: { bounds: [0.24219,0.36806,0.75651,0.77083] },
    argila: { bounds: [0.26953,0.3912,0.73307,0.76852] },
    grafite: { bounds: [0.23958,0.34491,0.76042,0.75231] }
  },
  'conjunto-roda': {
    focus: [0.4917,0.5451],
    linho: { bounds: [0.18229,0.28704,0.81901,0.81713] },
    terracota: { bounds: [0.15885,0.27083,0.84115,0.82639] },
    salvia: { bounds: [0.18229,0.26389,0.82292,0.82639] },
    mostarda: { bounds: [0.16406,0.26389,0.83464,0.82639] }
  },
  'guardaroupa-nicho': {
    focus: [0.499,0.4896],
    areia: { bounds: [0.35156,0.08102,0.64583,0.89352] },
    salvia: { bounds: [0.34896,0.09028,0.65104,0.88194] },
    nevoa: { bounds: [0.35156,0.10648,0.64844,0.87731] },
    nogueira: { bounds: [0.35286,0.10648,0.64714,0.8912] }
  },
  'comoda-onda': {
    focus: [0.5029,0.5547],
    terracota: { bounds: [0.28125,0.31944,0.71745,0.77083] },
    creme: { bounds: [0.27604,0.34722,0.72656,0.7662] },
    oliva: { bounds: [0.26953,0.33333,0.73047,0.76389] },
    rosa: { bounds: [0.27083,0.31481,0.72786,0.77315] }
  },
  'cama-nuvem': {
    focus: [0.4971,0.5252],
    aveia: { bounds: [0.21615,0.21991,0.77083,0.83565] },
    rosa: { bounds: [0.21484,0.19676,0.77604,0.83565] },
    indigo: { bounds: [0.20573,0.17361,0.78385,0.82639] },
    floresta: { bounds: [0.21745,0.21991,0.77734,0.82639] }
  },
  'cabeceira-pingo': {
    focus: [0.4995,0.5417],
    mostarda: { bounds: [0.35807,0.25,0.64323,0.78009] },
    lilas: { bounds: [0.36719,0.28472,0.6263,0.80787] },
    giz: { bounds: [0.3737,0.30787,0.625,0.77546] },
    nogueira: { bounds: [0.35417,0.28704,0.64583,0.79861] }
  },
  'rack-arco': {
    focus: [0.5,0.5382],
    carvalho: { bounds: [0.17969,0.37731,0.82031,0.71296] },
    grafite: { bounds: [0.1862,0.35648,0.8138,0.68287] },
    salvia: { bounds: [0.17578,0.375,0.82161,0.71296] },
    terracota: { bounds: [0.18359,0.3588,0.81641,0.70602] }
  }
};

// Avaliações e fotos ilustrativas para a demonstração da loja.
export const PRODUCT_REVIEWS = {
  'poltrona-orbe': [{ name: 'Ana', rating: 5, comment: 'O assento é aconchegante e o formato arredondado ficou ótimo no cantinho de leitura.' }],
  'sofa-lumo': [{ name: 'Rafael', rating: 5, comment: 'Gostei do espaço do assento e das linhas suaves. Combinou bem com a sala.' }],
  'cadeira-aro': [{ name: 'Marina', rating: 4, comment: 'O encosto curvo é confortável e a cadeira deixou a mesa de jantar mais leve.' }],
  'pufe-bolha': [{ name: 'Lucas', rating: 5, comment: 'Ficou ótimo como apoio para os pés ao lado da poltrona. A cor dá vida ao ambiente.' }],
  'luminaria-cogu': [{ name: 'Beatriz', rating: 5, comment: 'O formato é delicado e a iluminação cria um clima acolhedor no quarto.' }],
  'mesa-seixo': [{ name: 'Pedro', rating: 4, comment: 'As curvas da mesa combinam com o sofá e deixam a circulação pela sala mais agradável.' }],
  'conjunto-roda': [{ name: 'Camila', rating: 5, comment: 'A mesa redonda aproximou os lugares e deixou o espaço de jantar mais convidativo.' }],
  'guardaroupa-nicho': [{ name: 'Felipe', rating: 4, comment: 'Gostei da divisão interna e dos puxadores discretos. O acabamento neutro combina com o quarto.' }],
  'comoda-onda': [{ name: 'Juliana', rating: 5, comment: 'O detalhe da frente é bonito e as gavetas ajudam a organizar as peças menores.' }],
  'cama-nuvem': [{ name: 'Bruno', rating: 5, comment: 'A cabeceira estofada é agradável para ler antes de dormir e deixou o quarto mais acolhedor.' }],
  'cabeceira-pingo': [{ name: 'Larissa', rating: 4, comment: 'Tem espaço para o livro e a luminária, sem ocupar muito ao lado da cama.' }],
  'rack-arco': [{ name: 'Diego', rating: 5, comment: 'O desenho é leve e os compartimentos ajudam a manter os aparelhos e acessórios organizados.' }]
};

const ADDITIONAL_PRODUCT_REVIEWS = {
  'poltrona-orbe': [
    { name: 'Patrícia', rating: 5, comment: 'Coloquei perto da estante e virou meu lugar de ler. O verde fica suave com a luz da janela.' },
    { name: 'Gustavo', rating: 4, comment: 'Ficou ao lado do sofá, em cima do tapete. Gostei do tecido e dos pés de madeira.' }
  ],
  'sofa-lumo': [
    { name: 'Fernanda', rating: 5, comment: 'O rosa ficou bonito na sala com piso claro. As almofadas do encosto deixam o sofá bem acolhedor.' },
    { name: 'André', rating: 4, comment: 'A sala é pequena e o formato arredondado ajudou na composição. Uso com uma manta no braço.' }
  ],
  'cadeira-aro': [
    { name: 'Renata', rating: 5, comment: 'Uso na escrivaninha perto da janela. O encosto apoia bem e o verde combina com a madeira.' },
    { name: 'Thiago', rating: 4, comment: 'Colocamos na mesa da sala de jantar. O assento é macio e a cadeira não pesa no visual.' }
  ],
  'pufe-bolha': [
    { name: 'Sofia', rating: 5, comment: 'O lilás deu um toque de cor ao lado do sofá bege. É fácil mudar de lugar quando preciso.' },
    { name: 'Daniel', rating: 4, comment: 'Deixei no quarto, perto da cama. O tamanho ficou bom para apoiar os pés e sentar um pouco.' }
  ],
  'luminaria-cogu': [
    { name: 'Clara', rating: 5, comment: 'Durante o dia ela já funciona como decoração no aparador. Gostei muito desse tom coral.' },
    { name: 'Henrique', rating: 4, comment: 'Coloquei na mesa de trabalho. À noite a luz fica agradável e o formato chama atenção.' }
  ],
  'mesa-seixo': [
    { name: 'Luiza', rating: 5, comment: 'A mesa ficou no centro da sala com alguns livros. A textura da pedra é o detalhe que mais gostei.' },
    { name: 'Marcelo', rating: 4, comment: 'Os cantos arredondados combinaram com o tapete. Fica bonita tanto com a luz do dia quanto à noite.' }
  ],
  'conjunto-roda': [
    { name: 'Isabela', rating: 5, comment: 'O conjunto ficou entre a cozinha e a sala. A base central deixa o espaço para as pernas mais livre.' },
    { name: 'Eduardo', rating: 4, comment: 'Gostei da combinação da madeira clara com as cadeiras de tecido. A mesa fica bonita com um vaso simples.' }
  ],
  'guardaroupa-nicho': [
    { name: 'Aline', rating: 5, comment: 'O tom areia ficou discreto perto da janela. As portas sem puxadores salientes deixam o quarto mais leve.' },
    { name: 'Vinícius', rating: 4, comment: 'Ficou na parede em frente à cama. Os cantos arredondados e os pés de madeira foram os detalhes favoritos.' }
  ],
  'comoda-onda': [
    { name: 'Bianca', rating: 5, comment: 'A cor terracota combinou com a parede verde do quarto. Deixei uma planta em cima e ficou lindo.' },
    { name: 'Rodrigo', rating: 4, comment: 'As gavetas ajudaram na organização. O ripado e os puxadores de madeira fazem diferença no acabamento.' }
  ],
  'cama-nuvem': [
    { name: 'Helena', rating: 5, comment: 'Com uma manta e roupa de cama clara, o quarto ficou do jeito que eu queria. A cabeceira é muito bonita.' },
    { name: 'Caio', rating: 4, comment: 'O formato da cabeceira deixa o ambiente aconchegante. O revestimento claro combinou com os móveis de madeira.' }
  ],
  'cabeceira-pingo': [
    { name: 'Manuela', rating: 5, comment: 'O amarelo trouxe cor para o quarto. Na gaveta guardo os carregadores e no nicho deixo o livro.' },
    { name: 'Otávio', rating: 4, comment: 'Ficou certinha ao lado da cama. O tampo acomoda uma luminária pequena e ainda sobra um espaço.' }
  ],
  'rack-arco': [
    { name: 'Letícia', rating: 5, comment: 'A madeira clara ficou ótima com as plantas e os quadros. As portas escondem a bagunça do dia a dia.' },
    { name: 'Fábio', rating: 4, comment: 'O desenho dos arcos é bem bonito de perto. Ficou na sala com livros e um cesto ao lado.' }
  ]
};

for (const product of PRODUCTS) {
  PRODUCT_REVIEWS[product.id] = [...PRODUCT_REVIEWS[product.id], ...ADDITIONAL_PRODUCT_REVIEWS[product.id]]
    .slice(0, 2)
    .map((review, index) => ({
      ...review,
      variantId: product.variants[index].id,
      photos: [0, 1, 2].map((panel) => ({
        src: `assets/img/reviews/${product.name.toLowerCase()}.png`, panel, row: index, panels: 3, rows: 2
      }))
    }));
}

export const CATEGORIES = [
  { key: 'todos', label: 'Todos' },
  { key: 'sofas', label: 'Sofás' },
  { key: 'poltronas', label: 'Poltronas' },
  { key: 'cadeiras', label: 'Cadeiras' },
  { key: 'conjuntos', label: 'Conjuntos de jantar' },
  { key: 'mesas', label: 'Mesas' },
  { key: 'racks', label: 'Racks' },
  { key: 'camas', label: 'Camas' },
  { key: 'guardaroupas', label: 'Guarda-roupas' },
  { key: 'comodas', label: 'Cômodas' },
  { key: 'cabeceiras', label: 'Mesas de cabeceira' },
  { key: 'pufes', label: 'Pufes' },
  { key: 'iluminacao', label: 'Iluminação' }
];

// Ambientes usados para sugerir peças que combinam
export const ROOMS = [
  { key: 'sala', label: 'Sala de estar' },
  { key: 'jantar', label: 'Sala de jantar' },
  { key: 'quarto', label: 'Quarto' }
];

// Cupons de demonstração
export const COUPONS = {
  DECORA10: { type: 'percent', value: 10, label: '10% de desconto' },
  BEMVINDO: { type: 'fixed', value: 150, min: 1500, label: 'R$ 150 off em compras acima de R$ 1.500' },
  FRETEGRATIS: { type: 'shipping', label: 'Frete padrão grátis' }
};

export const STORE = {
  freeShippingFrom: 2500,
  assemblyPrice: 120,
  pixDiscount: 5,
  maxInstallments: 10
};

// Tema neutro usado em carrinho, checkout e pedido
export const NEUTRAL_THEME = { navText: '#2c3222', darkBtn: '#383e29', darkHover: '#262b1a', badgeBg: '#4a5238', titleText: '#f4efe6', bodyBg: '#f4efe6' };
