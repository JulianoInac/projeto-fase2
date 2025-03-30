//Essa lista vai alimentar o conteudo da home + seus Detalhes quando acionados.
let produtos = [
    {
        id: 1,
        nome: "Maçãs",
        preco: 4.99,
        imagem: "maca.webp",
        descricao: "Maçãs frescas colhidas diretamente do pomar.",
        categoria: "Hortfrut",
        detalhes: "Origem: Santa Catarina",
        
    },
    {
        id: 2,
        nome: "Cebola 250g",
        preco: 0.75 ,
        imagem: "cebola.webp",
        descricao: "A cebola é um vegetal comestível que é muito usado na culinária em todo o mundo. Ela tem uma casca marrom ou roxa e uma polpa branca, e é rica em nutrientes como fibras, vitamina C, vitamina B6 e potássio. A cebola é frequentemente usada como um ingrediente base para dar sabor e aroma a muitos pratos, incluindo sopas, ensopados, refogados, molhos e saladas. Além disso, a cebola contém compostos antioxidantes, como flavonoides e compostos de enxofre, que podem ajudar a reduzir o risco de doenças crônicas, incluindo doenças cardíacas e alguns tipos de câncer. No entanto, algumas pessoas podem ser alérgicas à cebola ou ter intolerância alimentar a ela, e devem evitar consumi-la ou consultar um médico antes de adicioná-la em sua dieta.",
        categoria: "Hortfrut",
        detalhes: "Validade: 7 dias",
        
    },
    {
        id: 3,
        nome: "Batata Extra 300g",
        preco: 1.49,
        imagem: "batata.webp",
        descricao: "As batatas são cultivadas em várias partes do mundo e são uma das principais fontes de carboidratos para muitas culturas. Elas são frequentemente consumidas cozidas, assadas, fritas ou como ingrediente em pratos como purês, sopas e saladas. As batatas são uma boa fonte de vitaminas, minerais e fibras, e também contêm compostos antioxidantes que podem ter benefícios para a saúde.",
        categoria: "Hortfrut",
        detalhes: "Validade: 7 dias",
        
    },
    {
        id: 4,
        nome: "Manga-Pálmer 700g",
        preco: 5.49,
        imagem: "manga.webp",
        descricao: "A manga Palmer é uma variedade de manga que é muito popular no Brasil e em outros países tropicais. Ela tem uma casca fina e suave, com uma cor que varia do verde claro ao amarelo brilhante. A polpa da manga Palmer é suculenta e doce, com uma textura macia e fibrosa..",
        categoria: "Hortfrut",
        detalhes: "Produção Paraná",
        
    },
    {
        id: 5,
        nome: "Leite Integral",
        preco: 5.49,
        imagem: "leite-integral.webp",
        descricao: "Leite fresco pasteurizado, caixa 1L.",
        categoria: "Laticínios",
        detalhes: "Validade: 7 dias",
        
    }
    ,
    {
        id: 6,
        nome: "Aveia Quaker Flocos Finos 165g",
        preco: 5.89,
        imagem: "aveia.webp",
        descricao: "A QUAKER® acredita que pequenas mudanças de hábitos podem fazer grande diferença na sua saúde.",
        categoria: "Cafe da manha",
        detalhes: "Limitado a 50 unidades por CPF",
        
    },
    {
        id: 7,
        nome: "Açúcar Cristal Native Orgânico 1kg",
        preco: 6.99,
        imagem: "acucar.webp",
        descricao: "Através de uma moderna tecnologia aliada às práticas naturais de cultivo, como manejo orgânico regenerativo, controle biológico de pragas e colheita realizada sem produzir queimadas.",
        categoria: "Açucares",
        detalhes: "Produto organico",
        
    },
    {
        id: 8,
        nome: "Empanado de Frango Sadia Pop Nuggets 275g",
        preco: 10.99,
        imagem: "empanado.webp",
        descricao: "Empanados de Frango Sadia",
        categoria: "Alimento",
        detalhes: "Produto Sadia",
        
    }
];

