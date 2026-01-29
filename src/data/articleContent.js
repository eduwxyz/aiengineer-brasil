// Article content organized by module/article slug
// To add content, add the markdown body and optional video URL

export const articleContent = {
  introducao: {
    'bem-vindo': {
      video: null, // Add YouTube URL when available
      body: `
## Bem-vindo à Trilha AI Engineer

Se você chegou até aqui, provavelmente quer aprender a construir coisas com IA de verdade. Não só usar ChatGPT, mas entender como funciona e criar suas próprias soluções.

### O que você vai aprender

Essa trilha foi criada pra ser prática e direto ao ponto. Nada de teoria infinita sem aplicação. A cada módulo, você vai:

- Entender os conceitos fundamentais
- Ver exemplos reais de código
- Praticar com projetos hands-on

### Por onde começar

Recomendo seguir a ordem dos módulos, especialmente se você está começando:

1. **Fundamentos** - Entenda como LLMs funcionam
2. **Modelos & APIs** - Aprenda a usar as principais APIs
3. **Prompt Engineering** - Domine a arte de se comunicar com IA
4. **RAG** - Construa sistemas de busca inteligente
5. **AI Agents** - Crie agentes autônomos
6. **Dev Tools** - Conheça as ferramentas do mercado
7. **Produção** - Coloque tudo em produção

### Pré-requisitos

- Conhecimento básico de programação (Python ou JavaScript)
- Vontade de meter a mão na massa
- Uma conta na OpenAI ou Anthropic (pra usar as APIs)

Bora começar?
      `
    },
    'o-que-e-ai-engineering': {
      video: null,
      body: `
## O que é AI Engineering?

AI Engineering é a disciplina de construir aplicações que usam modelos de linguagem (LLMs) como componente central. Diferente de Machine Learning tradicional, onde você treina modelos, aqui você usa modelos pré-treinados e foca em:

- Integração com APIs de LLMs
- Engenharia de prompts
- Arquitetura de sistemas com IA
- Otimização de custos e latência

### AI Engineer vs ML Engineer

| AI Engineer | ML Engineer |
|-------------|-------------|
| Usa modelos pré-treinados | Treina modelos do zero |
| Foca em integração e UX | Foca em dados e métricas |
| Prompt engineering | Feature engineering |
| APIs e frameworks | PyTorch, TensorFlow |

### Por que aprender isso agora?

O mercado de AI Engineering está explodindo. Empresas precisam de pessoas que sabem:

- Construir chatbots inteligentes
- Implementar busca semântica
- Criar agentes autônomos
- Colocar IA em produção

E a demanda só vai aumentar.

### O stack do AI Engineer

\`\`\`
LLM APIs (OpenAI, Anthropic, etc)
       ↓
Frameworks (LangChain, Vercel AI SDK)
       ↓
Vector Databases (Pinecone, Chroma)
       ↓
Sua aplicação
\`\`\`

Nos próximos módulos, vamos explorar cada uma dessas camadas em detalhes.
      `
    }
  },

  fundamentos: {
    'o-que-sao-llms': {
      video: null,
      body: `
## O que são Large Language Models?

Large Language Models (LLMs) são modelos de IA treinados em grandes quantidades de texto para prever a próxima palavra em uma sequência. Parece simples, mas essa tarefa aparentemente básica resulta em capacidades impressionantes.

### Como funcionam (simplificado)

1. **Treinamento**: O modelo lê bilhões de textos da internet
2. **Aprendizado**: Aprende padrões estatísticos da linguagem
3. **Geração**: Dado um prompt, prevê as próximas palavras mais prováveis

\`\`\`python
# Conceitualmente, é como se o modelo fizesse:
def gerar_texto(prompt):
    while not fim:
        proxima_palavra = modelo.prever(prompt + texto_gerado)
        texto_gerado += proxima_palavra
    return texto_gerado
\`\`\`

### Principais LLMs do mercado

- **GPT-4** (OpenAI) - O mais conhecido
- **Claude** (Anthropic) - Forte em raciocínio
- **Gemini** (Google) - Multimodal nativo
- **Llama** (Meta) - Open source

### Limitações importantes

LLMs não são mágica. Eles:

- **Alucinam** - Inventam informações
- **Não têm memória** - Cada chamada é independente
- **São estatísticos** - Não "entendem" de verdade
- **Têm conhecimento datado** - Treinados até certa data

Entender essas limitações é crucial pra construir aplicações robustas.

### Próximos passos

No próximo artigo, vamos entender como tokens e contexto funcionam - conceitos fundamentais pra usar LLMs efetivamente.
      `
    },
    'tokens-e-contexto': {
      video: null,
      body: `
## Tokens e Contexto

Antes de usar LLMs efetivamente, você precisa entender dois conceitos fundamentais: tokens e janela de contexto.

### O que são tokens?

Tokens são as unidades básicas que o modelo processa. Não são exatamente palavras - são pedaços de texto.

\`\`\`
"Olá, mundo!" → ["Ol", "á", ",", " mundo", "!"]
\`\`\`

Em média:
- 1 token ≈ 4 caracteres em inglês
- 1 token ≈ 3 caracteres em português (mais tokens por palavra)
- 100 tokens ≈ 75 palavras

### Por que tokens importam?

1. **Custo** - Você paga por token (input + output)
2. **Limite** - Existe um máximo de tokens por requisição
3. **Performance** - Mais tokens = mais latência

### Janela de contexto

A janela de contexto é o número máximo de tokens que o modelo consegue "ver" de uma vez.

| Modelo | Contexto |
|--------|----------|
| GPT-4 | 128k tokens |
| Claude 3 | 200k tokens |
| GPT-3.5 | 16k tokens |

### Calculando tokens

\`\`\`python
import tiktoken

enc = tiktoken.encoding_for_model("gpt-4")
texto = "Seu texto aqui"
tokens = enc.encode(texto)
print(f"Número de tokens: {len(tokens)}")
\`\`\`

### Dicas práticas

- Sempre monitore o uso de tokens
- Resuma contextos longos quando possível
- Use modelos com contexto maior só quando necessário (custam mais)
- Lembre: o output também conta como tokens!
      `
    }
  },

  'prompt-engineering': {
    'anatomia-prompt': {
      video: null,
      body: `
## Anatomia de um Prompt Efetivo

Um bom prompt não é só jogar texto pro modelo. Existe uma estrutura que funciona consistentemente.

### Componentes de um prompt

1. **System prompt** - Define o comportamento geral
2. **Contexto** - Informações relevantes
3. **Instrução** - O que você quer que faça
4. **Formato** - Como deve responder
5. **Exemplos** - Demonstrações (opcional)

### Exemplo na prática

\`\`\`python
messages = [
    {
        "role": "system",
        "content": """Você é um assistente de programação especializado em Python.
        Seja conciso e use código quando apropriado.
        Sempre explique o raciocínio antes do código."""
    },
    {
        "role": "user",
        "content": """
        Contexto: Estou construindo uma API REST com FastAPI.

        Tarefa: Crie um endpoint que valida emails.

        Formato esperado:
        1. Explicação breve
        2. Código completo
        3. Exemplo de uso
        """
    }
]
\`\`\`

### Princípios fundamentais

- **Seja específico** - Ambiguidade gera resultados ruins
- **Dê contexto** - O modelo não sabe nada além do que você fala
- **Defina formato** - JSON, markdown, lista - seja explícito
- **Itere** - Prompts são refinados com teste

### Anti-patterns comuns

❌ "Faça algo legal com IA"
✅ "Crie uma função Python que classifica sentimento de reviews"

❌ Prompts gigantes sem estrutura
✅ Prompts organizados em seções claras

❌ Assumir que o modelo sabe o contexto
✅ Fornecer todo contexto necessário
      `
    }
  }

  // Add more modules and articles as needed
};
