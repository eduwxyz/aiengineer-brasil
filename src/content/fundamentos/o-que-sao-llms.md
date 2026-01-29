---
video: null
---

## O que são LLMs

LLM significa Large Language Model — modelo de linguagem grande. São redes neurais treinadas com quantidades absurdas de texto (livros, sites, código, conversas) pra aprender padrões da linguagem humana.

O ChatGPT, Claude, Gemini, Llama — todos são LLMs. A diferença entre eles está em quem treinou, com quais dados, e quais otimizações fizeram.

### Como funcionam (versão simplificada)

Um LLM faz uma coisa só: prever a próxima palavra.

Você digita "O céu é" e ele calcula a probabilidade de cada palavra possível vir depois. "Azul" tem alta probabilidade. "Banana" tem baixa. Ele escolhe uma e repete o processo até formar uma resposta completa.

```
Input: "O céu é"
Probabilidades: azul (78%), bonito (12%), claro (8%), ...
Output: "azul"

Input: "O céu é azul"
Probabilidades: e (45%), quando (20%), . (15%), ...
...
```

Parece simples, mas quando você treina isso com trilhões de palavras, o modelo aprende gramática, fatos, raciocínio e até código — tudo isso emerge da tarefa de prever a próxima palavra.

### Os principais modelos

**GPT (OpenAI)**
- GPT-4o é o modelo principal atualmente
- Forte em código, raciocínio e tarefas gerais
- Contexto de 128K tokens

**Claude (Anthropic)**
- Claude 3.5 Sonnet é o mais usado
- Contexto grande (200K tokens)
- Bom em seguir instruções longas e complexas

**Gemini (Google)**
- Multimodal de fábrica (texto, imagem, áudio, vídeo)
- Contexto de até 1M tokens nas versões mais recentes

**Llama (Meta)**
- Open source — você pode baixar e rodar localmente
- Llama 3.2 é competitivo com modelos fechados
- Ótimo pra quem quer controle total ou não pode enviar dados pra fora

**DeepSeek**
- Empresa chinesa com modelos muito eficientes
- Preços bem mais baixos que a concorrência
- DeepSeek V3 compete com GPT-4o em vários benchmarks

### Qual usar?

Não existe "melhor modelo". Depende do que você precisa:

- **Prototipação rápida**: GPT-4o ou Claude — APIs fáceis, documentação boa
- **Contexto muito grande**: Gemini ou Claude
- **Rodar localmente**: Llama via Ollama
- **Custo baixo em produção**: GPT-4o mini, Claude Haiku, ou DeepSeek

Na prática, a maioria dos projetos funciona bem com qualquer um dos modelos principais. A diferença aparece mais em casos específicos (código complexo, textos muito longos, requisitos de privacidade).

### O que LLMs NÃO são

Algumas confusões comuns:

**Não são bancos de dados**. O modelo não "armazena" informações de forma estruturada. Ele aprendeu padrões durante o treinamento, mas não consegue "consultar" fatos com precisão.

**Não são determinísticos**. A mesma pergunta pode gerar respostas diferentes. Isso é feature, não bug — permite criatividade e variação.

**Não são agentes por padrão**. Um LLM só gera texto. Pra ele fazer coisas (buscar na web, executar código, enviar emails), você precisa dar ferramentas pra ele — isso é o que chamamos de agents.

### Por que isso importa pra você

Como AI Engineer, você não vai treinar LLMs do zero. Você vai usar modelos prontos via API ou rodar modelos open source localmente.

Seu trabalho é entender as capacidades e limitações desses modelos pra construir produtos que funcionem de verdade. Isso significa:

- Saber quando um LLM resolve o problema e quando não resolve
- Escolher o modelo certo pro caso de uso
- Estruturar prompts que extraiam o melhor do modelo
- Lidar com os casos onde o modelo erra

Os próximos artigos vão te dar as ferramentas pra fazer tudo isso.
