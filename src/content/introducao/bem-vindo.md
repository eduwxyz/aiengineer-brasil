---
video: null
---

## Bem-vindo à Trilha AI Engineer

Se você chegou até aqui, provavelmente quer ir além de só usar ChatGPT. Quer entender como essas coisas funcionam por baixo dos panos e, mais importante, como construir produtos de verdade com IA.

Esse é o lugar certo.

### O que você vai aprender

Essa trilha cobre o que um AI Engineer precisa saber no dia a dia:

- Como LLMs funcionam (sem entrar em matemática desnecessária)
- Técnicas de prompt engineering que fazem diferença real
- RAG pra dar conhecimento específico pros seus modelos
- Agents que executam tarefas de forma autônoma
- Ferramentas que aceleram seu desenvolvimento
- Como colocar tudo isso em produção de forma sustentável

### O que você precisa antes de começar

**Programação básica**: Se você sabe o básico de Python, tá de boa. A maioria dos exemplos é em Python porque é o padrão da indústria pra IA.

**Terminal**: Você vai precisar rodar comandos, instalar pacotes, essas coisas.

**Um modelo pra testar**: Aqui você tem duas opções:

1. **API paga (mais prático)**: Crie uma conta na OpenAI ou Anthropic. Ambas têm créditos grátis pra começar e você consegue testar tudo rapidamente.

2. **Modelo local (gratuito)**: Se preferir não gastar agora, instale o [Ollama](https://ollama.ai) e baixe um modelo como o Llama 3.2. Roda no seu computador, sem custo nenhum. A maioria dos exemplos da trilha funciona igual — só muda o endpoint.

```bash
# Instalar Ollama e rodar um modelo local
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2
ollama run llama3.2
```

Com Ollama rodando, você usa a mesma interface da OpenAI apontando pra `localhost`:

```python
from openai import OpenAI

# Aponta pra Ollama local em vez da OpenAI
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Ollama não precisa de key real
)

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Olá!"}]
)
print(response.choices[0].message.content)
```

### A trilha completa

Se você tá começando do zero, recomendo seguir na ordem:

```
Fundamentos - O básico de LLMs, tokens e como os modelos pensam
    ↓
Modelos & APIs - OpenAI, Anthropic e alternativas open source
    ↓
Prompt Engineering - Técnicas pra tirar o máximo dos modelos
    ↓
RAG - Dê conhecimento específico pros seus modelos
    ↓
AI Agents - Sistemas que executam tarefas de forma autônoma
    ↓
Dev Tools - Ferramentas que aceleram seu dia a dia
    ↓
Produção - Como levar tudo isso pro mundo real
```

Se você já conhece algum assunto, pula direto pro que interessa. Cada módulo é relativamente independente.

### Como o conteúdo é organizado

Cada módulo tem:

- **Explicação dos conceitos** de forma direta, sem enrolação
- **Código que funciona** e você pode copiar e testar
- **Os problemas comuns** que você vai encontrar no caminho

### Contribuições são bem-vindas

Essa área muda rápido. O que era verdade há 6 meses pode não ser mais.

Se você encontrar algo desatualizado ou errado, me avisa no [Twitter/X](https://x.com/eduwxyz_). O código é open source.

Bora começar?
