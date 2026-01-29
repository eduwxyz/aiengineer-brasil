---
video: null
---

## Como Modelos "Pensam"

LLMs não pensam de verdade. Não têm consciência, intenção ou entendimento real. Mas geram texto de uma forma que parece inteligente. Entender como isso funciona ajuda a usar melhor e evitar armadilhas.

### O processo de geração

Quando você envia um prompt, acontece o seguinte:

```excalidraw
{"elements":[{"type":"rectangle","x":80,"y":30,"width":160,"height":50,"strokeColor":"#e07a5f","backgroundColor":"transparent","fillStyle":"hachure","strokeWidth":2,"roughness":1,"roundness":{"type":3},"id":"input","seed":1},{"type":"text","x":110,"y":43,"width":100,"height":26,"text":"\"O céu é\"","fontSize":20,"fontFamily":2,"textAlign":"center","strokeColor":"#ffffff","id":"input-text","seed":2},{"type":"arrow","x":160,"y":90,"width":0,"height":35,"strokeColor":"#e07a5f","strokeWidth":2,"roughness":1,"points":[[0,0],[0,35]],"id":"arrow1","seed":3},{"type":"rectangle","x":50,"y":135,"width":220,"height":85,"strokeColor":"#81b29a","backgroundColor":"transparent","fillStyle":"hachure","strokeWidth":2,"roughness":1,"roundness":{"type":3},"id":"probs","seed":4},{"type":"text","x":75,"y":150,"width":180,"height":60,"text":"azul → 78%\nbonito → 12%\nclaro → 8%","fontSize":16,"fontFamily":2,"strokeColor":"#ffffff","id":"probs-text","seed":5},{"type":"arrow","x":160,"y":230,"width":0,"height":35,"strokeColor":"#81b29a","strokeWidth":2,"roughness":1,"points":[[0,0],[0,35]],"id":"arrow2","seed":6},{"type":"ellipse","x":100,"y":275,"width":120,"height":50,"strokeColor":"#f2cc8f","backgroundColor":"#f2cc8f","fillStyle":"solid","strokeWidth":2,"roughness":1,"opacity":30,"id":"output","seed":7},{"type":"text","x":130,"y":290,"width":60,"height":26,"text":"\"azul\"","fontSize":20,"fontFamily":2,"textAlign":"center","strokeColor":"#ffffff","id":"output-text","seed":8},{"type":"text","x":280,"y":45,"width":60,"height":20,"text":"Input","fontSize":16,"fontFamily":2,"strokeColor":"#a1a1aa","id":"label1","seed":9},{"type":"text","x":280,"y":168,"width":120,"height":20,"text":"Probabilidades","fontSize":16,"fontFamily":2,"strokeColor":"#a1a1aa","id":"label2","seed":10},{"type":"text","x":280,"y":290,"width":140,"height":20,"text":"Token selecionado","fontSize":16,"fontFamily":2,"strokeColor":"#a1a1aa","id":"label3","seed":11}]}
```

O modelo gera um token por vez. Cada novo token é adicionado ao contexto, e o processo repete. Por isso respostas longas demoram mais — são mais passos de geração.

### Atenção: como o modelo "lê" o contexto

A arquitetura por trás dos LLMs modernos é o Transformer. O componente mais importante é o mecanismo de **atenção** (attention).

A ideia é simples: quando o modelo está gerando uma palavra, ele não olha pra todo o contexto com o mesmo peso. Ele "presta mais atenção" nas partes relevantes.

Por exemplo, na frase "O gato sentou no sofá porque ele estava cansado", quando o modelo processa "ele", o mecanismo de atenção identifica que "ele" se refere a "gato", não a "sofá".

Isso acontece através de cálculos matemáticos que atribuem pesos diferentes pra cada parte do contexto. É por isso que LLMs conseguem manter coerência em textos longos — eles "lembram" do que é relevante.

### Temperatura: controlando a criatividade

Depois que o modelo calcula as probabilidades do próximo token, ele precisa escolher um. A **temperatura** controla como essa escolha é feita.

**Temperatura baixa (0.0 - 0.3)**: Escolhe tokens mais prováveis. Respostas mais previsíveis e consistentes.

**Temperatura alta (0.7 - 1.0)**: Dá mais chance pra tokens menos prováveis. Respostas mais criativas e variadas.

```python
# Resposta mais determinística
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Escreva um título pra um artigo sobre IA"}],
    temperature=0.2
)

# Resposta mais criativa
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Escreva um título pra um artigo sobre IA"}],
    temperature=0.9
)
```

Na prática:
- Use temperatura baixa pra tarefas que precisam de precisão (código, extração de dados, classificação)
- Use temperatura alta pra tarefas criativas (escrita, brainstorming)

### Top-p (nucleus sampling)

Além de temperatura, existe o parâmetro **top_p**. Em vez de considerar todos os tokens possíveis, ele considera apenas os tokens que juntos somam uma probabilidade P.

Por exemplo, `top_p=0.9` significa: considere apenas os tokens mais prováveis até que a soma das probabilidades chegue a 90%.

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=mensagens,
    temperature=0.7,
    top_p=0.9
)
```

Na maioria dos casos, ajustar só a temperatura é suficiente. Mas top_p pode ajudar a eliminar respostas muito improváveis sem perder criatividade.

### Tokens especiais

LLMs usam tokens especiais pra marcar coisas como início de texto, fim de resposta, separação entre mensagens. Você não vê eles diretamente, mas eles existem.

O mais importante é o token de **fim de sequência** (EOS - End of Sequence). Quando o modelo gera esse token, ele para de gerar. É assim que ele "sabe" quando terminar uma resposta.

Se você já viu um modelo ficar repetindo texto infinitamente, provavelmente foi um problema com esse token.

### O modelo não tem memória entre chamadas

Cada chamada à API é independente. O modelo não "lembra" de conversas anteriores automaticamente.

```python
# Chamada 1
response1 = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Meu nome é João"}]
)

# Chamada 2 - o modelo NÃO sabe que você é João
response2 = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Qual é meu nome?"}]
)
# Resposta: "Não sei seu nome, você não me disse."
```

Pra manter contexto entre mensagens, você precisa enviar o histórico:

```python
mensagens = [
    {"role": "user", "content": "Meu nome é João"},
    {"role": "assistant", "content": "Prazer, João!"},
    {"role": "user", "content": "Qual é meu nome?"}
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=mensagens
)
# Resposta: "Seu nome é João."
```

### Por que isso importa

Entender como a geração funciona ajuda a:

- **Debugar respostas estranhas**: Se o modelo está gerando lixo, pode ser temperatura muito alta ou contexto mal formatado
- **Otimizar custo**: Limitar `max_tokens` evita respostas longas demais
- **Controlar consistência**: Temperatura baixa pra tarefas que precisam de respostas previsíveis
- **Gerenciar histórico**: Saber que você precisa enviar o contexto manualmente

O modelo é só um gerador de probabilidades muito sofisticado. Quanto melhor você entender isso, melhor vai usar.
