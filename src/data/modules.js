export const modules = [
  {
    slug: 'introducao',
    title: 'Introdução',
    description: 'O que é AI Engineering e por que você deveria aprender',
    icon: 'rocket',
    order: 1,
    keyword: 'ai engineering introdução',
    articles: [
      {
        slug: 'bem-vindo',
        title: 'Bem-vindo à Trilha',
        description: 'Uma visão geral do que você vai aprender na trilha de AI Engineering',
        keyword: 'trilha ai engineering',
        order: 1
      },
      {
        slug: 'o-que-e-ai-engineering',
        title: 'O que é AI Engineering?',
        description: 'Entenda o papel do AI Engineer no mercado e como se tornar um',
        keyword: 'o que é ai engineering',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Prompt_engineering',
        order: 2
      }
    ]
  },
  {
    slug: 'fundamentos',
    title: 'Fundamentos',
    description: 'Como LLMs funcionam por baixo dos panos',
    icon: 'brain',
    order: 2,
    keyword: 'fundamentos llm',
    articles: [
      {
        slug: 'o-que-sao-llms',
        title: 'O que são LLMs',
        description: 'Entenda como funcionam os Large Language Models e sua arquitetura',
        keyword: 'o que são llms large language models',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Large_language_model',
        order: 1
      },
      {
        slug: 'tokens-e-contexto',
        title: 'Tokens e Contexto',
        description: 'Como modelos processam e entendem texto através de tokenização',
        keyword: 'tokens llm tokenização context window',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Lexical_analysis#Tokenization',
        order: 2
      },
      {
        slug: 'como-modelos-pensam',
        title: 'Como Modelos "Pensam"',
        description: 'O processo de geração de texto e inferência em LLMs',
        keyword: 'inferência llm geração texto',
        order: 3
      }
    ]
  },
  {
    slug: 'modelos-apis',
    title: 'Modelos & APIs',
    description: 'OpenAI, Claude, Gemini, Llama e como usar cada um',
    icon: 'code',
    order: 3,
    keyword: 'apis llm openai claude',
    articles: [
      {
        slug: 'openai',
        title: 'OpenAI API',
        description: 'Guia completo da API da OpenAI: GPT-4, GPT-3.5 e modelos de embedding',
        keyword: 'openai api gpt-4 gpt-3.5',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/OpenAI',
        order: 1
      },
      {
        slug: 'claude',
        title: 'Anthropic Claude',
        description: 'Como usar a API do Claude 3 da Anthropic para suas aplicações',
        keyword: 'anthropic claude api claude 3',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Claude_(language_model)',
        order: 2
      },
      {
        slug: 'modelos-open-source',
        title: 'Modelos Open Source',
        description: 'Llama, Mistral e como rodar modelos de linguagem localmente',
        keyword: 'llama mistral modelos open source local',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Llama_(language_model)',
        order: 3
      }
    ]
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'A arte de se comunicar com LLMs de forma efetiva',
    icon: 'sparkle',
    order: 4,
    keyword: 'prompt engineering',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Prompt_engineering',
    articles: [
      {
        slug: 'anatomia-prompt',
        title: 'Anatomia de um Prompt',
        description: 'Estrutura e componentes de prompts efetivos para LLMs',
        keyword: 'anatomia prompt estrutura prompts',
        order: 1
      },
      {
        slug: 'few-shot-learning',
        title: 'Few-shot Learning',
        description: 'Como ensinar LLMs com exemplos usando few-shot prompting',
        keyword: 'few-shot learning prompting exemplos',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Few-shot_learning',
        order: 2
      },
      {
        slug: 'chain-of-thought',
        title: 'Chain of Thought',
        description: 'Técnica para fazer o modelo raciocinar passo a passo',
        keyword: 'chain of thought cot raciocínio',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Prompt_engineering#Chain-of-thought',
        order: 3
      }
    ]
  },
  {
    slug: 'rag',
    title: 'RAG',
    description: 'Retrieval Augmented Generation - busca semântica e contexto',
    icon: 'book',
    order: 5,
    keyword: 'rag retrieval augmented generation',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
    articles: [
      {
        slug: 'o-que-e-rag',
        title: 'O que é RAG',
        description: 'Conceitos fundamentais de Retrieval Augmented Generation',
        keyword: 'o que é rag retrieval augmented generation',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
        order: 1
      },
      {
        slug: 'embeddings',
        title: 'Embeddings',
        description: 'Representação vetorial de texto para busca semântica',
        keyword: 'embeddings vetores representação texto',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Word_embedding',
        order: 2
      },
      {
        slug: 'vector-databases',
        title: 'Vector Databases',
        description: 'Pinecone, Weaviate, Chroma e outros bancos de dados vetoriais',
        keyword: 'vector database pinecone weaviate chroma',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Vector_database',
        order: 3
      },
      {
        slug: 'chunking',
        title: 'Chunking Strategies',
        description: 'Como dividir documentos para busca eficiente em RAG',
        keyword: 'chunking estratégias dividir documentos',
        order: 4
      }
    ]
  },
  {
    slug: 'ai-agents',
    title: 'AI Agents',
    description: 'Agentes autônomos que pensam e agem',
    icon: 'brain',
    order: 6,
    keyword: 'ai agents agentes ia',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Intelligent_agent',
    articles: [
      {
        slug: 'o-que-sao-agents',
        title: 'O que são Agents',
        description: 'Conceitos de agentes autônomos e arquiteturas de AI Agents',
        keyword: 'o que são ai agents agentes autônomos',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Intelligent_agent',
        order: 1
      },
      {
        slug: 'tool-use',
        title: 'Tool Use',
        description: 'Como dar ferramentas para LLMs usarem - function calling',
        keyword: 'tool use function calling ferramentas llm',
        order: 2
      },
      {
        slug: 'react-pattern',
        title: 'ReAct Pattern',
        description: 'Reasoning + Acting: o padrão fundamental de agentes',
        keyword: 'react pattern reasoning acting agentes',
        order: 3
      },
      {
        slug: 'multi-agent',
        title: 'Multi-Agent Systems',
        description: 'Múltiplos agentes trabalhando juntos em sistemas complexos',
        keyword: 'multi agent systems sistemas multi agentes',
        order: 4
      }
    ]
  },
  {
    slug: 'dev-tools',
    title: 'Dev Tools',
    description: 'Cursor, Claude Code, V0 e as ferramentas do AI Engineer',
    icon: 'code',
    order: 7,
    keyword: 'ferramentas ai engineer dev tools',
    articles: [
      {
        slug: 'cursor',
        title: 'Cursor',
        description: 'O editor de código com IA integrada - guia completo',
        keyword: 'cursor editor ia código',
        order: 1
      },
      {
        slug: 'claude-code',
        title: 'Claude Code',
        description: 'Coding assistant da Anthropic para terminal',
        keyword: 'claude code anthropic terminal',
        order: 2
      },
      {
        slug: 'vibe-coding',
        title: 'Vibe Coding',
        description: 'Programando no flow com IA - produtividade máxima',
        keyword: 'vibe coding programação ia',
        order: 3
      }
    ]
  },
  {
    slug: 'producao',
    title: 'Produção',
    description: 'Colocando IA em produção sem dor de cabeça',
    icon: 'rocket',
    order: 8,
    keyword: 'llm produção deploy',
    articles: [
      {
        slug: 'arquitetura',
        title: 'Arquitetura de Sistemas com IA',
        description: 'Padrões e boas práticas para arquitetar sistemas com LLMs',
        keyword: 'arquitetura sistemas ia llm',
        order: 1
      },
      {
        slug: 'caching',
        title: 'Caching e Otimização',
        description: 'Reduzindo latência e custos com cache inteligente',
        keyword: 'caching llm otimização latência',
        order: 2
      },
      {
        slug: 'observability',
        title: 'Observability',
        description: 'Monitorando e debugando sistemas de IA em produção',
        keyword: 'observability monitoramento llm produção',
        order: 3
      },
      {
        slug: 'custos',
        title: 'Gestão de Custos',
        description: 'Controlando e otimizando gastos com APIs de LLM',
        keyword: 'custos llm api otimização gastos',
        order: 4
      }
    ]
  }
];

export function getModule(slug) {
  return modules.find(m => m.slug === slug);
}

export function getArticle(moduleSlug, articleSlug) {
  const module = getModule(moduleSlug);
  if (!module) return null;
  return module.articles.find(a => a.slug === articleSlug);
}

export function getAdjacentArticles(moduleSlug, articleSlug) {
  const module = getModule(moduleSlug);
  if (!module) return { prev: null, next: null };

  const articleIndex = module.articles.findIndex(a => a.slug === articleSlug);

  let prev = null;
  let next = null;

  if (articleIndex > 0) {
    prev = {
      module: module,
      article: module.articles[articleIndex - 1]
    };
  } else {
    // Look for previous module's last article
    const moduleIndex = modules.findIndex(m => m.slug === moduleSlug);
    if (moduleIndex > 0) {
      const prevModule = modules[moduleIndex - 1];
      if (prevModule.articles.length > 0) {
        prev = {
          module: prevModule,
          article: prevModule.articles[prevModule.articles.length - 1]
        };
      }
    }
  }

  if (articleIndex < module.articles.length - 1) {
    next = {
      module: module,
      article: module.articles[articleIndex + 1]
    };
  } else {
    // Look for next module's first article
    const moduleIndex = modules.findIndex(m => m.slug === moduleSlug);
    if (moduleIndex < modules.length - 1) {
      const nextModule = modules[moduleIndex + 1];
      if (nextModule.articles.length > 0) {
        next = {
          module: nextModule,
          article: nextModule.articles[0]
        };
      }
    }
  }

  return { prev, next };
}
