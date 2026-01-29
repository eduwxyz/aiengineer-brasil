---
video: null
---

## Tokens e Contexto

LLMs não leem texto como humanos. Eles quebram tudo em pedaços menores chamados tokens. Entender isso é importante porque você paga por token e tem limite de quantos tokens cabem numa conversa.

### O que é um token?

Token é a unidade básica que o modelo processa. Pode ser uma palavra, parte de uma palavra, ou até um caractere.

```
"Olá, como você está?"

Tokens: ["Ol", "á", ",", " como", " você", " está", "?"]
Total: 7 tokens
```

Em inglês, a regra geral é ~4 caracteres por token, ou ~0.75 palavras por token. Em português, palavras tendem a virar mais tokens porque o modelo foi treinado majoritariamente em inglês.

Você pode testar isso na prática:

```python
import tiktoken

# Tokenizador do GPT-4
enc = tiktoken.encoding_for_model("gpt-4o")

texto = "Inteligência artificial está mudando tudo"
tokens = enc.encode(texto)

print(f"Texto: {texto}")
print(f"Tokens: {tokens}")
print(f"Total: {len(tokens)} tokens")
# Total: 7 tokens
```

### Por que tokens importam?

Duas razões: **custo** e **limite**.

**Custo**: Você paga por milhão de tokens. Input e output têm preços diferentes (output costamais).

| Modelo | Input (1M tokens) | Output (1M tokens) |
|--------|-------------------|---------------------|
| GPT-4o | $2.50 | $10.00 |
| GPT-4o mini | $0.15 | $0.60 |
| Claude 3.5 Sonnet | $3.00 | $15.00 |
| Claude Haiku | $0.25 | $1.25 |

Uma conversa típica com 1000 tokens de input e 500 de output no GPT-4o custa ~$0.0075. Parece pouco, mas multiplica por milhares de usuários e a conta cresce rápido.

**Limite**: Todo modelo tem uma janela de contexto — o máximo de tokens que ele consegue processar de uma vez. Isso inclui seu prompt, o histórico da conversa e a resposta.

### Janela de contexto

A janela de contexto determina quanta informação o modelo consegue "ver" ao mesmo tempo.

| Modelo | Contexto |
|--------|----------|
| GPT-4o | 128K tokens |
| Claude 3.5 Sonnet | 200K tokens |
| Gemini 1.5 Pro | 1M tokens |
| Llama 3.2 | 128K tokens |

128K tokens equivalem a aproximadamente 100.000 palavras — mais ou menos um livro inteiro. Parece muito, mas em aplicações reais (RAG, histórico de chat, documentos longos) esse limite chega rápido.

### O que acontece quando estoura o limite?

Se você tentar enviar mais tokens do que o modelo suporta, a API retorna erro. Você precisa gerenciar isso no código:

```python
import tiktoken

def contar_tokens(mensagens, modelo="gpt-4o"):
    enc = tiktoken.encoding_for_model(modelo)
    total = 0
    for msg in mensagens:
        total += len(enc.encode(msg["content"]))
    return total

def truncar_historico(mensagens, limite=100000):
    """Remove mensagens antigas até caber no limite"""
    while contar_tokens(mensagens) > limite and len(mensagens) > 1:
        mensagens.pop(1)  # Mantém system prompt, remove as mais antigas
    return mensagens
```

### Contexto grande ≠ contexto perfeito

Um detalhe que pega muita gente: modelos com contexto grande não usam todas as partes do contexto com a mesma atenção.

Pesquisas mostram que LLMs tendem a prestar mais atenção no início e no fim do contexto. Informação no meio pode ser "esquecida". Isso é conhecido como "lost in the middle".

```excalidraw
{"elements":[{"type":"rectangle","x":20,"y":40,"width":60,"height":80,"strokeColor":"#81b29a","backgroundColor":"#81b29a","fillStyle":"solid","strokeWidth":2,"roughness":1,"opacity":50,"id":"start","seed":1},{"type":"rectangle","x":90,"y":55,"width":60,"height":50,"strokeColor":"#71717a","backgroundColor":"#71717a","fillStyle":"solid","strokeWidth":2,"roughness":1,"opacity":20,"id":"mid1","seed":2},{"type":"rectangle","x":160,"y":60,"width":60,"height":40,"strokeColor":"#71717a","backgroundColor":"#71717a","fillStyle":"solid","strokeWidth":2,"roughness":1,"opacity":15,"id":"mid2","seed":3},{"type":"rectangle","x":230,"y":65,"width":60,"height":30,"strokeColor":"#71717a","backgroundColor":"#71717a","fillStyle":"solid","strokeWidth":2,"roughness":1,"opacity":10,"id":"mid3","seed":4},{"type":"rectangle","x":300,"y":55,"width":60,"height":50,"strokeColor":"#71717a","backgroundColor":"#71717a","fillStyle":"solid","strokeWidth":2,"roughness":1,"opacity":20,"id":"mid4","seed":5},{"type":"rectangle","x":370,"y":40,"width":60,"height":80,"strokeColor":"#81b29a","backgroundColor":"#81b29a","fillStyle":"solid","strokeWidth":2,"roughness":1,"opacity":50,"id":"end","seed":6},{"type":"text","x":30,"y":130,"width":40,"height":20,"text":"Início","fontSize":14,"fontFamily":2,"strokeColor":"#81b29a","id":"t1","seed":7},{"type":"text","x":195,"y":130,"width":40,"height":20,"text":"Meio","fontSize":14,"fontFamily":2,"strokeColor":"#71717a","id":"t2","seed":8},{"type":"text","x":385,"y":130,"width":30,"height":20,"text":"Fim","fontSize":14,"fontFamily":2,"strokeColor":"#81b29a","id":"t3","seed":9},{"type":"text","x":140,"y":10,"width":150,"height":20,"text":"Atenção do modelo","fontSize":14,"fontFamily":2,"strokeColor":"#a1a1aa","id":"title","seed":10},{"type":"line","x":20,"y":125,"width":410,"height":0,"strokeColor":"#52525b","strokeWidth":1,"roughness":1,"points":[[0,0],[410,0]],"id":"line","seed":11}]}
```

Na prática, se você tem um documento de 100K tokens e faz uma pergunta sobre algo que está no meio, o modelo pode errar mesmo tendo a informação disponível.

### Dicas práticas

**Coloque informação importante no início ou no fim**. Se você está fazendo RAG, ordene os documentos mais relevantes primeiro.

**Não encha o contexto à toa**. Mais contexto não significa melhor resposta. Às vezes, menos é mais.

**Monitore uso de tokens**. As APIs retornam quantos tokens foram usados em cada chamada. Use isso pra otimizar custos.

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=mensagens
)

print(f"Input: {response.usage.prompt_tokens}")
print(f"Output: {response.usage.completion_tokens}")
print(f"Total: {response.usage.total_tokens}")
```

**Use modelos menores pra tarefas simples**. GPT-4o mini ou Claude Haiku resolvem a maioria das tarefas por uma fração do preço.
