---
video: null
---

## O que é AI Engineering?

Você provavelmente já usou ChatGPT, Claude ou algum outro modelo de IA. Mas já parou pra pensar em como transformar isso num produto de verdade? Tipo, um chatbot que responde sobre seus documentos, um assistente que agenda reuniões, ou uma busca inteligente pro seu app?

É exatamente isso que um AI Engineer faz.

### O trabalho na prática

AI Engineering é sobre pegar modelos prontos (GPT-4, Claude, Llama) e fazer eles funcionarem dentro de produtos reais. Você não vai treinar um modelo do zero — isso é trabalho de ML Engineer. Você vai *usar* esses modelos de forma inteligente.

No dia a dia, isso significa:

- Desenhar prompts que funcionam de verdade (e não só no playground)
- Integrar APIs de LLMs no seu backend
- Implementar RAG pra dar contexto pro modelo
- Criar agentes que executam tarefas autonomamente
- Otimizar custos (porque chamar GPT-4 em loop sai caro)
- Colocar tudo isso em produção sem quebrar

### Mas e o Data Scientist? E o ML Engineer?

Essa é uma dúvida comum. Deixa eu explicar de forma simples:

O **Data Scientist** foca no "por quê". Ele pega dados bagunçados, analisa, encontra padrões e responde perguntas de negócio. "Por que as vendas caíram?" ou "Quais clientes vão cancelar?". Usa bastante estatística e visualização.

O **ML Engineer** foca em fazer modelos rodarem em escala. Pegou um modelo que o Data Scientist criou? Agora precisa colocar em produção, aguentar milhões de requisições, monitorar drift. É uma ponte entre ciência de dados e engenharia de software.

O **AI Engineer** é diferente. Ele geralmente não cria modelos — ele usa modelos prontos (como GPT-4 ou Claude) e foca em integrá-los em produtos. O trabalho é mais sobre arquitetura de aplicação, prompts, RAG, agents.

Pensa assim: o Data Scientist descobre insights, o ML Engineer coloca modelos em produção, o AI Engineer constrói produtos com LLMs.

Na prática, esses papéis se misturam bastante. Em startup pequena, a mesma pessoa faz tudo. Em empresa grande, a divisão é mais clara. O importante é entender que AI Engineering tem um foco específico: **construir aplicações com LLMs**.

### Por que isso tá bombando agora?

Simples: antes de 2023, usar IA em produtos era difícil. Você precisava de um time de ML, dados de treinamento, infraestrutura pesada. Hoje, com uma chamada de API, você tem acesso ao GPT-4.

Isso democratizou a construção de produtos com IA. E criou uma demanda enorme por pessoas que sabem fazer isso direito.

Segundo o [World Economic Forum](https://www.weforum.org/), especialistas em IA e ML estão entre as profissões com maior crescimento projetado até 2030 — mais de 80% de aumento. E não é só sobre saber chamar uma API. É sobre:

- Saber quando usar (e quando não usar) um LLM
- Entender as limitações e alucinações
- Construir sistemas robustos que funcionam em produção
- Otimizar custos e latência

### O stack que você vai aprender

```
LLM APIs (OpenAI, Anthropic, Google)
       ↓
Frameworks (LangChain, Vercel AI SDK, LlamaIndex)
       ↓
Vector Databases (Pinecone, Chroma, Weaviate)
       ↓
Sua aplicação
```

Cada camada tem seu papel:

- **LLM APIs**: São os "cérebros". Você manda texto, recebe texto. Simples assim.
- **Frameworks**: Facilitam coisas como encadear chamadas, gerenciar memória, conectar com ferramentas.
- **Vector Databases**: Guardam embeddings pra fazer busca semântica. Essencial pra RAG.
- **Sua aplicação**: Onde tudo se junta. Pode ser um chatbot, um copilot, um agente.

Nos próximos módulos, vamos explorar cada uma dessas camadas na prática. Com código, exemplos reais e as pegadinhas que você vai encontrar pelo caminho.
